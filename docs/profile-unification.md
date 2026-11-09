# Unified resident profile

Decision, 9 November 2026: Your Profile and Home and work are one questionnaire,
with two sections: About You (9 questions) and Home and work (12 questions).
The separate travel questionnaire remains the next questionnaire.

`smarturbanity_your_profile` is version 2.0.0. Existing question IDs, answer keys,
choices, privacy classifications and conditional rules are retained. The pet
question is explicitly optional (question version 1.0.1): the browser check found
that omitting `required` made it mandatory in the classic viewer. All 21 questions
are now explicitly optional. Five minutes is an estimate, not a measured duration.

The welcome page explains the combined scope and lists both sections in all eight
languages. Framework-owned standard choices remain in the framework dictionaries.
The separate household JSON and its unused illustration are removed, as are their
catalogue, campaign and follow-up references. Both survey indexes agree on the
current forms; the child index previously still listed retired small mode forms.
There are 19 survey documents, including the future questionnaire; the 16 mode
questionnaires are unchanged. No old-response compatibility is introduced.

## Verification

Verified locally against CityMaaS candidate 9806e2ca796b3ea8ec5778c4c64abf7fd48ff9ac:

- Six browser paths in the actual questionnaire viewer: resident worker (21
  visible questions), commuter/platform worker (18), visitor not working (16),
  each in English on desktop and Italian on a 390px phone. Each reaches one
  simulated submission with questionnaire version 2.0.0 and household answers.
- Framework-generated Prefer not to say and None of these render in the selected
  language. Browser errors and document horizontal overflow are checked.
- Full Access Together page on a 390px phone: candidate catalogues loaded through
  browser-only request interception; unified profile opens, conditional questions
  and optional skips work, the second section is reached, and the summary leads
  to one in-memory send. Firebase is stubbed and external network writes blocked.
  A test flow uses the app's normal dependencies with isolated memory storage and
  a recording send callback. This does not verify real server persistence.
- Survey bundles, language ownership, illustrations and six mutation/regression
  tests pass. Existing location-context and trip-company checks are also run.

Reproduce with `node tools/verify_profile_browser.cjs <CityMaaS checkout>` and
`node tools/verify_profile_app.cjs <CityMaaS checkout> <local Access Together URL>`.
Set `CHROME_PATH` only when using an installed Chrome instead of Playwright's
browser. The full-page check requires the app's local preview already running;
it does not change that preview's source configuration or pin. Local screenshots
are under `.tmp/`. No push, deployment or primary-checkout changes are performed.

This is functional browser verification with synthetic responses. It does not
measure completion time, fatigue, abandonment, or feedback from real residents.
