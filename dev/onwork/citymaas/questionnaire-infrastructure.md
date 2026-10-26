# Questionnaire infrastructure and schema

Target: main. The technical branch citymaas/questionnaire-infrastructure owns runtime configuration, schema and campaign changes while preserving the21 main questionnaire contents. Its editorial child citymaas/questionnaire-content holds proposed wording/answers/composition and22 complete forms. Required flags were preserved; their review-mode defaults require a separate research decision.

Reusable definitions are canonical in PlanEasy:245 on lory/question-pool-infrastructure and lory/question-pool-content. SmartUrbanity retains20 baseline-specific or26 proposed definitions plus its flows. Runtime reads autonomous forms/*.json; it does not require the pool. Executable tools and audit belong to CityMaaS. Portable feed and reference snapshots are generated/review artifacts.

Lory explicitly requested fresh collections, so legacy_answer_keys metadata was removed. Pilot configuration supplies distinct full/simple notice links and consent version; obsolete manifest overrides are removed.

Verified: deep preservation of main form content before metadata removal, bank compilation of21 baseline and22 proposed forms with external245 definitions, exact copy migration/provenance and independent reference review. The245 removal inventory was explicitly authorized after copy verification. Three named original local branches were deleted only after verifying all271 definitions/22 flows preserved and each original tip retained on origin. Remote originals unchanged.

Human review remains pending. No base integration or production deployment performed.
