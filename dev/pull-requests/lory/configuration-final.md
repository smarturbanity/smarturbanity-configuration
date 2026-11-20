# Final configuration branch

Source: `lory/configuration-final`. Target: `main`.

One branch, started from the current `main` (Health consent marks, #61), that joins the
configuration work still open:

- `lory/connections-in-code`: Rome's Movesion client and answers database move to
  CityMaaS, which now keeps them in its shared `connections.json`; this repository keeps
  only content and interface.
- `lory/form-versions-coherent`: form workflow versions match their forms.
- `lory/pilot-drafts`: Karlsruhe, İzmir, Lyon and the Greater Zurich Area as draft
  pilots, with the research consent and place perception publication rules shared by
  every pilot.

The pilot check now expects the two shared parts every pilot lists. The other branches
(`lory/health-consent-marks`, `lory/surveys-required-privacy`) are already in `main`; the
October local branches and the 14 November Rome campaign branch are superseded by `main`.

Checked against the CityMaaS release candidate: `verify_pilot_configuration`,
`verify_campaign_launch`, `verify_location_context`, `verify_questionnaire_languages`,
`verify_survey_bundles` and its test, `verify_trip_company`, `verify_survey_assets` and
`git diff --check` pass. `verify_profile_browser` fails on `main` too (9 of 21 visible
questions for the resident worker), so it is not caused by this branch.
