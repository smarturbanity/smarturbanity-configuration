# Open questionnaire findings: approved decisions

Source: the 46 active findings in the Access Easy residents ledger, ordered by
their source round. Decision numbers below are review numbers, not finding IDs.
This record does not rewrite frozen persona results or mark acceptance tests passed.

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

- 1A: one profile with optional updates, and voluntarily selected trip pairs,
  requires verification of the application entry points and saved-response flow.
  This configuration change does not implement a scheduling or persistence rule.
- The result-library sidecar and live dashboard have not been reclassified by this
  commit. No fresh persona study, browser run, deployment or public release.

## Verification

Four modified JSON files parse. Eight-language dictionaries introduce no new
missing visible-text keys. Stored answer values, options, required flags, branching,
gender choices and neighbourhood wording are unchanged. Question and questionnaire
versions advance by patch. `git diff --check` passes. No package or declared test
runner exists in this standalone configuration repository.
