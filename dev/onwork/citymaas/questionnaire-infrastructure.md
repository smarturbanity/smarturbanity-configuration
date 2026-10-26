# Questionnaire infrastructure and schema

Source: local main `f5c9e03`, combining technical work from `citymaas/survey-question-review` (`a12bebd`), `citymaas/access-quarter-questionnaires` (`f743d75`) and `lory/hub-report-campaigns` (`ff02358`). The latter two contain no additional semantic changes beyond the survey review candidate (patch-equivalence checked).

The baseline contains 21 questionnaires and 265 question definitions. Prompts, answer options, translations, order, conditional branches and explicit required flags match main; legacy answer-key aliases were removed at the user request for a fresh collection. The question bank, generated feed, manifests, consent destination and campaign scheduling are technical changes. Proposed question content and the new service form belong to the child branch `citymaas/questionnaire-content`.

Full and simple privacy links inherit from the pilot instead of obsolete manifest overrides. CityMaaS must resolve both repository-relative links against the bundled configuration checkout. Existing legal draft status is preserved.

Verification: bank build check; deep comparison of every baseline form ignoring only legacy_answer_keys; provenance SHA256; campaign and relative manifest references; independent read-only review. Migration of executable bank tools into CityMaaS is in progress. No base integration or remote deletion is authorized. Lory explicitly authorized deletion of the three named original LOCAL branches only after verification; original remote branches stay available.

Human review remains pending. No claim of publication or production deployment.

Final architecture:245 reusable canonical definitions in PlanEasy, SmartUrbanity-specific definitions and flows here, complete standalone runtime JSON, tools in CityMaaS. Three named original local branches removed after source/pool/form equivalence checks; remote originals untouched. Consent links and version inherit the pilot.
