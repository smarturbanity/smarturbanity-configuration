# Sectioned mode surveys

The 16 sectioned mode questionnaires under `forms/surveys/` are the only maintained
source of their questions and translations. The 51 small questionnaires have been
removed after verifying that all 258 questions are retained. Git preserves history;
there are no previous responses requiring compatibility, old links or migrations.
Profile, household, general travel, pre/post-trip, location reports and feedback
remain separate. Estimates below sum the existing declared minutes, not measured
completion times. No questions were added to reach an arbitrary minimum duration.

| Mode | Questionnaires: maximum questions / declared minutes |
| --- | --- |
| Walking | Trips and safety 26/5; experience and improvements 22/5 |
| Cycling | Trips and road safety 16/5; security and comfort 15/4; experience and improvements 11/4 |
| E-scooter | Trips, comfort and improvements 13/4; road and personal safety 13/5; experience and effort 15/4 |
| Public transport | Trips and improvements 12/5; safety and comfort 16/5; experience and effort 15/4 |
| Car | Choices and safety 14/5; experience and conditions 26/5 |
| Motorcycle/scooter | Use and changes 13/5; safety and comfort 16/5; experience and surroundings 15/4 |

## Flow and language

One welcome/consent and one submission replace repeated introductions and sends.
Each introduction lists its included sections and retains the original privacy
notice, including confirmed 36-month retention. Titles and topics have eight
languages. A few conflicting translations of the same short answer label are
explicitly normalized in the composition specification; the manifest records the
original variants and chosen wording. French comparison labels use neutral wording
that works for both comfort and effort. No native-speaker acceptance is claimed.

In the first questionnaire of each mode, screening and the reasons for non-use
remain available. Later habit details and later sections require weekly use=yes;
existing conditions are retained with an AND where needed. The gallery follow-up
ends on no. Later questionnaires can also be opened directly from the catalogue;
their mode is explicit in the title and they retain their original optional items.

Campaigns now reference the sectioned questionnaires, grouped by mode. They remain
disabled and unscheduled as before; profile availability and non-mode campaigns
are unchanged. This change does not activate a pilot campaign or deploy the app.

## Edit and verify

Edit the current sectioned JSON files directly. There is no composition builder or
second set of source forms or separate inventory. The verifier reads the catalogue
and the current questionnaire files directly.

`node tools/verify_survey_bundles.mjs <path-to-QuestionnaireConditions.js>` checks
the actual consumer's conditions, conditional order and total question coverage, distinct translated
option labels, privacy text, catalogue/campaign links and follow-up cycles. It also
rejects extra mode questionnaire files outside the 16 current forms. Pass the maintained
CityMaaS `CityMaasRoot/Questionnaires/QuestionnaireConditions.js`.

`node tools/verify_survey_bundles.test.mjs <path-to-QuestionnaireConditions.js>`
runs isolated regression checks for a valid catalogue, a reintroduced small form,
a lost question and a broken screening gate.

Cleanup checkpoint `7c4ade6` kept all 16 active files byte-identical, with 51 sections,
258 questions, 38 total catalogue forms and eight languages. Profile, household,
general travel and future surveys remain separate. Browser navigation, measured
completion time and human comprehension are separate acceptance checks.

## Next study scope

Use a new frozen target and plan for this candidate; the earlier plan targeting
1f2121a tests separate short forms and must not be used to test this composition.
Keep the same 58 character biographies and languages, withholding prior answers.
Assign relevant mode questionnaires and explicitly record skipped sections.
The study also includes `street_connection_assessment` and
`street_segment_assessment` as separate location-report tasks, with hypothetical
places clearly labelled and no claim of live map selection, report submission or
delivery. Their conditional branches and accessibility cases need dedicated
scenarios rather than treating 47/44 configured questions as all shown at once.

## Questionnaire illustrations

Each of the 20 current survey files (16 mode questionnaires, profile, household,
travel and future travel choices) has its own SVG under `forms/surveys/assets/`,
named after its questionnaire ID. The illustration combines the mode or subject
with two topics from its actual questions. Shared colours and a fixed 800×450
canvas keep the gallery consistent. There is no text embedded in the drawing;
the image alternative reuses the questionnaire's translated title. No scripts,
external resources or animation are included. Questions and answer values are
unchanged. The later illustration update changes only welcome image links and
image alternatives in the 20 survey JSON files.

Run `python tools/verify_survey_assets.py` to check all 20 image links, distinct
drawings, valid SVG XML and translated alternatives. It also rejects unused SVGs,
scripts, external image references and animation. The 19 old shared illustrations
were removed after checking that no current form references them.

## Generated option translations

Generated choices such as None of these and Other must be present in each form's
own dictionary even though their text is not repeated in the question schema.
The follow-up dictionary correction adds missing standard labels from the app's
existing translations, without changing any question or answer value.
Run `node tools/verify_questionnaire_languages.mjs <path-to-QuestionnaireRevision.js>`
with the actual app consumer. It checks English text coverage using
`questionnaireTextTags` and generated option labels in every declared language.
The regression suite also rejects missing None and Other translations.
