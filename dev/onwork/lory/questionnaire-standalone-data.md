# Standalone questionnaire data ownership

Source branch: lory/questionnaire-standalone-data; base and target: main at c5decb4744bac0dd587fa8ab060e22cb9df1ea5a. Main is read-only for this task. Existing branches and published questionnaires are preserved.

Lory revised the ownership contract: PlanEasy contains all question definitions and immutable history, SmartUrbanity contains only complete questionnaires, and CityMaaS contains executable tools and the shared review editor. Remove questionBank only after verified committed PlanEasy preservation.

This common migration preserves main's questionnaire wording and versions while adding stable question identity/version and portable revision history. Only forms/surveys belongs to Marzieh's wording-review branch. Pre Trip, Post Trip, location reports and service creation belong to the independent non-survey candidate.

Validation pending: complete pool copy/history equivalence, unchanged main wording and answer keys, standalone catalog references, JSON parsing and framework revision checks. Human research-content acceptance remains pending.

Preservation accepted independently: PlanEasy commit d0dd0ebb8cdd4d31a2b0997c0d3a7d074aed0b1e contains 343 canonical definitions and 648 immutable versions; every baseline/content definition and Marzieh node is mapped to exact preserved history. The 21 main questionnaires retain exact content and versions after stripping only new identity/editorial metadata; 283 question nodes have stable identity/version. questionBank is absent and runtime manifests contain zero bank references. JSON and whitespace checks passed. No research wording or required-policy changes in this branch.
