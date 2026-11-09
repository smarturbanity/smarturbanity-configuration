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

- Each campaign declares `transport_modes`, an array of stable mode IDs:
  `walk`, `bike`, `e_scooter`, `transit`, `car`, `motorcycle`, reusing the
  application's existing campaign-group IDs.
  An empty array means a general campaign, not an unknown mode. Filters use this
  metadata, never campaign names or questionnaire-ID prefixes. This does not
  change availability or automatically hide general campaigns when filtering.

- `enabled: false` continues to deny starting a form, including through direct
  links or follow-up offers. `publication_state: "coming-soon"` on a disabled
  campaign explicitly requests the label **Coming soon**, without an opening date.
- This publication metadata does not grant access and is not a scheduled opening.
  The renderer can expose such a campaign as `upcoming` with `startsOn: null`;
  it must not substitute the pilot start date or invent another date.
- Missing publication metadata preserves existing campaign behavior. A disabled
  campaign without this metadata is not automatically a coming-soon campaign.
- Debug visibility is application-code policy. The pilot must not carry a
  `show_all_in_debug` option. Normal availability remains controlled by the
  campaign calendar; the app owns its debug/review preview behavior and tests.
- Follow-up mappings describe relationships, not permission to open another form
  in normal use. A closed follow-up must not be offered after profile or first
  walking submission outside the code-owned debug/review behavior.

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

