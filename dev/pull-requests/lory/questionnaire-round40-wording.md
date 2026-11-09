# Clarify German address and parked-motorcycle context

The connection and street-segment reports use a consistent formal address in
German. People walking to or from a parked motorcycle or motor scooter can
select that context without describing the vehicle as a car.

The new context has eight translations and its own answer value. Existing
car, bicycle, public-transport and child-accompaniment answers retain their
meaning; none and refusal remain available. Revised content is versioned.

Validation: focused two-form/eight-language audit passed; all previous answers,
flags and conditions are unchanged. Actual-consumer verify_location_context and
git diff --check passed. Reports advance to 5.1.0, journey context to 4.1.0,
and the seven corrected German questions per report receive patch revisions.
Application integration, deployment and a fresh persona retest are separate.
