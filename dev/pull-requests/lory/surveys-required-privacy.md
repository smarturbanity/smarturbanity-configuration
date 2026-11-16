# Require visible questionnaire answers and offer explicit privacy refusal

Source: `lory/surveys-required-privacy`. Target: `main`.

All 469 authored questions and four generated Other fields in the 32 questionnaires
under surveys, tripSurveys and locationReports require answers when visible.
Heightened personal and health questions offer Prefer not to say. Existing refusal
choices remain, and service creation retains its user-approved exception requiring
at least one available activity. Ordinary answer values, privacy classes, conditions
and campaign activation are unchanged.

Introductions and optional-field labels match the new interaction contract; semantic
versions advance. A filterable HTML table and CSV list every question, answer,
dependency and privacy flag, including current service catalogues and generated
fields. The unavailable car-use row catalogue is explicitly identified.

Validation: six bundle regressions; language ownership; actual trip-company and
location-context consumers; structural policy/diff checks; 473-row HTML with working
search/group/questionnaire/privacy filters. The application support for text and matrix refusal
is delivered separately in the coordinated CityMaaS candidate. Deployment and
protected-base integration remain human operations.
