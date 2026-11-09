# Flowi avatars with a transparent background

The 14 Flowi avatars of the Rome pilot keep their drawing; the background around
the figure is now transparent, so each avatar sits on any card or top-bar colour
of Access Together. Total size drops from about 27.1 MiB to 18.5 MiB. Avatar IDs,
the catalogue in `pilots/rome/application.json` and stored choices are unchanged.

Checked: `tools/verify_pilot_configuration.mjs` and `tools/verify_survey_assets.py`
pass. The app shows the new images only after the configuration pin moves to a
revision that contains them; no pin change or push included.
