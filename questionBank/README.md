# SmartUrbanity question bank

`questions/<id>.json` is the single catalog file for a question ID. The ID is
`<lowercase project>.<key>` and the filename is exactly `<id>.json` (for example,
`smarturbanity.walk_distance.json`). Each file contains its answer schema, translations, originating
project and questionnaire, and the questionnaires that currently use it. The
`origin_questionnaire` field identifies the source chosen when the current forms
were first extracted into this catalog. Where a key occurs in several current
forms, `origin_basis` marks this origin as **unverified historical provenance**;
the extraction cannot prove which questionnaire first introduced the question.

Some current forms use the same project and answer key with different wording,
options or translations. Their one catalog file contains named `variants` and
`review_required: true`. A flow must select a variant explicitly. This preserves
the existing response key and allows an editor to reconcile the variants later
without silently changing historical data.

`flows/<category>/<questionnaire>.json` describes a questionnaire as ordered
sections of question references. Every node pins `question_ref`,
`question_version` and `variant`. A node's `overrides` contains flow-specific
visibility (`show_if`), requirement (`required`) and element prefill
(`prefill_from`). Together, order and visibility conditions describe the current
conditional path through the questionnaire. Flow-wide copy and translations stay
in the flow; question wording, help, option labels and their translations live
in the question files. This includes the generated “Other”, “I don't know” and
“Prefer not to say” labels when the current form supplies their translations.

The **primary exchange format** is one self-contained question-bank collection:

```json
{
  "question_bank_collection_version": 1,
  "questions": ["complete question entries, each ID once"],
  "flows": ["complete flow entries with question references"]
}
```

It can contain one questionnaire, several goal-based flows, or the whole bank.
Every referenced question is included with its translations and provenance.
The framework resolves the references and creates the real questionnaire JSON
for a repository. Export and import from this repository with:

```sh
node questionBank/collection.mjs export ../smarturbanity-collection.json
node questionBank/collection.mjs export ../walking-collection.json smarturbanity_walking
node questionBank/collection.mjs import ../smarturbanity-collection.json --check
node questionBank/collection.mjs import ../smarturbanity-collection.json
```

Import checks the entire collection in a temporary copy before writing. It
rejects missing definitions, invalid references, answer-key collisions,
regressive versions and changed content under the same question or questionnaire
version. A changed definition needs a higher question version, and every flow
that uses it must pin that version. A changed flow needs a higher questionnaire
version. `--check` shows how many bank and generated form files would change.
Questions not yet placed in a flow may be included as `available_for_future`.

The existing `forms/` JSON remains the compiled questionnaire and response
format consumed by the current application. It can be reproduced from this bank:

```sh
node questionBank/build.mjs --check   # compare all 22 generated forms with forms/
node questionBank/build.mjs           # write the forms after intentional edits
node questionBank/audit.mjs           # list variants and repeated prompts across IDs
node questionBank/build.mjs --export-dir ../legacy-questionnaires
node questionBank/import.mjs ../legacy-questionnaires/smarturbanity_about_you.json --check
node questionBank/import.mjs ../legacy-questionnaires/smarturbanity_about_you.json
```

Edit a question file to change its wording or translation wherever that variant
is used. Edit a flow to select, order or condition questions, or to change its
welcome and final copy. Update `questionBank/index.json` when adding a question
or flow. Keep the original `answer_key` and option values when existing responses
must remain comparable; create a new key when the meaning or answer scale changes.

The `build --export-dir` and `import.mjs` commands are compatibility tools for
individual legacy questionnaire files. They are separate from the one-file
collection exchange. Legacy export writes one JSON per questionnaire with the
same envelope as `forms/`; when its content matches `forms/`, the export is
byte-for-byte identical. Legacy import accepts an existing questionnaire's JSON, first builds and
checks a temporary candidate, then updates its flow, question variants and
`forms/` file. `--check` previews the import without changing repository files.
Edits to a shared question in one questionnaire create a variant so that other
questionnaires do not silently change. Changed question definitions increment
their version and all affected flow references are repinned. Removed questions
remain in the catalog marked `retired` to preserve their provenance. To add a
brand-new questionnaire, create its flow and index entry deliberately before
using the importer.

The service-creation form is the 22nd flow. Its standalone file is
`forms/serviceCreation/smarturbanity_service.json`; it is intentionally absent
from the general `forms/index.json` gallery. It preserves the Hub's repeated
access-point section and its dynamic opportunity matrix. Six service questions
originated in the app and have `app_translations` copied from its language
dictionaries: these are provenance for the global UI dictionary and are not
merged into the standalone envelope. The service form still needs its Hub
adapter for map picking and repeat controls.

This bank is the source for future goal-based collections: a collection can
activate short flows for profile, travel habits, a mobility mode or a place and
reuse the same question IDs. The current application still loads the generated
forms, so adding a collection does not by itself enable a new runtime journey.
