"""Export the current runtime questions; run with Python 3, no dependencies."""
import collections
import csv
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'docs' / 'questionnaire-response-summary'
FOLDERS = ('surveys', 'tripSurveys', 'locationReports')
PRIVACY = {
    'personal_data': 'Dati personali',
    'heightened_personal': 'Dati personali con cautela elevata',
    'special_category_health': 'Salute o disabilità',
}
TYPES = {'single_option': 'Scelta singola', 'multiple_options': 'Scelta multipla',
         'text': 'Testo libero', 'textarea': 'Testo libero', 'select': 'Elenco',
         'matrix': 'Tabella', 'address': 'Indirizzo / mappa'}


def section_questions(section):
    for question in section.get('questions', []):
        yield question
        config = question.get('other_input')
        if not question.get('add_other') or not config or config.get('enabled') is False:
            continue
        yield {
            'text': config.get('text', 'Please specify other'),
            'answer_key': config.get('answer_key', question['answer_key'] + '_other'),
            'question_type': config.get('type', config.get('question_type', 'textarea')),
            'required': config.get('required') is not False,
            'add_prefer_not_to_say': config.get('add_prefer_not_to_say') is True,
            'privacy_classification': config.get('privacy_classification', question.get('privacy_classification')),
            'show_if': {'$all': [question.get('show_if', {}), {question['answer_key']: 'Other'}]},
            'question_version': 'Campo generato dalla domanda precedente',
        }


def export():
    rows = []
    flow_notes = []
    campaigns = json.loads((ROOT / 'pilots/rome/survey_campaigns.json').read_text(encoding='utf-8'))['surveys_gallery']
    catalogs = {}
    for name in ('opportunities', 'opportunity_categories', 'service_types'):
        document = json.loads((ROOT / 'definitions/types' / (name + '.json')).read_text(encoding='utf-8'))
        dictionary = document.get('languages', {}).get('it', {})
        catalogs[name] = {option['id']: dictionary.get('#' + option['title'], option['title']) for option in document['options']}
    subtype_data = json.loads((ROOT / 'pilots/rome/services.json').read_text(encoding='utf-8'))['datasets']['service_subtypes']['default_subtypes']
    subtype_answers = '\n'.join(catalogs['service_types'].get(key, key) + ': ' + ', '.join(values) for key, values in subtype_data.items())
    for folder in FOLDERS:
        for path in sorted((ROOT / 'forms' / folder).rglob('*.json')):
            document = json.loads(path.read_text(encoding='utf-8'))
            questionnaire = document.get('questionnaire')
            if not questionnaire:
                continue
            languages = document.get('languages', {})
            italian = languages.get('it', {})

            def translate(text):
                source = str(text or '')
                standard = {'Other': 'Altro', 'Prefer not to say': 'Preferisco non rispondere',
                            'None of these': 'Nessuna di queste', "I don't know": 'Non so'}
                return italian.get('#' + source.lstrip('#'), standard.get(source.lstrip('#'), source.lstrip('#')))

            questions = [q for s in questionnaire['sections'] for q in section_questions(s)]
            by_key = {q.get('answer_key', q.get('question_id')): q for q in questions}

            def option_text(option):
                if isinstance(option, str):
                    return translate(option)
                text = translate(option.get('text', option.get('label', option.get('value', ''))))
                if option.get('exclusive'):
                    text += ' [esclusiva]'
                if option.get('privacy_classification'):
                    text += ' [privacy: ' + option['privacy_classification'] + ']'
                return text

            def condition(value):
                if not isinstance(value, dict):
                    return json.dumps(value, ensure_ascii=False)
                parts = []
                for key, expected in value.items():
                    if key in ('$all', '$any') and isinstance(expected, list):
                        connector = ' oppure ' if key == '$any' else ' e '
                        parts.append('(' + connector.join(condition(item) for item in expected) + ')')
                        continue
                    if key == '$not':
                        parts.append('NON (' + condition(expected) + ')')
                        continue
                    if key == '$answered':
                        parent = by_key.get(expected)
                        parts.append('Risposta presente a «' + (translate(parent['text']) if parent else str(expected)) + '»')
                        continue
                    parent = by_key.get(key)
                    title = translate(parent['text']) if parent else key
                    options = parent.get('options', []) if parent else []
                    labels = {str(o.get('value', o.get('text'))): option_text(o)
                              for o in options if isinstance(o, dict)}
                    negative = isinstance(expected, dict) and 'not' in expected
                    choices = expected['not'] if negative else expected
                    if isinstance(choices, (str, int, float, bool)):
                        choices = [choices]
                    if isinstance(choices, list):
                        answer = ' oppure '.join(labels.get(str(item), translate(item)) for item in choices)
                        parts.append('«' + title + '» ' + ('diversa da ' if negative else '= ') + answer)
                    else:
                        parts.append('«' + title + '»: ' + json.dumps(expected, ensure_ascii=False))
                return '; E '.join(parts)

            for section in questionnaire['sections']:
                for question in section_questions(section):
                    answers = [option_text(option) for option in question.get('options', [])]
                    for flag, label in [('add_other', 'Altro'), ('add_none', 'Nessuna di queste'),
                                        ('add_i_dont_know', 'Non so')]:
                        if question.get(flag):
                            answers.append(label + ' [opzione standard]')
                    explicit_refusal = any(isinstance(o, dict) and o.get('text', '').lstrip('#').lower() == 'prefer not to say'
                                           for o in question.get('options', []))
                    refusal = bool(question.get('add_prefer_not_to_say') or explicit_refusal)
                    if question.get('add_prefer_not_to_say') and not explicit_refusal:
                        answers.append('Preferisco non rispondere [esclusiva]')
                    kind = question.get('question_type', question.get('type', ''))
                    if kind in ('text', 'textarea'):
                        answers.insert(0, 'Risposta libera scritta')
                    if kind == 'address':
                        answers.insert(0, 'Selezione indirizzo e punto sulla mappa')
                    if kind == 'matrix':
                        matrix_rows = question.get('rows', [])
                        row_text = ', '.join(option_text(item) for item in matrix_rows)
                        if question.get('row_source'):
                            row_text += ' Catalogo dinamico: ' + question['row_source']
                            if question['row_source'] in catalogs:
                                row_text += '\n' + '; '.join(catalogs[question['row_source']].values())
                            else:
                                row_text += ' [le righe di questo catalogo non sono definite nei file di configurazione correnti]'
                        if question.get('row_filter'):
                            rule = question['row_filter']
                            row_text += '; solo attività associate al servizio tramite ' + rule.get('mapping_source', '') + ' (' + rule.get('relation', '') + ')'
                        answers.insert(0, 'Righe: ' + row_text.strip())
                        for column in question.get('columns', []):
                            answers.append('Colonna «' + translate(column.get('label', column.get('key'))) + '»: '
                                           + '; '.join(option_text(o) for o in column.get('options', [])))
                        if section.get('min_available'):
                            answers.append('Per creare il servizio serve almeno ' + str(section['min_available']) + ' attività disponibile. Eccezione al rifiuto confermata.')
                    if kind == 'select' and not question.get('options'):
                        catalog = {'categoryId': 'Categorie di attività; disponibili nel catalogo delle categorie del progetto',
                                   'serviceTypeId': 'Tipi di servizio; il catalogo attuale è definitions/types/service_types.json',
                                   'serviceSubtype': 'Sottotipi del tipo di servizio selezionato; per Roma, pilots/rome/services.json'}
                        answers.insert(0, catalog.get(question.get('answer_key'), 'Elenco fornito dall’app'))
                        if question.get('answer_key') == 'categoryId':
                            answers.append('; '.join(catalogs['opportunity_categories'].values()))
                        if question.get('answer_key') == 'serviceTypeId':
                            answers.append('; '.join(catalogs['service_types'].values()) + '\nL’elenco è filtrato dalla categoria scelta.')
                        if question.get('answer_key') == 'serviceSubtype':
                            answers.append(subtype_answers + '\nÈ mostrato solo l’elenco del tipo di servizio scelto.')
                    if not answers:
                        answers.append('Valori forniti dal catalogo o dal controllo dell’app')
                    dependencies = []
                    for owner, prefix in [(section, 'Sezione: '), (question, 'Domanda: ')]:
                        if owner.get('show_if'):
                            dependencies.append(prefix + condition(owner['show_if']))
                        if owner.get('condition'):
                            dependencies.append(prefix + str(owner['condition']))
                    if question.get('answer_key') == 'serviceTypeId':
                        dependencies.append('Nell’app, l’elenco è filtrato dalla categoria di servizio selezionata.')
                    if question.get('answer_key') == 'serviceSubtype':
                        dependencies.append('Nell’app, l’elenco è filtrato dal tipo di servizio selezionato.')
                    privacy = question.get('privacy_classification', questionnaire.get('privacy_classification', 'non dichiarata'))
                    rows.append({
                        'Gruppo': folder, 'Questionario': translate(questionnaire.get('title', questionnaire.get('name'))),
                        'Sezione': translate(section.get('title')), 'Domanda': translate(question['text']),
                        'Tipo': TYPES.get(kind, kind), 'Risposte previste': '\n'.join(answers),
                        'Massimo risposte': question.get('max_answers', ''),
                        'Dipendenze': '\n'.join(dependencies) or 'Nessuna condizione interna dichiarata',
                        'Obbligatoria quando visibile': 'Sì' if question.get('required') is True else 'No / predefinito del visualizzatore',
                        'Privacy': PRIVACY.get(privacy, privacy), 'Flag privacy': privacy,
                        'Preferisco non rispondere': 'Sì' if refusal else 'No',
                        'Versione questionario': questionnaire.get('questionnaire_version'),
                        'Versione domanda': question.get('question_version'),
                        'Riferimento': path.relative_to(ROOT).as_posix() + '#' + question.get('answer_key', question.get('question_id', '')),
                    })
            next_id = campaigns.get('follow_ups', {}).get(questionnaire.get('questionnaire_id'))
            if next_id:
                note = translate(questionnaire.get('title', questionnaire.get('name'))) + ' → ' + next_id
                stop = campaigns.get('follow_up_stop_when', {}).get(questionnaire['questionnaire_id'])
                if stop:
                    note += '. La prosecuzione si interrompe se ' + condition(stop)
                flow_notes.append(note)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.with_suffix('.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]), delimiter=';')
        writer.writeheader()
        writer.writerows(rows)
    headers = ['Questionario', 'Domanda', 'Tipo', 'Risposte previste', 'Dipendenze', 'Privacy', 'Preferisco non rispondere']
    table_rows = []
    for index, row in enumerate(rows, 1):
        displayed = dict(row)
        displayed['Domanda'] = row['Domanda'] + '\n(' + row['Sezione'] + ')'
        if row['Massimo risposte']:
            displayed['Tipo'] += '\nMassimo: ' + str(row['Massimo risposte'])
        cells = ''.join('<td>' + html.escape(str(displayed[key])).replace('\n', '<br>') + '</td>' for key in headers)
        table_rows.append('<tr data-group="' + row['Gruppo'] + '" data-questionnaire="' + html.escape(row['Riferimento'].split('#')[0], quote=True) + '" data-privacy="' + row['Flag privacy'] + '"><td>' + str(index) + '</td>' + cells + '</tr>')
    stats = collections.Counter(row['Flag privacy'] for row in rows)
    page = '''<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>SmartUrbanity — Domande, risposte e privacy</title><style>
body{font:15px system-ui,sans-serif;margin:24px;color:#172b3a;background:#f6f8fb}h1{font-size:26px}p{max-width:1100px;line-height:1.5}.filters{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}input,select{font:inherit;padding:10px;border:1px solid #94a3b8;border-radius:6px}input{min-width:300px}.scroll{overflow:auto;max-height:75vh;background:white;border:1px solid #cbd5e1}table{border-collapse:collapse;width:100%;font-size:13px}th{position:sticky;top:0;background:#173f53;color:white;text-align:left;z-index:1}td,th{padding:10px;border:1px solid #d6dfe8;vertical-align:top}td:nth-child(2){min-width:110px}td:nth-child(3){min-width:200px}td:nth-child(5){min-width:280px}td:nth-child(6){min-width:200px}td:nth-child(7){min-width:130px}tr:nth-child(even){background:#f0f5f9}[hidden]{display:none}a{color:#075985}@media print{.filters{display:none}.scroll{max-height:none;overflow:visible}th{position:static}body{margin:0}table{font-size:9px}}
</style><h1>SmartUrbanity — Domande, risposte e privacy</h1>'''
    page += '<p>' + str(len(rows)) + ' domande e campi in ' + str(len({r['Riferimento'].split('#')[0] for r in rows})) + ' questionari: 469 domande dichiarate e 4 campi condizionali “Altro”. La tabella include anche la sottocartella future; la sua inclusione non attiva il questionario nell’app.</p>'
    page += '<p>Tutte le domande sono obbligatorie quando compaiono. Le dipendenze di sezione e domanda si sommano. Le opzioni “Altro”, “Nessuna di queste” e “Non so” sono riportate quando abilitate. I cataloghi dinamici possono variare in base al progetto e al luogo. I limiti assenti indicano che il file non ne dichiara uno.</p>'
    page += '<p>Privacy: ' + '; '.join(PRIVACY.get(k, k) + ': ' + str(v) for k, v in stats.items()) + '. Le classi sono metadati: da sole non raccolgono consenso, limitano l’accesso o oscurano le esportazioni. Le classi preesistenti sono mantenute.</p>'
    page += '<p>“Preferisco non rispondere” è previsto per le classi elevate e salute, con una sola eccezione confermata: per creare un servizio occorre dichiarare almeno un’attività disponibile. Restano anche le opzioni di rifiuto già presenti sulle altre domande. Per testo libero e tabelle occorre il supporto applicativo coordinato con questa modifica. Le condizioni negate sono riportate come dichiarate: il trattamento di risposte mancanti o rifiutate dipende dal motore dell’app.</p>'
    page += '<p><a href="questionnaire-response-summary.csv">Scarica la tabella CSV completa con versioni e riferimenti</a></p>'
    page += '<details><summary>Prosecuzione tra questionari nella galleria di Roma</summary><ul>' + ''.join('<li>' + html.escape(note) + '</li>' for note in flow_notes) + '</ul></details>'
    questionnaire_options = {row['Riferimento'].split('#')[0]: row['Questionario'] for row in rows}
    page += '<div class="filters"><label>Cerca <input id="search" type="search" placeholder="Domanda, risposta o dipendenza"></label><label>Gruppo <select id="group"><option value="">Tutti</option>' + ''.join('<option>' + folder + '</option>' for folder in FOLDERS) + '</select></label><label>Questionario <select id="questionnaire"><option value="">Tutti</option>' + ''.join('<option value="' + html.escape(key, quote=True) + '">' + html.escape(value) + '</option>' for key, value in sorted(questionnaire_options.items(), key=lambda item: item[1])) + '</select></label><label>Privacy <select id="privacy"><option value="">Tutte</option>' + ''.join('<option value="' + k + '">' + v + '</option>' for k, v in PRIVACY.items()) + '</select></label><output id="count"></output></div>'
    page += '<div class="scroll"><table><thead><tr><th>N.</th>' + ''.join('<th>' + html.escape(key) + '</th>' for key in headers) + '</tr></thead><tbody>' + ''.join(table_rows) + '</tbody></table></div>'
    page += '''<script>
const rows = [...document.querySelectorAll('tbody tr')];
const search = document.getElementById('search'), group = document.getElementById('group'), questionnaire = document.getElementById('questionnaire'), privacy = document.getElementById('privacy');
function filter(){let shown=0;const text=search.value.toLocaleLowerCase('it');for(const row of rows){row.hidden=!!((group.value&&row.dataset.group!==group.value)||(questionnaire.value&&row.dataset.questionnaire!==questionnaire.value)||(privacy.value&&row.dataset.privacy!==privacy.value)||!row.textContent.toLocaleLowerCase('it').includes(text));if(!row.hidden)shown++;}document.getElementById('count').textContent=shown+' domande';}
for(const control of [search,group,questionnaire,privacy])control.addEventListener('input',filter);filter();
</script></html>'''
    OUTPUT.with_suffix('.html').write_text(page, encoding='utf-8')
    print(json.dumps({'forms': len({r['Riferimento'].split('#')[0] for r in rows}), 'questions': len(rows),
                      'privacy': stats, 'refusal': sum(r['Preferisco non rispondere'] == 'Sì' for r in rows)}))


if __name__ == '__main__':
    export()
