# Separate questionnaire infrastructure from editorial changes

Target: main. Introduce technical configuration, schema, standalone runtime catalogs and campaign scheduling while preserving main question content. The editorial child citymaas/questionnaire-content contains the proposed wording and composition.

Canonical reusable questions live in PlanEasy; project-specific definitions and flows remain in SmartUrbanity. CityMaaS owns editor, audit, build and exchange tools. Runtime applications load complete forms/*.json. Fresh collections omit legacy_answer_keys. The pilot supplies full/legal and simple/research notice links independently.

Validation:21 baseline and22 editorial forms compile from local definitions plus245 shared questions; copy/provenance, content preservation and reference checks pass. Human content review and publication remain pending.
