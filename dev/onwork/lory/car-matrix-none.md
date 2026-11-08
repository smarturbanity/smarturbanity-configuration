# Keep an explicit no-car-use answer

The car-use matrix includes "None of these" as an exclusive choice. It clears
selected uses and shows no frequency or alternative columns. Selecting a use
clears this choice. All 18 uses remain available, with eight-language labels.
The form is 3.2.0 and the question is 1.1.0; historical answers remain unchanged.

This configuration requires the CityMaaS exclusive-row renderer from the matching
local candidate. It stores the explicit answer as `{none: true}`.

Fourteen isolated actual-app browser checks pass: initial selection, independent
values, restoration, deselection, local response capture, Italian text, mobile
and desktop widths, and the exclusive answer. No live responses are written.
The application regression has unrelated consent/startup-alert failures; this is
not an aggregate readiness or deployment claim. No pin change or push included.
