# Initial questionnaire availability

The Rome schedule owns questionnaire availability. The initial release opens
`smarturbanity_your_profile` and `smarturbanity_walking_trips_and_safety` only.
The walking campaign has an explicit opening date of 2026-11-09, independent of
the pilot start date. The profile keeps its existing opening date.

`rome_profile` now contains only the profile. Your travel is assigned to the
existing future campaign; the second walking questionnaire has its own campaign,
`rome_walking_experience`. Other mode campaigns remain closed. Every scheduled
form belongs to exactly one campaign.

## Rendering contract

- `enabled: false` continues to deny starting a form, including through direct
  links or follow-up offers. `publication_state: "coming-soon"` on a disabled
  campaign explicitly requests the label **Coming soon**, without an opening date.
- This publication metadata does not grant access and is not a scheduled opening.
  The renderer can expose such a campaign as `upcoming` with `startsOn: null`;
  it must not substitute the pilot start date or invent another date.
- Missing publication metadata preserves existing campaign behavior. A disabled
  campaign without this metadata is not automatically a coming-soon campaign.
- `rules.show_all_in_debug: false` keeps the same availability in normal, debug
  and review modes. Profile and first walking remain open; later forms do not
  become answerable just because review mode is enabled.
- Follow-up mappings describe relationships, not permission to open another form.
  A closed follow-up must not be offered after profile or first walking submission.

The current application adapter needs the generic coming-soon presentation
support. Older consumers safely keep these disabled campaigns closed but may hide
them. Application rendering, integration, bundle pin and app verification belong
to the app owner. This source change does not deploy the app, change answers or
storage, or activate the separate pilot-configuration refactoring branch.

## Verification

Run `node tools/verify_campaign_launch.mjs <CityMaaS-checkout>` to exercise the
actual campaign consumer against all catalogue entries, verify that follow-up
targets remain closed, and check normal/debug/review combinations and dates
before/after the pilot start. Gallery rendering is verified in the app integration.
# Report and service blocks

The pilot application configuration owns `settings.applications.smart_urbanity_access_together.accessTogether.contentsAvailability`.
The existing generic menu and direct-entry guard consume these category booleans: `services` and `connections` remain available; `experiences` and `streets` remain coming soon.
This moves the current rollout policy to its source without closing previously authorized features. The app must not maintain a second pilot-specific availability list.

