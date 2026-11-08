# Walking improvements and confirmed retention

## Outcome

Walking improvements now explicitly includes wheelchair travel and ease of travel.
It adds benches/rest places, ramps/dropped kerbs, and paths clear of vehicles or
other obstacles. Multiple selection is explained in a separate help line; all
eleven existing option values and the exclusive none option are preserved.
The question advances to 1.2.0 and the form to 3.2.0, following the owning notes'
rule for additive options.

Lory confirmed the 36-month research retention period on 9 November 2026.
The 54 survey welcome pages and the survey-feedback welcome now state that period,
then deletion or anonymisation, in all eight languages. They also state who reads
the answers, matching the existing survey-feedback introduction. Existing consent
options, response keys and other questions remain unchanged. Other forms advance
by a patch for this introductory text. The feedback recommendations question stays
unchanged: its reported obstacle concerned missing retention information.

## Verification and limits

Structural checks passed for all 55 forms and eight languages, unchanged question
definitions outside the walking correction, existing walking response values,
unique options and complete translations of the added text. No browser persona
retest or application deployment is claimed. The shared pool is separately owned;
this change publishes standalone form definitions only.

The later car-matrix fix from main is integrated without changing its question,
row-source definitions or translations. The merge combines its exclusive
none-of-these answer with the confirmed retention introduction; the car-need form
is 3.2.1. Checks compare the combined question and row source with the incoming
main definition and confirm all eight retention translations.

Lory also approved shortening the car-alternatives motivation question to ask what
would help choose an alternative to the car for some trips, including the public
transport choices already offered. All eight languages are updated. Its question
is 1.4.0 and form 1.3.0; answer keys, options, limits and optionality are preserved.

The initial isolated checkout disappeared during work and the primary checkout
changed branch externally. Work resumed in this newly created isolated checkout;
the primary checkout and unrelated changes were preserved.
