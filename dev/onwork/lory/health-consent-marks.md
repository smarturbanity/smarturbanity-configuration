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

- car choices and safety, `car_sustainable_motivation`: `accessible_routes_and_vehicles`;
- your profile, `travel_given_up_purposes`: `health`;
- your profile, `household_vehicles` and `vehicles_used`: `powered_wheelchair`;
- your profile, `employment`: `unable_to_work_health`.

Existing question-level marks are unchanged. The full review, with the eight
items left for a decision (moving some question marks to single options and
borderline options), is `dev/research/health-option-marks.md` on the CityMaaS
branch `citymaas/health-option-editor`.

## Verification and boundaries

After merging the follow-up, the six survey-bundle regressions, language
ownership, trip-company and location-context checks pass against the CityMaaS
`main` consumers. With the marks, the health-consent validator accepts all 37
forms, survey bundles pass (16 questionnaires, 258 questions) and language
ownership passes (19 questionnaires). The architecture-migration layout moved the files those
verifiers read, so they run against the `main` checkout.

The option marks need the CityMaaS editor and validator support delivered
separately: validator on the health-consent work, editor on
`citymaas/health-option-editor`, both for `citymaas/architecture-migration`. Protected-base integration and
publication remain human operations.
