# Open report follow-up, 9 November 2026

## First five review topics

- **#497, broken traffic light:** the actual conditional evaluator hides
  `signal_call` for `signal_broken` and shows it for the three operating-light
  cases. Existing correction confirmed technically; no new browser submission
  is claimed.
- **#498, refusing personal context:** both location forms retain separate
  `Prefer not to say` and `None of these` mechanisms. The actual model produces
  the refusal option. Refusal and absence are not interchangeable.
- **#496, support separate from journey:** both forms now move `mobility_aid`
  and `stroller` to the optional `trip_mobility_support` question, with eight
  translated prompts. It does not gate any later question. Journey context
  retains travel connections and accompanying a child, with a less sensitive
  classification. Support retains conservative health metadata. These labels
  do not implement access controls. Personal-security questions retain their
  existing refusal flags.
- **#453 / #437, repeated comfort:** retain mode-specific measurements. Walking
  and public-transport surroundings introductions already explicitly name their
  respective context. Composed forms have separate mode titles and sections.
  No daily or all-at-once obligation is introduced. Perceived repetition remains
  unverified, so these two historical reports are not declared resolved.
- **#413, cumulative language:** retain one historical reference but separate
  evidence by subtopic. Verified: the Italian motorcycle confidence scale ends
  with distinct Molto/Moltissimo labels and stable values; the bundle verifier
  prevents identical translated source options from collapsing. Still pending:
  the complete French/Turkish/Hungarian/Arabic/German wording review, all other
  original wording notes and screen-reader/native-zoom acceptance. A partial
  success does not resolve the cumulative report.

## Version and compatibility

Both location forms advance from 4.1.0 to 5.0.0. `journey_context` advances from
3.0.0 to 4.0.0 because two answer values move to a new answer key; the new question
starts at 1.0.0. Historical answers keep their original questionnaire versions
and must not be silently reinterpreted or migrated. The moved option values and
their existing translations remain unchanged. The generic questionnaire engine
uses the new key without special handling. The Access Together profile configuration
does explicitly reference `journey_context` for support-based ordering: its owner
has been notified to update profile questions, lead selection and saved-profile
compatibility together. Do not activate these new forms with the old app profile
configuration or claim application readiness until that integration is verified.

## Verification and remaining acceptance

Run `node tools/verify_location_context.mjs <actual QuestionnaireConditions.js>`
and `node tools/verify_survey_bundles.mjs <actual QuestionnaireConditions.js>`.
Both pass using the CityMaaS questionnaire-add-none consumer. Checks exercise
conditional success/failure paths, question order, generated refusal options,
optional support and eight-language prompt presence; bundle checks cover 51
source forms, 16 bundles and 258 questions. `git diff --check` passes.

These are source/model checks. They do not establish a new browser submission,
native-language comprehension, actual privacy handling or new persona acceptance.
Keep historical results intact and record technical fixes separately from full
acceptance. No application or questionnaire deployment is included here.
