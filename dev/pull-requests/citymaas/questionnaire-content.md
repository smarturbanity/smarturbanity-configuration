# Review questionnaire wording, answers and composition separately

Target: `main`. Infrastructure is now accepted on main; the squash ancestry is reconciled by a merge into this content branch, preserving its reviewed questionnaire data.

Preserve the existing proposed question-bank content, question variants, translations, flow composition and generated standalone forms. This includes the About You and post-trip revisions and new service-creation questionnaire.

The technical parent holds runtime manifests, schema/tooling, destination settings, campaigns and privacy routing. The editorial diff changes only questionnaire data and review records. No new policy on mandatory questions is introduced.

Validation: 22 generated questionnaires from 271 definitions match the preserved candidate. Human content review remains pending.
