# Questionnaires per way of travelling — change notes

Every survey except `your_profile` becomes a chain of short questionnaires per way of travelling
(walking, cycling, public transport, car, motorcycle and scooter), decided by Lory on 2026-11-08.
The pieces of a chain are linked by the "Continue" button on the thank-you page (CityMaaS `followUpQuestionnaires`),
which skips the pieces already answered on the same device. `smarturbanity_daily_travel` (without its combined-trip
questions, now in the habits pieces) and `smarturbanity_about_you` are offered first.

All 33 pieces live in `forms/surveys/`, next to `smarturbanity_safety` and `smarturbanity_your_profile`, and sit in the
disabled `rome_future_surveys` campaign (visible in debug mode) until the persona test and approval.

Rules applied:

1. Every question comes from an existing form, rephrased as Yes/No, split per option or asked about another way of
   travelling. The only new questions are the ones Lory asked for on 2026-11-08 (see "New questions").
2. In Yes/No questions, "Yes" always means the problem is present (or, for improvements, that the change would help).
3. New Yes/No ids end in `_yn`, so answers never mix with the old 5-point or multiple-choice data. Questions asked about
   another way of travelling get that mode's prefix (`walk_`, `bike_`, `put_` for public transport, `car_`, `motorcycle_`).
4. Only the weekly question of each chain is required; all others are optional, because some touch health or harassment.
5. The weekly question opens each chain (`walk_days`, `bike_weekly`, `put_weekly`, `car_weekly`, `motorcycle_weekly`).
   Who answers No is asked only why, and the chain stops there: CityMaaS `followUpStopWhen` hides "Continue".
   This replaces the earlier rule that everyone answers the walking safety questions (Lory, 2026-11-08, decision 2A).
6. Wheelchairs, pushchairs, canes and other aids are covered by the walking welcome text, so questions stay short.
7. Experience (stress, tiredness, time) and surroundings (noise, air, weather, cleanliness) are asked per way of
   travelling; `daily_travel` keeps the general questions (decision 3B).

## The chains

| Way of travelling | Pieces in order (questions) |
|---|---|
| Walking | `walking_habits` (9), `walking_road_safety` (24), `walking_security` (11), `walking_comfort` (12), `walking_experience` (8), `walking_improvements` (6) |
| Cycling | `cycling_habits` (13), `cycling_road_safety` (17), `cycling_security` (11), `cycling_comfort` (9), `cycling_experience` (8), `cycling_improvements` (1) |
| Public transport | `public_transport_habits` (12), `public_transport_road_safety` (7), `public_transport_security` (12), `public_transport_comfort` (13), `public_transport_experience` (8), `public_transport_without_car` (18), `public_transport_improvements` (7) |
| Car | `car_habits` (11), `car_road_safety` (14), `car_security` (10), `car_comfort` (12), `car_experience` (8), `car_need` (19), `car_alternatives` (4) |
| Motorcycle and scooter | `motorcycle_habits` (9), `motorcycle_road_safety` (18), `motorcycle_security` (11), `motorcycle_comfort` (8), `motorcycle_experience` (8), `motorcycle_need` (5), `motorcycle_improvements` (9) |

Each file is `smarturbanity_<piece>.json`, version 1.0.0, one to three minutes. Each piece carries the translations of
its own texts in en, it, fr, de, tr, fa, hu and ar.

## Replaced forms

Every question of these forms is in the chains, so their entries were removed from `forms/surveys/index.json`
(3.1.0 → 3.2.0), `forms/index.json` and the `rome_future_surveys` campaign:

- `smarturbanity_walking_safety` and `smarturbanity_walking_safety_details` (the earlier Yes/No walking forms, never published;
  the details file is removed);
- `future/smarturbanity_walking`, `future/smarturbanity_cycling`, `future/smarturbanity_public_transport`,
  `future/smarturbanity_car`, `future/smarturbanity_motorcycle`;
- `future/smarturbanity_experience_on_the_move` and `future/smarturbanity_safety_environment` (now asked per way of travelling).

With the questions used by the chains removed none of the seven `future/` forms keeps a question, so they are deleted
(Lory, 2026-11-08: remove the moved questions from the old forms) here and on the local `lory/future-questionnaires` and
`questionnaire-14` branches, together with their entries in `forms/index.json`, `forms/surveys/index.json` and the
`rome_future_surveys` campaign. `future/smarturbanity_about_you` shares no question with the chains or with
`your_profile` and stays as it is.

Not carried over: walking `walk_days` from the walking form (the copy from the Yes/No walking form is used, same text
and options) and cycling `bike_risky_users` (replaced by one Yes/No question per road user).

Moved questions removed from the forms that stay:

| Form | This branch | `lory/future-questionnaires` | `questionnaire-14` |
| --- | --- | --- | --- |
| `future/smarturbanity_daily_travel` | 3.1.0 → 3.2.0: `combined_modes`, `multimodal_difficulties`, `multimodal_response` | 3.2.0 → 3.3.0: same three | 3.1.0 → 3.2.0: same three |
| `smarturbanity_safety` | 1.1.0 (unpublished): `bike_risky_users` | 1.5.0 → 1.6.0: `fast_vehicles`, `walk_lighting_effect` | 1.7.0 already without them |

The published `smarturbanity_safety` form keeps its general safety questions (road safety, unsafe situations, personal
security by day and evening, insecurity factors) until the chains are published; then it is retired (decision 4A).

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

## New questions (requested by Lory)

| Ids | Piece | Why |
|---|---|---|
| `not_walk_distance_yn`, `not_walk_effort_yn`, `not_walk_unsafe_yn`, `not_walk_streets_yn` | walking habits | reasons for walking rarely; reasons from daily travel `choice_factors` and walking `walk_improvements` |
| `not_bike_no_bike_yn`, `not_bike_distance_yn`, `not_bike_effort_yn`, `not_bike_unsafe_yn`, `not_bike_streets_yn` | cycling habits | reasons for cycling rarely, as for walking |
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
| Barriers on your route | `steps_without_ramps_yn`, `missing_dropped_kerbs_yn`, `narrow_paths_yn`, `missing_tactile_paving_yn`, `low_branches_yn` | walking `walk_physical_barriers` |
| What would make walking safer | `want_safer_crossings_yn`, `want_better_lighting_yn`, `want_separation_yn`, `want_better_sidewalks_yn`, `want_audible_signals_yn`, `want_cleaner_streets_yn` | walking `walk_improvements` |

The other chains ask the "Situations on the road" and "Personal security" groups with their prefix (`bike_`, `put_`,
`car_`, `motorcycle_`); cycling leaves out `poor_infrastructure_unsafe_yn`, covered by its infrastructure questions.
Public transport adds `put_long_evening_waits_yn` from the safety option `long_evening_waits`.

Dropped options: "none" / "never unsafe" / "never insecure" / "nothing" (implied by all No) and "other".
A multiple choice with `max_answers` becomes independent Yes/No answers, so counts per item are no longer capped.

## Not yet covered

- CityMaaS needs the chain and stop rules in `surveys-gallery.json` (branch `lory/questionnaire-follow-up`).
- CityMaaS `SmartUrbanityExternalConfiguration` test expects 22 forms and release version 3.0.0 in the pinned configuration;
  it must be updated when the pin moves to a configuration that includes these forms.
