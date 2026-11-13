# Use a 2.5 km radius around Largo Ravizza

Source: lory/ravizza-radius. Target: main (human integration only).

Rome's availability area becomes a circle of radius 2.5 km, centred at the unchanged Largo Ravizza coordinates, instead of a square with 2 km sides. Keep the 1,000 m grey data band and use the new radius label.

Requires the companion CityMaaS lory/app-ritocchi radiusM support, exact clipping and translations before activation. This is a coordinated two-repository change; do not merge the configuration first.

Validation: every tracked JSON parses; runtime configuration changes only label and side-to-radius dimension. The CityMaaS task carries boundary, model-clipping, map and browser verification.

Publication: local task branch only. This repository has no maintained verify:pr/agent:push integration; the inherited CityMaaS policy permits remote writes only through that guard. Human publication/integration is required.
The owner subsequently selected a 2.5 km inner radius and a 1 km grey band (3.5 km total). The local model bbox covers the inner circle, but its eastern extent reaches only 3,007.57 m from the centre, leaving up to 492.43 m of the outer band without local model coverage. This does not certify server data completeness; check/update the published model before operational acceptance near that boundary.
