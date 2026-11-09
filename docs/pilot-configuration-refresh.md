# Pilot configuration refactoring from the current main

The active consolidated candidate is now `lory/pilot-configuration-checks`,
targeting `main`. Its single [PR description](../dev/pull-requests/lory/pilot-configuration-checks.md)
includes the complete refactoring and campaign history. The sections below record
the original implementation and checks; consolidation changes no runtime files.

This branch starts at `655bbc8` and reapplies the configuration design from
`lory/pilot-configuration-defaults`, without merging its older questionnaires.

## Ownership

CityMaaS owns the common defaults. The pilot document owns modeler data,
presentation overrides and embedded service-subtype data. Its `application_config`
reference selects a separate technical document. The schedule stays separate and
owns campaign/container associations.

The former external base, three application manifests, pilot index and separate
service-subtype dataset are removed. All current pilot values survive the actual
app merge. All forms and shared definitions remain byte-identical to the starting
main. Service subtypes are copied from current main, not from the old branch.

Current language, integration settings, consent settings and hidden options move
unchanged to the technical document. The old refactoring's Rome default city and
Italian report language are retained as application settings. No additional privacy
contact is invented or restored from the old branch. Existing campaign content is
preserved; empty container associations retain the ordinary offer.

## Verification

Run `node tools/verify_pilot_configuration.mjs <CityMaaS-checkout>` against a
checkout with the new reader and its code-owned defaults. The verifier executes
the actual merge and preload functions using local file transport, checks every
current pilot value, preserves service subtypes and questionnaire files, and
rejects mixed technical ownership and mismatched pilot identities.

Verified against the Access Together development checkout. The six questionnaire
regressions and all twenty SVG validations also pass.

This is a configuration candidate, not a deployment. It requires the corresponding
app and spatial-server reader/defaults release. The coordinated app reader retains explicit support for both layouts; this source candidate uses the split layout. A broken selected source never silently falls back to another format.
The previously tested runtime branch and its dev publication remain separate.

## Subsequent questionnaire request

After the isolated refactoring commit, Lory requested a pre-trip company correction.
That separate change is described in [the trip-survey comparison](trip-survey-comparison.md).
The original byte-preservation statement above applies to the refactoring itself;
the subsequent pre-trip revision is an intentional, separately tested exception.


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

## Campaign and block integration (2026-11-09)

Integrated campaign-launch 2c78b8d without rewriting history. Normal questionnaire
availability opens only profile and first walking; other campaigns explicitly
remain coming soon without dates. Campaigns declare transport_modes using existing
app group IDs. Debug visibility is code-owned, with no pilot switch.
The pilot technical document explicitly preserves services/connections open and
experiences/streets closed through contentsAvailability. The actual app merge and
preload preserve this addition; all other technical settings still match main.

Verified actual merge/preload, 444 calendar cases over 37 catalogue forms, exact
mode mappings, 16 bundles/258 questions, six regression tests and 19 SVGs. Forms
and definitions remain identical to 5a04c0c. This integration is not an app release.

## Pilot presentation and identity

The pilot owns `pilot_identity.city`, its public place description and one shared
initial view in `map.initial_view`. Rome retains its existing center and zoom.
Legacy clients keep their current source revision and the compatible application
reader retains the legacy contract; removing old support is outside this change.

Layer presentation overrides live under `presentation.layers`, `layer_fields`,
`visualizations` and per-view `hub_layers`. Objects remain sparse and arrays replace.
The modeler can choose visibility, order, opacity, line width, labels, fields,
available map themes and the initial theme. Sources, formulae, data bindings,
permissions and semantic evidence styles remain owned by application code.
Campaigns and the existing Access Together technical settings are unchanged.
Application browser acceptance is recorded in its coordinated PR, not inferred here.

`map.zoom_limits` optionally sets `min` and `max` per application ID. Rome retains
the current Access Together minimum of 14. An omitted maximum preserves the
renderer/basemap limit; an explicit maximum cannot enlarge raster tiles beyond
their native detail. These limits do not duplicate the center. Legacy per-app
initial views remain readable but are not generated by the editor.
