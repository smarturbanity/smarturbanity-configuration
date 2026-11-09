# Separate pilot data, technical settings and schedule

The configuration currently repeats the application baseline in external base and
manifest files and mixes technical settings into the modeler document. Load the
baseline from CityMaaS and separate Rome's modeler data, technical settings and
schedule. Embed current service subtypes in the modeler document.

All current questionnaires and shared definitions remain unchanged. A verifier
executes the actual app merge/preload and proves that current pilot values and
service subtypes survive the new layout. Six questionnaire regressions and twenty
SVG validations pass.

Requires the corresponding CityMaaS and spatial-server readers with code-owned
defaults. This branch does not deploy consumers or provide old-layout fallback.


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
