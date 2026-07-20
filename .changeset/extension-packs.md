---
"@azphalt/azdk": minor
"@azphalt/azp": minor
"@azphalt/repository-client": minor
"create-azphalt": minor
---

Add extension packs — a new `kind: "pack"` package that references other packages (a recommended
bundle, or an app's base set) instead of carrying its own payload. `@azphalt/azdk` adds `PackManifest`
/ `PackEntry` and the `pack` block on `Manifest` (members are `{ id, version?, required?, note? }`);
`@azphalt/azp` adds `validatePackManifest` (folded into `verifyAzp` for `kind:"pack"`): header-only, ≥1
entry, no self-reference, no duplicates. `@azphalt/repository-client` adds `getPack(id)` and
`resolvePack(id)` (each member with a concrete version + free/paid status) so a host can install the
base set and offer the rest, downloading each member — which is still free/paid-gated individually, so a
free pack may recommend a paid member. `create-azphalt` gains an **Extension Pack** template. Packs are
header-only and inert (no `/code`, capabilities, or assets), so the registry indexes them like any other
package with no code change. Normative spec: `spec/pack.md`.
