# Minimal questionnaire runtime

Requested outcome: retain only the runtime additions still needed for app delivery,
starting from current main. Eight runtime files are extracted without carrying the
old questionnaire composition tools or stale form copies. Questionnaires remain
identical to main. The frozen source pin and runtime payload remain unchanged.

Focused source checks and six regressions pass. The delivery materializer verifies
Git object provenance and creates a fresh package. App-wide verification and dev
publication remain owned by the active application coordinator. No push here.

Retain questionnaire-runtime-open12 and historical source objects until the
application coordinator releases its frozen verification dependencies.
