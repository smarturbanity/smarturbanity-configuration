# Car-use matrix

## Outcome

The car-need questionnaire now asks frequency and a possible alternative for each
selected use, in all eight languages. The generic alternative Yes/No is removed.
The new answer key leaves historical answers unchanged. The owning product record
is `docs/walking_safety_questionnaire_notes.md`.

## Verification

- Passed: all 18 original use values and labels retained; all matrix labels have
  translations in all eight languages; four frequency and five alternative options.
- Passed against the CityMaaS matrix renderer and row-source resolver: no rows
  initially selected, only selected rows visible, independent per-row values,
  answer restoration, deselection, clearing and unanswered cells.
- Passed: `git diff --check`.
- Not performed: a complete questionnaire browser journey.
- Blocked: CityMaaS synchronization needs `dev/agents/repository-context.json`,
  which this separate repository does not provide. Its aggregate verifier resolves
  the CityMaaS root and refuses readiness on that root's main branch; it does not
  verify this configuration candidate.

## Handoff

Implementation is local on the user-selected `round30` branch. No push or
application configuration pin change is part of this work. Full application
acceptance and the aggregate readiness check remain outstanding; no ready claim.
The initial none-of-these option becomes the instruction to leave all uses
unselected, avoiding frequency/alternative questions for a non-use.

## Follow-up verification

The explicit no-use answer and the browser verification supersede the earlier
empty-answer assumption above. See `lory/car-matrix-none.md` for the current behavior and remaining verification.
