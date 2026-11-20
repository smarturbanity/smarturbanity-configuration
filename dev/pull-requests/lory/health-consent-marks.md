# Mark health-revealing questions and options for per-questionnaire consent

Source: `lory/health-consent-marks`. Target: `main`.

Includes the unmerged follow-up of `lory/surveys-required-privacy`: required
visible answers with explicit refusal, the Italian and English questionnaire
summary filtered by questionnaire, and its readiness review records.

Validation: six bundle regressions, language ownership, actual trip-company and
location-context consumers pass against the CityMaaS `main` checkout.
Option-level health marks require the CityMaaS editor and validator support on
`citymaas/architecture-migration`. Deployment and protected-base integration
remain human operations.
