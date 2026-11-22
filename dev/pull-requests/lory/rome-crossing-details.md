# Publish crossing and street details for Rome

The Rome data model now derives each crossing's control (`crossing_kind`:
traffic lights, marked without lights, unmarked) and users (`crossing_users`:
pedestrians only, separate bike lane, shared, bikes not marked) from the
OpenStreetMap tags of the crossing node. A crossing whose tags say nothing is
left unknown rather than guessed.

The connections package now also carries the crossing node's island, tactile
paving, sound signal, vibrating button, kerb, wheelchair and lighting tags, and
street segments carry `physical_infrastructure.surface` and `.lit`, so Access Hub
can show them in the crossing and street details. Missing values are omitted.

The derivation needs the CityMaaS preparation step that reads `cases` in
`derived_properties` (release candidate `lory/app-ritocchi-dev-release`); older
code ignores these rules. `versions.json` is unchanged. The Rome model package
must be rebuilt and republished before the details appear in the apps.

`tools/verify_pilot_configuration.mjs` passes against the matching CityMaaS
candidate.
