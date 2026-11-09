# Retain minimal runtime configuration on current questionnaires

The application needs the runtime manifest pins, Rome questionnaire overrides,
campaign containers and reproducible package exporter. This branch starts from
current main and adds only those eight files, preserving the exact runtime
payload previously verified at 5e3a11b. It carries no retired questionnaire copies
or composition tooling. The unified profile proceeds directly to travel.

Validation: mode catalogue/conditions (16 forms, 258 questions), six regressions,
19 SVG assets, framework translations and two location flows pass. Runtime roots
and exporter match the previous candidate byte for byte. Full app verification
and publication remain with the application coordinator; no push here.
