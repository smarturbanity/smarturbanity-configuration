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

Post-trip incidents now offers an answer for announcements/travel information the
participant could not hear or read. Both pre- and post-trip introductions include
the confirmed 36-month retention period and subsequent deletion or anonymisation.
Eight-language structural checks verify that all other content and settings are
preserved; no new browser or persona test is claimed.
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

Lory approved simplifying the French welcome phrase to "les pages SmartUrbanity
qui vous posent des questions sur vous, vos déplacements et les lieux que vous
fréquentez". Feedback form 1.1.4; structural comparison confirms only that phrase
and the form patch version changed. Privacy, confirmed 36-month retention,
questions, answers, settings and other languages are preserved.
