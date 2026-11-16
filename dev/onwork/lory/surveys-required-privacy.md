# Mandatory visible questions and explicit refusal

## Scope and decisions

All questionnaires recursively under surveys, tripSurveys and locationReports:
32 forms, 469 authored questions and four generated Other text fields. Every
visible question requires an answer. Heightened personal and health questions
offer Prefer not to say, preserving existing refusal choices on ordinary personal
questions. The user explicitly excepted the opportunity matrix during service
creation: at least one available activity is still required. The separate
opportunity-report form continues to offer refusal.

Privacy labels, response keys, ordinary options, conditions, campaign activation,
and section constraints are preserved. Question and questionnaire minor versions
advance for the changed interaction contract. Welcome instructions and formerly
optional field labels reflect the new requirement in their existing languages.

## Deliverable and evidence

`tools/export_questionnaire_summary.py` generates the HTML and CSV summaries in
`docs/questionnaire-response-summary.*`, including section and question conditions,
generated Other fields, current service/opportunity catalogues, and Rome follow-ups.
The car matrix refers to `car_need_uses`, whose rows are not defined in this
configuration checkout; the summary explicitly marks that unavailable catalogue.
No historical rows are presented as current answers.

The six survey-bundle regressions, framework language ownership, trip-company
selection and location-context conditions pass against the actual CityMaaS code.
A structural comparison confirms retained privacy, ordinary options, keys and
conditions, required flags, refusal coverage with the agreed exception, and all
473 summary rows. The HTML opens in Chrome; group, individual questionnaire,
privacy and text filters pass independently and in combination.

Existing test expectations that declared travel load and mobility support optional
were deliberately updated to mandatory with explicit refusal, matching the new
user requirement; their exclusivity and conditional checks remain intact.

## Coordinated application change

Text, textarea, generated Other and matrix refusal require the coordinated CityMaaS
candidate `lory/questionnaire-refusal-fields`. Configuration-only publication cannot
claim those interactions are ready in an older application. Application verification
and independent review are being completed by the coordinator. No deployment or
change to the protected base is part of this task.
