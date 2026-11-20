# Mark health-revealing questions and options for per-questionnaire consent

Source: `lory/health-consent-marks`. Target: `main`.

Includes the unmerged follow-up of `lory/surveys-required-privacy`: required
visible answers with explicit refusal, the Italian and English questionnaire
summary filtered by questionnaire, and its readiness review records.

Marks five answer options that reveal health or disability (accessible routes
for a disability, health as a given-up trip purpose, powered wheelchair in
household vehicles and vehicles used, not working for health reasons); with
consent No they are removed and listed in `consent.health.removed_options`.
Existing question-level marks are unchanged.

Validation: the health-consent validator accepts all 37 forms; six bundle regressions, language ownership, actual trip-company and
location-context consumers pass against the CityMaaS `main` checkout.
Option-level health marks require the CityMaaS editor and validator support on
`citymaas/architecture-migration`. Deployment and protected-base integration
remain human operations.
