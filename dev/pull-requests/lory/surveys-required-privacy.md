# Require visible questionnaire answers and offer explicit privacy refusal

Source: `lory/surveys-required-privacy`. Target: `main`.

All 469 authored questions and four generated Other fields in the 32 questionnaires
under surveys, tripSurveys and locationReports require answers when visible.
Heightened personal and health questions offer Prefer not to say. Existing refusal
choices remain, and service creation retains its user-approved exception requiring
at least one available activity. Ordinary answer values, privacy classes, conditions
and campaign activation are unchanged.

Introductions and optional-field labels match the new interaction contract; semantic
versions advance. The README documents the required-answer policy, explicit
refusal and privacy metadata.

Validation: six bundle regressions; language ownership; actual trip-company and
location-context consumers; structural policy/diff checks for all 32 forms and
473 fields. The 19 SVG assets validate; independent review found no blocking
configuration issue. Reference and diff checks cover the final documentation
cleanup, which preserves form JSON and maintained verifiers byte for byte.
The historical pilot-migration verifier fails against its outdated consumer call
and migration baseline; it was not weakened or reported as passing.
The application support for text and matrix refusal
is delivered separately in `lory/app-ritocchi-dev-release`; configuration publication
requires that coordinated application support. These checks do not replace full
application acceptance or legal review of privacy handling. Deployment and
protected-base integration remain human operations.
