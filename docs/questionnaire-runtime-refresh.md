# Questionnaire delivery package

Runtime configuration, questionnaires and assets must come from the same full
commit of `lory/questionnaire-runtime-refresh`. Do not combine different source
revisions. The application code remains in its own repository.

Generate a new package with:

`python tools/materialize_runtime_package.py --revision <full-branch-commit> --output-parent <directory>`

Questionnaires load from the package's `forms` directory: `./forms` in Rome
overrides, resolved against the configuration root index. The unused installation
manifests have been removed; CityMaaS loads the pilot directly.
Report workflows use the same local directory. No external questionnaire commit,
retired forms or old-format compatibility is required.

Checks pass for 16 mode surveys, 258 questions, 37 catalogue forms, six regression
cases, 19 SVGs, framework translations and both location-report flows. The actual
path resolver verifies the local catalogue and ten report paths. The application coordinator
verifies the generated package in the browser and full suite before publication.
