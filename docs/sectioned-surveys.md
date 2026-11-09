# Sectioned mode surveys

The active catalogue replaces 51 short mode forms with 16 sectioned questionnaires.
Each former form becomes one section, preserving all 258 question definitions,
IDs, answer values, versions and optional flags. Original source files remain for
version history and existing links; they are no longer listed as separate cards.
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

## Rebuild and verify

`python tools/build_survey_bundles.py` rebuilds from the six specifications and
unchanged source forms, then updates catalogue, campaign links and provenance.
`node tools/verify_survey_bundles.mjs <path-to-QuestionnaireConditions.js>` checks
the actual consumer's conditional behavior, order, definitions, translations,
privacy, exact coverage and catalogue/campaign links. Pass the maintained
CityMaaS `CityMaasRoot/Questionnaires/QuestionnaireConditions.js`.

Source SHA-256 values use UTF-8 text with LF line endings. The builder and verifier
normalize Windows CRLF before hashing, so a Git checkout cannot invalidate source
provenance solely by changing line endings. Generated files use LF.

Verification passes for 51 source forms, 16 questionnaires, 258 retained questions,
38 total active catalogue forms and eight languages. Three independent delegated
reviews cover the six modes. Browser navigation, completion times and perceived
burden remain acceptance checks for the next test.

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
