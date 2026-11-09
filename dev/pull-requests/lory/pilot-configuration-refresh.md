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
defaults. This branch does not deploy consumers. The coordinated app retains both explicit source formats.


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

## Initial availability and filtering

The calendar opens profile and first walking only in normal use. Other campaigns
are coming soon without dates and declare their transport modes for existing app
filters. Block availability comes from the pilot: services/connections open,
experiences/streets closed. Debug preview behavior belongs to app code.

Actual loader/preload and preservation checks pass with this explicit source
addition, plus 444 calendar cases, 16 bundles/258 questions, six regressions and
19 SVGs. Questionnaire schemas and translations remain unchanged. Consumer
integration and application deployment remain separate.

## Pilot identity and dual-reader coordination

Rome now declares its search city, public territory description and per-application
initial cameras in pilot_identity. Values reproduce the current app defaults; no
questionnaire, campaign, service or Access Together technical setting changes.
The coordinated application retains the explicit legacy-manifest contract alongside
the split-source contract. Invalid chosen sources fail instead of falling back.
The new source layout requires the compatible app and existing spatial-server
branch first; old clients retain their old immutable configuration revision.
Actual merge/preload preservation checks pass. Browser acceptance and final
aggregate remain with the coordinated application candidate; no deployment claimed.
