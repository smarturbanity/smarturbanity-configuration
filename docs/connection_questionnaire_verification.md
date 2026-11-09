# Connection and segment reports: verification

Verified questionnaire source: 90a6a133d9d4acaf0e7f40bc33e4fa80db2f96bb (both reports 4.0.1), following initial alignment 5fe7888b5d555f9c1e390af01072beb0b939ea5e. Owner chose direct answers matching mode questionnaires and confirmed there are no historical responses. Existing round30 definitive decisions remain closed.

## Resolved

- Connection and segment reports now share the mode-questionnaire structure: point of view, place, passage, road safety, personal security and optional detail sections. Eight language variants cover the new text.
- Passage preserves impossible access separately from difficulty. Road safety and personal security use direct answers, with separate day/evening security questions.
- Waiting before a crossing and resting along a connection are separate. Rest remains available for every connection type; crossing-specific questions stay on street-level crossings.
- CF-C1-01: signal-call, waiting-time and green-duration questions are hidden when the signal is broken or its operation unknown. Driver-yielding remains relevant for a broken signal.
- CF-C1-02: required journey context accepts the existing private-answer option in both reports.
- The companion app candidate reads the selected walking/cycling perspective without borrowing the other mode. Direct answers, impossible access, unknown/private answers and legacy urgency/risk values have explicit colours. Car mode does not inherit pedestrian/cyclist answers. No inferred aggregate or migration is introduced.

## Evidence and limits

Source checks passed 274 contract, condition and language assertions. The wider flow audit indexed 73 forms, 347 condition terms, 47 follow-up edges, seven questionnaire chains and 42 representative connection branches with no errors or warnings. These checks used the production condition evaluator; they are source evidence.

Three actual-app browser cases passed locally: broken street-level signal, switching to an under-road connection, and the short segment route at 360px. They verify displayed/hidden fields and reaching review; no external submission or screen-reader validation is claimed. Companion app focused styling tests and preflight passed. Its exact committed candidate has a separate mandatory final aggregate gate.

Independent source review first caught an overrestricted rest condition, corrected before the frozen simulations. Final independent review found no additional concrete defects.

Wemo study access-easy-residents, round34: three sequential source-based cycles, each with Marco, Sara and Roberto answering both reports (nine simulated sessions, eighteen traces). Cycle1 targeted 5fe7888; cycles2 and3 targeted 90a6a13. All three runs are executed, reviewed, publication-validated and imported in the local execution register:

- connection-flows-5fe7888-cycle1: found CF-C1-01 and CF-C1-02.
- connection-flows-90a6a13-cycle2: rechecked corrected conditions and private answers.
- connection-flows-90a6a13-cycle3: confirmed both finding IDs resolved, with no new concrete issue.

The coordinating agent executed these personas sequentially from frozen source and reviewed the structured evidence. They are hypothetical personas, not independent agents, residents, native-language reviewers or rendered-app usability sessions. Raw prompts and response traces remain in the private evidence store; the study register retains hashes and provenance. No new product decision is pending from these cycles. No push or deployment was performed.
