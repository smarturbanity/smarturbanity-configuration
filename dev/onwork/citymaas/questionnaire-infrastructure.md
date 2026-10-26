# Questionnaire infrastructure and schema

Source: local main `f5c9e03`, combining technical work from `citymaas/survey-question-review` (`a12bebd`), `citymaas/access-quarter-questionnaires` (`f743d75`) and `lory/hub-report-campaigns` (`ff02358`). The latter two contain no additional semantic changes beyond the survey review candidate (patch-equivalence checked).

The baseline contains 21 questionnaires and 265 question definitions. Prompts, answer options, translations, order, conditional branches and explicit required flags match main; historical answer-key aliases are additional technical metadata. The question bank, generated feed, manifests, consent destination and campaign scheduling are technical changes. Proposed question content and the new service form belong to the child branch `citymaas/questionnaire-content`.

Full and simple privacy links inherit from the pilot instead of obsolete manifest overrides. CityMaaS must resolve both repository-relative links against the bundled configuration checkout. Existing legal draft status is preserved.

Verification: bank build check; deep comparison of every baseline form ignoring only legacy_answer_keys; provenance SHA256; campaign and relative manifest references; independent read-only review. Migration of executable bank tools into CityMaaS is in progress. No base integration or remote deletion is authorized. Lory explicitly authorized deletion of the three named original LOCAL branches only after verification; original remote branches stay available.

Human review remains pending. No claim of publication or production deployment.

Final delivery:245 reusable definitions are canonical in PlanEasy;20 baseline-specific definitions and21 flows here. Runtime loads complete forms/*.json, not the pool; tools live in CityMaaS. legacy_answer_keys removed for the fresh collection; pilot supplies consent version and distinct full/simple notice links. Source local branches removed after replacement equivalence checks; remote originals unchanged.
