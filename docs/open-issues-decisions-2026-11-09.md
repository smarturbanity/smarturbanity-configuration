# Open questionnaire findings: approved decisions

Source: the 46 active findings in the Access Easy residents ledger, ordered by
their source round. Decision numbers below are review numbers, not finding IDs.
This record does not rewrite frozen persona results or mark acceptance tests passed.

## Definitive decision: no previous response data

Lory confirmed on 9 November 2026 that there are no existing questionnaire
responses or saved profiles to preserve. Update the application, questionnaires
and their tests directly to the current format. Do not add old-format fallbacks,
dual reads, migration code or compatibility branches for previous answers or
profiles. In particular, use `trip_mobility_support` directly for mobility aids
and strollers, keeping `journey_context` for its remaining journey context.

This decision supersedes earlier instructions to preserve previous response or
profile formats. It is definitive: do not propose that compatibility again.
Historical source revisions, change manifests and test evidence remain records;
their existence does not imply that old participant data needs support.

## Implemented here

- 2B: keep gender options, Other and Prefer not to say unchanged. Replace the two
  remaining paired Italian expressions about travelling alone with neutral wording
  in Car need and Public transport without car.
- 9A: shorten mobility-limitation help in all eight languages; preserve that the
  question concerns the respondent, not people they assist. Keep the question,
  answer values, optional status and conditions unchanged.
- 11A: remove old age as the example of requiring assistance from the Italian
  household answer. Describe an adult needing assistance, for example because of
  dementia or disability. Preserve the stored answer value and optional status.

## Source review and dispositions

- 3A / 10A: the older French duration comparison is already explicit. The reported
  French `filatures`, `Maison`, `voyager`, Turkish `Kayıt`, `Pek güvenli`, and
  Hungarian `Közömbösnek` are absent from current survey/trip translations.
  German `Ziemlich` remains in effort/road-safety questions, in accordance with
  the previously documented decision to retain the ordinary German scale word.
  These source checks do not establish native-speaker acceptance. Remaining
  translation nuances need item-level assessment, not blanket closure.
- 4A: post-trip traffic and personal safety use the same five answer labels in
  each of the eight languages. The current mode-specific personal-security forms
  use Yes/No/Doesn't apply, rather than the historical five-level Safety form.
  Do not convert their frequency questions into intensity questions merely to
  imitate a retired scale. No new answer meanings or values are introduced.
- 5A (Q22-12): split the cumulative report. Physical and mental effort are already
  separate; stumbling/falling and mild unease options are present; crowding and
  conflicts are separate options in current road-safety forms. Foreign education
  mapping and interpretation of whole-trip versus individual-crossing ratings
  remain distinct acceptance concerns. Priority-selection limits remain as
  previously approved; do not remove them through this cumulative report.
- 6B: neighbourhood prompt, hint, choices and conditions unchanged.
- 7A (Q23-5): current walking insecurity factors include `no_orientation_cues`
  and hearing-approach barriers. This question declares no three-answer cap.
  Persian uses `خاستگاه` for origin. These are existing source fixes, not new
  persona-confirmed resolutions. Other questions' approved limits stay intact.
- 8A (Q23-14): duplicate of the earlier gender-choice finding Q21-5; governed by
  approved decision 2B. Do not reopen the choice to add named gender options.
- 11A: separate consent/trust, technical words, assistance, economic sensitivity
  and welcome density. Income remains optional and is not deleted. Consent and
  adult-check behavior is outside this wording-only change.

## Still pending

Readiness and the final crowding clarification are tracked in
`questionnaire-retest-readiness.md`. Earlier round31 text records are not valid
as 58 model reviews: one 19-person group was scripted and welcome/final pages
were omitted. They cannot close current acceptance findings.

- 1A: one profile with optional updates, and voluntarily selected trip pairs,
  requires verification of the application entry points and saved-response flow.
  This configuration change does not implement a scheduling or persistence rule.
- Earlier slices did not reclassify the result library. The final technical import
  below updates only decisions 17–46. No fresh persona study or public release.

## Decisions 12A–16A

- 12A: simplify the Italian economic-situation question by replacing `nucleo
  familiare` with `vostra situazione economica`. Earlier wording fixes are documented
  in walking_safety_questionnaire_notes.md; German `Ziemlich` remains as previously
  approved. This is source review, not native-language acceptance.
- 13A: retain separate measurements of road danger, route accessibility, security
  and consequences. The old general Safety form and Daily Travel form were
  replaced by the mode chains; do not remove useful current questions on the basis
  of an overlap with a retired form. Existing removals/splits remain unchanged.
- 14A: add the missing explicit option `pedestrian_lights_no_audio` to walking
  route barriers, with eight translations. Distinct from lights that are out of
  order. Existing dropped kerbs, narrow paths, tactile paving, power-wheelchair
  distance answer and assistance/company answers remain available.
- 15A: add a short eight-language instruction to the five road-user questions:
  judge concrete behaviour such as close passing or not giving way, not everyone
  in a category. Keep category values because they measure a different thing from
  unsafe situations. Italian help uses neutral wording.
- 16A: clarify that the public-transport combination question counts another mode
  such as a bicycle/car, while bus/tram/metro/train transfers alone remain public
  transport and a short access walk is excluded. This follows the existing answer
  categories rather than inventing an unrecordable answer. Existing mode-specific
  satisfaction and company options, and relocation of future app questions,
  remain unchanged. Do not resurrect the retired cumulative Daily Travel form.

Seven forms changed in this second slice. JSON parses, existing answers and
conditions are preserved, every added help/option has eight translations, and
`git diff --check` passes. No new persona or browser acceptance is claimed.

## Decisions 17A–46A

All thirty decisions approved. The maintained source audit checks exact historical
finding IDs, not title similarity. New edits make `vehicles_used` explicitly optional
and explain in eight languages that car availability is a separate question from
using a motorcycle, scooter or another alternative. No stored answer is removed.

Technically verified dispositions: 19, 21, 23, 24, 25, 27, 28, 29, 30, 31, 32,
33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46 (23 exact findings).
The later duplicate reports retain their historical evidence and receive the same
source check as the earlier report; their history is not deleted or rewritten.
The approved 36-month decision and current privacy-notice pointer remain unchanged.

Seven cumulative/experiential findings remain open: 17 (anxiety and understanding
of alternatives), 18 (social discomfort and stigma), 20 (cycling burden and perceived
overlap), 22 (cumulative language judgments), 26 (welcome density and HU/FA nuances),
34 and 44 (perceived duplication across walking/public-transport contexts).
Keep the useful distinct measurements and already approved wording; no unsupported
claim that those people have accepted the current experience.

The technical sidecar records pass versus uncertain separately. It cannot turn
historical findings into persona-confirmed resolutions. No new browser/persona
test, public deployment or real retention check is claimed. The application work
for decision 1A remains separate.

Verification: all configuration JSON parses; explicit optionality and eight new
help translations; prior answers, options, conditions, privacy settings preserved;
feedback language keys equal in eight languages; current survey introductions
have translations and matching paragraph counts in eight languages; 23 source
checks pass and 7 remain uncertain; `git diff --check` passes.

Technical import completed in library commit
`186e77471c4263fce61aa906021cd40919dc97c5`, targeting configuration commit
`d136e9baf1d3c7516ce33c2b6ed279e70e188ee3`. Private release
`ca87cc54-f1a6-45be-acfe-46d568b1c211` is active. The running server returned HTTP
200 and its version endpoint matched the active release. Active opens: 46 to 23;
code-verified: 219 to 242. Historical persona-resolved count remains 62; the 125
older items needing retest remain separately classified.

## Verification

Four modified JSON files parse. Eight-language dictionaries introduce no new
missing visible-text keys. Stored answer values, options, required flags, branching,
gender choices and neighbourhood wording are unchanged. Question and questionnaire
versions advance by patch. `git diff --check` passes. No package or declared test
runner exists in this standalone configuration repository.
