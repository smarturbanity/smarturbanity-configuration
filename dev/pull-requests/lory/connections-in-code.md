# Pilot connections ship with the applications

Rome's technical file no longer names its Movesion sign-in client per environment or the database that receives its
production answers: both now ship with the CityMaaS applications' code. This repository keeps only content and
interface; the README says where the connections live.

The applications ignore these two settings in an older technical file, so the currently enabled revision keeps working
and this change can be enabled after the CityMaaS release that carries the connections.

`tools/verify_pilot_configuration.mjs` now checks that both settings are absent. The script was already out of date
on `main` for unrelated reasons (application type argument, Rome's languages, form changes) and still fails there.
