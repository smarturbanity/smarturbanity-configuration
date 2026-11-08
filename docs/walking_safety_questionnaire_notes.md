# Questionnaires per way of travelling — change notes

Every survey except `your_profile` becomes a chain of short questionnaires per way of travelling
(walking, cycling, e-scooter, public transport, car, motorcycle and scooter), decided by Lory on 2026-11-08.
The e-scooter chain (stand-up electric scooters, own or shared) was added the same day (Lory, decision 1).
The pieces of a chain are linked by the "Continue" button on the thank-you page (CityMaaS `followUpQuestionnaires`),
which skips the pieces already answered on the same device. `smarturbanity_daily_travel` is deleted: its questions moved to
`your_profile` and to the pieces (see "Daily travel").

All 51 pieces live in `forms/surveys/`, next to the three profile pieces (see "Shorter pieces"). They are
grouped by topic in seven disabled campaigns (visible in debug mode) until the persona test and approval
(Lory, 2026-11-08; `config_version` 0.2.0). Each campaign holds the piece of that topic for every way of travelling:

| Campaign | Name (IT) | Pieces |
|---|---|---|
| `rome_travel_habits` | Abitudini di viaggio | `*_habits` |
| `rome_road_safety` | Sicurezza stradale | `*_road_safety` |
| `rome_personal_security` | Sicurezza personale | `*_security` |
| `rome_comfort` | Comfort | `*_comfort`, `*_surroundings` |
| `rome_trip_experience` | Come si vive il viaggio | `*_experience`, `*_effort` |
| `rome_improvements` | Cosa aiuterebbe | `*_improvements` (no car piece) |
| `rome_doing_without_car` | Fare a meno dell'auto | `car_need`, `motorcycle_need`, `car_alternatives`, `public_transport_without_car` |

"Continue" still follows the chain of the way of travelling, across topics (decision 2A). The campaigns only decide
when and where a piece is offered. All pieces were in one campaign, called `rome_future_surveys` ("Future
questionnaires") and then `rome_travel_habits`, until 2026-11-08.

Rules applied:

1. Every question comes from an existing form, rephrased as Yes/No or as a list (rule 3), or asked about another way of
   travelling. The only new questions are the ones Lory asked for on 2026-11-08 (see "New questions").
2. In Yes/No questions, "Yes" always means the problem is present (or, for improvements, that the change would help).
3. Lists of related Yes/No questions are one multiple choice "(Select all that apply)" with an exclusive "None of
   these" (or "Nobody in particular"), so an unticked option means No (Lory, 2026-11-08, decisions 1A 2A 3A; see
   "Grouped lists"). Questions that stand alone stay Yes/No.
4. New Yes/No ids end in `_yn`, so answers never mix with the old 5-point or multiple-choice data. Questions asked about
   another way of travelling get that mode's prefix (`walk_`, `bike_`, `escooter_`, `put_` for public transport, `car_`,
   `motorcycle_`).
5. Only the weekly question of each chain is required; all others are optional, because some touch health or harassment.
6. The weekly question opens each chain (`walk_days`, `bike_weekly`, `escooter_weekly`, `put_weekly`, `car_weekly`,
   `motorcycle_weekly`).
   Who answers No is asked only why, and the chain stops there: CityMaaS `followUpStopWhen` hides "Continue".
   This replaces the earlier rule that everyone answers the walking safety questions (Lory, 2026-11-08, decision 2A).
7. Pushchairs, canes and other aids are covered by the walking welcome text, so questions stay short. Walking
   questions that open with "When you walk" name the wheelchair too ("When you walk or use a wheelchair"; Italian
   "sedia a rotelle", never "carrozzina", which means a pram) (Lory, 2026-11-08).
8. Experience (stress, tiredness, time) and surroundings (noise, air, weather, cleanliness) are asked per way of
   travelling (decision 3B); the general travel questions are in `your_profile`.

## The chains

| Way of travelling | Pieces in order (questions) |
|---|---|
| Walking | `walking_habits` (10), `walking_road_safety` (9), `walking_security` (5), `walking_comfort` (12), `walking_experience` (10), `walking_improvements` (1) |
| Cycling | `cycling_habits` (9), `cycling_road_safety` (7), `cycling_security` (5), `cycling_comfort` (9), `cycling_experience` (10), `cycling_improvements` (1) |
| E-scooter | `e_scooter_habits` (8), `e_scooter_road_safety` (7), `e_scooter_security` (5), `e_scooter_comfort` (9), `e_scooter_experience` (10), `e_scooter_improvements` (1) |
| Public transport | `public_transport_habits` (9), `public_transport_road_safety` (3), `public_transport_security` (5), `public_transport_comfort` (13), `public_transport_experience` (10), `public_transport_without_car` (2), `public_transport_improvements` (1) |
| Car | `car_habits` (6), `car_road_safety` (3), `car_security` (4), `car_comfort` (12), `car_experience` (10), `car_need` (2), `car_alternatives` (4) |
| Motorcycle and scooter | `motorcycle_habits` (6), `motorcycle_road_safety` (7), `motorcycle_security` (5), `motorcycle_comfort` (8), `motorcycle_experience` (10), `motorcycle_need` (2), `motorcycle_improvements` (5) |

Each file is `smarturbanity_<piece>.json`, one to three minutes; the pieces with grouped lists are at version 2.0.0. Each piece carries the translations of
its own texts in en, it, fr, de, tr, fa, hu and ar.

## Replaced forms

Every question of these forms is in the chains, so their entries were removed from `forms/surveys/index.json`
(3.1.0 → 3.2.0), `forms/index.json` and the topic campaigns:

- `smarturbanity_walking_safety` and `smarturbanity_walking_safety_details` (the earlier Yes/No walking forms, never published;
  the details file is removed);
- `future/smarturbanity_walking`, `future/smarturbanity_cycling`, `future/smarturbanity_public_transport`,
  `future/smarturbanity_car`, `future/smarturbanity_motorcycle`;
- `future/smarturbanity_experience_on_the_move` and `future/smarturbanity_safety_environment` (now asked per way of travelling).

With the questions used by the chains removed none of the seven `future/` forms keeps a question, so they are deleted
(Lory, 2026-11-08: remove the moved questions from the old forms) here and on the local `lory/future-questionnaires` and
`questionnaire-14` branches, together with their entries in `forms/index.json`, `forms/surveys/index.json` and the
topic campaigns. `future/smarturbanity_about_you` and `future/smarturbanity_daily_travel` are emptied and deleted too (see "About you"
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
It was retired on 2026-11-08 (see "Persona test fixes, rounds 28–29").

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
topic campaigns. Each branch moves its own wording and translations; where the profile already
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
`forms/surveys/index.json` and the topic campaigns. In `your_profile` each branch moves its own wording
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
| `not_walk_reasons` | walking habits | reasons for walking rarely; reasons from daily travel `choice_factors` and walking `walk_improvements` |
| `not_bike_reasons` | cycling habits | reasons for cycling rarely, as for walking |
| `not_escooter_reasons` | e-scooter habits | reasons for riding an e-scooter rarely, as for cycling |
| `not_put_reasons` | public transport habits | reasons for rarely using public transport |
| `not_car_reasons` | car habits | reasons for rarely travelling by car |
| `not_motorcycle_reasons` | motorcycle habits | reasons for rarely riding |
| `car_need_uses` (18 trips) and `car_less_with_alternative_yn` | car need | trips where the car is hard to replace, from citizens' comments forwarded by Lory |
| `put_no_car_yn` and `put_no_car_hard` (17 trips) | public transport without a car | the same trips, asked of people without a car (decision 5B) |
| `motorcycle_need_uses` (4 trips) and `motorcycle_less_with_alternative_yn` | motorcycle need | the trips of the car list that apply to riding |

The reason questions are shown only after a No to the weekly question; each adds "Another reason". They are health
data because one option is about physical effort (walking, cycling, e-scooter, public transport).
The `*_less_with_alternative_yn` question is shown unless the citizen ticked "None of these".

## Questions asked about another way of travelling

These come from one mode's form and are asked in another chain too. They can be removed one by one.

| New id | Source |
|---|---|
| `walk_crowding_comfort` | public transport `put_crowding_comfort` |
| `bike_health_benefit_yn` | walking `walk_health_benefit`, as Yes/No |
| `bike_`, `escooter_`, `car_` and `motorcycle_unsafe_road_users` | walking `risky_road_users` |
| `put_dark_lighting_change_yn`, `motorcycle_dark_lighting_change_yn` | safety `walk_lighting_effect` |
| `put_heat_waiting_yn`, `put_no_seats_yn`, `put_wayfinding_yn` | walking `walk_heat_shade_effect`, `benches_importance`, `wayfinding`, as Yes/No |
| `put_want_changes` (7 options) | walking `walk_improvements` and public transport options |
| all `escooter_` questions | cycling, same question with `bike_` | "cycle" becomes "ride an e-scooter"; `escooter_type` asks own or shared; no health-benefit question; `escooter_barriers` asks about pedestrians in cycle lanes instead of pedestrians or e-scooters; `escooter_tiredness_cause` without carrying children or shopping, with physical effort described as standing and keeping balance; `escooter_improvements` replaces bike parking, training, junctions and money help with e-scooter versions and adds cheaper shared e-scooters and sharing in more areas |
| `car_hazard_confidence`, `car_charging` | motorcycle `motorcycle_hazard_confidence`, `motorcycle_charging` |
| `motorcycle_delay_stress` | car `car_delay_stress` |
| `motorcycle_poor_surface_unsafe_yn` | cycling `bike_poor_surface_effect`, as Yes/No |
| `motorcycle_want_changes` (5 options) | motorcycle form options |
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

## Grouped lists

Lory (2026-11-08, decisions 1A 2A 3A): each list of related Yes/No questions is now one multiple choice "(Select all
that apply)" with an exclusive last option, so ticking nothing else means No to every item. The questions stay in the
same piece and position; the option values are the old id without prefix and `_yn`.

| Group | New id (`<p>_` = `bike_`, `escooter_`, `put_`, `car_`, `motorcycle_`; none for walking) | Options | Source |
|---|---|---|---|
| Road users | `<p>_unsafe_road_users` (not public transport) | 8 road users, the piece's own as "Other …"; "Nobody in particular" | walking `risky_road_users` |
| Situations on the road | `<p>_unsafe_situations` | 5 situations (4 for cycling and e-scooter, without infrastructure); "None of these" | safety `road_unsafe_situations` |
| Barriers on your route | `route_barriers` (walking) | 8 barriers; "None of these" | walking `walk_physical_barriers` |
| Personal security | `<p>_insecurity_factors` | 7 factors (public transport adds long evening waits); "None of these" | safety `insecurity_factors_detailed` |
| Reasons for rarely using a way | `not_<p>_reasons` | 4–6 reasons; "Another reason" | new (see "New questions") |
| Car and motorcycle need | `car_need_uses`, `motorcycle_need_uses` | 18 and 4 trips; "None of these" | new |
| Without a car | `put_no_car_hard` | 17 trips; "None of these" | new |
| What would help | `want_changes`, `put_want_changes`, `motorcycle_want_changes` | 8, 7 and 5 changes; "None of these" | walking `walk_improvements`, motorcycle form |

Kept as separate Yes/No: the weekly and combining gates, day and evening insecurity, `identity_harassment_yn`
(heightened personal data, kept apart from the other factors), `dark_lighting_change_yn`, the walking traffic and
sidewalk items, `motorcycle_poor_surface_unsafe_yn`, `bike_health_benefit_yn`, `put_no_car_yn`, the public transport
waiting items (`put_heat_waiting_yn`, `put_no_seats_yn`, `put_wayfinding_yn`) and the two `*_less_with_alternative_yn`.

The earlier one-Yes/No-per-option ids (for example `car_drivers_unsafe_yn`, `isolated_areas_yn`, `car_need_<trip>_yn`)
were never published, so no answers are lost. A multiple choice with `max_answers` in the source becomes a list with no
cap. The source's "other" option is dropped except for the reasons.

## Exclusive "None" options

Lory (2026-11-08, "1A, 2A"): in every form, a multiple choice option meaning "None of these", "None" or "Nothing" is
exclusive, so it cannot be ticked together with another option. "No …" items that name a barrier (for example "No
ramp") are ordinary options and stay non-exclusive. Only option metadata changed, so the changed questions and forms
moved by a patch version: `geolocated_perception_report`, `street_connection_assessment` and
`street_segment_assessment` 3.0.1 (also in both manifests), `post_trip` 4.6.1, `your_profile` 1.16.2. The forms of
the chains already had exclusive "None" options.

## E-scooter picture and translation review

The six e-scooter pieces open with their own picture, `assets/smarturbanity_e_scooter.svg` ("E-scooter on a street"),
drawn in the style of the other mode pictures, instead of the cycling one.

The Arabic, Persian and Hungarian texts changed since the chains were built were reviewed on 2026-11-08 and corrected:
gender-neutral scale labels (Arabic stress and tiredness), "travel" as everyday getting around rather than a journey
(Arabic), parking as a place to leave the vehicle, the order of "Fairly" and "Quite", the formal Ön address
(Hungarian), خاستگاه for "origin" in the harassment questions (Persian), and the gender question without an added
"(male / female)". Every form with corrected texts moved by a patch version, together with the questions that use them.

## Persona test fixes (rounds 18–27)

On 2026-11-08 the open issues of the persona tests that were still present in the forms were fixed. Lory's decisions:
gender keeps two options plus "Prefer not to say"; no answer limits in the questions about one trip, while the general
questionnaires keep theirs so that people pick their priorities; Yes/No lists get "Doesn't apply to me"; only true
duplicates are merged; height and professional role can be skipped with "Prefer not to say".

- **Who reads the answers.** The pre-trip, post-trip and Your profile welcome pages now say that only the SmartUrbanity
  research team reads individual answers and that they are not sent to any public authority.
- **No answer limits about one trip.** The post-trip route reasons and feelings no longer say "choose up to 2". The
  general questionnaires (anxiety, dissatisfaction, combined trips, improvements and motivations, Safety, Your profile
  reasons and choice factors) keep their "choose up to 3, 4 or 5" limits, so that people pick their priorities.
- **"Doesn't apply to me".** Added as a third answer to the Yes/No questions of the road safety, security and public
  transport comfort forms that have no gate before them.
- **Two questions in one, split.** Post-trip effort is now physical effort (required) plus mental effort (optional);
  "Crowding or conflicts with other road users" is now two options, "Crowding" and "Conflicts with other road users", in
  every road safety form and in Safety; the walking crossing question became "longer detours or avoid streets" plus a new
  "feel rushed or unsure when crossing"; the sidewalk obstacles question became "walk closer to traffic" plus a new
  "change your path or make a detour". The post-trip traffic and personal safety ratings got a one-line hint each.
- **Missing options.** Post-trip: a diverted usual route, "only possible route or fixed line", a broken lift or
  escalator (problem place and incidents), dirt or dog droppings, no parking; the car door incident is no longer
  limited to cycling. Pre-trip: van or work vehicle, public office or paperwork.
- **Your profile.** Height and professional role offer "Prefer not to say"; the neighbourhood hint names Gianicolense
  and Portuense as examples of unofficial names.
- **Wording.** Italian: no "bambini e bambine", "essere visto", "sconvolgono", "mi tiene attivo", "alto o alta" or
  "nucleo familiare" (except the income question, left as it is); "sharing", "e-bike" and bare "NCC" replaced by Italian
  words. German: "Mäßig" became "Mittel" ("Einigermaßen stressig"), the feeling and appearance stems were fixed;
  "Ziemlich" stays, as the usual German scale word. French: "Très / Totalement en sécurité", "Vélo à assistance
  électrique", and the health option no longer starts like the next one; Turkish health option likewise; Persian
  feeling stem.

Versions: questions with removed or split options moved by a major version, questions with added options, hints or
removed limits by a minor version, translation-only changes by a patch; every changed form moved by a minor version
(post-trip 4.7.0, pre-trip 4.4.0, Your profile 1.17.0) or, for translation-only forms, a patch.

Left open on purpose: the income question (PS20-2), the pre-trip mode grouping and the required company question
(TQ-9, TQ19-6), the mobility limitation wording (Q23-15), the personal safety items (Q27-7). Felt duplicates between
forms are different nuances and stay (Q26-3, Q26-4, Q26-6, Q26-7, Q26-9, Q26-10). Also not changed: the Hungarian
title and the Latin-script brand in Persian (Q27-9), the Turkish "Mod değiştir" that matches the app button, and the
answer limits of the location reports, whose versions are pinned in the manifests.

## Persona test fixes, second pass

On 2026-11-08 the issues still open after the source-code recheck of 77b559e were fixed where no decision was needed.
The persona tests of round 27 ran on the unpublished `smarturbanity_walking_safety` form; their fixes went to the walking
chain that replaced it (walking road safety and walking security), and `smarturbanity_walking_safety` was left as it is,
except for `walk_days`: Lory chose to ask it there as in `walking_habits` (1.2.1, with the wheelchair, the aids hint and
"No, only short bits … or not at all"; same yes/no values, so the conditions that use it are unchanged). No answers had
been collected with the old wording. `walking_safety` 1.1.0. Its other questions are still the older Yes/No versions.

- **Your profile.** The carer answer for an adult living with you names dementia; the income question explains why it is
  asked and its three upper answers are shorter; the limitation question says it is about you, not the people you help
  (Persian stem reworded); Italian "Mi occupo della casa"; French "vous déplacez-vous" in the usual-trip company question.
- **Safety.** The welcome page says who reads the answers; the evening answer "change my route, stop or company" also
  names the time; a new reason "few cues to find my way without sight"; the Italian road safety scale says "al sicuro".
- **Walking chain.** Day, evening and identity harassment questions offer "Prefer not to say". Forms whose questions
  have more than Yes and No (for example "Doesn't apply to me" or lists) now say "Most questions are answered Yes or No"
  instead of "Each question has two answers".
- **Walking habits.** The distance question has "Distance is not a limit for me (e.g. power wheelchair)"; Italian
  fitness scale in the feminine ("Bassa", "Buona"); Persian height labels with Persian digits and "سانتی‌متر".
- **Pre-trip.** Planned stops counts only the way there; the company question is optional, "children" covers teenagers
  on foot or in the car, and "someone I accompany or care for" matches the Italian.
- **Post-trip.** Rating labels read "Very poor (1)" instead of "1 – Very poor", which screen readers spell out; route
  reasons add a cycle lane without gaps and work loads such as a delivery box; problem places add slippery surfaces and
  a cycle lane that broke off; incidents add "I felt a little uneasy, but nothing happened".
- **Public transport.** Stop problems add a ramp that does not work or a taken wheelchair space, and vehicles too full
  to get on; Italian crossing answers say "al sicuro" and "fare attenzione"; Turkish "duraklara ulaşmak".
- **Wording in every mode.** Italian tiredness scale "Poca / Moderata stanchezza", "Raramente mi stanco", "La solitudine
  o l’isolamento", "più al sicuro", "non sentirsi al sicuro", the aggressive road users option without gendered nouns,
  "quando mi stanco"; French "circulation" and "je me déplace"; Hungarian "Különösebben senki".

Versions follow the rules above; a question whose PlanEasy pool already holds a higher version moves on from that one.
Lory's decisions on these points (2026-11-08):

1. `walk_health_benefit` is dropped from `walking_comfort`.
2. `height` stays; its help now says it is asked only to estimate walking speed, because height changes step length.
3. `public_transport_social_comfort` stays.
4. The `your_profile` welcome is shorter: what it is about, one line on voluntary and skippable answers that are
   not linked to the name and go to no public authority, then the link.
5. `trip_purpose` (pre-trip) accepts several answers ("you can choose more than one").
6. Walking questions that open with "When you walk" name the wheelchair (rule 7), in `walking_comfort`,
   `walking_experience`, `walking_road_safety` and `walking_security`.
7. `not_walk_reasons` (`walking_habits`) replaces "unsafe (traffic, crime or harassment)" with three reasons: traffic,
   crime such as theft, harassment. `walking_safety` is not published and keeps its single question.
8. The `home_neighbourhood` help names no neighbourhood as an example (neither Gianicolense nor Portuense):
   "If you use another name, choose the official neighbourhood closest to your home, or Other." (2.6.2, text only;
   `your_profile` 1.18.2).
9. `economic_status` already offers "Prefer not to say" (`add_prefer_not_to_say`); nothing changed.

On the felt duplicates between forms (2026-11-08):

10. The overlap between the general Safety form and the walking chain needs no change: the Safety form is retired when
    the chains are published (decision 4A).
11. The per-mode time question (`car_`, `bike_`, `escooter_`, `motorcycle_`, `put_`, `walk_time_vs_expected`) asked the
    same thing as the post-trip `trip_time_vs_expected`. It now asks how reliable the mode usually is: "When you travel
    by car, how often do you arrive in the time you planned?" with Never, Rarely, Sometimes, Often, Always (2.0.0). The
    post-trip question about the single trip is unchanged.
12. `car_delay_schedule_impact` is dropped from `car_comfort`; `car_delay_stress` stays, as in `motorcycle_comfort`.
13. `bike_hazard_confidence` and `escooter_hazard_confidence` asked the same as the general confidence of
    `cycling_habits` and `e_scooter_habits`. They now ask about reflexes: "When you cycle, how quick are your reflexes
    if something happens suddenly?", from "Not quick at all: I often cannot react in time" to "Extremely quick: I
    always react in time" (3.0.0 and 2.0.0; the help with examples is unchanged).

14. To make `your_profile` shorter (1.19.0, about 7 minutes), `professional_role`, `shared_frequency`, `app_mobility`
    and `choice_factors` move unchanged, with their translations, to a new future form
    `future/smarturbanity_travel_choices` ("Your Travel Choices", 1.0.0, review mode). It is listed in both indexes and
    in the disabled "Future questionnaires" campaign (`rome_future`), so participants do not see it yet.

15. `walking_security` (2.4.0) asks a follow-up right after `evening_insecure_yn`, only when the answer is Yes:
    `evening_insecure_changes` 1.0.0, "When you feel unsafe in the evening, what do you change?" (IT "Quando la sera
    non ti senti al sicuro, cosa cambi?"), multiple choice and optional, with the help "You can choose more than one
    answer." Options: change my route, change the time, share my location with someone, ask someone to come with me,
    use a different means of transport, give up going out, Nothing, Prefer not to say. "Nothing" and "Prefer not to
    say" are exclusive. The wording was approved by Lory on 2026-11-08 (#422). It replaces the retired single-choice
    `evening_travel_behaviour` of the general safety form.
    The "Prefer not to say" translations it brought also translate the option that `day_insecure_yn`,
    `evening_insecure_yn` and `identity_harassment_yn` add with `add_prefer_not_to_say`, so those three move to 1.3.1
    (translation only) and `walking_security` to 2.4.1.

Still to decide: grouping the 14 modes (#296/#303, proposal waiting for Lory's choice).

## Persona test fixes, rounds 28–29

Lory's decisions on the round 28–29 findings (2026-11-08). The rounds used only the forms in `forms/surveys/index.json`,
the trip questionnaires and the feedback form; the orphan `smarturbanity_walking_safety.json` was not used and is now deleted.

| Change | Before | After | Data impact |
|---|---|---|---|
| Safety retired | `smarturbanity_safety` in both indexes and in the `rome_safety` campaign | file deleted, campaign removed (`config_version` 0.3.0, index 3.5.0) | its questions are covered by the `*_road_safety` and `*_security` pieces; answers already collected stay in the database |
| Removed questions | `height` (walking habits), `public_transport_social_comfort` (public transport comfort), `professional_role` (travel choices) | not asked | no answers kept; `economic_status` stays |
| Overall road-safety rating | — | not added back (old Safety form only) | none |
| Orientation cue | insecurity factors without a cue for people who cannot see | `no_orientation_cues` "Few cues to find my way without sight (e.g. no tactile paths or audio announcements)" in all six `*_security` pieces | new option |
| Evening follow-up | only walking asked what people change when they feel unsafe in the evening | `<p>_evening_insecure_changes` in the cycling, e-scooter, public transport, car and motorcycle security pieces, same text, options and condition as walking | new question |
| `vehicles_used` (your profile 1.20.0) | only private vehicles | adds "On foot or in a wheelchair", "Public transport", "Shared bikes, e-scooters or cars" | new options |
| `walk_want_changes` | no tactile paving or signage | adds "Tactile paving for blind and partially sighted people" and "Larger, clearer signs" | new options |
| Options copied from walking or public transport | e.g. car "I avoid some stops or stretches", cycling "Waiting (at stops)", motorcycle "Physical effort (walking, cycling…)" | each mode's own examples (car: closing windows, streets or car parks, traffic and parking; cycling and motorcycle: traffic lights; public transport: walking to stops) | same values, wording only |
| Neutral wording | generic masculine in some translations | neutral or both forms, as in the rest of the forms | wording only |
| Welcome texts | 39 chain pieces said answers could be linked through an email address, which chain forms never ask | "Your answers are not linked to your name, and no public authority receives them." in all 8 languages | wording only |
| Welcome texts | five pieces said "Most questions are answered Yes or No" while most are multiple choice | sentence removed (kept where it is true: security and walking road safety) | wording only |
| Welcome text, car alternatives | "What could make other ways of getting around a good option…" | "What would help you use other ways of getting around for some of your trips." | wording only |
| Feedback form (`usabilityTests/smarturbanity_feedback_surveys`, 1.1.0) | English and Italian only; `intention_to_use` answers "I would … use it" to a question about answering | all 8 languages; answers "I would … answer them"; `task_email` ("Did you leave an email to link your answers over time?") removed, because no questionnaire asks for an email | same values for `intention_to_use`; no `task_email` answers from now on |

### Estimated durations

Lory (2026-11-08): `estimated_minutes` follows the durations the personas reported in rounds 28–29 (245 runs). For a
chain the personas reported only the total, so each piece is scaled by the ratio of the reported total to the listed
sum, with at least 1 minute. Public transport (12 reported against 14 listed) rounds to the same values; cycling and
motorcycle have too few or too scattered reports and stay as they are; pre-trip (1) and the feedback form (3) already
match.

| Form | Before | After |
|---|---|---|
| `your_profile` | 7 | 6 |
| `future/travel_choices` | 3 | 2 |
| `tripSurveys/post_trip` | 2 | 3 |
| walking `habits`, `road_safety`, `comfort`, `experience` (chain 14 → 10, reported 10.5) | 3 each | 2 each |
| car `habits`, `road_safety` (chain 15 → 10, reported 9) | 2 each | 1 each |
| car `comfort`, `experience`, `need` | 3 each | 2 each |

The duration is metadata only, with no data impact; `post_trip` moves to 4.8.1, the others already move up on this branch.

At this stage, the privacy notice and retention period were provided by the website notice
(`pilot/rome/privacy.json`), which applications read before the form's `gdpr_link`, without retention text
inside the forms. The approved 9 November clarification below later adds a short retention statement to the forms.

Each changed form moves up one version against `main`: minor when questions or options are added or removed,
patch for wording only.

## Shorter pieces

Lory (2026-11-08, decisions 1A 2A 3A 4A 6A 7) split the longest forms so that each piece takes one or two minutes.
Questions, options, answer keys and conditions are unchanged and only move to a new form, so the data keeps the same
keys; only the form id that holds them changes. `post_trip` stays whole. Campaigns move to `config_version` 0.4.0
and the survey index to 3.6.0.

| Change | Before | After | Data impact |
|---|---|---|---|
| Profile | `your_profile` 1.20.0, 6 min, 26 questions | `your_profile` 1.21.0 (about you and where you live, 9 questions, 2 min) → `your_household` 1.0.0 (household, vehicles and work, 11 questions, 3 min) → `your_travel` 1.0.0 (how you get around and most frequent trip, 5 questions, 1 min), linked by "Continue" and all in `rome_profile` | answers to the moved questions now arrive with the new form ids |
| Navigation apps | `app_navigation` "How comfortable are you using navigation or map apps for travel?" in `your_profile` | removed | no answers from now on; `app_mobility` (`future/travel_choices`, disabled campaign) and `app_pt_tickets` stay |
| Surroundings | the "Your surroundings" section (noise, air quality, bad weather, cleanliness, how places look: 5 questions) inside each `*_comfort` piece | own piece `<mode>_surroundings` 1.0.0, 1 min, after `<mode>_comfort` in the chain and in `rome_comfort` | form id changes for those 5 answers per mode |
| Trip experience | one piece with 10 questions on feelings and effort | `<mode>_experience` keeps mood, worries and route liveliness (4 questions); `<mode>_effort` 1.0.0 takes tiredness, effort compared with alternatives, time and satisfaction (6 questions), after `<mode>_experience` in the chain and in `rome_trip_experience` | form id changes for those 6 answers per mode |
| Arabic wording | generic masculine for the person answering in the profile, comfort and experience forms (e.g. «متعبًا», «كسائق», «فكّر») | neutral forms (nouns, first person, «يُرجى») in 78 texts; plurals about other people unchanged | wording only |

Welcome texts list only what each piece asks. Comfort pieces move up one minor version (walking 2.1.0, cycling
1.1.0, e-scooter 1.1.0, public transport 2.2.0, car 1.2.0, motorcycle 1.1.0), as do experience pieces (walking 1.5.0,
cycling 1.4.0, e-scooter 1.2.0, public transport, car and motorcycle 1.4.0).

| Form | Minutes before | Minutes after |
|---|---|---|
| `your_profile` | 6 | 2 + 3 + 1 |
| `*_comfort` | 2 (public transport 3) | 1 + 1 surroundings (public transport 2 + 1) |
| `*_experience` | 2 (cycling, e-scooter, public transport, motorcycle 3) | 1 + effort 1 (cycling, e-scooter, public transport, motorcycle 1 + 2) |

The CityMaaS guided flow asks only `smarturbanity_your_profile` as its profile form (`profileForms`); the other two
profile pieces reach people through "Continue" in the surveys gallery.

## Question IDs

Lory (2026-11-08, decisions 1A 2A 3A) asked to clean the question IDs, in line with the PlanEasy question pool:

1. Yes/No questions drop the `_yn` ending from both `question_id` and `answer_key`, as the pool already did; the
   `show_if` conditions that use them follow. 47 questions; the 12 walking ones are listed under 2, the other 35 are:
   `bike_combines_yn`, `bike_day_insecure_yn`, `bike_evening_insecure_yn`, `bike_health_benefit_yn`,
   `bike_identity_harassment_yn`, `car_combines_yn`, `car_day_insecure_yn`, `car_evening_insecure_yn`,
   `car_identity_harassment_yn`, `car_less_with_alternative_yn`, `escooter_combines_yn`, `escooter_day_insecure_yn`,
   `escooter_evening_insecure_yn`, `escooter_identity_harassment_yn`, `motorcycle_combines_yn`,
   `motorcycle_dark_lighting_change_yn`, `motorcycle_day_insecure_yn`, `motorcycle_evening_insecure_yn`,
   `motorcycle_identity_harassment_yn`, `motorcycle_less_with_alternative_yn`, `motorcycle_poor_surface_unsafe_yn`,
   `not_walk_distance_yn`, `not_walk_effort_yn`, `not_walk_streets_yn`, `not_walk_unsafe_yn`, `put_combines_yn`,
   `put_dark_lighting_change_yn`, `put_day_insecure_yn`, `put_evening_insecure_yn`, `put_heat_waiting_yn`,
   `put_identity_harassment_yn`, `put_no_car_yn`, `put_no_seats_yn`, `put_wayfinding_yn`, `walk_combines_yn`.
2. Questions that exist only in the walking forms and ask about walking get the `walk_` prefix, like `bike_`, `car_`,
   `put_`, `motorcycle_` and `escooter_` in the other modes (21): `benches_importance` → `walk_benches_importance`,
   `crossing_rushed_unsure_yn` → `walk_crossing_rushed_unsure`, `cyclists_scooters_unsafe_yn` →
   `walk_cyclists_scooters_unsafe`, `dark_lighting_change_yn` → `walk_dark_lighting_change`, `day_insecure_yn` →
   `walk_day_insecure`, `evening_insecure_changes` → `walk_evening_insecure_changes`, `evening_insecure_yn` →
   `walk_evening_insecure`, `fast_traffic_along_unsafe_yn` → `walk_fast_traffic_along_unsafe`,
   `fast_traffic_crossing_unsafe_yn` → `walk_fast_traffic_crossing_unsafe`, `identity_harassment_yn` →
   `walk_identity_harassment`, `insecurity_factors` → `walk_insecurity_factors`, `obstacles_change_path_yn` →
   `walk_obstacles_change_path`, `obstacles_near_traffic_yn` → `walk_obstacles_near_traffic`, `poor_sidewalk_unsafe_yn`
   → `walk_poor_sidewalk_unsafe`, `prefer_pleasant` → `walk_prefer_pleasant`, `route_barriers` → `walk_route_barriers`,
   `unsafe_crossings_yn` → `walk_unsafe_crossings`, `unsafe_road_users` → `walk_unsafe_road_users`, `unsafe_situations`
   → `walk_unsafe_situations`, `want_changes` → `walk_want_changes`, `wayfinding` → `walk_wayfinding`. `height` stays as
   it is, because it is about the person.
3. The feedback and usability-test forms keep their questions without `question_id`, because they are outside the pool.

The question content and the `question_version` values are unchanged. Because the stored answer keys change, every
questionnaire that contains one of these questions moves to a new major version. CityMaaS code does not read the old
names, but its `QuestionnaireBanks` test expects the walking keys `benches_importance`, `wayfinding` and
`prefer_pleasant`, so that test must change to `walk_benches_importance`, `walk_wayfinding` and `walk_prefer_pleasant`
when the pin moves to this configuration.

## Not yet covered

- CityMaaS Access Together still lists `smarturbanity_about_you` in its "About you" menu (`aboutYouForms`); it
  must point to `smarturbanity_your_profile` before this configuration is used there.

- CityMaaS `QuestionnaireResponseFirestoreRules` test uses `smarturbanity_daily_travel` as a sample id; check it still holds
  when the pin moves to a configuration without that form.
- CityMaaS `SmartUrbanityExternalConfiguration` test expects 22 forms and release version 3.0.0 in the pinned configuration;
  it must be updated when the pin moves to a configuration that includes these forms.

### When the car cannot be replaced (implemented)

The car-need form 3.2.0 replaces `car_need_uses` and the generic
`car_less_with_alternative` Yes/No with one optional matrix question,
`car_need_frequency_alternative` 1.1.0, translated in all eight languages.

- People first select from the same 18 car uses. Only selected uses show the two
  columns. The list lives in the form's `questionnaire.row_sources`, referenced by
  `row_source`: inline question `rows` would make the viewer select every row.
- "How often?": several times a week / weekly / monthly / rarely.
- "What would let you leave the car for this?": more frequent and reliable public
  transport, also in the evening / an accompanied or on-demand transport service /
  home delivery / a shared van / nothing would. The public transport option reuses
  the existing car-alternatives wording and value.
- "None of these" remains an explicit exclusive choice. It clears selected uses,
  shows no columns and stores `{"none": true}`. Selecting a use clears this choice.
  This requires the CityMaaS matrix renderer with exclusive-row support. Leaving
  every row unselected means skipping the question; a completely empty questionnaire
  cannot be submitted, following the existing application rule.
- Each selected row stores `frequency` and `alternative` under the new answer key.
  Already collected answers keep their original keys and are not migrated or rewritten.
  The generic Yes/No is no longer asked.

## Walking improvements and retention clarification — 9 November 2026

Lory approved explicitly including wheelchair travel and easier journeys in the
walking-improvements question and introduction. Three additive options cover
benches/rest places, ramps/dropped kerbs and paths clear of vehicles and other
obstacles; all eleven existing options and response keys are preserved. The
multiple-answer instruction moves into a separate help line. The question is
1.2.0 and its questionnaire is 3.2.0, following the additive-option rule above.

Lory confirmed the 36-month research retention period. All 54 survey introductions
and the questionnaire-feedback introduction state the period, then deletion or
anonymisation, in the eight languages. They identify the research team as readers,
as the questionnaire-feedback form already did. Other questionnaire versions move
by a patch. This addresses the retention concerns reported against welcome pages;
the feedback recommendations question is unchanged. No existing answers are
migrated and no browser retest or deployment is implied by this wording change.

Lory also approved shortening the car-alternatives motivation question to ask what
would help choose an alternative to the car for some trips. Unlike the old list of
walking/cycling/shared modes, this includes the public transport answers already
offered. Eight languages, question 1.4.0, questionnaire 1.3.0; all answer keys,
options and limits are preserved.

Lory approved the Italian age-band label "85 o più" for consistency with the
other numeric bands. This translation-only patch is age_group 1.1.1 and profile
1.21.2; no age-band value or other language changes.

Lory approved the Italian travel-company question "Nei tuoi spostamenti abituali,
viaggi soprattutto per conto tuo o con altre persone?" and answer "Soprattutto
per conto mio". Translation-only patches: frequent_trip_company 2.0.3, your_travel
1.0.2. Response values, other answers and other languages are preserved.

Lory approved adding "Annunci o informazioni sul viaggio che non potevo sentire
o leggere" to post-trip incidents, translated in all eight languages. The new
response value is `inaccessible_travel_information`; trip_incidents 2.7.0,
post-trip 4.9.0. Existing answers and exclusive none remain unchanged.
Both trip welcome pages now state the confirmed 36-month research retention
period followed by deletion or anonymisation, reusing the approved feedback-form
translations; pre-trip 4.6.1. Structural comparison verifies only these additions,
their translations and version changes; no browser/persona retest is implied.
Lory approved the neutral Italian economic-status explanation: "Lo chiediamo per
capire come le possibilità economiche influiscono sugli spostamenti."
Translation-only patches: economic_status 2.2.1, profile 1.21.3. Structural
comparison confirms that all other content, settings and languages are preserved.

Lory approved explaining tactile paving in Italian as "Percorsi riconoscibili
con i piedi o il bastone, per chi non vede o vede poco". Translation-only
patches: walk_want_changes 1.2.1, walking improvements 3.2.1. Structural comparison
confirms all response values, settings, other content and languages are preserved.

Lory approved the Italian option "Spazi per chi va a piedi o in sedia a rotelle, separati da biciclette e monopattini elettrici".
Translation-only patches: walk_want_changes 1.2.2, walking improvements 3.2.2.
Structural comparison confirms all answer values, settings, other content and
languages are preserved. No browser or persona retest is claimed.
