# SmartUrbanity Configuration

Central configuration repository for the SmartUrbanity digital ecosystem.

The repository provides version-controlled, machine-readable configuration shared across SmartUrbanity applications and pilots. It separates common SmartUrbanity definitions from pilot-specific configuration, allowing applications to load the appropriate configuration without embedding pilot-specific rules in the software.

## Configuration principles

The repository follows three main principles:

1. **Base configuration** provides the complete shared SmartUrbanity runtime baseline.
2. **Shared definitions** describe common SmartUrbanity concepts and vocabularies.
3. **Pilot configurations** contain only pilot-specific additions or overrides.
4. **Forms** are reusable definitions whose applicability can depend on the pilot, mobility mode, campaign or other runtime context.

Applications should consume these configuration files rather than maintain independent copies of SmartUrbanity definitions.

## Questionnaire privacy labels

Every form declares `questionnaire.privacy_classification`. A question or an
individual option can carry a more specific label:

- `personal_data`: the response is linked to a participant record;
- `heightened_personal`: the response warrants additional handling, for example
  because it contains a location, a habitual travel pattern or free text;
- `special_category_health`: the response may reveal health, injury or disability.

`special_category: "health"` separately flags a question or option for review.
Option-level labels apply only when that option is selected. These labels are
metadata for review and downstream handling; they do not themselves collect
consent, restrict access or redact exports. The legal treatment and application
controls need separate review.
See [GDPR Article 9](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679).

## Repository structure

The intended structure is:

```text
smarturbanity-configuration/
│
├── definitions/
│   ├── types/
│   ├── mappings/
│   └── ...
│
├── forms/
│   ├── surveys/
│   ├── tripSurveys/
│   └── locationReports/
│
├── manifests/
│   ├── smarturbanity.json
│   └── smarturbanity_surveys.json
│
├── pilots/
│   ├── rome/
│   ├── karlsruhe/
│   ├── izmir/
│   ├── lyon/
│   └── zurich/
│
└── README.md
```

Directory `index.json` files enumerate their direct children. A consumer loads
the root `base.json`, then applies the selected pilot JSON with a deep merge;
pilot files must not repeat unchanged base values. `pilots/rome/service_subtypes.json`
is a separately indexed Rome dataset, not a property duplicated in `rome.json`.

The structure may evolve as additional SmartUrbanity configuration domains are introduced.

## CityMaaS manifests

`manifests/smarturbanity.json` configures the Access Lab and citizen installations;
`manifests/smarturbanity_surveys.json` configures the Surveys and Admin installations.
CityMaaS loads these manifests from this repository. Their nested source URLs are
temporarily pinned to commit `bede6a3b769f1ee1ac92bf6340bd9fc2747c3b9d`, the
configuration revision compatible with the currently deployed CityMaaS form
versions. The `fallbackPath` values refer to the local debug checkout, when present;
they do not cause that checkout to be included in a deployment. Advance the pinned
source URLs with the CityMaaS form and participant-code support in one coordinated
release.
Each manifest also declares the compatible `forms/` catalog and the privacy notice
links used by its installations. The Access Lab manifest overrides only the notice
version and links; consent text and participant settings remain in `base.json` and
the selected pilot. A deployed installation requires the online sources because it
does not bundle this repository as a fallback.

## Shared definitions

`definitions/` contains configuration that belongs to the common SmartUrbanity model rather than to a specific pilot.

Examples include:

- service types and subtypes;
- access point types;
- supporting element types;
- opportunity types;
- mobility mode definitions;
- mappings between SmartUrbanity concepts.

Shared definitions provide stable identifiers and common semantics across applications and pilots.

Pilot-specific variations should normally extend, restrict or override these definitions rather than duplicate the complete shared catalogue.

## Pilot configuration

`pilots/` contains the configuration specific to each SmartUrbanity pilot.

For example:

```text
pilots/
└── rome/
    ├── pilot.json
    ├── modes.json
    └── ...
```

A pilot configuration describes the capabilities and settings available in that pilot.

For example, a simple mobility mode configuration may be:

```json
{
  "walk": {},
  "transit": {}
}
```

This indicates that the Rome configuration currently exposes walking and public transport as configured mobility modes.

Pilot configuration may progressively include other domains such as:

- available mobility modes;
- mobility profiles and presets;
- accessibility thresholds;
- available opportunities;
- service types and subtypes;
- languages;
- campaigns and participation phases;
- application features;
- map and interface configuration.

`data_model.study_area` identifies the pilot's geographical boundary through
an Area Group and an optional property selector. The boundary is the complete
geometry of the matching polygons, not their rectangular extent. For example,
Rome selects the Municipio XII polygons from the non-selectable `study_areas`
group.
When Study Area records name the included entities of an analytical Area Group,
`study_area.membership` declares that group and common name property. Rome uses
`denominazi` to match all 18 Study Area records to their Neighborhoods; other
Area Groups use geometric intersection with the resulting boundary.

`data_model.data_bbox` separately declares the hard data-loading extent as
`[minLongitude, minLatitude, maxLongitude, maxLatitude]`. Spatial entities must
be fully contained by this rectangle; geometries that cross it are not loaded.

Area Group `order` controls the selector order and `selectable: false` keeps a
technical boundary group in the model without presenting it as an analytical
choice. Rome exposes Quartieri, Sezioni censuarie and Celle H3 in that order;
the Municipio XII polygons define the Study Area boundary only. Areas outside
that boundary may remain loaded only when fully contained by `data_bbox`, but
Access Inspector shows them with one neutral colour instead of a KPI class.

`data_model.package_properties` lists, per element kind, the attributes the spatial
database exposes to applications. Rome's connections expose `walk_access`,
`bike_access` and the derived attributes `crossing_kind` and `crossing_users` that
forms may use to prefill a question (see [Prefill from element attributes](#prefill-from-element-attributes)).

## Extensions and overrides

Some SmartUrbanity definitions are shared across pilots, while others may require local adaptation.

Pilot-specific configuration may therefore:

- enable or disable shared definitions;
- add pilot-specific definitions;
- override selected properties of shared definitions.

The objective is to avoid maintaining complete copies of the SmartUrbanity taxonomy for every pilot.

Conceptually:

```text
shared definition
       ↓
pilot extension / restriction
       ↓
effective pilot configuration
```

Stable shared identifiers should be preserved whenever possible.

## Forms

`forms/` contains reusable JSON-based forms used by SmartUrbanity applications.

Current form families include:

```text
forms/
├── surveys/
├── tripSurveys/
└── locationReports/
```

Forms can include questionnaires concerning user characteristics, daily mobility, travel experience and individual transport modes, as well as trip-related and geolocated reporting workflows.

A form definition should describe the form itself, while its availability can depend on the runtime context.

This avoids creating separate copies of the same form for every pilot.

Every form is self-standing: it asks its own context questions (point of view, how often the person uses the place) and does not rely on answers given in another form. An application may pre-fill such a question from an earlier answer, but the person confirms it in the form.

### Minimum and details

The street connection and street segment assessments start with a short minimum that every response collects: the point of view, how often the person uses the element, its type (`connection_form`; `walk_facility` or `bike_facility`), for a street crossing how it is controlled (`crossing_kind`) and who it is for (`crossing_users`), the use difficulty and the perceived traffic risk for the selected mode, and the personal safety (harassment or assault, also in the evening) for every place. These are the indicators the infrastructure view uses. Minimum questions and `continue_audit` carry `"required": true` and every detail question `"required": false`, so the viewer (review mode) and the guided chat treat them alike. The minimum ends with `continue_audit`; every later question carries `"show_if": {"continue_audit": "yes_audit", ...}`, so a person who stops there sends a complete minimum response. Keep new detail questions behind that condition. `crossing_kind` and `crossing_users` declare `prefill_from`, so with a known element attribute they cost one confirmation each.

### Prefill from element attributes

A question of a form that assesses a mapped element may declare `"prefill_from": "element.<attribute>"`. The value comes from that attribute of the assessed element (the response `entity`) as exposed by the spatial database, today the mock and later the server. The database merges several sources, among them OpenStreetMap; a form never names a source tag such as `osm.crossing`, because mapping a source to an attribute belongs to the database import.

- Only `single_option` questions declare it, and the attribute's values are `value`s of that question's options.
- When the element has the attribute and its value is one of the options, the application shows the question with that option selected and says that it comes from the map. The person confirms it or chooses another answer, including "I don't know".
- When the attribute is missing, `null` or not one of the options, nothing is selected and the question is asked normally. A missing attribute never means "no", and the import leaves the attribute empty when its sources disagree.
- A prefilled value is a proposal, not an answer: it enters `answers` only when the person confirms it. A question hidden by `show_if` is not prefilled, and `required` keeps its meaning.
- Without asking, the response records in `meta.prefill` how each question that declares `prefill_from` was answered: `{"<answer_key>": "confirmed" | "changed" | "asked"}`, where `asked` means there was no proposal. It measures how often the database is right and is not an answer.
- Adding `prefill_from` to a question changes application behaviour, so the form needs a new version (see [Versioning](#versioning)).

Element attributes available for prefill:

| Attribute | Element | Values |
| --- | --- | --- |
| `element.crossing_kind` | connection of type `crossing` | `signal`, `marked_no_signal`, `unmarked` |
| `element.crossing_users` | connection of type `crossing` | `pedestrians_only`, `shared_ped_bike`, `separate_bike_lane`, `bikes_not_marked` |

The import derives them; this table records the intended mapping from OpenStreetMap for Rome so that importers agree. `crossing_kind` reads `crossing` on the crossing node and on the crossing segments of the connection:

| OpenStreetMap `crossing` | `crossing_kind` |
| --- | --- |
| `traffic_signals`, `zebra;traffic_signals` | `signal` |
| `zebra`, `marked` | `marked_no_signal` |
| `uncontrolled` | `marked_no_signal`, less reliable; whether to set it or leave the attribute empty is still open |
| `unmarked` | `unmarked` |
| `traffic_island` only, any other value, or segments that disagree | no value |

`crossing_users` is set only with evidence: a crossing segment with `cycleway=crossing` gives `shared_ped_bike`, or `separate_bike_lane` when a source shows separate bicycle markings; `bicycle=no` (`bike_access: false`) gives `pedestrians_only`. `bike_access: true` alone gives no value, because it does not say how the crossing is marked. An island (`traffic_island`, `crossing:island`), the push button, the audible signal, tactile paving and kerbs are not imported yet, so no question is prefilled from them.

### Special-category data

`special_category: "health"` marks GDPR art. 9 health data, pending legal review; no runtime behaviour yet. It sits on a question when the whole question collects the respondent's own health, disability, aid use, functional capacity or health effects, and on an option when only that option does. Questions about other people or the infrastructure, and healthcare as a destination, are not marked.

### Missing elements

A missing crossing or connection uses `missing_connection_report`; a missing walking or cycling path uses `missing_path_report`. Both reuse option sets of the assessments (`connection_form`, `walk_facility`, `bike_facility`) and of the improvement proposal (`proposal_beneficiaries`), so their answers can be compared. `missing_network_element_report` remains for reports that a mapped element does not exist. The missing connection splits `level_change` into `ramp_or_lift` and `stairs` and adds `exists_closed`; the missing path adds `accessible_sidewalk`, `passage_through_area`, `other` and "I don't know" and drops `shoulder`. Map them to the assessment sets when comparing answers.

### Questionnaire consent

Every form starts with one common eligibility screen: data-processing consent, an
optional age declaration and an optional email. Forms do not repeat it. The
application ships the default consent; `base.json` overrides it for SmartUrbanity
under `questionnaires.consent` and a pilot may override single values, for example
the age declaration and its minimum age. The age declaration is enabled per pilot:

```json
{"questionnaires": {"consent": {"adult": {"enabled": true, "min_age": 18}}}}
```

Each pilot may provide its own privacy notice and consent version. Rome declares
`pilots/rome/privacy/privacy.html` under `questionnaires.consent.privacy_link` and
its shorter summary at `pilots/rome/privacy/privacy-short.html`. A relative link is
resolved from the repository root, including when the configuration is served
offline. The Rome notice and consent version are drafts pending controller review.

`participant_code_destination` describes the service that returns the pseudonymous
participant code. The client sends the participant identifier or an account token
to that service; it does not compute the code from a salt in this configuration.
The configured destination currently points to the spatial server mock at
`/api/v1/participant-codes`. Application and service support is required before
using this configuration in a running pilot.

The consent text in `base.json` is a draft (`version: "1.0.0-draft"`) until Movesion supplies the final text; the final text must come with a new `version`, so earlier acceptances are not reused. `questionnaires.consent.languages` carries the SmartUrbanity consent text in every language, keyed by language and `#` tag; the other gate texts come from the application dictionary.

## Survey schedule and campaigns

When a form is offered is pilot configuration, not part of the form. Each pilot declares it in its own dataset `pilots/<pilot>/survey_campaigns.json` (`config_type: smarturbanity_survey_campaigns`), listed in the pilot `index.json`.

```json
{
  "config_type": "smarturbanity_survey_campaigns",
  "pilot_id": "rome",
  "pilot_period": {"start_date": "2026-11-14", "end_date": null, "timezone": "Europe/Rome"},
  "rules": {"show_all_in_debug": true},
  "campaigns": {
    "rome_walking": {
      "name": "Walking",
      "enabled": true,
      "priority": 0,
      "window": {"from_week": 1, "until_week": 8, "valid_from": null, "valid_until": null, "extended_until": "2026-12-20"},
      "area": null,
      "exclusive": false,
      "questionnaires": ["smarturbanity_walking_safety", "smarturbanity_walking_routes"]
    }
  }
}
```

- A campaign is a named group of forms (by `questionnaire_id`) with one availability window. `from_week` / `until_week` count from `pilot_period.start_date` (week 1 starts on that day, inclusive). `valid_from` / `valid_until` are ISO dates and take precedence over weeks. `extended_until` moves the end date and tells applications that the campaign was extended. `null` means open-ended.
- Every campaign is active when `enabled` is not `false` and today falls in its window. The pilot's base offer is simply its open-ended campaigns; a test event is a campaign with a short window.
- `area` limits a campaign to a place: `{"type": "circle", "center": {"lat": ..., "lon": ...}, "radius_m": ...}` or `{"type": "area_group", "area_group_id": ..., "area_ids": [...]}` from `data_model.area_groups`.
- When at least one active campaign is `exclusive`, only the forms of the active exclusive campaigns are offered; otherwise the forms of all active campaigns are offered. Campaigns sharing a `group` belong to the same event. If a form is in several active campaigns, the one with the highest `priority` decides its window.
- While `pilot_period.start_date` is `null`, every form in `forms/index.json` stays available, as before the schedule existed. With `show_all_in_debug`, debug and review modes always show every form, marked with its schedule status.
- A form card shows when its window ends ("until 24 Oct", "extended until ...", "opens on ...", "always available") and the form's `estimated_minutes`. Responses should record the id of the campaign through which the form was shown in their `campaign` metadata.

## Context-dependent configuration

Forms, sections, questions and potentially other configurable components may define conditions based on context.

Relevant context can include:

- pilot;
- mobility mode;
- campaign;
- application feature;
- participation phase.

For example, a question related to cycling should be able to declare that it requires cycling to be available rather than explicitly listing every pilot where the question should be hidden.

Conceptually:

```json
{
  "requires": {
    "modes": ["cycling"]
  }
}
```

Explicit pilot-specific applicability can still be used when the distinction is genuinely related to a particular pilot.

The preferred principle is:

```text
capability-based condition
        before
pilot-specific exception
```

This reduces pilot-specific logic embedded in reusable configuration.

## Application usage

SmartUrbanity applications should load the configuration corresponding to their pilot and resolve references to shared definitions and forms.

Conceptually:

```text
Application
    │
    ▼
Pilot configuration
    │
    ├── Shared definitions
    ├── Pilot extensions
    ├── Forms
    └── Other configuration
```

The resulting effective configuration represents the SmartUrbanity environment available to that application.

## Versioning

Configuration files should be version controlled through Git.

Individual configuration objects may additionally expose explicit schema or configuration versions where required, particularly for reusable definitions and forms.

Changes affecting identifiers, schemas or application behaviour should be treated as compatibility-sensitive changes.

Applications check the `questionnaire_version` of each form they load against the version they expect. Changes to stored answer keys, question structure, options or application behaviour need a new form version and a matching application update. Adding `privacy_classification` metadata alone does not change the response contract and retains the form version. [docs/QUESTIONNAIRE_CHANGES.md](docs/QUESTIONNAIRE_CHANGES.md) lists the keys, options and conditions each form version changes. Releases are Git tags; applications should load the configuration from a tag rather than from `main`, so that a change on `main` reaches an application only when the application moves to the new tag.

## Scope

This repository contains **configuration**, not operational SmartUrbanity data.

Runtime data such as observations, reports, calculated KPIs, spatial model instances or user submissions should be managed by the corresponding SmartUrbanity services and data stores rather than committed as configuration.

## Status

The configuration architecture is under active development. File structures and schemas may evolve while the pilot configuration model and integration between SmartUrbanity applications are consolidated.
