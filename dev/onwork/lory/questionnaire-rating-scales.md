# Rating scales and “Not applicable” in the SmartUrbanity questionnaires

Scale questions now say what kind of scale they are, Likert (95, symmetric around a
neutral middle) or ordered (139, an amount that only grows), and separately how they
are drawn: 12 Likert judgements as stars, the others as numbered points with every
point's wording listed under the scale. Where a question may not concern the
respondent (per-mode surveys, mode-dependent street questions) it offers the
standard “Not applicable” answer (Italian “Non mi riguarda”); 37 questions replace their own “does not concern
me” option with it. `connection_clarity` is reversed to run from difficult to easy
and `trip_rating` drops the “(1)…(5)” suffix.

Mixed feeling and behaviour scales become single intensity or confidence scales,
double questions are split, ordered answers get distinct steps, the improvement
proposal asks for several kinds, and usual mode, trip mode and trip purposes share
one list of modes and one of purposes; the combined-trip questions keep bus, tram,
metro and train apart.

Changed questions and 34 forms advance to their next major version; Rome's
contribution workflows pin the new versions and the language verifier treats
“Not applicable” as a framework label. `versions.json` is unchanged: publish only
with a CityMaaS release that supports `answer_scale`, `answer_scale_stars` and `add_not_applicable`.
Details and pending decisions are in
[the decision record](../../../docs/questionnaire-updates/2026-11-22-rating-scales.md).

CityMaaS tests and docs that read the changed wording are aligned on
`citymaas/architecture-migration`; their E2E expectations hold once CityMaaS pins
this commit.

Checks: language, bundle and response-choice verifiers pass against the CityMaaS
candidate; version bumps match its revision rule; the serializer reports no change.
