# create-azphalt

## 0.4.0

### Minor Changes

- f36110b: Add `kind: "script"` — a native script (bash, Python, PowerShell, …) a host installs and runs the way a package manager installs its own package, resolving declared system `dependencies` (namespaced by package manager) before making the script runnable. Adds the `Kind`/`ScriptManifest` SDK types, `@azphalt/azp`'s `validateScriptManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `script` host-conformance profile (`runScriptConformance`), a `create-azphalt` "Script" template, and submission validation for the new kind. Like `kind:"mcp"`, a script needs real OS access to do anything useful, so it gets its own kind rather than a "native" flavor of `kind:"code"` — that keeps `code`'s one unconditional guarantee (sandboxed, powerless, safe to auto-run) intact. See `spec/script.md`.

## 0.3.0

### Minor Changes

- bdbdb9b: Add `kind: "skill"` — a bundle of one or more [Agent Skills](https://agentskills.io/specification) (`SKILL.md` + optional `scripts`/`references`/`assets`) an AI-agent host loads. Adds the `Kind`/`SkillManifest`/`SkillEntry` SDK types, `@azphalt/azp`'s `validateSkillManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `skill` host-conformance profile (`runSkillConformance`), a `create-azphalt` "Skill" template, and submission validation for the new kind. See `spec/skill.md`.

## 0.2.0

### Minor Changes

- f9a94c8: Add extension packs — a new `kind: "pack"` package that references other packages (a recommended
  bundle, or an app's base set) instead of carrying its own payload. `@azphalt/azdk` adds `PackManifest`
  / `PackEntry` and the `pack` block on `Manifest` (members are `{ id, version?, required?, note? }`);
  `@azphalt/azp` adds `validatePackManifest` (folded into `verifyAzp` for `kind:"pack"`): header-only, ≥1
  entry, no self-reference, no duplicates. `@azphalt/repository-client` adds `getPack(id)` and
  `resolvePack(id)` (each member with a concrete version + free/paid status) so a host can install the
  base set and offer the rest, downloading each member — which is still free/paid-gated individually, so a
  free pack may recommend a paid member. `create-azphalt` gains an **Extension Pack** template. Packs are
  header-only and inert (no `/code`, capabilities, or assets), so the registry indexes them like any other
  package with no code change. Normative spec: `spec/pack.md`.
