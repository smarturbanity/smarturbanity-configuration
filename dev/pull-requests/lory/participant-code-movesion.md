# Participant code through Movesion's service

The README now says where the participant code comes from: Movesion's
participant-code service (`POST /v1/participant-code`), named in the application's
code-owned defaults, with the spatial server mock answering the same request in
local runs and browser tests. It no longer describes the spatial mock's former
`/api/v1/participant-codes` route or a `base.json` that main no longer has; the
consent and the website address are described as code-owned defaults.

Documentation only: pilots, forms, definitions, the index and `versions.json` are
unchanged, so the enabled revision and the running apps are not affected.
