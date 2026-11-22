# Rating scales and “Not applicable”

Decision: scale questions declare what kind of scale they are and, separately, how
the application draws them. `answer_scale: "likert"` is a Likert scale, symmetric
around a neutral middle from one pole to its opposite (1..5 stand for −2..+2 in
analysis); `answer_scale: "score"` is an ordered scale, an amount that only grows
from the first point to the last. Both show numbered points 1..n with every point's
wording listed under the scale, the chosen one highlighted; `answer_scale_stars:
true` draws them as stars instead. Wording, stored values and translations are
unchanged except where listed below.

- **Likert (93 occurrences):** ease and clarity (very difficult … very easy),
  satisfaction, emotional state, effort against the alternatives, intention to use,
  comfort, liking for lively streets, pleasantness, overall judgement, air, cleanliness, noise, comfort on hot days,
  place safety and security, street safety from traffic and from
  crime or harassment, desired facilities (no … yes),
  vehicle availability, speed of traffic and trip time against the expected one.
- **Ordered (100 occurrences):** frequencies (never … always), intensities (not at
  all … extremely: noise, tiredness, stress, effort, usefulness, urgency,
  confidence, trip safety, community attachment) and the descriptive ladders (infrastructure adequacy,
  parking at the destination, slope, dark, fitness, cost sensitivity, stop access,
  crowding, visual quality, parking problem, difficulty of getting through a street,
  shade on hot days).
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
  `app_mobility`, `app_put_tickets`, `car_parking_issue`, `car_charging`,
  `motorcycle_charging`, the six `*_effort_vs_alternatives`,
  `motorcycle_cost_sensitivity`, `bike_confidence`, `escooter_confidence`,
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

Unchanged: questions judged as already clear, the three questions with a middle
answer at the end (`walk_distance`, `walk_wayfinding`, `place_avoidance`), the three grid tables, `place_use_frequency`, and, pending a
decision, `connection_use_frequency`, `segment_use_frequency` and
`car_cost_sensitivity`, whose extra answers carry meaning.

Every changed question advances to its next major version, as the application's
answer-contract rule requires; 29 forms advance to their next major version and the
Rome contribution workflows pin the new street assessments and reports.
`versions.json` is unchanged: the configuration needs an application that supports
these properties before it is published. No collected answers are rewritten; the
PlanEasy question-bank revisions are a separate follow-up.

Verification: version bumps match the application's revision rule for 424 compared
questions; language, bundle and response-choice verifiers pass and the runtime
serializer reports no change. The [migration manifest](2026-11-22-rating-scales.json)
lists each occurrence.
