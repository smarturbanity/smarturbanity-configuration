# Walking safety questionnaires (Yes/No) — change notes

Two new forms replace the walking material spread across `future/smarturbanity_walking.json`,
`smarturbanity_safety.json` and `future/smarturbanity_safety_environment.json`:

- `smarturbanity_walking_safety` (Part 1, about 3 minutes, 10 questions plus 4 for people who rarely walk);
- `smarturbanity_walking_safety_details` (Part 2, follow-up offered after Part 1, 29 questions).

Rules applied:

1. Every question is taken from an existing form, rephrased as Yes/No or split per option. The only new questions are the
   four reasons for walking rarely, requested by Lory on 2026-11-08 (see Part 1).
2. "Yes" always means the problem is present (or, for improvements, that the change would help).
3. New question ids end in `_yn` (except `walk_days`, reused unchanged), so answers never mix with the old 5-point or multiple-choice data.
4. Only `walk_days` is required; all others are optional, as in the safety form, because some touch harassment.
5. Everyone answers all Part 1 safety questions, including people who walk less than once a week. Who answers No to
   `walk_days` is first asked why, including whether safety is the reason.
6. Wheelchairs, pushchairs, canes and other aids are covered by the welcome text, so questions stay short.

Both forms sit in the disabled `rome_future_surveys` campaign (visible in debug mode) until the persona test and approval.

## Questions removed from the source forms (2026-11-08)

| Form | New version | Removed questions |
|---|---|---|
| `smarturbanity_safety` | 1.0.0 → 1.1.0 | `fast_vehicles`, `walk_lighting_effect` |
| `future/smarturbanity_walking` | 3.1.0 → 3.2.0 | `walk_physical_barriers`, `walk_sidewalk_condition_effect`, `avoid_obstacles`, `avoid_dangerous_crossing`, `avoid_fast_traffic`, `risky_road_users`, `riding_on_pavement`, `walk_improvements` |

Their translations were removed with them. The walking form keeps `walk_days` and the comfort questions (slope, benches,
greenery, shade and heat, signs, health), which have no Yes/No counterpart; its estimated time drops from 7 to 3 minutes.
The safety questions that cover every way of travelling (`road_unsafe_situations`, `personal_security_day_v1`,
`personal_security_evening`, `insecurity_factors_detailed`) stay in the safety form, because the new forms ask them about walking only.

## Part 1

| New id | Source | Data change |
|---|---|---|
| `walk_days` | walking `walk_days` | unchanged |
| `not_walk_distance_yn` | new; reason "time efficiency" in daily travel `choice_factors` | Yes/No, only if `walk_days` = No |
| `not_walk_effort_yn` | new; reason "physical comfort and effort" in daily travel `choice_factors` | Yes/No, only if `walk_days` = No; health data |
| `not_walk_unsafe_yn` | new; reason "personal safety and security" in daily travel `choice_factors` | Yes/No, only if `walk_days` = No |
| `not_walk_streets_yn` | new; comfort options of walking `walk_improvements` (sidewalks, shade, benches) | Yes/No, only if `walk_days` = No |
| `fast_traffic_along_unsafe_yn` | safety `fast_vehicles`, walking `avoid_fast_traffic` | 5-point frequency → Yes/No; walking along roads only |
| `fast_traffic_crossing_unsafe_yn` | safety `fast_vehicles`, walking `avoid_fast_traffic` | 5-point frequency → Yes/No; crossing roads only |
| `unsafe_crossings_yn` | walking `avoid_dangerous_crossing` | 5-point → Yes/No |
| `cyclists_scooters_unsafe_yn` | walking `riding_on_pavement` | 5-point → Yes/No |
| `poor_sidewalk_unsafe_yn` | walking `walk_sidewalk_condition_effect` | 5-point effect → Yes/No |
| `obstacles_near_traffic_yn` | walking `avoid_obstacles` | 5-point → Yes/No |
| `day_insecure_yn` | safety `personal_security_day` | 5-point + prefer-not-to-say → Yes/No (optional); walking only |
| `evening_insecure_yn` | safety `personal_security_evening` | as above |
| `dark_lighting_change_yn` | safety `walk_lighting_effect` | 5-point effect → Yes/No |

For former 5-point items, a Yes/No answer corresponds to the stronger answers ("often", "a lot", "I avoid it")
versus the weaker ones; the two scales are not comparable answer by answer.

## Part 2 (one Yes/No question per former option)

| Section | New ids | Source (multiple choice) |
|---|---|---|
| Road users | `car_drivers_unsafe_yn`, `motorcycle_riders_unsafe_yn`, `bus_drivers_unsafe_yn`, `delivery_vehicles_unsafe_yn`, `taxi_drivers_unsafe_yn`, `cyclists_unsafe_yn`, `e_scooter_riders_unsafe_yn`, `other_pedestrians_unsafe_yn` | walking `risky_road_users` |
| Situations on the road | `poor_visibility_unsafe_yn`, `unsafe_behaviour_unsafe_yn`, `crowding_conflicts_unsafe_yn`, `poor_infrastructure_unsafe_yn`, `no_emergency_services_unsafe_yn` | safety `road_unsafe_situations` |
| Personal security | `isolated_areas_yn`, `aggressive_behaviour_yn`, `identity_harassment_yn`, `blind_corners_yn`, `poor_maintenance_yn`, `no_surveillance_yn`, `past_incidents_yn`, `overcrowding_yn` | safety `insecurity_factors_detailed` |
| Barriers on your route | `steps_without_ramps_yn`, `missing_dropped_kerbs_yn`, `narrow_paths_yn`, `missing_tactile_paving_yn` | walking `walk_physical_barriers` |
| What would make walking safer | `want_safer_crossings_yn`, `want_better_lighting_yn`, `want_separation_yn`, `want_better_sidewalks_yn` | walking `walk_improvements` |

Dropped options: "none" / "never unsafe" / "never insecure" / "nothing" (implied by all No), "other"; barrier options already in Part 1
(uneven paving, parked cars and bins) and overhanging branches; the improvement options about comfort (shade, benches,
cleanliness, signs); and the safety option
`long_evening_waits`, which concerns waiting for public transport rather than walking.
A multiple choice with `max_answers` becomes independent Yes/No answers, so counts per item are no longer capped.

## Not yet covered

- The app cannot yet offer Part 2 right after Part 1; this needs the follow-up feature in CityMaaS.
- CityMaaS `SmartUrbanityExternalConfiguration` test expects 22 forms and release version 3.0.0 in the pinned configuration;
  it must be updated when the pin moves to a configuration that includes these forms.
