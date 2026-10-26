# Questionnaire editorial review

Depends on `citymaas/questionnaire-infrastructure`; review the diff against that branch before main integration. The combined source candidate was `citymaas/survey-question-review` at `a12bebdb27cc15b74f605ca9356d8132fa653417`, covering the equivalent access-quarter and Hub campaign changes.

This branch preserves that candidate's proposed question definitions, translations, flows, review variants and 22 generated questionnaires, including the new service-creation form. It does not independently change manifests, backend destinations, campaign scheduling, page scripts or privacy links. Those belong to infrastructure.

Verification: source bank build check (22 forms, 271 definitions), exact source form/bank content comparison, diff boundary restricted to questionnaire data and editorial records. No changes to required flags were made as part of the split. Existing review-mode-dependent defaults need a separate human research-content decision.

Human review remains pending. Original source commits remain on unchanged remote branches. Only the three named LOCAL originals may be removed after verified replacement; no remote deletion.

Merge alignment: main at c5decb4744bac0dd587fa8ab060e22cb9df1ea5a contains the accepted infrastructure through a squash; its complete tree equals the previously verified 8dce2207c986268a796aa76b1441ef255b07eca7 infrastructure commit already in this candidate. Resolve the duplicate add/add conflicts and three automatic translation unions using the preserved editorial candidate. Data remain identical to 719790a; build --check verifies 22 forms from 271 definitions with the shared PlanEasy pool. The merge updates ancestry; main is unchanged. Human wording review remains pending.
