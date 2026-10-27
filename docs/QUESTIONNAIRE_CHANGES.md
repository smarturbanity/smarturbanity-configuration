# Questionnaire changes

Changes to stored answer keys, options and conditions, per form version. Analyses
must separate responses by `questionnaire_version`: an option added in a version is
missing, not "no", in earlier responses.

## Version 3.0.0 alignment (2026-10-26)

Every SmartUrbanity survey, trip survey and location report now declares
`questionnaire_version` 3.0.0, and the application manifests select 3.0.0. The
version marks the move of question ownership to the shared PlanEasy question pool:
questions carry neutral `question_id`s pinned to exact semantic question versions,
privacy classification is declared on the question (option-level
`special_category` is removed) and `gdpr_link` points to the SmartUrbanity privacy
notice. Stored answer keys, question types and option values are unchanged from
the previous versions, so responses remain comparable across this boundary; the
new `smarturbanity_service` form has no earlier version.

## Street crossing control (2026-10-21)

`street_connection_assessment` 0.7.0 removes the repeated regulation choice from
the minimum. `crossing_kind` still records whether the street-level crossing has a
traffic light, markings without a light, or neither. The following required
`traffic_control` question appears only for `crossing_kind=signal` and asks what
happens at that light. Its active options are `protected_signal`,
`permissive_signal_with_turning_conflict`, `unclear_signal_priority`, and
`signal_broken`, plus an explicit unknown answer. The eight language translations
and question-bank version are updated. The Access Together manifest selects 0.7.0.

For an unmarked or marked crossing without a signal, the answer to `crossing_kind`
is sufficient to classify the infrastructure; `traffic_control` is **not asked or
stored**. Analysts may derive the equivalent historical categories
`no_control` / `priority_no_signal` from `crossing_kind` when comparing versions,
but must not treat a missing `traffic_control` answer as a respondent's answer.
The optional `driver_yielding` question now follows the two crossings without a
signal. It no longer appears for a broken signal because the current `show_if`
format cannot express the union of that case with crossings without signals.
Historical answers and the meaning of existing option values are unchanged.

## Cycle crossing protection (2026-10-19)

`street_connection_assessment` 0.6.0 adds `bike_path_unprotected` to the existing
optional `cyclist_crossing_problems` detail question, behind
`continue_audit=yes_audit` for the cyclist perspective. It records lack of physical
separation from motor traffic, independently of continuity, parked vehicles and
right of way. All eight form languages include the option. Existing keys, option
values, required minimum and consent remain unchanged. Earlier responses lack
this option; absence is not a negative answer. The Access Together bundled manifest
selects 0.6.0.

## Access Together retest (2026-10-19)

`street_connection_assessment` 0.5.0 extends the minimum approved for the next
research round. The existing `traffic_control` question moves before
`continue_audit`, becomes required, and keeps its street-level condition, keys,
options and explicit unknown answer. Its detail dependants remain optional behind
the audit gate. A required street-level `refuge_island` question records yes, no
or unknown independently of signal control and crossing users. All eight form
languages include the new question. Earlier versions have no island answer;
absence must never be analysed as no.

The minimum has a variable total: walking, cycling, both, street-level, bridge
and underpass routes ask different applicable questions. Assessment still precedes
an office dossier. This revision adds no health question or consent.

## Round 4 crossings and cycle paths (2026-10-17)

Proposals P1–P12 of the Round 4 resident study, approved by the owner on
17 October 2026.

| Proposal | Form and version | Key | Change |
| --- | --- | --- | --- |
| P1 | `street_connection_assessment` 0.4.0 | `crossing_kind` | New minimum question after `connection_form`, for `connection_form` = `street_level`; `prefill_from` `element.crossing_kind`; options `signal`, `marked_no_signal`, `unmarked` |
| P2 | `street_connection_assessment` 0.4.0 | `crossing_users` | New minimum question after `crossing_kind`, for `connection_form` = `street_level`; `prefill_from` `element.crossing_users`; options `pedestrians_only`, `shared_ped_bike`, `separate_bike_lane`, `bikes_not_marked` |
| P3 | `street_connection_assessment` 0.4.0 | `signal_call` | New detail question for `crossing_kind` = `signal`; options `automatic`, `push_button_working`, `push_button_broken` |
| P4 | `street_connection_assessment` 0.4.0 | `audible_signal_status` | New detail question for `crossing_kind` = `signal`; options `working`, `broken`, `missing`. `safety_features` keeps `audible_signal` for comparison with earlier versions |
| P5 | `street_connection_assessment` 0.4.0 | `green_time_sufficient`, `signal_wait_time` | Condition changed from `traffic_control` (three signal options) to `crossing_kind` = `signal`: who answers changes |
| P6 | `street_connection_assessment` 0.4.0 | `street_crossing_problems` | New detail question for `connection_form` = `street_level`; options `faded_markings`, `missing_curb_ramp`, `curb_ramp_blocked`, `curb_ramp_damaged`, `vehicles_parked_on_crossing`, `tram_tracks`, `uneven_paving`, `water_collects`, `bike_path_crosses_sidewalk`, `none` |
| P7 | `street_connection_assessment` 0.4.0 | `visibility_obstacles` | New options `two_wheelers_parked`, `outdoor_seating` |
| P8 | `street_connection_assessment` 0.4.0 | `unsafe_use_type` | New option `two_wheelers_filtering` |
| P9 | `street_connection_assessment` 0.4.0, `street_segment_assessment` 0.4.0 | `street_crossing_problems`, `traffic_interaction_problems` | New option `bike_path_crosses_sidewalk`, same value in both forms |
| P10 | `street_connection_assessment` 0.4.0 | `cyclist_crossing_problems` | New detail question for `assessment_perspective` = `cyclist`; options `bike_path_interrupted`, `no_bike_crossing`, `not_yielding`, `bike_path_blocked`, `kerb_at_entry`, `tram_tracks`, `none` |
| P11 | `street_connection_assessment` 0.4.0 | `safety_features`, `main_improvements_needed` | New options `bike_crossing_markings`, `bike_signal` in `safety_features`; `audible_signal`, `protect_curb_ramp`, `connect_bike_path` in `main_improvements_needed` |
| P12 | `smarturbanity_near_miss_report` 0.3.0 | `nm_location_type` | New option `cycle_crossing` |

No new question or option collects the respondent's own health: the sound signal
and the curb ramp describe the infrastructure and other people. `traffic_control`
and its options are unchanged; whether it is shown only for signalled crossings,
and the overlaps `vehicles_parked_on_crossing` / `vehicles_block_connection` and
`audible_signal_status` / `audible_signal`, remain open.
