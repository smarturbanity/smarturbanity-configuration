# Replace household income with travel given up for cost

Owner: Lory. Scope: the profile survey only. The primary checkout stays on main.

Replace `economic_status` with `travel_given_up_cost` and the conditional
`travel_given_up_purposes`, both 1.0.0, in eight languages; profile 2.2.0.

Completed. Checked against CityMaaS at-questionnaire-behaviour:
verify_questionnaire_languages, verify_survey_bundles and its test,
verify_campaign_launch, verify_location_context, verify_profile_browser,
verify_survey_assets and git diff --check passed. verify_pilot_configuration
fails identically on main ("Application configuration type is not set"), so it
is unrelated. Open: Marzieh's review, the shared question pool and the CityMaaS
language files that still carry the old income text.
