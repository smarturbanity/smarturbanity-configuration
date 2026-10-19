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

The existing `forms/` JSON remains the standalone exchange and response format
consumed by the current application. It can be reproduced from this bank:

```sh
node questionBank/build.mjs --check   # compare all 22 generated forms with forms/
node questionBank/build.mjs           # write the forms after intentional edits
node questionBank/audit.mjs           # list variants and repeated prompts across IDs
node questionBank/build.mjs --export-dir ../questionnaires-for-colleagues
node questionBank/import.mjs ../questionnaires-for-colleagues/smarturbanity_about_you.json --check
node questionBank/import.mjs ../questionnaires-for-colleagues/smarturbanity_about_you.json
```

Edit a question file to change its wording or translation wherever that variant
is used. Edit a flow to select, order or condition questions, or to change its
welcome and final copy. Update `questionBank/index.json` when adding a question
or flow. Keep the original `answer_key` and option values when existing responses
must remain comparable; create a new key when the meaning or answer scale changes.

Export writes one autonomous JSON per questionnaire, with the same envelope as
`forms/`. When its content matches `forms/`, the export is byte-for-byte identical.
Import accepts an existing questionnaire's standalone JSON, first builds and
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
