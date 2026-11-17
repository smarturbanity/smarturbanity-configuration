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
fields. The HTML switches between Italian and English in one self-contained file,
preserving active filters; CSV exports are available in both languages.
The unavailable car-use row catalogue is explicitly identified.

Validation: six bundle regressions; language ownership; actual trip-company and
location-context consumers; structural policy/diff checks; 473-row HTML with working
search/group/questionnaire/privacy filters and both language-switch directions.
Fresh regeneration leaves all three exports unchanged. The 19 SVG assets validate;
independent review found no blocking issue in the configuration or exporter.
The application support for text and matrix refusal
is delivered separately in `lory/app-ritocchi-dev-release`; configuration publication
requires that coordinated application support. These checks do not replace full
application acceptance or legal review of privacy handling. Deployment and
protected-base integration remain human operations.
