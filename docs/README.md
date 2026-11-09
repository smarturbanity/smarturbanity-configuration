# Questionnaire documentation

## Current reference

- [Approved decisions](open-issues-decisions-2026-11-09.md): decisions and their source checks. Definitive decisions must not be proposed again.
- [Acceptance and remaining checks](questionnaire-retest-readiness.md): distinguish source verification, browser checks and human acceptance. Historical failures retain their original tested versions; later evidence supersedes only the checks it actually repeats.
- [Sectioned questionnaires](sectioned-surveys.md): current composition, source forms, rebuild and verification commands.
- [Connection and segment reports](connection_questionnaire_verification.md): report structure, conditions and verification limits.
- [Standard None of these and exact exports](questionnaire-updates/2026-11-09-add-none.md): shared option flag and the consistent runtime JSON format.

The composition files under `tools/survey-bundles/` are maintained build inputs,
not disposable reports. They declare which source sections form each questionnaire;
the application loads the resulting files under `forms/`.

## Decision and change history

- [Round 30 corrections](round30_resolved.md) and [per-finding dispositions](round30_issue_dispositions.md) record that round's scope and definitive decisions.
- [Questionnaire wording history](walking_safety_questionnaire_notes.md) preserves earlier proposals and changes. Later implemented changes and definitive decisions supersede earlier proposals; this file is not an open-issue list.
- The [None migration manifest](questionnaire-updates/2026-11-09-add-none.json) records affected revisions.

Technical checks do not establish human comprehension, native-language acceptance,
external submission or native browser zoom at 150%. Record these separately and
do not reopen approved product decisions because an acceptance check is pending.
