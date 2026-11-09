# Minimal questionnaire runtime integration

This candidate starts from main `8bb47bf01be961ac014cc48a2e04294203cd7f8d`.
It extracts only eight runtime files from `5e3a11b52bfec4deef686bcab617ee33bec286cf`:
three manifest catalogues, Rome application settings, its file index, pilot
questionnaire overrides, campaign containers and the delivery materializer.
All questionnaire forms, assets, tests and source documentation remain from main.
No retired short forms, composition builder or composition specifications are copied.

Questionnaire paths refer to the package's own `forms` directory: `../forms` in
manifests and `./forms` in the Rome override, which the consumer resolves against
the root index. Report workflow paths follow the same rule. No questionnaire URL
pins an external commit. Administration and the unified profile-to-travel campaign
retain the previous candidate's contents.
There is no old-format fallback or migration.

Generate a fresh immutable package with
`python tools/materialize_runtime_package.py --runtime <full-commit> --source 00d91e2581f4b020b8dae9c7d9c167a86f8dc57a --output-parent <directory>`.
The materializer is unchanged; runtime paths now refer to local forms.
The new revision changes package identity, so the application owner must update
its pin and repeat integrated verification before publication.

Source checks pass: 16 mode forms, 51 sections, 258 questions, 37 catalogue forms,
six regression cases, 19 distinct SVGs, framework-owned translations and two
location-report flows in eight languages. Full application/browser acceptance
belongs to the application coordinator. No publication is performed here.
