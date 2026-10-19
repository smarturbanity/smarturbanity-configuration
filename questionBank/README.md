# SmartUrbanity question bank

`questions/<project>/<key>.json` is the single catalog file for a question ID
`<project>:<key>`. Each file contains its answer schema, translations, originating
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
sections of question references. A node's `overrides` contains flow-specific
visibility (`show_if`), requirement (`required`) and element prefill
(`prefill_from`). Together, order and visibility conditions describe the current
conditional path through the questionnaire. Flow-wide copy and translations stay
in the flow; question wording, help, option labels and their translations live
in the question files. This includes the generated “Other”, “I don't know” and
“Prefer not to say” labels when the current form supplies their translations.

The existing `forms/` JSON remains the format consumed by the current
application. It can be reproduced from this bank:

```sh
node questionBank/build.mjs --check   # compare all 21 generated forms with forms/
node questionBank/build.mjs           # write the forms after intentional edits
node questionBank/audit.mjs           # list variants and repeated prompts across IDs
```

Edit a question file to change its wording or translation wherever that variant
is used. Edit a flow to select, order or condition questions, or to change its
welcome and final copy. Update `questionBank/index.json` when adding a question
or flow. Keep the original `answer_key` and option values when existing responses
must remain comparable; create a new key when the meaning or answer scale changes.

This bank is the source for future goal-based collections: a collection can
activate short flows for profile, travel habits, a mobility mode or a place and
reuse the same question IDs. The current application still loads the generated
forms, so adding a collection does not by itself enable a new runtime journey.
