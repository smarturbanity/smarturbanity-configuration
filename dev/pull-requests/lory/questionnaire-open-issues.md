# Simplify mobility help and use neutral Italian wording

Source: lory/questionnaire-open-issues. Target: main.

Shorten mobility-limitation help in all eight languages while retaining the
distinction between the respondent and people they assist. Remove paired gender
wording from two Italian trip-purpose answers and old age as the household
assistance example. Preserve gender choices and stored answer contracts.

Record approved dispositions separately from historical persona results; do not
claim a new user test or reclassify the dashboard through this change.

Validation: four JSON files; no new missing translation keys in eight languages;
unchanged options, values, conditions and required flags; git diff --check.

Not included: profile repetition/scheduling implementation (decision 1A), new
persona acceptance, deployment and results-library import.

Decisions 12A–16A: add an explicit missing audible-crossing-signal option; explain
that road-user answers concern concrete behaviour; clarify public-transport-only
transfers; simplify Italian economic-situation wording. Preserve distinct current
measurements and existing answer values. Seven further forms pass JSON, option,
condition and eight-language addition checks.

17A–46A: explicitly allow skipping personal vehicle-use answers and clarify car
availability separately from using motorcycles/scooters. Technical source audit
supports 23 exact historical dispositions and leaves 7 cumulative/experiential
reports uncertain. Feedback and survey introductions have eight-language coverage.
No historical study outcome or accepted privacy decision is rewritten.
The separate private-library import is complete: 23 technical passes and seven
partial checks, reducing active opens from 46 to 23. The local live dashboard
serves the activated release (HTTP 200, matching release hash). Configuration
verification target: d136e9baf1d3c7516ce33c2b6ed279e70e188ee3.

Final clarification: explicitly ask about crowding aboard/at the stop and use a
neutral midpoint in all eight languages. Preserve answer values and conditions.
Readiness records separate the next definition simulation from application
persistence/scheduling acceptance. The previous 58-file collection is withheld:
19 files were scripted, and nested introduction/final pages were not presented.

Final focused validation: all 73 catalogue JSON forms parse and exist; eight
updated translations have matching keys; stored options, conditions, other
questions and privacy pages are unchanged; `git diff --check` passes. This
repository declares no aggregate verification runner. No app/browser readiness
or new persona acceptance is claimed by these source checks.
