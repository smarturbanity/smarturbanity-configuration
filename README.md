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

`data_model.import_bbox` may declare the pilot model-import extent as
`[minLongitude, minLatitude, maxLongitude, maxLatitude]`. Servers use polygon
intersection with this extent when materializing configured Area Groups; it is
an ingestion filter and does not clip the source geometries.

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
