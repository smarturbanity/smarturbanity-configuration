# Ask about trips given up for cost instead of household income

The profile no longer asks about household income. It asks whether, in the last
month, the person gave up a trip because it cost too much (never, sometimes,
often, or prefer not to say). Those who answer sometimes or often can say which
trips: work or study, health, shopping and errands, visiting people, leisure.

Both questions are new (1.0.0) with eight translations; the profile becomes
2.2.0. Earlier income answers stay stored and are not compared with the new ones.

Validation: language, survey-bundle, campaign, location-context, profile-browser
and asset checks passed against CityMaaS; git diff --check passed. The pilot
configuration check fails the same way on main and is unrelated. Research
review, the shared question pool and deployment are separate.
