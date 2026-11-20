# Health consent marks on questionnaire options

## Scope and decisions

Marks the questions and single answer options that reveal health or disability
with `privacy_classification: "special_category_health"`, so CityMaaS can ask
explicit health consent every time and remove withheld options when the person
declines. Question wording and response keys stay unchanged.

The branch starts from `main` and includes the unmerged follow-up of
`lory/surveys-required-privacy` (required visible answers with explicit refusal,
the Italian and English questionnaire summary and its review records), whose
worktree is retired.

## Marks applied

Option marks, where the question itself is not health-related:

- car choices and safety, `car_sustainable_motivation`: `accessible_routes_and_vehicles`, `not_possible`;
- motorcycle, `motorcycle_sustainable_motivation`: `not_possible`;
- your profile, `travel_given_up_purposes`: `health`;
- your profile, `household_vehicles` and `vehicles_used`: `powered_wheelchair`;
- your profile, `employment`: `unable_to_work_health`;
- your travel, `freq_trip_company`: `accompanied_by_helper`.

Lory's decisions of 2026-11-20 ("1A, 2A, 3B, 4A, 5B, 6B, 7B, 8B") moved six
whole-question marks to their health options; the question now carries
`heightened_personal`, like its sibling questions:

- pre trip, `trip_mode`: `wheelchair`; `trip_purpose`: `health`;
- your travel, `freq_trip_purpose`: `appointments_medical_legal_banking`, `health_exercise`;
- your profile, `reasons_outside`: `healthcare_doctor_pharmacy_hospital`;
- near miss, `nm_your_mode`: `wheelchair`;
- geolocated perception, `report_perspective`: `wheelchair`, `walking_aid`, `visually_impaired`.

With consent No these questions stay visible without the health options. The
other whole-question marks are unchanged. Car `i_need_the_car_for_my_situation`,
post-trip incidents, public-transport barriers, `carer` and residence `services`
stay unmarked. Form and question versions are retained: per the README,
privacy metadata alone does not change the response contract. The README
paragraph that excluded option labels now states the option rule. The review is
`dev/research/health-option-marks.md` on the CityMaaS branch
`citymaas/health-option-editor`.

## Verification and boundaries

After merging the follow-up, the six survey-bundle regressions, language
ownership, trip-company and location-context checks pass against the CityMaaS
`main` consumers. With the marks, the health-consent validator accepts all 37
forms, survey bundles pass (16 questionnaires, 258 questions) and language
ownership passes (19 questionnaires); trip-company, location-context, campaign
launch (37 forms) and the six bundle regressions pass after the decisions too.
`verify_pilot_configuration` stops before reading any form because the `main`
loader requires an application configuration type the verifier does not set;
this is independent of the marks. The architecture-migration layout moved the files those
verifiers read, so they run against the `main` checkout.

The option marks need the CityMaaS editor and validator support delivered
separately: validator on the health-consent work, editor on
`citymaas/health-option-editor`, both for `citymaas/architecture-migration`. Protected-base integration and
publication remain human operations.
