# Car-use matrix and verified round30 corrections

Source: `round30`. Target: `main`.

People select car uses and fill frequency and alternative only for those uses.
"None of these" is an exclusive answer with no columns. All 18 uses and eight
languages remain. The form is 3.2.0 and the question is 1.1.0; historical answers
keep their original format.

The matching app renderer and questionnaire regression fixes are collected in
CityMaaS `round30`; clickable issue details are in Wemo Experiments `round30`.
Each repository retains only its own code.

The matrix passes 14 isolated actual-app browser checks. All five questionnaire
browser scenarios and final aggregate PR checks pass. The dashboard passes 42
checks plus an actual-browser mouse/keyboard/mobile check. No live response writes,
new persona study, pin change or push is included.

See [the completed-corrections record](../../docs/round30_resolved.md) for versions,
verification and remaining limits.
