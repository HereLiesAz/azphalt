---
"@azphalt/repository-client": patch
---

Fix `getPack` / `resolvePack` against a real repository. The Repository API's `GET /packages/{id}`
carries `kind` and the `pack` block on the nested `manifest` (per the spec), not at the top level, but
`getPack` checked a top-level `detail.kind` — so it threw "not an extension pack" against the reference
server (and the storefront), even for a valid pack. It now reads `kind`/`pack` from `detail.manifest`
(falling back to a flat body). Caught by a new end-to-end test that resolves and installs a pack over
the reference server.
