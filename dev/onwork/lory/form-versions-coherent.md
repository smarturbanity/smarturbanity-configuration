# Align form workflow versions with their forms

The required-answer release (#59) advanced the versions of the street assessment
and report forms, but the Rome workflows still declared the old ones. The app
compares the two and refuses a form whose version differs, so those reports and
assessments would not open once this configuration is enabled.

`pilots/rome/contribution_forms.json` now declares 5.2.0 for the two street
assessments and 3.1.0 for the eight reports, the versions their forms carry.
Only version numbers change.

Checks: every form reference in the repository now declares its form's version
(20 declarations, 0 mismatches, including the CityMaaS defaults); survey bundle
and language verifiers pass; all 108 CityMaaS SmartUrbanity test files pass
against this branch with the matching CityMaaS update. The historical pilot
migration verifier still fails on its outdated consumer call, as before.
