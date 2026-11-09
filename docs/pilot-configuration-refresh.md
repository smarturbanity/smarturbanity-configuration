# Pilot configuration refactoring from the current main

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
app and spatial-server reader/defaults release. There is no old-layout fallback.
The previously tested runtime branch and its dev publication remain separate.
