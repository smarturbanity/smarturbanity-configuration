# Enable the configuration revision on main

`versions.json` enabled `7fd65f90`, the last commit of `lory/access-together-pilot-flow`. That branch was
squash-merged as `37b19e6` ("Pilot flow (#56)") and deleted, so no branch holds the enabled commit any more and
GitHub may eventually discard it.

`versions.json` now enables `37b19e6`, on `main`. The two commits differ only in `versions.json`, so the apps read
the same configuration.

After merge, CityMaaS pins the same revision in `tests/helpers/smarturbanity-versions.json`.
