# Simplify questionnaires and separate optional mobility support

Walking directions now offer a distinct answer when the available signs are not
accessible, instead of requiring the person to say they do not use signs. The
source and composed questionnaire include eight translations; existing answers
and conditions are preserved. Hungarian/Persian welcome review required no text
change. Obsolete Safety/Daily Travel subclaims are separated from unresolved
current acceptance in the follow-up record. Bundle/model regressions pass.

Location reports now ask about mobility aids and strollers separately from the
journey context. The support question is optional and includes a refusal option;
the two form versions advance to 5.0.0 to preserve the meaning of historical
answers. Actual model/condition checks cover refusal options, broken-light paths
and question ordering. Eight translations are present; full language and browser
acceptance remain separate. See docs/open-report-follow-up-2026-11-09.md.

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

Mode questionnaires are now grouped into 16 coherent sectioned surveys with
4–5 declared minutes each. The 16 current forms are the only maintained source;
the 51 small forms and their composition builder/specifications are removed.
History remains in Git. The catalogue and campaigns reference the current forms.
The 258 questions retain their meaning, IDs and answer values. Weekly non-use
now skips later details and sections in the first bundle and ends the follow-up.
Profile, trip pairs and location reports remain separate. Eight-language topic
lists preserve privacy36months; explicit short-label normalization prevents
translation collisions. Actual QuestionnaireConditions.js checks pass for full
coverage, contract preservation, conditional order and campaign targets. See
docs/sectioned-surveys.md for estimates, direct editing and acceptance boundaries.

Cleanup validation: all 16 active JSON files remain byte-identical. The current
verifier passes for 16 questionnaires, 51 sections, 258 questions and eight languages.
Four regression checks pass, including rejection of a reintroduced small form,
a missing question and a broken non-user section gate. No compatibility layer,
campaign activation or remote push is added.

Follow-up: each of the 20 current surveys now has a distinct topic-specific SVG;
welcome image links and translated title alternatives are updated. Question
sections, answers and dictionaries are unchanged. Old unreferenced illustrations
are removed. The separate section inventory is also removed at Lory's request;
the verifier reads the active catalogue and forms directly. SVG checks and visual
contact-sheet review pass; no new app-flow or participant acceptance is claimed.
