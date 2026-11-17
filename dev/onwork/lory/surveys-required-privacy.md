# Mandatory visible questions and explicit refusal

## Scope and decisions

All questionnaires recursively under surveys, tripSurveys and locationReports:
32 forms, 469 authored questions and four generated Other text fields. Every
visible question requires an answer. Heightened personal and health questions
offer Prefer not to say, preserving existing refusal choices on ordinary personal
questions. The user explicitly excepted the opportunity matrix during service
creation: at least one available activity is still required. The separate
opportunity-report form continues to offer refusal.

Privacy labels, response keys, ordinary options, conditions, campaign activation,
and section constraints are preserved. Question and questionnaire minor versions
advance for the changed interaction contract. Welcome instructions and formerly
optional field labels reflect the new requirement in their existing languages.

## Verification and boundaries

The six survey-bundle regressions, framework language ownership, trip-company
selection and location-context conditions pass against the actual CityMaaS code.
A structural comparison confirms retained privacy, ordinary options, keys and
conditions, required flags, refusal coverage with the agreed exception, and all
473 fields, including the four generated Other fields. The 19 survey SVG assets
passed their maintained validation. An independent read-only review found no
blocking defect in the configuration and confirmed the service-creation exception.

Existing test expectations that declared travel load and mobility support optional
were deliberately updated to mandatory with explicit refusal, matching the new
user requirement; their exclusivity and conditional checks remain intact.

These are configuration checks, not a new full application E2E acceptance run
or a legal review of privacy handling.

The historical pilot-migration verifier is not a general gate for this branch:
it invokes the current consumer without its required application config type and
permits only one form change relative to its historical migration baseline.
That check fails and was not weakened or presented as passing. The relevant
questionnaire, language and asset checks above pass.

## Final documentation cleanup

The temporary review exports and their dedicated generator are removed. The
README retains the required-answer policy, explicit refusal and privacy metadata.
Form JSON, maintained verifiers, campaign settings and all other application
inputs remain byte-identical to the reviewed candidate. Reference and diff checks
cover the cleanup; no new application acceptance run is claimed for it.

## Coordinated application change

Text, textarea, generated Other and matrix refusal require the coordinated CityMaaS
candidate `lory/app-ritocchi-dev-release`, which includes the application support.
Configuration-only publication cannot claim those interactions are ready in an
older application. No deployment or change to the protected base is part of this task.
