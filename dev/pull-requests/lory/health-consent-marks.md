# Mark health-revealing questions and options for per-questionnaire consent

Source: `lory/health-consent-marks`. Target: `main`.

Includes the unmerged follow-up of `lory/surveys-required-privacy`: required
visible answers with explicit refusal, the Italian and English questionnaire
summary filtered by questionnaire, and its readiness review records.

Marks the answer options that reveal health or disability, so that with
consent No only those options are removed (listed in
`consent.health.removed_options`) and the questions stay:

- new option marks: accessible routes for a disability, "can't walk or cycle
  far" in the car and motorcycle surveys, health as a given-up trip purpose,
  powered wheelchair in household vehicles and vehicles used, not working for
  health reasons, travelling with someone who helps;
- six questions move from a whole-question health mark to option marks:
  pre-trip mode (wheelchair) and purpose (health appointment), most frequent trip
  purpose (medical appointments, health or exercise), reasons to leave the
  neighbourhood (healthcare), near-miss mode (wheelchair), perception-report
  perspective (wheelchair, walking aid, visual impairment); they now carry
  `heightened_personal`.

Other question-level health marks are unchanged; versions are retained because
only privacy metadata changes. The README now states the option rule.

Validation: the health-consent validator accepts all 37 forms; campaign launch passes; six bundle regressions, language ownership, actual trip-company and
location-context consumers pass against the CityMaaS `main` checkout.
Option-level health marks require the CityMaaS editor and validator support on
`citymaas/architecture-migration`. Deployment and protected-base integration
remain human operations.
