# Ravizza circular availability area

Owner: CityMaaS HUB-10, Access Together review notes, 13 November 2026.

Replace the Rome study square with a 2,500 m radius around the same Largo Ravizza centre. Preserve the 1,000 m outer data band. The new label is translated by the matching CityMaaS change. Only pilots/rome/app_look.json changes at runtime.

Companion: CityMaaS lory/app-ritocchi, AccessTogetherConfiguration/Hub/Map and SmartUrbanityStudyArea. It adds radiusM support, exact shared clipping and translations; integrate the client before activating this configuration. Existing clients only understand sideM. Do not publish this configuration alone.

All tracked JSON documents parse; centre, radius, band and absence of sideM checked. Independent source review and local model coverage inspection found no blocker. The CityMaaS coordinator owns browser and aggregate checks; the owning task record contains their final results. This configuration task is locally committed only; no configuration publication or deployment is claimed.
The owner subsequently selected a 2.5 km inner radius and a 1 km grey band (3.5 km total). The local model bbox covers the inner circle, but its eastern extent reaches only 3,007.57 m from the centre, leaving up to 492.43 m of the outer band without local model coverage. This does not certify server data completeness; check/update the published model before operational acceptance near that boundary.
