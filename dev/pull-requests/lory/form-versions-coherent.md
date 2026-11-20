# Align form workflow versions with their forms

Source: `lory/form-versions-coherent`. Target: `main`.

The Rome workflows declared the form versions in use before #59, while the forms
themselves advanced to 5.2.0 (street assessments) and 3.1.0 (reports). The app
refuses a form whose version differs from the declared one, so enabling the
current `main` would disable these assessments and reports. This change updates
the ten declarations in `pilots/rome/contribution_forms.json`; nothing else changes.

Validation: a repository-wide comparison of every declared form version with the
form file reports 0 mismatches; survey bundle and language verifiers pass; all
CityMaaS SmartUrbanity tests pass against this branch together with the matching
CityMaaS defaults and test update. The historical pilot-migration verifier still
fails on its outdated consumer call, unchanged by this branch.

After merge, enable the merged commit in `versions.json`, then CityMaaS pins the
same revision in `tests/helpers/smarturbanity-versions.json` together with its
aligned defaults.
