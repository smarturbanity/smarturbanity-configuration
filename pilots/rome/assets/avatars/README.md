# Pilot avatars

The Rome catalogue is `settings.applications.smart_urbanity_access_together.flow.landing.avatars`
in `pilots/rome/application.json`. Each entry has a stable `id`, image `src` and
accessible `alt`; at most one entry has `default: true`. Without an explicit
default the first entry is used. An empty catalogue offers no avatar.

Relative `src` values are resolved from the configuration repository root at the
selected immutable revision, not from the application document's directory.
Arrays replace the inherited catalogue. Other pilots declare their own catalogue
or explicitly inherit a shared one; Rome's images are not application defaults.

Only the selected ID is stored. `legacySources` lists exact former source values;
`legacyIndices` lists former numeric choices. Both map to the declaring entry and
must be unambiguous across the catalogue. Removed selections use the default.
The three former Flowi choices migrate to the walking avatar.

These 14 user-supplied Flowi assets keep their drawing; only the background around
the figure is transparent, so each avatar sits on any card or top-bar colour. They
contain an inline PNG image in an SVG wrapper, with no external image references or
script. Their total size is 19,442,956 bytes (about 18.5 MiB); loading every choice
has that transfer cost before caching/compression. The chooser requests native lazy loading.
The runtime materializer includes the complete `pilots` directory, including SVGs.

An avatar is a visual preference only. It does not select travel mode, mobility
profile, permissions or the application brand.
