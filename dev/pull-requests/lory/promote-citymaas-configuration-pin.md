# Enable the CityMaaS-tested configuration revision

Enable `1d4b38f`, the configuration revision pinned and exercised by the
CityMaaS architecture-migration candidate. It descends from the currently
enabled `37b19e6` revision and includes the accepted consent, language,
opportunity-category and Rome study-area updates up to that point.

The promotion deliberately stops at `1d4b38f`; later configuration commits on
`main` remain disabled until their application compatibility is verified.

Validation: all 69 JSON files parse; campaign, trip, survey-bundle, location and
language checks pass. CityMaaS server, deployment, maintenance, repository,
Firestore and complete E2E suites passed against this exact revision. The legacy
pilot verifier no longer matches either the migrated CityMaaS paths or the older
checkout API; the browser coverage is the current compatibility proof. The
separate CityMaaS browser suite retains five pre-existing failures unrelated to
the configuration pin.

Owner: Lory.
