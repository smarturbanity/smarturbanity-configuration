# Configuration commit per installation

`versions.json` gains `installations`, one configuration commit per SmartUrbanity
installation keyed by the application id in its image, and `development`, read only by
dev images, which may name a commit or a branch. Access Together, Access Lab, Surveys,
Admin Portal and the spatial database mock read `645d71f`.

`repositories.smarturbanity-configuration` stays at `37b19e6`: images up to version
1.0.14 read only that entry and ignore the new rows, so they keep loading as today.
Images from the CityMaaS configuration-per-installation release read their own row and
never fall back to `main`. The README describes the rows, compatible changes and when a
deploy comes first.

Merging is safe before or after that CityMaaS release is deployed.

Validation: the JSON parses; the CityMaaS row-selection rule returns `645d71f` for every
listed installation in prod, test and dev and `37b19e6` for an unlisted one.

Owner: Lory.
