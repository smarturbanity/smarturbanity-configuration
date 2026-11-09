# Trip surveys: comparison and company correction

Compared the supplied pre-trip 3.1.2 and post-trip 3.1.4 files with this branch.

Before the company correction, current pre-trip 4.6.1 had four questions instead
of three. Modes and purposes accept multiple answers; planned stops were added;
company became optional and includes accompanying someone who needs care.
Shared e-bikes and work vans are explicit mode choices; combined modes are chosen
directly instead of selecting a generic multimodal answer.

Post-trip 4.9.0 has fourteen questions instead of eleven. Mental effort, action at
a dangerous place, and an optional comment were added. Physical and mental effort
are separate. Only five ratings remain required; route, incident and feeling
questions are optional. Feelings allow multiple answers, the two-answer route
limit is removed, accessibility and incident choices are more specific, and the
overall rating uses five labelled choices instead of stars.

Both current forms include expanded research/privacy introductions and complete
text coverage in eight languages. No claim of native-speaker acceptance follows
from translation coverage. No old-response compatibility is introduced.

## Requested correction

Pre-trip now moves to 5.0.0. Company 3.0.0 contains only people and makes Alone
exclusive. Bags/trolley and pets move to a separate optional question,
`trip_load_and_pet` 1.0.0, with framework `add_none`. This keeps travelling alone
with a bag or a pet representable. The introduction now describes five questions.
No post-trip changes were made in this correction.

`node tools/verify_trip_company.mjs <CityMaaS-checkout>` executes the actual guided
toggle and standard form-selection functions. Both selection orders reject Alone
with another person; adults and children can coexist; load remains independent.
The actual app text-tag collector finds no missing text in any of the eight
languages for either form. This is source/interaction-function verification, not
a new end-to-end app recording and paired-submission test.
