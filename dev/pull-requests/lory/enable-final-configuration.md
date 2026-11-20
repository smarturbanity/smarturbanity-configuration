# Enable the final configuration revision

Enable `7b263d9`: the final configuration branch (#62) plus the Rome avatars moved to an
index file and the installation settings renamed from `flow` to `customization`. It
descends from the currently enabled `1d4b38f` revision and brings the questionnaires to
version 3.1.0, a required closing question in the service correction report and health
classifications on individual answer options.

Option-level health marks, the avatar index and the `customization` key are accepted by
the CityMaaS release candidate, which drops health-marked options when the participant
has not given the health consent and still reads the former `flow` key.
Merge after that CityMaaS release is deployed.

Validation: all JSON files parse; CityMaaS SmartUrbanity configuration, installation and
data-source tests pass against this exact revision, which the release candidate pins.

Owner: Lory.
