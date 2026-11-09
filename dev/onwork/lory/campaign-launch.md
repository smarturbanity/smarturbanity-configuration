# Initial campaign availability

Owner: configuration. Base: current main 5a04c0c (same questionnaire content as
the app's d9fd candidate). Open profile and first walking only; later scheduled
forms carry disabled/coming-soon metadata without invented dates. Preserve
form contents, follow-up relationships, report
forms, identities, consent and answer storage.

The separate pilot-configuration-refresh candidate remains separate. App owner
implements generic rendering/adapter support and integrates the verified source
revision. No app deployment or historical issue closure is claimed here.

The old bundle verifier assumed every mode questionnaire remained disabled. This
expectation is obsolete after the explicitly authorized first-walking opening;
replace it with an exact allowlist check, keeping all form/coverage checks intact.

All report/menu block availability now lives in the pilot application source,
using the existing contentsAvailability contract. Preserve services/connections
open and experiences/streets closed. No new future-function contract is added.

Validation passed: 444 actual campaign-consumer cases across 37 forms, date and
debug/review combinations; 16 mode bundles/258 questions; 19 survey language
checks; 19 SVGs; all six bundle/language regression tests. No form changes.

User correction: remove show_all_in_debug from the pilot entirely. Showing all
forms in debug is owned by application code; source verification checks calendar
offers independently and must not assert a disabled debug override. App owner
implements and verifies the code-owned behavior.

Campaign transport_modes now explicitly identifies filter membership for all
nine campaigns; profile/future are general ([]). No inference from display names
or IDs is needed. Calendar availability and questionnaire contents are unchanged.
