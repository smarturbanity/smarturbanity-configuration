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
