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

## Survey schedule and campaigns

When a form is offered is pilot configuration, not part of the form. Each pilot declares it in its own dataset `pilots/<pilot>/survey_campaigns.json` (`config_type: smarturbanity_survey_campaigns`), listed in the pilot `index.json`.

```json
{
  "config_type": "smarturbanity_survey_campaigns",
  "pilot_id": "rome",
  "pilot_period": {"start_date": "2026-10-05", "end_date": null, "timezone": "Europe/Rome"},
  "rules": {"base_campaigns": ["rome_profile", "rome_walking"], "show_all_in_debug": true},
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
- The pilot's base campaign is the union of `rules.base_campaigns`. Other campaigns, such as a test event, are active when `enabled` is not `false` and today falls in their window.
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

## Scope

This repository contains **configuration**, not operational SmartUrbanity data.

Runtime data such as observations, reports, calculated KPIs, spatial model instances or user submissions should be managed by the corresponding SmartUrbanity services and data stores rather than committed as configuration.

## Status

The configuration architecture is under active development. File structures and schemas may evolve while the pilot configuration model and integration between SmartUrbanity applications are consolidated.
