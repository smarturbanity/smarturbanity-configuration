# Car-use matrix and verified round30 corrections

Source: `round30`. Target: `main`.

The remaining questionnaire follow-up adds explicit hearing-accessibility,
step-free/rest options and a separate optional pushchair/mobility-support question.
It explains selection limits, makes outside-neighborhood reasons and transport
lighting skippable, clarifies feedback and translations, and points to the pilot
privacy notice. Lory confirmed 1A, 2A, 3A, 4B and 5A. Eight existing-language sets
and all prior answer keys/types/option values remain; forms have new versions.

All JSON and structural/localization checks pass, together with 12 isolated
actual-app checks, including conditional feedback and enlarged/mobile layouts.
See [all 39 finding dispositions](../../docs/round30_issue_dispositions.md).
These checks do not claim new persona acceptance or native browser-menu coverage.

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
