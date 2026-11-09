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


## Current-main integration (2026-11-09)

Merged main 5a04c0c without rewriting the refactoring history. All forms and
definitions match that baseline byte for byte, including the unified profile,
minor wording refinements and pre-trip company correction. Preserved all fourteen
Flowi avatars, current report workflows and catalogue. Retained sparse modeler
settings, embedded services and separate technical settings/calendar. Runtime
export no longer requires the retired base.json.

Validation passes: actual CityMaaS merge/preload, current pilot-value preservation,
technical-document equality, campaign references, trip-company controls, sixteen
bundles/37 catalogue forms, eight-language coverage, six regressions and nineteen
SVGs. No deployment or new browser retest of this merged candidate is claimed;
earlier d9fd browser evidence remains tied to its original revision.
