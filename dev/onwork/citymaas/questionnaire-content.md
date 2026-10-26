# Questionnaire editorial review

Depends on `citymaas/questionnaire-infrastructure`; review the diff against that branch before main integration. The combined source candidate was `citymaas/survey-question-review` at `a12bebdb27cc15b74f605ca9356d8132fa653417`, covering the equivalent access-quarter and Hub campaign changes.

This branch preserves that candidate's proposed question definitions, translations, flows, review variants and 22 generated questionnaires, including the new service-creation form. It does not independently change manifests, backend destinations, campaign scheduling, page scripts or privacy links. Those belong to infrastructure.

Verification: source bank build check (22 forms, 271 definitions), exact source form/bank content comparison, diff boundary restricted to questionnaire data and editorial records. No changes to required flags were made as part of the split. Existing review-mode-dependent defaults need a separate human research-content decision.

Human review remains pending. Original source commits remain on unchanged remote branches. Only the three named LOCAL originals may be removed after verified replacement; no remote deletion.
