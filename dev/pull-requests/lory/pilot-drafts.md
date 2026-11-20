# Draft pilots and shared consent and publication rules

Source: `lory/pilot-drafts`. Target: `main`.

The root index now lists Karlsruhe, İzmir, Lyon and the Greater Zurich Area as
draft pilots (`"status": "draft"`), each with a minimal pilot document, map centre
and technical document in its own language. CityMaaS offers draft pilots only in
development and test, on a city selection page before the app landings.

The research consent wording, its languages and the participant-code service, and
the place perception publication rules, now live in this repository as two shared
files that every pilot lists among its parts. They copy the values CityMaaS keeps
in its code defaults today, so nothing changes for Rome; CityMaaS removes its copy
after this revision is enabled. Each pilot keeps its own consent version,
withdrawal contact and age limit.

Open point: the publication rules still accept only perception reports of
questionnaire version 0.2.2, while current reports are newer, so no perception is
published until the DPO-approved rules list the current version.

Validation: every pilot, joined with its parts and merged with the CityMaaS
defaults by the CityMaaS reader, yields the same consent and publication rules as
the defaults, its own language and map centre; the survey bundle verifier passes.
