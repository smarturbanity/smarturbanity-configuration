# Pilot connections ship with the applications

Rome's technical file no longer names its Movesion sign-in client per environment or the database that receives its
production answers: both now ship with the CityMaaS applications' code. This repository keeps only content and
interface; the README says where the connections live.

The applications ignore these two settings in an older technical file, so the currently enabled revision keeps working
and this change can be enabled after the CityMaaS release that carries the connections.

`tools/verify_pilot_configuration.mjs` passes again against the current CityMaaS code. It had stopped working on
`main`: it compared Rome with the snapshot taken before the layout migration, so every intended later change (forms,
languages, study area) counted as a loss, and it did not pass the technical file's type. It now checks the current
configuration: the real merge and preload, no connections in the technical file, campaign references, retired
sources absent, mixed ownership and wrong pilot rejected.
