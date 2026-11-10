# Access Together profile and reports from the Rome pilot

Rome's Access Together profile questions (with the answer that leads a place) and
report menu (six report types, fault categories per form, follow-up form and the
three offices) now live in `pilots/rome/application.json` under
`applications.smart_urbanity_access_together.flow`. The CityMaaS code defaults
leave them empty, so they no longer name pilot questionnaires.

Values are copied unchanged from the code defaults; Rome's `officeLanguage` stays
`it`. The data protection officer address is not added: Rome shows the data
controller contact only. `versions.json` is unchanged; enable this revision before
the matching CityMaaS change reaches the apps, since older code ignores the new
keys while newer code needs them.

`tools/verify_pilot_configuration.mjs` passes against the matching CityMaaS
candidate.
