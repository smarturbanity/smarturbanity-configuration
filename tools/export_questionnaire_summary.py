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


UI_EN = {
    'Dati personali': 'Personal data',
    'Dati personali con cautela elevata': 'Heightened personal data',
    'Salute o disabilità': 'Health or disability',
    'Scelta singola': 'Single choice', 'Scelta multipla': 'Multiple choice',
    'Testo libero': 'Free text', 'Elenco': 'List', 'Tabella': 'Matrix',
    'Indirizzo / mappa': 'Address / map', 'Altro': 'Other',
    'Preferisco non rispondere': 'Prefer not to say', 'Nessuna di queste': 'None of these',
    'Non so': "I don't know", ' [esclusiva]': ' [exclusive]',
    ' [opzione standard]': ' [standard option]', ' oppure ': ' or ', ' e ': ' and ',
    'NON (': 'NOT (', 'Risposta presente a «': 'Answer provided for «',
    'diversa da ': 'different from ', '; E ': '; AND ',
    'Risposta libera scritta': 'Written free-text answer',
    'Selezione indirizzo e punto sulla mappa': 'Address and map location selection',
    ' Catalogo dinamico: ': ' Dynamic catalogue: ',
    ' [le righe di questo catalogo non sono definite nei file di configurazione correnti]':
        ' [this catalogue’s rows are not defined in the current configuration files]',
    '; solo attività associate al servizio tramite ': '; only activities associated with the service through ',
    'Righe: ': 'Rows: ', 'Colonna «': 'Column «',
    'Per creare il servizio serve almeno ': 'Creating the service requires at least ',
    ' attività disponibile. Eccezione al rifiuto confermata.': ' available activity. Confirmed exception to refusal.',
    'Categorie di attività; disponibili nel catalogo delle categorie del progetto':
        'Activity categories; available in the project category catalogue',
    'Tipi di servizio; il catalogo attuale è definitions/types/service_types.json':
        'Service types; the current catalogue is definitions/types/service_types.json',
    'Sottotipi del tipo di servizio selezionato; per Roma, pilots/rome/services.json':
        'Subtypes of the selected service type; for Rome, pilots/rome/services.json',
    'Elenco fornito dall’app': 'List supplied by the app',
    '\nL’elenco è filtrato dalla categoria scelta.': '\nThe list is filtered by the selected category.',
    '\nÈ mostrato solo l’elenco del tipo di servizio scelto.': '\nOnly the selected service type’s list is shown.',
    'Valori forniti dal catalogo o dal controllo dell’app': 'Values supplied by the catalogue or app control',
    'Sezione: ': 'Section: ', 'Domanda: ': 'Question: ',
    'Nell’app, l’elenco è filtrato dalla categoria di servizio selezionata.':
        'In the app, the list is filtered by the selected service category.',
    'Nell’app, l’elenco è filtrato dal tipo di servizio selezionato.':
        'In the app, the list is filtered by the selected service type.',
    'non dichiarata': 'not declared', 'Nessuna condizione interna dichiarata': 'No internal condition declared',
    'Sì': 'Yes', 'No': 'No', 'No / predefinito del visualizzatore': 'No / viewer default',
    'Campo generato dalla domanda precedente': 'Field generated from the preceding question',
    '. La prosecuzione si interrompe se ': '. The follow-up stops if ',
    'Questionario': 'Questionnaire', 'Domanda': 'Question', 'Tipo': 'Type',
    'Risposte previste': 'Available answers', 'Dipendenze': 'Dependencies', 'Privacy': 'Privacy',
    'Massimo: ': 'Maximum: ', 'Cerca': 'Search', 'Gruppo': 'Group', 'Tutti': 'All', 'Tutte': 'All',
    'Domanda, risposta o dipendenza': 'Question, answer or dependency',
    'Prosecuzione tra questionari nella galleria di Roma': 'Questionnaire follow-ups in the Rome gallery',
    'Scarica la tabella CSV completa con versioni e riferimenti': 'Download the full CSV table with versions and references',
    'Domande, risposte e privacy': 'Questions, answers and privacy',
    'Sezione': 'Section', 'Massimo risposte': 'Maximum answers',
    'Obbligatoria quando visibile': 'Required when visible', 'Flag privacy': 'Privacy flag',
    'Versione questionario': 'Questionnaire version', 'Versione domanda': 'Question version',
    'Riferimento': 'Reference',
}


def export(language):
    def ui(value):
        return UI_EN.get(value, value) if language == 'en' else value

    privacy_labels = {key: ui(value) for key, value in PRIVACY.items()}
    rows = []
    flow_notes = []
    campaigns = json.loads((ROOT / 'pilots/rome/survey_campaigns.json').read_text(encoding='utf-8'))['surveys_gallery']
    catalogs = {}
    for name in ('opportunities', 'opportunity_categories', 'service_types'):
        document = json.loads((ROOT / 'definitions/types' / (name + '.json')).read_text(encoding='utf-8'))
        dictionary = document.get('languages', {}).get(language, {})
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
            dictionary = languages.get(language, {})

            def translate(text):
                source = str(text or '')
                standard = {'Other': 'Altro', 'Prefer not to say': 'Preferisco non rispondere',
                            'None of these': 'Nessuna di queste', "I don't know": 'Non so'}
                fallback = source.lstrip('#')
                if language == 'it':
                    fallback = standard.get(fallback, fallback)
                return dictionary.get('#' + source.lstrip('#'), fallback)

            questions = [q for s in questionnaire['sections'] for q in section_questions(s)]
            by_key = {q.get('answer_key', q.get('question_id')): q for q in questions}

            def option_text(option):
                if isinstance(option, str):
                    return translate(option)
                text = translate(option.get('text', option.get('label', option.get('value', ''))))
                if option.get('exclusive'):
                    text += ui(' [esclusiva]')
                if option.get('privacy_classification'):
                    text += ' [privacy: ' + option['privacy_classification'] + ']'
                return text

            def condition(value):
                if not isinstance(value, dict):
                    return json.dumps(value, ensure_ascii=False)
                parts = []
                for key, expected in value.items():
                    if key in ('$all', '$any') and isinstance(expected, list):
                        connector = ui(' oppure ') if key == '$any' else ui(' e ')
                        parts.append('(' + connector.join(condition(item) for item in expected) + ')')
                        continue
                    if key == '$not':
                        parts.append(ui('NON (') + condition(expected) + ')')
                        continue
                    if key == '$answered':
                        parent = by_key.get(expected)
                        parts.append(ui('Risposta presente a «') + (translate(parent['text']) if parent else str(expected)) + '»')
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
                        answer = ui(' oppure ').join(labels.get(str(item), translate(item)) for item in choices)
                        parts.append('«' + title + '» ' + (ui('diversa da ') if negative else '= ') + answer)
                    else:
                        parts.append('«' + title + '»: ' + json.dumps(expected, ensure_ascii=False))
                return ui('; E ').join(parts)

            for section in questionnaire['sections']:
                for question in section_questions(section):
                    answers = [option_text(option) for option in question.get('options', [])]
                    for flag, label in [('add_other', 'Altro'), ('add_none', 'Nessuna di queste'),
                                        ('add_i_dont_know', 'Non so')]:
                        if question.get(flag):
                            answers.append(ui(label) + ui(' [opzione standard]'))
                    explicit_refusal = any(isinstance(o, dict) and o.get('text', '').lstrip('#').lower() == 'prefer not to say'
                                           for o in question.get('options', []))
                    refusal = bool(question.get('add_prefer_not_to_say') or explicit_refusal)
                    if question.get('add_prefer_not_to_say') and not explicit_refusal:
                        answers.append(ui('Preferisco non rispondere') + ui(' [esclusiva]'))
                    kind = question.get('question_type', question.get('type', ''))
                    if kind in ('text', 'textarea'):
                        answers.insert(0, ui('Risposta libera scritta'))
                    if kind == 'address':
                        answers.insert(0, ui('Selezione indirizzo e punto sulla mappa'))
                    if kind == 'matrix':
                        matrix_rows = question.get('rows', [])
                        row_text = ', '.join(option_text(item) for item in matrix_rows)
                        if question.get('row_source'):
                            row_text += ui(' Catalogo dinamico: ') + question['row_source']
                            if question['row_source'] in catalogs:
                                row_text += '\n' + '; '.join(catalogs[question['row_source']].values())
                            else:
                                row_text += ui(' [le righe di questo catalogo non sono definite nei file di configurazione correnti]')
                        if question.get('row_filter'):
                            rule = question['row_filter']
                            row_text += ui('; solo attività associate al servizio tramite ') + rule.get('mapping_source', '') + ' (' + rule.get('relation', '') + ')'
                        answers.insert(0, ui('Righe: ') + row_text.strip())
                        for column in question.get('columns', []):
                            answers.append(ui('Colonna «') + translate(column.get('label', column.get('key'))) + '»: '
                                           + '; '.join(option_text(o) for o in column.get('options', [])))
                        if section.get('min_available'):
                            answers.append(ui('Per creare il servizio serve almeno ') + str(section['min_available']) + ui(' attività disponibile. Eccezione al rifiuto confermata.'))
                    if kind == 'select' and not question.get('options'):
                        catalog = {'categoryId': 'Categorie di attività; disponibili nel catalogo delle categorie del progetto',
                                   'serviceTypeId': 'Tipi di servizio; il catalogo attuale è definitions/types/service_types.json',
                                   'serviceSubtype': 'Sottotipi del tipo di servizio selezionato; per Roma, pilots/rome/services.json'}
                        answers.insert(0, ui(catalog.get(question.get('answer_key'), 'Elenco fornito dall’app')))
                        if question.get('answer_key') == 'categoryId':
                            answers.append('; '.join(catalogs['opportunity_categories'].values()))
                        if question.get('answer_key') == 'serviceTypeId':
                            answers.append('; '.join(catalogs['service_types'].values()) + ui('\nL’elenco è filtrato dalla categoria scelta.'))
                        if question.get('answer_key') == 'serviceSubtype':
                            answers.append(subtype_answers + ui('\nÈ mostrato solo l’elenco del tipo di servizio scelto.'))
                    if not answers:
                        answers.append(ui('Valori forniti dal catalogo o dal controllo dell’app'))
                    dependencies = []
                    for owner, prefix in [(section, 'Sezione: '), (question, 'Domanda: ')]:
                        if owner.get('show_if'):
                            dependencies.append(ui(prefix) + condition(owner['show_if']))
                        if owner.get('condition'):
                            dependencies.append(ui(prefix) + str(owner['condition']))
                    if question.get('answer_key') == 'serviceTypeId':
                        dependencies.append(ui('Nell’app, l’elenco è filtrato dalla categoria di servizio selezionata.'))
                    if question.get('answer_key') == 'serviceSubtype':
                        dependencies.append(ui('Nell’app, l’elenco è filtrato dal tipo di servizio selezionato.'))
                    privacy = question.get('privacy_classification', questionnaire.get('privacy_classification', 'non dichiarata'))
                    rows.append({
                        'Gruppo': folder, 'Questionario': translate(questionnaire.get('title', questionnaire.get('name'))),
                        'Sezione': translate(section.get('title')), 'Domanda': translate(question['text']),
                        'Tipo': ui(TYPES.get(kind, kind)), 'Risposte previste': '\n'.join(answers),
                        'Massimo risposte': question.get('max_answers', ''),
                        'Dipendenze': '\n'.join(dependencies) or ui('Nessuna condizione interna dichiarata'),
                        'Obbligatoria quando visibile': ui('Sì' if question.get('required') is True else 'No / predefinito del visualizzatore'),
                        'Privacy': privacy_labels.get(privacy, ui(privacy)), 'Flag privacy': privacy,
                        'Preferisco non rispondere': ui('Sì' if refusal else 'No'),
                        'Versione questionario': questionnaire.get('questionnaire_version'),
                        'Versione domanda': ui(question.get('question_version')),
                        'Riferimento': path.relative_to(ROOT).as_posix() + '#' + question.get('answer_key', question.get('question_id', '')),
                    })
            next_id = campaigns.get('follow_ups', {}).get(questionnaire.get('questionnaire_id'))
            if next_id:
                note = translate(questionnaire.get('title', questionnaire.get('name'))) + ' → ' + next_id
                stop = campaigns.get('follow_up_stop_when', {}).get(questionnaire['questionnaire_id'])
                if stop:
                    note += ui('. La prosecuzione si interrompe se ') + condition(stop)
                flow_notes.append(note)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    output = OUTPUT if language == 'it' else OUTPUT.with_name(OUTPUT.name + '-en')
    with output.with_suffix('.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=[ui(key) for key in rows[0]], delimiter=';')
        writer.writeheader()
        writer.writerows({ui(key): value for key, value in row.items()} for row in rows)
    headers = ['Questionario', 'Domanda', 'Tipo', 'Risposte previste', 'Dipendenze', 'Privacy', 'Preferisco non rispondere']
    table_rows = []
    for index, row in enumerate(rows, 1):
        displayed = dict(row)
        displayed['Domanda'] = row['Domanda'] + '\n(' + row['Sezione'] + ')'
        if row['Massimo risposte']:
            displayed['Tipo'] += '\n' + ui('Massimo: ') + str(row['Massimo risposte'])
        cells = ''.join('<td>' + html.escape(str(displayed[key])).replace('\n', '<br>') + '</td>' for key in headers)
        table_rows.append('<tr data-group="' + row['Gruppo'] + '" data-questionnaire="' + html.escape(row['Riferimento'].split('#')[0], quote=True) + '" data-privacy="' + row['Flag privacy'] + '"><td>' + str(index) + '</td>' + cells + '</tr>')
    stats = collections.Counter(row['Flag privacy'] for row in rows)
    title = 'SmartUrbanity — ' + ui('Domande, risposte e privacy')
    page = '<!doctype html><html lang="' + language + '"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + title + '</title>'
    page += '''<style>
body{font:15px system-ui,sans-serif;margin:24px;color:#172b3a;background:#f6f8fb}h1{font-size:26px}p{max-width:1100px;line-height:1.5}.filters{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}input,select{font:inherit;padding:10px;border:1px solid #94a3b8;border-radius:6px}input{min-width:300px}.scroll{overflow:auto;max-height:75vh;background:white;border:1px solid #cbd5e1}table{border-collapse:collapse;width:100%;font-size:13px}th{position:sticky;top:0;background:#173f53;color:white;text-align:left;z-index:1}td,th{padding:10px;border:1px solid #d6dfe8;vertical-align:top}td:nth-child(2){min-width:110px}td:nth-child(3){min-width:200px}td:nth-child(5){min-width:280px}td:nth-child(6){min-width:200px}td:nth-child(7){min-width:130px}tr:nth-child(even){background:#f0f5f9}[hidden]{display:none}a{color:#075985}@media print{.filters{display:none}.scroll{max-height:none;overflow:visible}th{position:static}body{margin:0}table{font-size:9px}}
</style>'''
    page += '<label>Lingua / Language <select id="language"><option value="it"' + (' selected' if language == 'it' else '') + '>Italiano</option><option value="en"' + (' selected' if language == 'en' else '') + '>English</option></select></label><h1>' + title + '</h1>'
    if language == 'it':
        intros = [
            '473 domande e campi in 32 questionari: 469 domande dichiarate e 4 campi condizionali “Altro”. La tabella include anche la sottocartella future; la sua inclusione non attiva il questionario nell’app.',
            'Tutte le domande sono obbligatorie quando compaiono. Le dipendenze di sezione e domanda si sommano. Le opzioni “Altro”, “Nessuna di queste” e “Non so” sono riportate quando abilitate. I cataloghi dinamici possono variare in base al progetto e al luogo. I limiti assenti indicano che il file non ne dichiara uno.',
            'Le classi sono metadati: da sole non raccolgono consenso, limitano l’accesso o oscurano le esportazioni. Le classi preesistenti sono mantenute.',
            '“Preferisco non rispondere” è previsto per le classi elevate e salute, con una sola eccezione confermata: per creare un servizio occorre dichiarare almeno un’attività disponibile. Restano anche le opzioni di rifiuto già presenti sulle altre domande. Per testo libero e tabelle occorre il supporto applicativo coordinato con questa modifica. Le condizioni negate sono riportate come dichiarate: il trattamento di risposte mancanti o rifiutate dipende dal motore dell’app.',
        ]
    else:
        intros = [
            '473 questions and fields in 32 questionnaires: 469 authored questions and 4 conditional “Other” fields. The table includes the future subfolder; including it here does not activate the questionnaire in the app.',
            'All questions are required when shown. Section and question dependencies apply together. “Other”, “None of these” and “I don’t know” are listed when enabled. Dynamic catalogues may vary by project and location. An absent limit means the file does not specify one.',
            'Privacy classes are metadata: by themselves they do not collect consent, restrict access or redact exports. Existing classes are preserved.',
            '“Prefer not to say” is offered for heightened personal and health questions, with one confirmed exception: creating a service requires at least one available activity. Existing refusal choices on other questions are preserved. Free-text and matrix refusal requires the coordinated application update. Negative conditions are shown as declared: the app engine determines how missing or declined answers are treated.',
        ]
    intros[2] = 'Privacy: ' + '; '.join(privacy_labels.get(k, k) + ': ' + str(v) for k, v in stats.items()) + '. ' + intros[2]
    page += ''.join('<p>' + html.escape(paragraph) + '</p>' for paragraph in intros)
    page += '<p><a href="' + output.with_suffix('.csv').name + '">' + ui('Scarica la tabella CSV completa con versioni e riferimenti') + '</a></p>'
    page += '<details><summary>' + ui('Prosecuzione tra questionari nella galleria di Roma') + '</summary><ul>' + ''.join('<li>' + html.escape(note) + '</li>' for note in flow_notes) + '</ul></details>'
    questionnaire_options = {row['Riferimento'].split('#')[0]: row['Questionario'] for row in rows}
    page += '<div class="filters"><label>' + ui('Cerca') + ' <input id="search" type="search" placeholder="' + ui('Domanda, risposta o dipendenza') + '"></label><label>' + ui('Gruppo') + ' <select id="group"><option value="">' + ui('Tutti') + '</option>' + ''.join('<option>' + folder + '</option>' for folder in FOLDERS) + '</select></label><label>' + ui('Questionario') + ' <select id="questionnaire"><option value="">' + ui('Tutti') + '</option>' + ''.join('<option value="' + html.escape(key, quote=True) + '">' + html.escape(value) + '</option>' for key, value in sorted(questionnaire_options.items(), key=lambda item: item[1])) + '</select></label><label>Privacy <select id="privacy"><option value="">' + ui('Tutte') + '</option>' + ''.join('<option value="' + k + '">' + v + '</option>' for k, v in privacy_labels.items()) + '</select></label><output id="count"></output></div>'
    page += '<div class="scroll"><table><thead><tr><th>N.</th>' + ''.join('<th>' + html.escape(ui(key)) + '</th>' for key in headers) + '</tr></thead><tbody>' + ''.join(table_rows) + '</tbody></table></div>'
    print(json.dumps({'language': language, 'forms': len({r['Riferimento'].split('#')[0] for r in rows}), 'questions': len(rows),
                      'privacy': stats, 'refusal': sum(r['Preferisco non rispondere'] == ui('Sì') for r in rows)}))
    return page


def write_bilingual_page(italian, english):
    head, italian_body = italian.split('</style>', 1)
    english_body = english.split('</style>', 1)[1]
    page = head + '</style><main id="report">' + italian_body + '</main>'
    page += '<template id="content-it">' + italian_body + '</template><template id="content-en">' + english_body + '</template>'
    page += '''<script>
const report = document.getElementById('report');
const controlIds = ['search', 'group', 'questionnaire', 'privacy'];
function activate(language, values) {
  document.documentElement.lang = language;
  report.replaceChildren(document.getElementById('content-' + language).content.cloneNode(true));
  document.title = report.querySelector('h1').textContent;
  const controls = Object.fromEntries(controlIds.map(id => [id, report.querySelector('#' + id)]));
  for (const id of controlIds) controls[id].value = values[id] || '';
  const rows = [...report.querySelectorAll('tbody tr')];
  function filter() {
    let shown = 0;
    const text = controls.search.value.toLocaleLowerCase(language);
    for (const row of rows) {
      row.hidden = !!((controls.group.value && row.dataset.group !== controls.group.value)
        || (controls.questionnaire.value && row.dataset.questionnaire !== controls.questionnaire.value)
        || (controls.privacy.value && row.dataset.privacy !== controls.privacy.value)
        || !row.textContent.toLocaleLowerCase(language).includes(text));
      if (!row.hidden) shown++;
    }
    report.querySelector('#count').textContent = shown + (language === 'it' ? ' domande' : ' questions');
  }
  for (const control of Object.values(controls)) control.addEventListener('input', filter);
  report.querySelector('#language').addEventListener('change', event => {
    const saved = Object.fromEntries(controlIds.map(id => [id, controls[id].value]));
    activate(event.target.value, saved);
  });
  filter();
}
const params = new URLSearchParams(location.search);
activate(params.get('lang') === 'en' ? 'en' : 'it', Object.fromEntries(params));
</script></html>'''
    OUTPUT.with_suffix('.html').write_text(page, encoding='utf-8')


if __name__ == '__main__':
    write_bilingual_page(export('it'), export('en'))
