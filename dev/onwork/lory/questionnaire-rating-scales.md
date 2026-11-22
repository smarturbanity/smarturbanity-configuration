# Rating scales and “Not applicable” in the SmartUrbanity questionnaires

Ordered questions now say how they are shown: 12 as stars, the others as numbered
points with every point's wording listed under the scale. Where a question may not concern the
respondent (per-mode surveys, mode-dependent street questions) it offers the
standard “Not applicable” answer (Italian “Non mi riguarda”); 20 questions replace their own “does not concern
me” option with it. `connection_clarity` is reversed to run from difficult to easy
and `trip_rating` drops the “(1)…(5)” suffix.

Changed questions and 29 forms advance to their next major version; Rome's
contribution workflows pin the new versions and the language verifier treats
“Not applicable” as a framework label. `versions.json` is unchanged: publish only
with a CityMaaS release that supports `answer_scale` and `add_not_applicable`.
Details and pending decisions are in
[the decision record](../../../docs/questionnaire-updates/2026-11-22-rating-scales.md).

Checks: language, bundle and response-choice verifiers pass against the CityMaaS
candidate; version bumps match its revision rule; the serializer reports no change.
