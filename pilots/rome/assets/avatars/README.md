# Pilot avatars

The Rome catalogue is `index.json` in this folder, named by
`settings.applications.smart_urbanity_access_together.customization.landing.avatars`
(`{"path": "./pilots/rome/assets/avatars/index.json"}`) in `pilots/rome/app_look.json`. Each entry has a stable `id`, image `src` and
accessible `alt`; at most one entry has `default: true`. Without an explicit
default the first entry is used. An empty catalogue offers no avatar.

Relative `src` values in `index.json` are resolved next to it, at the selected
immutable revision. A pilot may still list its avatars inline in `landing.avatars`; then
relative `src` values are resolved from the repository root. Arrays replace the inherited catalogue. Other pilots declare their own catalogue
or explicitly inherit a shared one; Rome's images are not application defaults.

Only the selected ID is stored. A saved choice that names no catalogue entry, such as
one of the former Flowi images, uses the default.

These 14 user-supplied Flowi assets keep their drawing; only the background around
the figure is transparent, so each avatar sits on any card or top-bar colour. They
contain an inline PNG image in an SVG wrapper, with no external image references or
script. Their total size is 19,442,956 bytes (about 18.5 MiB); loading every choice
has that transfer cost before caching/compression. The chooser requests native lazy loading.

An avatar is a visual preference only. It does not select travel mode, mobility
profile, permissions or the application brand.
