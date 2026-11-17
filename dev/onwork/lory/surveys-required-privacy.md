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
The self-contained HTML includes Italian and English content from the existing
language dictionaries and source texts. Switching language preserves the filters;
both language directions, translated headings/answers and English search pass
in Chrome. Separate Italian and English CSV files are generated.

Existing test expectations that declared travel load and mobility support optional
were deliberately updated to mandatory with explicit refusal, matching the new
user requirement; their exclusivity and conditional checks remain intact.

## Coordinated application change

Text, textarea, generated Other and matrix refusal require the coordinated CityMaaS
candidate `lory/app-ritocchi-dev-release`, which includes the application support.
Configuration-only publication cannot claim those interactions are ready in an
older application. No deployment or change to the protected base is part of this task.

## Independent readiness review (2026-11-17)

Review of the three task commits through `06fae5d` found no concrete defect requiring
a code change. An independent read-only review confirmed the required/refusal
policy, the service-creation exception and the summary exporter boundaries.

Checks against the coordinated application consumer passed: all six survey-bundle
regressions, framework language ownership, trip-company selection and location
context. The 19 survey SVG assets passed their maintained validation. A fresh
structural check confirmed 32 forms, 469 required authored questions and four
required generated Other fields. Sensitive questions offer refusal apart from the
approved service-creation activity matrix.

Regenerating the HTML and both CSV files left the tracked tree unchanged. Both
exports contain 473 rows, including 318 refusal-capable fields. A local Playwright
check passed combined group/questionnaire/privacy filters, unmatched search,
switching in both language directions and preservation of active selections and
search, with no browser errors. These are configuration and summary checks, not a
new full application E2E acceptance run or a legal review of privacy handling.

The historical pilot-migration verifier is not a general gate for this branch:
it invokes the current consumer without its required application config type and
permits only one form change relative to its historical migration baseline.
That check fails and was not weakened or presented as passing. The relevant
questionnaire, language, asset and summary checks above pass.
