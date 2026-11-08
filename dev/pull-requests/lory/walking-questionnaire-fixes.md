# Include wheelchair needs and explain confirmed answer retention

Source: `lory/walking-questionnaire-fixes`. Target: `main`.

People answering Walking improvements can now request places to rest, ramps and
clear paths. The question and introduction include wheelchair travel and easier
journeys as well as safety. Existing answers remain valid.

Survey introductions and the survey-feedback introduction explain who reads the
answers and the confirmed 36-month research retention period, followed by deletion
or anonymisation. All eight languages are updated. The recommendations question
is unchanged because the reported problem was missing introductory information.

Validated all 55 forms, eight language dictionaries, unchanged unrelated question
definitions and preserved walking response values. Browser acceptance and a new
persona test are not performed; this is a local configuration change.

The newer main car-matrix fix is preserved, including its exclusive none-of-these
answer. Its form version is 3.2.1 after combining the retention introduction.

The approved car-alternatives question now asks what would help choose an
alternative to the car, covering public transport as well as walking and cycling.
It is shorter in all eight languages; available answers and limits are unchanged.

The approved Italian age-band label is "85 o più", consistent with the numeric
labels of the other bands. This translation-only patch preserves its answer value.

The approved Italian travel-company question uses "per conto tuo" and its answer
"Soprattutto per conto mio" instead of "senza compagnia". Response values, other
answers and other languages are preserved.
