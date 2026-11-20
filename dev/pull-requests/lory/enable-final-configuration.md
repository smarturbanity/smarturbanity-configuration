# Enable the final configuration revision

Enable `b5934e6` (Final configuration branch #62). It descends from the
currently enabled `1d4b38f` revision and brings the questionnaires to version
3.1.0, a required closing question in the service correction report and health
classifications on individual answer options.

Option-level health marks are accepted by the CityMaaS release candidate, which
drops those options when the participant has not given the health consent.
Merge after that CityMaaS release is deployed.

Validation: all 68 JSON files parse; survey-bundle, campaign and language checks
pass against the CityMaaS release code. CityMaaS SmartUrbanity configuration,
form resolver and guided-flow tests pass against this exact revision.

Owner: Lory.
