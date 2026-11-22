# Rating scales and “Not applicable”

Decision: scale questions declare what kind of scale they are and, separately, how
the application draws them. `answer_scale: "likert"` is a Likert scale, symmetric
around a neutral middle from one pole to its opposite (1..5 stand for −2..+2 in
analysis); `answer_scale: "score"` is an ordered scale, an amount that only grows
from the first point to the last. Both show numbered points 1..n with every point's
wording listed under the scale, the chosen one highlighted; `answer_scale_stars:
true` draws them as stars instead. Wording, stored values and translations are
unchanged except where listed below.

- **Likert (71 occurrences):** ease and clarity (very difficult … very easy),
  satisfaction, emotional state, effort against the alternatives, intention to use,
  comfort, pleasantness, overall judgement, air, cleanliness, noise, heat and shade,
  place safety and security, desired facilities (no … yes), community attachment,
  vehicle availability, speed of traffic and trip time against the expected one.
- **Ordered (78 occurrences):** frequencies (never … always), intensities (not at
  all … extremely: noise, tiredness, stress, effort, usefulness, urgency,
  confidence, trip safety) and the descriptive ladders (infrastructure adequacy,
  parking at the destination, slope, dark, fitness, cost sensitivity, stop access,
  crowding, visual quality, parking problem).
- **Stars (12, all Likert):** judgements of quality or value: `place_pleasantness`,
  `place_overall`, `place_air`, `place_cleanliness`, `motorcycle_parking`,
  `trip_rating` and the six `*_satisfaction` questions; every other scale keeps
  its numbers, so what respondents see is unchanged.
- **Not applicable:** `add_not_applicable: true` adds the standard answer (Italian “Non mi riguarda”) below the
  scale, stored as `not_applicable`, never preselected and never a point. It is set
  only where a question may not concern the respondent: converted questions of the
  per-mode surveys, the mode-dependent street segment questions (`pedestrian_*`,
  `cyclist_*`, `bike_intrusion_frequency`) and the 20 questions below.
- **Out-of-scale options replaced (20):** the trailing option meaning “this does not
  concern me” is removed and replaced by Not applicable: `traffic_speed_feeling`,
  `app_mobility`, `app_put_tickets`, `car_parking_issue`, `car_charging`,
  `motorcycle_charging`, the six `*_effort_vs_alternatives`,
  `motorcycle_cost_sensitivity`, `bike_confidence`, `escooter_confidence`,
  `bike_skip_dark`, `escooter_skip_dark`, `walk_slope_effect`,
  `put_visual_quality`, `walk_visual_quality`. Unused translations are removed.
- **Order and wording:** `connection_clarity` now runs from “Very difficult” to
  “Very easy”; `trip_rating` options lose the “(1)…(5)” suffix in all languages.

Unchanged: questions judged as already clear, the four questions with a middle
answer at the end (`history_detailed`, `walk_distance`, `walk_wayfinding`,
`place_avoidance`), the three grid tables, `place_use_frequency`, and, pending a
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
