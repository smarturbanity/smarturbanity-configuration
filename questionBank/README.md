# Questionnaire preparation data

Reusable questions live in the PlanEasy crowdsourcing framework questionBank, preserving their immutable IDs. SmartUrbanity owns specific questions (Rome locality, recorded trip confirmation and service/entity schema) and questionnaire flows.

Applications load complete forms/*.json through the manifests, without requiring the pool during compilation by respondents. feed.json and review/reference.json are portable generated/review snapshots, not additional canonical definitions.

Executable tools and editor belong to CityMaaS. From its checkout:

    node scripts/question-bank/build.mjs --configuration-root <SmartUrbanity> --question-bank-root <PlanEasy>/questionBank --check
    node scripts/question-bank/build.mjs --configuration-root <SmartUrbanity> --question-bank-root <PlanEasy>/questionBank
    node scripts/question-bank/audit.mjs --configuration-root <SmartUrbanity> --question-bank-root <PlanEasy>/questionBank

Use matching infrastructure or editorial branches of both repositories. Complete exported JSON questionnaires can be reviewed, imported in the editor and reused independently. Multi-owner imports must not silently copy shared definitions back here; update the owning bank deliberately.

Shared pool baseline: lory/question-pool-infrastructure; proposed wording: lory/question-pool-content. Migration source hashes and exact paths are recorded in PlanEasy questionBank/source.json.
