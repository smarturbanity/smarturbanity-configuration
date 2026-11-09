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

Lory approved the Italian age-band label "85 o più", matching the other numeric
bands. Only that translation changes: age_group 1.1.1, profile 1.21.2. Other
languages, the age-band value and all question settings are preserved.

Lory approved the shorter Italian travel-company question "Nei tuoi spostamenti
abituali, viaggi soprattutto per conto tuo o con altre persone?" and answer
"Soprattutto per conto mio". Translation-only patches: frequent_trip_company
2.0.3, your_travel 1.0.2. The response values, other answers and languages remain
unchanged; a structural comparison verifies exactly those two translations and
the patch versions.

Lory approved adding inaccessible announcements/travel information to post-trip
incidents, covering information the participant could not hear or read. The new
option `inaccessible_travel_information` is translated in all eight languages;
trip_incidents is 2.7.0 and post-trip 4.9.0. All prior option values, exclusive
none, optionality and other questions remain unchanged.

Both trip introductions now include the confirmed 36-month research retention
period followed by deletion or anonymisation, reusing the approved feedback-form
translations. Pre-trip is 4.6.1. Structural comparison passed for both forms and
all eight languages; no browser or new persona execution is claimed.

The initial isolated checkout disappeared during work and the primary checkout
changed branch externally. Work resumed in this newly created isolated checkout;
the primary checkout and unrelated changes were preserved.
Lory approved the neutral Italian economic-status explanation: "Lo chiediamo per
capire come le possibilità economiche influiscono sugli spostamenti."
Translation-only patches: economic_status 2.2.1, profile 1.21.3. Structural
comparison confirms that all other content, settings and languages are preserved.

Lory approved explaining tactile paving in Italian as "Percorsi riconoscibili
con i piedi o il bastone, per chi non vede o vede poco". Translation-only
patches: walk_want_changes 1.2.1, walking improvements 3.2.1. Structural comparison
confirms all response values, settings, other content and languages are preserved.

Lory approved the Italian option "Spazi per chi va a piedi o in sedia a rotelle, separati da biciclette e monopattini elettrici".
Translation-only patches: walk_want_changes 1.2.2, walking improvements 3.2.2.
Structural comparison confirms all answer values, settings, other content and
languages are preserved. No browser or persona retest is claimed.

Lory approved the Italian title "A piedi o in sedia a rotelle – Cosa ti
aiuterebbe", including its SmartUrbanity-prefixed form. Walking improvements
3.2.3; structural comparison confirms only both title translations and the form
patch version changed. All question definitions and other languages are preserved.

Lory approved adding "disabilità" to the Italian examples in the walking
identity-harassment question. Translation-only patches: walk_identity_harassment
1.3.2, walking security 3.1.2. Structural comparison confirms all answer values,
settings, other content and languages are preserved. No browser/persona retest.

Lory approved "Angoli nascosti o visuale ostacolata" for the Italian walking
insecurity factor. Translation-only patches: walk_insecurity_factors 3.2.1,
walking security 3.1.3. Structural comparison confirms all other content, answer
values, settings and languages are preserved. No browser/persona retest.

Lory approved shortening both Italian child-accompaniment answers to "bambini o
adolescenti", with "a scuola, allo sport o ad altre attività" in the daily answer.
Translation-only patches: carer 2.2.1, household 1.0.2. Structural comparison
confirms all other content, answer values, settings and languages are preserved.

Lory approved the French future-questionnaires wording "Répondriez-vous aux
prochains questionnaires, qui seront publiés chaque semaine ?". Feedback form
1.1.2; structural comparison confirms only that French translation and the form
patch version changed. All answers, settings and other languages are preserved.

Lory approved the French usefulness question "Dans quelle mesure trouvez-vous
utile de répondre aux questionnaires ?", asking directly about the experience.
Feedback form 1.1.3; structural comparison confirms only that French translation
and the form patch version changed. Answers, settings and other languages remain.
