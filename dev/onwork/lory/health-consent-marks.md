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

## Verification and boundaries

After merging the follow-up, the six survey-bundle regressions, language
ownership, trip-company and location-context checks pass against the CityMaaS
`main` consumers. The architecture-migration layout moved the files those
verifiers read, so they run against the `main` checkout.

The option marks need the CityMaaS editor and validator support delivered
separately on `citymaas/architecture-migration`. Protected-base integration and
publication remain human operations.
