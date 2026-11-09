# Open the profile and first walking questionnaire

The previous profile campaign also opened Your travel, while all walking forms
were disabled. Open only the profile
and first walking questionnaire. Keep other scheduled forms closed and mark them
Coming soon without inventing an opening date. Preserve questionnaire schemas,
translations, follow-up relationships and stored-answer contracts.

See docs/campaign-launch.md for the generic renderer contract. Application pin,
rendering and runtime delivery are a separate coordinated integration; the pilot
configuration refactoring is not activated by this change.

Report/menu block availability is now explicit in the pilot application source:
services/connections remain open, experiences/streets remain coming soon. Reuse
the existing generic menu and direct-entry availability guard.

Validation: 444 actual calendar cases over 37 forms, including debug/review and
closed follow-up targets; bundle/language/asset validation; six regression tests
passed. Application rendering/integration verification remains with the app owner.

Debug visibility belongs to application code: omit show_all_in_debug from the
pilot source. The calendar checks do not assert app debug/review access policy.

Declare transport_modes on each campaign so app filters consume source metadata
instead of guessing from names. Both walking campaigns target walking; general
profile/future campaigns have no mode restriction. Verified exact mapping for all
nine campaigns in addition to the unchanged 444 calendar checks.
