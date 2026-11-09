# Minimal questionnaire runtime

Requested outcome: retain only the runtime additions still needed for app delivery,
starting from current main. Eight runtime files are extracted without carrying the
old questionnaire composition tools or stale form copies. Questionnaires remain
identical to main. Catalogue and workflow paths use local forms, without raw URLs
to another commit. Manifest paths resolve against the manifest; Rome paths resolve
against the configuration root, as implemented by ConfigurationDataSource.js.

Focused source checks and six regressions pass. The delivery materializer verifies
Git object provenance and creates a fresh package. App-wide verification and dev
publication remain owned by the active application coordinator. No push here.

Retain questionnaire-runtime-open12 and historical source objects until the
application coordinator releases its frozen verification dependencies.
