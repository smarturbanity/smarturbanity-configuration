# Rome avatars in an index file, "flow" renamed "customization"

Source: lory/avatars-index-customization. Target: main (human integration only).

The Rome pilot lists its fourteen Access Together avatars in `pilots/rome/assets/avatars/index.json`, whose `src` entries resolve next to the index; `app_look.json` points to it with `customization.landing.avatars.path`. The pilot application block `flow` is renamed `customization` in `app_look.json` and `reports.json`. Avatars, texts and reports are unchanged for citizens.

Requires the CityMaaS release lory/app-ritocchi-dev-release, which reads the index and the `customization` key (and still accepts `flow`). The deployed release before it rejects `customization`, so merge only after that release is deployed, then enable this revision with a new versions.json pin.

Validation: verify_pilot_configuration, verify_campaign_launch, verify_survey_bundles and verify_questionnaire_languages pass against that CityMaaS release; its Access Together loader resolves the index to the 14 avatars with absolute URLs.

Publication: task branch pushed for human integration.
