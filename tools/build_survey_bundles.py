"""Compose mode surveys without changing their source question definitions."""
import copy
import hashlib
import html
import json
import pathlib
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT = pathlib.Path(__file__).resolve().parents[1]
LANGUAGES = ('en', 'it', 'fr', 'de', 'tr', 'fa', 'hu', 'ar')


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for item in value.values():
            yield from strings(item)
    elif isinstance(value, list):
        for item in value:
            yield from strings(item)


def localized(source, language, text):
    key = text if text.startswith('#') else '#' + text
    return source['languages'][language].get(key, text)


def compose(spec, bundle):
    mode = spec['mode']
    paths = [ROOT / 'forms/surveys' / f'smarturbanity_{mode}_{part}.json' for part in bundle['sources']]
    sources = [read(path) for path in paths]
    first = sources[0]['questionnaire']
    result = {'questionnaire': copy.deepcopy(first), 'languages': {lang: {} for lang in LANGUAGES}}
    questionnaire = result['questionnaire']
    questionnaire['questionnaire_id'] = f"smarturbanity_{mode}_{bundle['suffix']}"
    questionnaire['questionnaire_version'] = '1.0.0'
    questionnaire['name'] = 'SmartUrbanity - ' + bundle['titles']['en']
    questionnaire['title'] = bundle['titles']['en']
    questionnaire['estimated_minutes'] = sum(s['questionnaire']['estimated_minutes'] for s in sources)
    assert questionnaire['estimated_minutes'] <= 6, bundle['suffix']
    questionnaire['welcome_page']['title'] = bundle['titles']['en']
    questionnaire['sections'] = []
    habits = next((s for s in sources if s['questionnaire']['questionnaire_id'].endswith('_habits')), None)
    gate = habits['questionnaire']['sections'][0]['questions'][0]['answer_key'] if habits else None
    section_titles = set()
    normalizations = []
    for source in sources:
        sq = source['questionnaire']
        assert sq['options'] == first['options'] and sq['gdpr_link'] == first['gdpr_link']
        assert all(not s.get('description') and not s.get('show_if') and not s.get('condition') for s in sq['sections'])
        title = sq['title']
        assert title not in section_titles
        section_titles.add(title)
        questions = [copy.deepcopy(q) for section in sq['sections'] for q in section.get('questions', [])]
        if source is habits:
            # Keep the screening question and its reasons; later details need use.
            for question in questions[2:]:
                original = question.get('show_if')
                if original and original.get(gate) in ('yes', ['yes']):
                    continue
                question['show_if'] = {'$all': [{gate: ['yes']}, original]} if original else {gate: ['yes']}
        section = {'title': title, 'description': '', 'backgroundColor': '#f0f0f0', 'questions': questions}
        if gate and source is not habits:
            section['show_if'] = {gate: ['yes']}
        questionnaire['sections'].append(section)
        # Only bring keys used by this section; old welcome pages are not repeated.
        used = set(strings(section))
        for lang in LANGUAGES:
            table = result['languages'][lang]
            assert lang in source['languages']
            for key, value in source['languages'][lang].items():
                if key.startswith('#') and (key[1:] in used or key in used):
                    if key in table and table[key] != value:
                        normalizations.append({'language': lang, 'key': key, 'kept': table[key], 'variant': value})
                    else:
                        table[key] = value
            key = '#' + title
            translated = localized(source, lang, title)
            assert key not in table or table[key] == translated
            table[key] = translated
    # One introduction and privacy notice, followed by the list of included topics.
    base_description = first['welcome_page']['description']
    descriptions = {}
    for lang in LANGUAGES:
        topics = ''.join('<li>' + html.escape(localized(s, lang, s['questionnaire']['title'])) + '</li>' for s in sources)
        descriptions[lang] = localized(sources[0], lang, base_description) + '<ul>' + topics + '</ul>'
    description = descriptions['en']
    questionnaire['welcome_page']['description'] = description
    for lang in LANGUAGES:
        table = result['languages'][lang]
        for key, value in bundle.get('translationOverrides', {}).get(lang, {}).items():
            assert key in table, (bundle['suffix'], lang, key)
            table[key] = value
        table['#' + bundle['titles']['en']] = bundle['titles'][lang]
        table['#' + questionnaire['name']] = 'SmartUrbanity - ' + bundle['titles'][lang]
        table['#' + description] = descriptions[lang]
        for text in strings({'final_page': questionnaire['final_page'], 'image_alt': questionnaire['welcome_page'].get('image_alt', '')}):
            key = text if text.startswith('#') else '#' + text
            if key in sources[0]['languages'][lang]:
                table[key] = sources[0]['languages'][lang][key]
    ids = [q['question_id'] for s in questionnaire['sections'] for q in s['questions']]
    assert len(ids) == len(set(ids)), questionnaire['questionnaire_id']
    for item in normalizations:
        assert item['key'] in bundle.get('translationOverrides', {}).get(item['language'], {}), item
        item['resolved'] = result['languages'][item['language']][item['key']]
    provenance = {'id': questionnaire['questionnaire_id'], 'title': bundle['titles']['it'], 'minutes': questionnaire['estimated_minutes'], 'questions': len(ids), 'translationNormalizations': normalizations, 'sources': [{'path': p.relative_to(ROOT).as_posix(), 'version': s['questionnaire']['questionnaire_version'], 'sha256': hashlib.sha256(p.read_text(encoding='utf-8').encode('utf-8')).hexdigest()} for p, s in zip(paths, sources)]}
    return result, provenance, gate


def main():
    modes = ('walking', 'cycling', 'e_scooter', 'public_transport', 'car', 'motorcycle')
    specs = [read(ROOT / 'tools/survey-bundles' / (mode + '.json')) for mode in modes]
    assert len(specs) == 6
    index_path = ROOT / 'forms/index.json'
    index = read(index_path)
    campaign_path = ROOT / 'pilots/rome/survey_campaigns.json'
    campaigns = read(campaign_path)
    # Rebuild from the declared sources, supporting repeatable generation.
    old_ids = set()
    new_ids = set()
    mode_bundles = {}
    reports = []
    gates = {}
    outputs = {}
    for spec in specs:
        mode = spec['mode']
        declared = [part for b in spec['bundles'] for part in b['sources']]
        assert len(declared) == len(set(declared))
        expected = {p.stem.removeprefix(f'smarturbanity_{mode}_') for p in (ROOT / 'forms/surveys').glob(f'smarturbanity_{mode}_*.json') if not any(p.stem == f'smarturbanity_{mode}_{b["suffix"]}' for b in spec['bundles'])}
        assert set(declared) == expected, (mode, declared, expected)
        old_ids.update(f'smarturbanity_{mode}_{part}' for part in declared)
        mode_bundles[mode] = []
        for bundle in spec['bundles']:
            result, report, gate = compose(spec, bundle)
            qid = report['id']
            outputs[ROOT / 'forms/surveys' / (qid + '.json')] = result
            new_ids.add(qid)
            mode_bundles[mode].append(qid)
            reports.append(report)
            if gate:
                gates[qid] = {gate: ['no']}
    all_mode_ids = old_ids | new_ids
    retained = [p for p in index['questionnaires'] if pathlib.Path(p).stem not in all_mode_ids]
    index['questionnaires'] = retained[:4] + ['surveys/' + qid + '.json' for ids in mode_bundles.values() for qid in ids] + retained[4:]
    options = campaigns['surveys_gallery']
    options['follow_ups'] = {k: v for k, v in options['follow_ups'].items() if k not in all_mode_ids and v not in all_mode_ids}
    options['follow_up_stop_when'] = {k: v for k, v in options['follow_up_stop_when'].items() if k not in all_mode_ids}
    options['follow_up_stop_when'].update(gates)
    for ids in mode_bundles.values():
        options['follow_ups'].update(zip(ids, ids[1:]))
    template = None
    for key, campaign in list(campaigns['campaigns'].items()):
        if any(qid in all_mode_ids for qid in campaign['questionnaires']):
            assert not campaign['enabled'] and campaign['area'] is None and campaign['priority'] == 0 and not campaign['exclusive']
            assert all(value is None for value in campaign['window'].values()), key
            template = campaign
            campaign['questionnaires'] = [qid for qid in campaign['questionnaires'] if qid not in all_mode_ids]
            if not campaign['questionnaires']:
                del campaigns['campaigns'][key]
    assert template is not None
    for mode, ids in mode_bundles.items():
        campaign = copy.deepcopy(template)
        campaign['questionnaires'] = ids
        source = read(ROOT / 'forms/surveys' / f'smarturbanity_{mode}_habits.json')
        mode_name = source['questionnaire']['title'].split(' – ')[0]
        campaign['name'] = mode_name
        campaigns['campaigns']['rome_' + mode + '_surveys'] = campaign
        for lang in LANGUAGES:
            title = localized(source, lang, source['questionnaire']['title']).split(' – ')[0]
            campaigns['languages'].setdefault(lang, {})['#' + mode_name] = title
    campaigns['config_version'] = '0.5.0'
    for path, result in outputs.items():
        write(path, result)
    write(index_path, index)
    write(campaign_path, campaigns)
    write(ROOT / 'tools/survey-bundles/manifest.json', {'kind': 'survey-composition-provenance', 'sourceForms': len(old_ids), 'bundles': reports})
    print(json.dumps({'sourceForms': len(old_ids), 'bundles': len(reports), 'catalogueForms': len(index['questionnaires']), 'summary': reports}, ensure_ascii=False))


if __name__ == '__main__':
    main()
