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

## Approved topics 6–10

6. **#424, welcomes:** separate model review read the complete Hungarian and
   Persian introductions and titles in walking habits and both active walking
   bundles. They are comprehensible, retain voluntary participation, skipping,
   privacy paragraphs and 36 months. No old email/code explanation remains;
   `$pilot_page` is a link placeholder. No further shortening applied. This is
   a language-model review, not human native-language acceptance.
7. **#402, overlap with retired Safety:** the active catalogue offers mode
   bundles, not the old standalone Safety form. Its old cross-form overlap is
   superseded. Current questions distinguish travelling along traffic from
   crossing a road; preserve both. Remaining perceived overlap between current
   questions is a separate acceptance item; the cumulative report stays open.
8. **#403, inaccessible directions:** add `signs_not_accessible`, “The available
   signs are not accessible to me” (Italian: “Le indicazioni disponibili non sono
   accessibili per me”), separately from choosing not to use signs. Eight
   translations are present. Existing answer values, text, optional status,
   conditions and all existing translations are unchanged. Rebuilt the active
   walking experience/improvements bundle. Other inclusion concerns in #403
   remain separate and do not inherit a resolved status.
9. **#404, road-user judgments:** retain the existing eight-language instruction
   to consider concrete behaviour. The current question has no three-answer cap.
   The old three-choice complaint is superseded technically. Whether people
   still perceive blame or gender exclusion needs targeted acceptance; do not
   remove the measurement merely because the earlier wording caused a problem.
10. **#405, old Daily Travel:** mark its old 16-question composition as
    superseded. The current travel form has five questions; accompanying children
    or people cared for is distinct from being accompanied by a helper. Record
    those old omissions as technically addressed. Remaining questions about
    understanding combinations, shared services and mode-specific satisfaction
    belong to their current forms, not a redesign of this five-question form.

Source audit verifies unchanged existing wayfinding options/translations and
exact source-to-bundle composition. Both maintained model/condition and bundle
checks pass. Walking comfort advances to 2.2.0, wayfinding to 1.2.0 and its active
bundle to 1.2.0. No new question is added, only one answer option. No whole
historical cumulative report is closed through this slice.

## Location-form version and integration

Both location forms advance from 4.1.0 to 5.0.0. `journey_context` advances from
3.0.0 to 4.0.0 because two answer values move to a new answer key; the new question
starts at 1.0.0. Lory confirmed that there are no old application data: update the
app directly to this contract without fallback, dual reading or migration code.
Historical study evidence remains unchanged. The moved option values and
their existing translations remain unchanged. The generic questionnaire engine
uses the new key without special handling. The Access Together profile configuration
does explicitly reference `journey_context` for support-based ordering: its owner
has been notified to update profile questions and lead selection together,
without backward compatibility. Do not activate these new forms with the old app profile
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
