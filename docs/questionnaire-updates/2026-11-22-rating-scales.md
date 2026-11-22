# Rating scales and “Not applicable”

Decision: scale questions declare what kind of scale they are and, separately, how
the application draws them. `answer_scale: "likert"` is a Likert scale, symmetric
around a neutral middle from one pole to its opposite (1..5 stand for −2..+2 in
analysis); `answer_scale: "score"` is an ordered scale, an amount that only grows
from the first point to the last. Both show numbered points 1..n with every point's
wording listed under the scale, the chosen one highlighted; `answer_scale_stars:
true` draws them as stars instead. Wording, stored values and translations are
unchanged except where listed below.

- **Likert (95 occurrences):** ease and clarity (very difficult … very easy),
  satisfaction, emotional state, effort against the alternatives, intention to use,
  comfort, liking for lively streets, pleasantness, overall judgement, air, cleanliness, noise, comfort on hot days,
  place safety and security, street safety from traffic and from
  crime or harassment, safety of crossings near stops, desired facilities (no … yes),
  vehicle availability, speed of traffic and trip time against the expected one.
- **Ordered (139 occurrences):** frequencies (never … always), intensities (not at
  all … extremely: noise, tiredness, stress, effort, usefulness, urgency,
  confidence, trip safety, community attachment) and the descriptive ladders (infrastructure adequacy,
  parking at the destination, slope, dark, fitness, cost sensitivity, stop access,
  crowding, visual quality, parking problem, difficulty of getting through a street,
  shade on hot days, distance one can walk, ease of using stops, worry about
  harassment, less use with an alternative).
- **Stars (12, all Likert):** judgements of quality or value: `place_pleasantness`,
  `place_overall`, `place_air`, `place_cleanliness`, `motorcycle_parking`,
  `trip_rating` and the six `*_satisfaction` questions; every other scale keeps
  its numbers, so what respondents see is unchanged.
- **Not applicable:** `add_not_applicable: true` adds the standard answer (Italian “Non mi riguarda”) below the
  scale, stored as `not_applicable`, never preselected and never a point. It is set
  only where a question may not concern the respondent: converted questions of the
  per-mode surveys, the mode-dependent street segment questions (`pedestrian_*`,
  `cyclist_*`, `bike_intrusion_frequency`) and the 37 questions below.
- **Out-of-scale options replaced (37):** the trailing option meaning “this does not
  concern me” is removed and replaced by Not applicable: `traffic_speed_feeling`,
  `app_put_tickets`, `car_parking_issue`, `car_charging`,
  `motorcycle_charging`, the six `*_effort_vs_alternatives`,
  `car_cost_sensitivity`, `motorcycle_cost_sensitivity`, `bike_confidence`, `escooter_confidence`,
  `bike_skip_dark`, `escooter_skip_dark`, `walk_slope_effect`,
  `put_visual_quality`, `walk_visual_quality`, the nine `walk_*` safety questions
  of the walking survey, and `pedestrian_traffic_unsafe`, `cyclist_traffic_unsafe`,
  `personal_day_unsafe`, `personal_evening_unsafe` in both street assessments. Unused translations are removed.
- **Order and wording:** `connection_clarity` now runs from “Very difficult” to
  “Very easy”.
- **Trips given up for cost:** `travel_given_up_cost` asked a yes/no question with
  three frequency answers. It now asks “In the last month, how many times did you
  give up a trip because it cost too much?” with five counted points: never, once,
  2–3 times, about once a week, several times a week. `travel_given_up_purposes`
  follows every answer except never. No answers had been collected.
- **Questions fitted to their scale:** questions that asked yes or no but offered
  frequencies now ask how often: `bike_parking_changed_plans`,
  `escooter_parking_changed_plans`, `car_congestion_adapt`, `car_emissions`,
  `motorcycle_emissions` (the last two gain a scale). Scales of two or three points
  now have four or five: street visibility, path visibility and green-light time in
  the street assessment (ordered, four points); text size in five forms, pace and
  amount of points (Likert, much too little … much too much); usefulness of trip
  results and fit of the trip history (ordered); ease of understanding the trip
  impact and the points calculation (Likert). Their follow-up questions show for the
  lower answers. No answers had been collected.
- **Yes or no where the answer is a matter of degree:** the nine `walk_*` safety
  questions of the walking survey ask how often (never … always), and the ones that
  said only “on foot” now include the wheelchair. In both street assessments
  `pedestrian_use_difficult` and `cyclist_use_difficult` ask how difficult it is to
  get through, on five ordered points from “I cannot get through” to “Not
  difficult”, keeping the impassable answer as the worst point;
  `pedestrian_traffic_unsafe`, `cyclist_traffic_unsafe`, `personal_day_unsafe` and
  `personal_evening_unsafe` ask how safe the person feels, with the five Likert
  answers of the place report (not at all safe … completely safe). Outside the
  scales, `put_no_seats` now separates not needing a seat from finding one usually,
  sometimes not or often not, and `modes_supported` answers all, some or none, with
  its follow-up shown for some and none. No answers had been collected.
- **Uneven Likert scales:** `community_attachment` asked how strong the bond is
  but ran from “Not connected” to “Very connected”, so its ends did not mirror each
  other. It now asks “How connected do you feel to the people in your
  neighbourhood?” on five ordered points: not at all, slightly, moderately, very,
  extremely. `trip_rating` had a middle answer that was already positive (“Fair”)
  and ends that did not mirror each other (“Very poor”, “Excellent”); its stars now
  read very poor, poor, neither good nor poor, good, very good, the labels of
  `motorcycle_parking`, and lose the “(1)…(5)” suffix. `put_crowding_comfort` and
  `walk_crowding_comfort` mixed “A little uncomfortable” with “Mostly comfortable”
  and had different middle answers; both now read very uncomfortable, fairly
  uncomfortable, neither uncomfortable nor comfortable, fairly comfortable, very
  comfortable, and the public transport question asks only about a crowded bus,
  tram or train. `place_heat_shade` mixed heat and shade in one answer (“Hot,
  little shade”) and had a middle “Bearable” that was already negative; it becomes
  two questions: `place_heat_comfort` (“On hot days, how comfortable do you feel
  here?”, Likert with the comfort labels above) and `place_shade` (“How much shade
  is there here on hot days?”, ordered: no shade, very little, some, plenty, shade
  almost everywhere), both version 1.0.0. The six `*_route_liveliness_effect`
  questions answered with reasons (“I feel safer”, “Crowds stress me”) and ends that
  did not mirror each other; they now ask whether the respondent likes streets with
  lots of people, shops and activity, from “I dislike them a lot” to “I like them a
  lot”, with Not applicable. No answers had been collected.
- **Scales that mixed feeling and behaviour:** some answers measured how strong a
  feeling was and, in the same list, what the respondent does about it (“I avoid
  steep roads”, “I take a flatter route”), so the steps were not one ordered scale.
  Each of these questions now asks one thing on five points, scored, with Not
  applicable: how much pleasant or unpleasant surroundings affect how one feels
  (`*_visual_quality`, six modes), how much dirt or litter bothers (the six
  `*_cleanliness_effect`), how much heavy or fast traffic bothers
  (`bike_avoid_traffic`, `escooter_avoid_traffic`), how much parked cars or narrow
  lanes make riding hard (`motorcycle_narrow`), how much timetables meet one’s needs
  (`public_transport_reliability`), how hard parking is (`car_parking_issue`) and
  how stressful other drivers are (`motorcycle_driver_stress`), all from not at all
  to extremely; how much slopes make the trip harder (`escooter_avoid_slopes`,
  `walk_slope_effect`, ending with “I can’t manage some slopes”); how important
  benches are (`walk_benches_importance`); confidence in reacting in time to an
  unexpected danger (the four `*_hazard_confidence`) and in riding in traffic
  (`bike_confidence`, `escooter_confidence`), from not at all to extremely
  confident; and fitness for walking (`walk_fitness`), from very low to very high.
  `bike_wayfinding` and `escooter_wayfinding` become two questions: how much signs
  help (not at all … extremely) and the new `bike_signs_lost` and
  `escooter_signs_lost`, how often missing or unclear signs make one lose the way
  (never … always), version 1.0.0. No answers had been collected.
- **Questions that asked two things:** each now asks one, and a new question,
  version 1.0.0, follows it. `put_stop_ease` asks how easy it is to reach the
  stops and `put_stop_use` how easy it is to use them; `bike_health_benefit` asks
  about physical health and `bike_mood_benefit` about mood; `walk_distance` lists
  only distances (less than 500 metres … more than 2 km, scored) and
  `walk_need_company` asks whether one needs someone along; `stop_crossing_safety`
  runs from very unsafe to very safe (Likert) and `stop_crossing_avoidance` asks
  whether the crossings make one avoid some stops or take a longer way. The six
  `*_identity_harassment` questions ask yes or no whether, in the last 12 months,
  the respondent was harassed because of who they are or how they look, with Not
  applicable, and the new `*_identity_harassment_worry` asks how often one worries
  about it (never … always, scored). No answers had been collected.
- **Cost and alternatives:** `car_cost_sensitivity` and `motorcycle_cost_sensitivity`
  ask whether one would use the vehicle less if fuel, parking and tolls cost about a
  third more (as much as now … only when I have no other choice);
  `motorcycle_less_with_alternative` uses the public transport scale (no, the same …
  much less). No answers had been collected.
- **Answer lists:** the six `*_dissatisfied` questions gain None of these,
  `put_want_changes` gains Cheaper tickets, the `*_combined_response` lists are
  shorter, the `*_anxiety_causes` speak of road crashes, the tiredness questions name
  the physical effort of each mode apart from carrying loads, the walking answer of
  `*_combined_modes` names a long stretch, missing orientation cues leave the car,
  bike, e-scooter and motorcycle insecurity lists, the bad-weather answer no longer
  mentions umbrellas, and `car_sustainable_motivation` drops weather and merges its
  two “I need the car” answers. No answers had been collected.
- **Ordered answers and common lists:** `signal_wait_time`, the use frequency of
  places, connections and segments, `walking_width_passability`,
  `bike_vehicle_conflict_points`, `near_miss_outcome`, `location_distance` and the new
  `carer_frequency` become ordered scales with distinct steps; avoidance moves to the
  new `connection_avoidance` and `segment_avoidance`; `app_mobility` becomes
  `app_mobility_taxi` and `app_mobility_sharing` (Likert with Not applicable, 1.0.0),
  `bike_separation` becomes `bike_separation_traffic` and
  `bike_separation_pedestrians`, `task_register` and `reasons_outside_why` split off
  their questions; `usual_mode`, `trip_mode`, `frequent_trip_purpose` and
  `travel_given_up_purposes` use one list of modes and one of purposes (the
  `*_combined_modes` questions keep bus, tram, metro and train apart), and the
  usability test uses the profile answers for gender and education.

Unchanged: questions judged as already clear, the two questions with a middle
answer at the end (`walk_wayfinding`, `place_avoidance`), and the three grid tables.

Every changed question advances to its next major version, as the application's
answer-contract rule requires; 34 forms advance to their next major version and the
Rome contribution workflows pin the new street assessments and reports.
`versions.json` is unchanged: the configuration needs an application that supports
these properties before it is published. No collected answers are rewritten; the
PlanEasy question-bank revisions are a separate follow-up.

Verification: version bumps match the application's revision rule for 457 compared
questions; language, bundle and response-choice verifiers pass and the runtime
serializer reports no change. The [migration manifest](2026-11-22-rating-scales.json)
lists each occurrence.
