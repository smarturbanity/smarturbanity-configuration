# Questionnaires per way of travelling — change notes

Every survey except `your_profile` becomes a chain of short questionnaires per way of travelling
(walking, cycling, e-scooter, public transport, car, motorcycle and scooter), decided by Lory on 2026-11-08.
The e-scooter chain (stand-up electric scooters, own or shared) was added the same day (Lory, decision 1).
The pieces of a chain are linked by the "Continue" button on the thank-you page (CityMaaS `followUpQuestionnaires`),
which skips the pieces already answered on the same device. `smarturbanity_daily_travel` is deleted: its questions moved to
`your_profile` and to the pieces (see "Daily travel").

All 39 pieces live in `forms/surveys/`, next to `smarturbanity_safety` and `smarturbanity_your_profile`, and sit in the
disabled `rome_travel_habits` campaign ("Travel habits", one campaign per topic; visible in debug mode) until the
persona test and approval. It was called `rome_future_surveys` ("Future questionnaires") until 2026-11-08.

Rules applied:

1. Every question comes from an existing form, rephrased as Yes/No, split per option or asked about another way of
   travelling. The only new questions are the ones Lory asked for on 2026-11-08 (see "New questions").
2. In Yes/No questions, "Yes" always means the problem is present (or, for improvements, that the change would help).
3. New Yes/No ids end in `_yn`, so answers never mix with the old 5-point or multiple-choice data. Questions asked about
   another way of travelling get that mode's prefix (`walk_`, `bike_`, `escooter_`, `put_` for public transport, `car_`,
   `motorcycle_`).
4. Only the weekly question of each chain is required; all others are optional, because some touch health or harassment.
5. The weekly question opens each chain (`walk_days`, `bike_weekly`, `escooter_weekly`, `put_weekly`, `car_weekly`,
   `motorcycle_weekly`).
   Who answers No is asked only why, and the chain stops there: CityMaaS `followUpStopWhen` hides "Continue".
   This replaces the earlier rule that everyone answers the walking safety questions (Lory, 2026-11-08, decision 2A).
6. Wheelchairs, pushchairs, canes and other aids are covered by the walking welcome text, so questions stay short.
7. Experience (stress, tiredness, time) and surroundings (noise, air, weather, cleanliness) are asked per way of
   travelling (decision 3B); the general travel questions are in `your_profile`.

## The chains

| Way of travelling | Pieces in order (questions) |
|---|---|
| Walking | `walking_habits` (13), `walking_road_safety` (24), `walking_security` (11), `walking_comfort` (12), `walking_experience` (10), `walking_improvements` (6) |
| Cycling | `cycling_habits` (13), `cycling_road_safety` (17), `cycling_security` (11), `cycling_comfort` (9), `cycling_experience` (10), `cycling_improvements` (1) |
| E-scooter | `e_scooter_habits` (12), `e_scooter_road_safety` (17), `e_scooter_security` (11), `e_scooter_comfort` (9), `e_scooter_experience` (10), `e_scooter_improvements` (1) |
| Public transport | `public_transport_habits` (13), `public_transport_road_safety` (7), `public_transport_security` (12), `public_transport_comfort` (13), `public_transport_experience` (10), `public_transport_without_car` (18), `public_transport_improvements` (7) |
| Car | `car_habits` (11), `car_road_safety` (14), `car_security` (10), `car_comfort` (12), `car_experience` (10), `car_need` (19), `car_alternatives` (4) |
| Motorcycle and scooter | `motorcycle_habits` (9), `motorcycle_road_safety` (18), `motorcycle_security` (11), `motorcycle_comfort` (8), `motorcycle_experience` (10), `motorcycle_need` (5), `motorcycle_improvements` (9) |

Each file is `smarturbanity_<piece>.json`, version 1.0.0, one to three minutes. Each piece carries the translations of
its own texts in en, it, fr, de, tr, fa, hu and ar.

## Replaced forms

Every question of these forms is in the chains, so their entries were removed from `forms/surveys/index.json`
(3.1.0 → 3.2.0), `forms/index.json` and the `rome_travel_habits` campaign:

- `smarturbanity_walking_safety` and `smarturbanity_walking_safety_details` (the earlier Yes/No walking forms, never published;
  the details file is removed);
- `future/smarturbanity_walking`, `future/smarturbanity_cycling`, `future/smarturbanity_public_transport`,
  `future/smarturbanity_car`, `future/smarturbanity_motorcycle`;
- `future/smarturbanity_experience_on_the_move` and `future/smarturbanity_safety_environment` (now asked per way of travelling).

With the questions used by the chains removed none of the seven `future/` forms keeps a question, so they are deleted
(Lory, 2026-11-08: remove the moved questions from the old forms) here and on the local `lory/future-questionnaires` and
`questionnaire-14` branches, together with their entries in `forms/index.json`, `forms/surveys/index.json` and the
`rome_travel_habits` campaign. `future/smarturbanity_about_you` and `future/smarturbanity_daily_travel` are emptied and deleted too (see "About you"
and "Daily travel").

Not carried over: walking `walk_days` from the walking form (the copy from the Yes/No walking form is used, same text
and options) and cycling `bike_risky_users` (replaced by one Yes/No question per road user).

Moved questions removed from the forms that stay:

| Form | This branch | `lory/future-questionnaires` | `questionnaire-14` |
| --- | --- | --- | --- |
| `future/smarturbanity_daily_travel` | 3.1.0 → 3.2.0: `combined_modes`, `multimodal_difficulties`, `multimodal_response` | 3.2.0 → 3.3.0: same three | 3.1.0 → 3.2.0: same three |
| `smarturbanity_safety` | 1.7.0 from `questionnaire-14` (see below) | 1.5.0 → 1.6.0: `fast_vehicles`, `walk_lighting_effect` | 1.7.0 already without them |

The published `smarturbanity_safety` form keeps its general safety questions (road safety, unsafe situations, personal
security by day and evening, insecurity factors) until the chains are published; then it is retired (decision 4A).

Lory (2026-11-08, decision 2A): this branch takes the `questionnaire-14` safety form 1.7.0 whole, so that branch keeps
nothing of its own. Compared with the 1.1.0 here it adds the six missing languages, the round25 wording fixes, the
evening follow-up `evening_travel_behaviour` (shown only to who feels not at all or slightly secure in the evening) and
the plain `personal_security_day` key, with the same text and options as `personal_security_day_v1`, following the
earlier removal of version suffixes from answer keys. The `questionnaire-14` neighbourhood help example (Gianicolense,
Portuense) is not taken.

## Combining ways of travelling

Lory (2026-11-08, decisions 1A 2B): every habits piece asks whether the citizen combines that way of travelling with
others in the same trip, instead of a separate chain; the three daily travel questions move there. One multiple choice
lists the other ways (Lory: one question with checkboxes, not one Yes/No per way).

| New id (`<p>` = `walk`, `bike`, `put`, `car`, `motorcycle`) | Source | Change |
| --- | --- | --- |
| `<p>_combines_yn` | daily travel `combined_modes` "I don't use any combination" | new Yes/No gate after the weekly question; help says a short walk to a stop or a parked vehicle does not count |
| `<p>_combined_modes` | daily travel `combined_modes` | same options and values without the piece's own way and without "I don't use any combination"; text "Which other ways of travelling do you use in the same trip?" |
| `<p>_combined_difficulties` | daily travel `multimodal_difficulties` | same text, options, `max_answers` 3 and "Other" |
| `<p>_combined_response` | daily travel `multimodal_response` | same text and options; asked unless the citizen has no significant difficulties |

The four questions sit in a last section "Combining ways of travelling", optional, shown only after a Yes to the weekly
question; the habits pieces now take about 2 minutes.

## About you

Lory (2026-11-08): the remaining "About you" questions move to `your_profile` and to the walking habits piece, and the
form is deleted on all three branches with its entries in `forms/index.json`, `forms/surveys/index.json` and the
`rome_travel_habits` campaign. Each branch moves its own wording and translations; where the profile already
translated "None" or "Other", its own translation is kept.

| Question | Goes to | Change |
| --- | --- | --- |
| `pet_walks` (`dog_walks` on this branch and `questionnaire-14`) | `your_profile`, after `carer` | same text and options |
| `reasons_outside` | `your_profile`, after `community_attachment` | same text and options |
| `professional_role` | `your_profile`, after `remote_work` | same text and options |
| `walk_distance` | walking habits, new section "Walking and physical fitness" | same text and options |
| `active_days` | walking habits, as `walk_active_days` | "In a typical week, on how many days do you walk, or go in your wheelchair, for at least 10 minutes at a time?"; same options |
| `fitness` | walking habits, as `walk_fitness` | "How would you describe your physical fitness for walking at the moment (strength, stamina, balance)?"; same options |
| `height` | walking habits | help: "Height affects the length of your step and your walking pace." |

`your_profile` gains one minute on each branch (this branch 1.12.0 → 1.13.0, `lory/future-questionnaires`
1.10.0 → 1.11.0, `questionnaire-14` 1.11.0 → 1.12.0). The fitness questions exist only on this branch, because the
other two have no walking habits piece; there they are deleted with the form. The walking habits piece stays at 1.0.0
(unpublished) and takes about 3 minutes. The new section follows the weekly question, so who answers No is not asked.

## Daily travel

Lory (2026-11-08, decisions 1A 2A 3A 4A): the remaining 13 questions of `future/smarturbanity_daily_travel` move to
`your_profile` and to the pieces, and the form is deleted on all three branches with its entries in `forms/index.json`,
`forms/surveys/index.json` and the `rome_travel_habits` campaign. In `your_profile` each branch moves its own wording
and translations; the two new section titles and the trip description come from `lory/future-questionnaires`.

| Question | Goes to | Change |
| --- | --- | --- |
| `vehicles_used` | `your_profile`, after `household_vehicles` | same text and options (kept apart from household vehicles, so earlier answers stay comparable) |
| `usual_mode`, `travel_times`, `shared_frequency`, `app_navigation`, `app_mobility`, `choice_factors` | `your_profile`, new section "How you get around" | same text and options |
| `frequent_trip_purpose`, `frequent_trip_frequency`, `frequent_trip_company` | `your_profile`, new section "Your most frequent trip" | same text and options; section description "The trip you make most often in a typical week. Other SmartUrbanity questions call it your usual trip." |
| `usual_mode_satisfaction` | each experience piece, as `<p>_satisfaction` | "When you walk, how satisfied are you overall?" (with each piece's own opening); optional instead of required; simplified option texts |
| `usual_mode_dissatisfied` | each experience piece, as `<p>_dissatisfied` | "When you walk, what are you least happy with?"; shown after a neutral or dissatisfied answer; simplified option texts without "Nothing in particular"; walking also without cost, environmental impact and reliability, cycling without environmental impact |
| `app_put_tickets` | `public_transport_habits`, last in "Public transport" | "How comfortable are you using apps to buy or validate bus, tram or metro tickets?"; shown after a Yes to the weekly question; answer key `app_pt_tickets` kept |

`your_profile` gains two minutes (this branch 1.13.0 → 1.14.0, `lory/future-questionnaires` 1.11.0 → 1.12.0,
`questionnaire-14` 1.12.0 → 1.13.0). The experience pieces go to 1.1.0 and 3 minutes, `public_transport_habits` to
1.1.0. The satisfaction and ticket questions exist only on this branch; on the other two they are deleted with the form.
The new satisfaction texts are translated in all eight languages.

## Dog area

Lory (2026-11-08): a dog area is both a service and an opportunity.

| File | Change |
| --- | --- |
| `definitions/types/service_types.json` 5.0.0 → 5.1.0 | `ST_61` "Dog area": "Public area, often fenced, where dogs can run and play off the lead."; subtypes "dog park", "fenced dog area" |
| `definitions/types/opportunities.json` 5.0.0 → 5.1.0 | `OP_47` "Dog walking & play": "Access to places where dogs can walk, run and play off the lead"; examples "dog area", "park" |
| `definitions/mappings/service_opportunity_mapping.json` 4.0.0 → 4.1.0 | `ST_61` → `OP_47`; `ST_31` Park → `OP_22`, `OP_47` |
| `definitions/mappings/opportunity_category_mapping.json` 4.0.0 → 4.1.0 | `OP_47` in `OC_10`, with `OP_22` |
| `definitions/mappings/social_function_opportunity_mapping.json` 4.0.0 → 4.1.0 | `OP_47` in `SP_06`, with `OP_22` |
| `pilots/rome/service_subtypes.json` | `ST_61`: "Area cani", "Area di sgambamento cani" |

Texts are translated in all eight languages. Only this branch changes; the service report matrix gains the new row
through the mapping.

## New questions (requested by Lory)

| Ids | Piece | Why |
|---|---|---|
| `not_walk_distance_yn`, `not_walk_effort_yn`, `not_walk_unsafe_yn`, `not_walk_streets_yn` | walking habits | reasons for walking rarely; reasons from daily travel `choice_factors` and walking `walk_improvements` |
| `not_bike_no_bike_yn`, `not_bike_distance_yn`, `not_bike_effort_yn`, `not_bike_unsafe_yn`, `not_bike_streets_yn` | cycling habits | reasons for cycling rarely, as for walking |
| `not_escooter_no_scooter_yn`, `not_escooter_distance_yn`, `not_escooter_effort_yn`, `not_escooter_unsafe_yn`, `not_escooter_streets_yn` | e-scooter habits | reasons for riding an e-scooter rarely, as for cycling |
| `not_put_slow_yn`, `not_put_unreliable_yn`, `not_put_effort_yn`, `not_put_unsafe_yn`, `not_put_cost_yn` | public transport habits | reasons for rarely using public transport |
| `not_car_no_car_yn`, `not_car_cost_yn`, `not_car_time_yn`, `not_car_stress_yn`, `not_car_unsafe_yn`, `not_car_other_ways_yn` | car habits | reasons for rarely travelling by car |
| `not_motorcycle_no_vehicle_yn`, `not_motorcycle_unsafe_yn`, `not_motorcycle_uncomfortable_yn`, `not_motorcycle_cost_yn` | motorcycle habits | reasons for rarely riding |
| `car_need_<trip>_yn` (18) and `car_less_with_alternative_yn` | car need | trips where the car is hard to replace, from citizens' comments forwarded by Lory |
| `put_no_car_yn` and `put_no_car_<trip>_yn` (17) | public transport without a car | the same trips, asked of people without a car (decision 5B) |
| `motorcycle_need_<trip>_yn` (4) and `motorcycle_less_with_alternative_yn` | motorcycle need | the trips of the car list that apply to riding |

The reason questions are shown only after a No to the weekly question. `*_effort_yn` is health data.

## Questions asked about another way of travelling

These come from one mode's form and are asked in another chain too. They can be removed one by one.

| New id | Source |
|---|---|
| `walk_crowding_comfort` | public transport `put_crowding_comfort` |
| `bike_health_benefit_yn` | walking `walk_health_benefit`, as Yes/No |
| `bike_`, `car_` and `motorcycle_` road users (8 each) | walking `risky_road_users` |
| `put_dark_lighting_change_yn`, `motorcycle_dark_lighting_change_yn` | safety `walk_lighting_effect` |
| `put_heat_waiting_yn`, `put_no_seats_yn`, `put_wayfinding_yn` | walking `walk_heat_shade_effect`, `benches_importance`, `wayfinding`, as Yes/No |
| `put_want_<change>_yn` (7) | walking `walk_improvements` and public transport options, as Yes/No |
| all `escooter_` questions | cycling, same question with `bike_` | "cycle" becomes "ride an e-scooter"; `escooter_type` asks own or shared; no health-benefit question; `escooter_barriers` asks about pedestrians in cycle lanes instead of pedestrians or e-scooters; `escooter_tiredness_cause` without carrying children or shopping, with physical effort described as standing and keeping balance; `escooter_improvements` replaces bike parking, training, junctions and money help with e-scooter versions and adds cheaper shared e-scooters and sharing in more areas |
| `car_hazard_confidence`, `car_charging` | motorcycle `motorcycle_hazard_confidence`, `motorcycle_charging` |
| `motorcycle_delay_stress` | car `car_delay_stress` |
| `motorcycle_poor_surface_unsafe_yn` | cycling `bike_poor_surface_effect`, as Yes/No |
| `motorcycle_want_<change>_yn` (5) | motorcycle form options, as Yes/No |
| `motorcycle_sustainable_motivation`, `motorcycle_free_shared_trial`, `motorcycle_cost_sensitivity`, `motorcycle_emissions` | car `car_sustainable_motivation`, `car_free_shared_trial`, `car_cost_sensitivity`, `car_emissions` |
| `<mode>_` experience (8) and surroundings (5) | `experience_on_the_move` and `safety_environment` |

## Walking questions (provenance)

The walking pieces reuse the Yes/No walking questions written earlier the same day.

| New id | Source | Data change |
|---|---|---|
| `walk_days` | walking `walk_days` 1.1.0 | same text, options and translations |
| `fast_traffic_along_unsafe_yn` | safety `fast_vehicles`, walking `avoid_fast_traffic` | 5-point frequency → Yes/No; walking along roads only |
| `fast_traffic_crossing_unsafe_yn` | safety `fast_vehicles`, walking `avoid_fast_traffic` | 5-point frequency → Yes/No; crossing roads only |
| `unsafe_crossings_yn` | walking `avoid_dangerous_crossing` | 5-point → Yes/No |
| `cyclists_scooters_unsafe_yn` | walking `riding_on_pavement` | 5-point → Yes/No |
| `poor_sidewalk_unsafe_yn` | walking `walk_sidewalk_condition_effect` | 5-point effect → Yes/No |
| `obstacles_near_traffic_yn` | walking `avoid_obstacles` | 5-point → Yes/No |
| `day_insecure_yn` | safety `personal_security_day` | 5-point + prefer-not-to-say → Yes/No; walking only |
| `evening_insecure_yn` | safety `personal_security_evening` | as above |
| `dark_lighting_change_yn` | safety `walk_lighting_effect` | 5-point effect → Yes/No |

For former 5-point items, a Yes/No answer corresponds to the stronger answers ("often", "a lot", "I avoid it")
versus the weaker ones; the two scales are not comparable answer by answer.

One Yes/No question per former option:

| Group | New ids | Source (multiple choice) |
|---|---|---|
| Road users | `car_drivers_unsafe_yn`, `motorcycle_riders_unsafe_yn`, `bus_drivers_unsafe_yn`, `delivery_vehicles_unsafe_yn`, `taxi_drivers_unsafe_yn`, `cyclists_unsafe_yn`, `e_scooter_riders_unsafe_yn`, `other_pedestrians_unsafe_yn` | walking `risky_road_users` |
| Situations on the road | `poor_visibility_unsafe_yn`, `unsafe_behaviour_unsafe_yn`, `crowding_conflicts_unsafe_yn`, `poor_infrastructure_unsafe_yn`, `no_emergency_services_unsafe_yn` | safety `road_unsafe_situations` |
| Personal security | `isolated_areas_yn`, `aggressive_behaviour_yn`, `identity_harassment_yn`, `blind_corners_yn`, `poor_maintenance_yn`, `no_surveillance_yn`, `past_incidents_yn`, `overcrowding_yn` | safety `insecurity_factors_detailed` |
| Barriers on your route | `steps_without_ramps_yn`, `missing_dropped_kerbs_yn`, `narrow_paths_yn`, `missing_tactile_paving_yn`, `low_branches_yn`, `stairs_only_way_yn`, `no_sidewalk_yn`, `pedestrian_lights_out_of_order_yn` | walking `walk_physical_barriers` |
| What would make walking safer | `want_safer_crossings_yn`, `want_better_lighting_yn`, `want_separation_yn`, `want_better_sidewalks_yn`, `want_audible_signals_yn`, `want_cleaner_streets_yn`, `want_sidewalks_where_missing_yn`, `want_longer_green_time_yn` | walking `walk_improvements` |

The other chains ask the "Situations on the road" and "Personal security" groups with their prefix (`bike_`, `escooter_`,
`put_`, `car_`, `motorcycle_`); cycling and e-scooter leave out `poor_infrastructure_unsafe_yn`, covered by its infrastructure questions.
Public transport adds `put_long_evening_waits_yn` from the safety option `long_evening_waits`.

Dropped options: "none" / "never unsafe" / "never insecure" / "nothing" (implied by all No) and "other".
A multiple choice with `max_answers` becomes independent Yes/No answers, so counts per item are no longer capped.

## Not yet covered

- CityMaaS Access Together still lists `smarturbanity_about_you` in its "About you" menu (`aboutYouForms`); it
  must point to `smarturbanity_your_profile` before this configuration is used there.

- CityMaaS `QuestionnaireResponseFirestoreRules` test uses `smarturbanity_daily_travel` as a sample id; check it still holds
  when the pin moves to a configuration without that form.
- CityMaaS needs the chain and stop rules in `surveys-gallery.json` (branch `lory/questionnaire-follow-up`), including the
  new e-scooter chain (stop when `escooter_weekly` is No).
- The e-scooter pieces reuse the cycling picture; a dedicated e-scooter image is still to be made.
- CityMaaS `SmartUrbanityExternalConfiguration` test expects 22 forms and release version 3.0.0 in the pinned configuration;
  it must be updated when the pin moves to a configuration that includes these forms.
