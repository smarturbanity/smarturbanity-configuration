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
