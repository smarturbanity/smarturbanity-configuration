# Round 30: remaining questionnaire findings

Source: the 39 frozen findings in `round30`, iteration
`retest-e6fc235-hindered-v1`, from the private Access Easy results library.
This record describes the local configuration candidate. It does not rewrite the
original simulated reactions or claim a new persona acceptance run.

## Decisions confirmed by Lory on 2026-11-09

1. Keep the four-answer and three-reason limits, and explain them before selection.
2. Keep one main purpose for the most frequent trip.
3. Check enlargement rather than adding an application text-size control.
4. Ask about pushchairs and mobility aids in a separate optional question.
5. Refer readers to the pilot privacy notice; do not duplicate its retention and
   recipient rules in questionnaire welcomes.

## Disposition of every finding

IDs below omit the common `retest-e6fc235-hindered-v1/` prefix.

| Finding | Candidate behavior / disposition |
| --- | --- |
| Q30-1 | The car-alternatives question explicitly says to choose at most four answers. The approved priority limit remains. |
| Q30-2, Q30-17, Q30-18, Q30-20 | The three relevant welcomes explicitly direct readers to the privacy notice for recipients and retention. Pilot notice remains authoritative, per decision 5A. This is a reference, not a new privacy policy. |
| Q30-3 | Add benches/rest places, step-free ramps/dropped kerbs, and paths free of vehicles/obstacles; all eight languages. Existing answers and exclusive None remain. |
| Q30-4 | A separate optional question asks about pushchairs/prams, manual wheelchairs, and walking sticks/crutches/walking frames, for oneself or someone accompanied. Other, Prefer not to say and exclusive None are available. Powered wheelchairs retain their existing vehicle entry. |
| Q30-5 | The three-main-reason limit is visible before choosing. The question is optional, consistent with the welcome's promise that any question can be skipped. |
| Q30-6 | Retain: economic information can be sensitive; this question already permits skipping and Prefer not to say. No claim that wording removes that sensitivity. |
| Q30-7 | Retain one main purpose, explicitly confirmed by decision 2A. The question does not attempt to describe every purpose of a multi-stop journey. |
| Q30-8, Q30-31 | Add not being able to hear approaching people/vehicles; retain the separate sight-orientation answer. Eight languages. |
| Q30-9, Q30-32 | Include disability in walking harassment examples, in all eight languages. Retain the specifically approved Italian wording. |
| Q30-10, Q30-33 | Add missing visual stop/service information for public transport, in all eight languages. |
| Q30-11, Q30-36 | Retain the lighting question with its existing optional status and Doesn't apply to me answer. Lighting is a distinct relevant topic; respondents need not claim it affects them. |
| Q30-12 | Explicitly make the transport-lighting question optional; preserve Doesn't apply to me. |
| Q30-13, Q30-37 | Ask directly about usefulness after completing a questionnaire, rather than a hypothetical benefit. Show it only after Yes or Yes with help to answering/sending. Preserve the previously approved direct French wording. |
| Q30-14 | The German sending question explicitly names a questionnaire and its answers, removing the ambiguous standalone pronoun. |
| Q30-15 | Checked layout enlargement and mobile widths, per decision 3A. No new in-form control. The 200% check uses CSS zoom in the actual renderer; native browser-menu interaction and assistive technology are not certified. |
| Q30-16 | Reuse the already approved simpler alternatives question and translations, removing the repeated Italian bicycle phrasing. |
| Q30-19 | Reuse the already approved neutral long-distance-walking exclusion, without attributing inability to age. Preserve its answer value and exclusivity. |
| Q30-21 | Use consistent Italian age-band labels, including “anni”, while retaining stored band values. |
| Q30-22 | Use natural Italian “per conto tuo / per conto mio”; simplify the corresponding French phrasing. |
| Q30-23 | Retain: Other and Prefer not to say are already requested from the app. Do not duplicate them in the authored options. |
| Q30-24 | Retain the optional household-economic question and its explanatory help. The original report itself accepts it; no new obligation is introduced. |
| Q30-25 | Retain the consistent Italian informal address, as in the previously approved language-review disposition. Do not switch register based on age in one question. |
| Q30-26 | Reuse the approved plain Italian explanation of tactile paving: recognizable with feet or a cane. |
| Q30-27 | Reuse the approved Italian wording specifying spaces for walking/wheelchairs separated from bicycles/scooters. |
| Q30-28 | Include wheelchair use in the title, introductory sentence and question. Preserve the specifically approved Italian title. |
| Q30-29 | Distinct opening/understanding and answering/sending problem prompts explicitly name the task, in all eight languages; no reused ambiguous Arabic pronoun. |
| Q30-30 | Replace the uncommon Italian following/harassment term with a plain explanation. |
| Q30-34 | Preserve the approved natural French weekly-publication wording. |
| Q30-35 | Simplify the Italian accompaniment question and reuse the approved short child-accompaniment answers. Everyday school/activity accompaniment is explicit. |
| Q30-38 | Separate explicit problem prompts remove the ambiguous Turkish “it”; natural weekly-publication wording and shorter Turkish/Persian welcomes are retained. |
| Q30-39 | Use a complete, polite Hungarian feedback title. |

31 findings have configuration changes; Q30-15 has the requested layout check;
seven findings (6, 7, 11, 23, 24, 25, 36) retain the stated behavior for the reasons
above. None of these dispositions changes the frozen historical finding status.

## Versions and data

| Form | New version |
| --- | --- |
| Car alternatives | 1.2.4 |
| Walking improvements | 3.2.0 |
| Walking security | 3.2.0 |
| Public transport security | 3.2.0 |
| Profile | 1.22.0 |
| Household | 1.1.0 |
| Travel | 1.0.1 |
| Questionnaire feedback | 1.2.0 |

Existing answer keys, question types and option values remain. The new optional
support question has its own key, `mobility_support_used`, version 1.0.0, classified
`special_category_health` because some options can reveal mobility limitations.
Historical answers are not migrated. Configuration consumers still need to adopt
the versioned candidate; no pin or deployment is changed here.

Selected already-approved language changes were read from the follow-up candidate
`a88910182b26508f4a3dc98f92b07c3e0ee27c49`; that branch was not changed or merged.
Its duplicated retention paragraphs were not copied, following the newer 5A
decision. Unrelated forms and documentation remain outside this patch.

## Verification

- All authored questionnaire JSON parses; all eight languages remain.
- Structural comparison with the starting candidate preserves existing answer
  keys, types and option values; added/changed visible strings have eight entries.
- Twelve isolated actual-app browser checks: added options, exclusive None,
  support-question translations, visible selection limits, conditional usefulness,
  360/390 px widths and 200% enlarged layouts. No questionnaire JavaScript errors.
- Local evidence: `.tmp/round30-evidence/structural.json`, `report.json`,
  `walking-200-percent.png`, `feedback-200-percent.png`. Browser execution uses the
  previously verified matching CityMaaS app candidate and blocks external traffic.
- No live response submission, new persona study, native zoom-menu test,
  configuration pin change, dashboard publication or push.

The private dashboard's frozen 39 reactions remain historical evidence. This
repository's disposition record is the updated implementation inventory, not a
claim that those residents have retested or accepted the new wording.
