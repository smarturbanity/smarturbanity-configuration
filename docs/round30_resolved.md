# round30: completed corrections

This historical record describes the corrections verified for round 30. Later
questionnaire changes are listed in the [documentation index](README.md).
Historical persona results remain unchanged.

| Area | Completed behavior | Verification | Remaining limit |
| --- | --- | --- | --- |
| Car-use matrix | Frequency and alternative appear only for selected uses; all 18 uses and eight languages remain. | 14 isolated actual-app browser checks and translation checks. | No new persona study or live response-storage check. |
| None of these | An exclusive answer clears uses, has no columns and submits; selecting a use clears it. | Selection, restoration, local submission and mobile widths. | Requires the matching app renderer; no configuration pin moved. |
| Questionnaire regression | Session consent is reused; offline keep/reject decisions save correctly. | All five questionnaire browser scenarios and final aggregate PR checks pass. | Full catalogue acceptance was not requested. |
| Issue details | Clicking the title opens full text and recorded checks; clicking again closes it. | 42 checks plus browser mouse/keyboard/mobile checks on the vehicles_used issue mentioning "duplicate for 101". | This fixes opening the issue, not its questionnaire content. |

The candidate also retains Claude's rounds 28-29 work and the questionnaire splits
already in its history. This is not a claim that every historical issue is resolved.

## Historical evidence

The local dashboard's technical-check record
`round30-matrix-questionnaire-dashboard-20261109` lists the matrix, the corrected
questionnaire regression and the issue-details toggle, with original local proof
hashes. It does not change historical issue states.

These are technical verifications, not new persona acceptance. No push, pin change
or remote publication is part of this consolidation.

## Remaining questionnaire findings addressed

The follow-up candidate changes eight forms using Lory's decisions 1A, 2A, 3A,
4B and 5A. It addresses 31 of the 39 frozen findings with configuration changes,
checks enlargement for one, and records why seven existing behaviors remain.
Of those seven, Q30-6, Q30-7, Q30-23 and Q30-25 are closed definitive decisions
by Lory: optional economic question, one main trip purpose, app-supplied gender
options and consistent Italian “tu”. Do not count them as unresolved or propose
them again.
See [the complete per-finding disposition](round30_issue_dispositions.md) for
versions, verification and limits. Historical persona outcomes remain unchanged.
