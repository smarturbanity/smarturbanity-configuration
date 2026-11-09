# Pilot configuration refresh

Start: current main `655bbc8`. Rebuild the pilot configuration refactoring on a new
branch, preserving current questionnaire content. Keep the prior runtime candidate
available for its separate development publication.

Implemented: code-owned baseline; pilot modeler document with embedded service
subtypes; separate technical application settings; separate campaign calendar and
container associations; removal of obsolete base/manifests/per-pilot index.

Validation: actual CityMaaS merge and preload pass; all current pilot settings and
service data preserved; forms/definitions unchanged; invalid ownership and pilot
identity rejected; six questionnaire regressions and twenty SVGs pass.

No publication or deployed-app verification is claimed for this new candidate.
