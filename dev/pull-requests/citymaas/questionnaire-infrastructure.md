# Separate questionnaire infrastructure from editorial changes

Target: `main`.

Introduce the question bank and flow schema while keeping the active questionnaire content from main. Preserve historical answer-key aliases, runtime manifests and campaign scheduling. Inherit distinct full-notice and plain-language links from the pilot.

The separate `citymaas/questionnaire-content` branch carries proposed wording, answer changes and new questionnaire composition. Integrate infrastructure first, then review the editorial difference separately.

Validation: all 21 main questionnaires retain prompts, options, translations, order, branching and required flags; generated bank/forms checks and independent reference review pass. Runtime tools and privacy resolution are coordinated with the CityMaaS editor candidate. Human review and publication remain pending.
