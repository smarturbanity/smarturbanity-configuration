# Questionnaire minor clarifications

Owner: Lory. Requested scope: implement item 2 of the review recommendations.

Three active surveys change, seven questions in total, in all eight languages:
- Walking/public transport surroundings: add a separate `cannot_assess` answer.
- Walking/public transport air quality: separate route and departure time.
- Walking/public transport weather: separate preparation and route.
- Keep one response for air/weather and explain to choose the most frequent action.
- Cycling barriers: add an interrupted cycle path/lane, retaining Other and exclusive None.

No existing response migration is needed under the confirmed product decision.
Split combined responses receive distinct values and major question revisions;
other answers, optionality, conditions, question count and privacy are preserved.

Validation: actual-consumer survey verifier (16 forms, 51 sections, 258 questions,
37 catalogue entries, eight languages), language verifier, six existing verifier
regression tests, focused old/new contract comparison and diff whitespace check.
All passed. No application integration, deployment, browser acceptance or dashboard
closure is claimed by this source-only task.
