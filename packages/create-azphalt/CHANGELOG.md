# create-azphalt

## 0.5.2

### Patch Changes

- eb4bf7a: Templates now depend on `@azphalt/azdk` `^0.7.0`, matching the workspace.

## 0.5.1

### Patch Changes

- 616710d: Bring the scaffolded templates' `@azphalt/*` ranges (azp, azdk, runtime-reference, repository-client) and the host-app `vite` range up to the versions the repository uses.

## 0.5.0

### Minor Changes

- 19c0df7: Relicensed from MIT to the Apache License 2.0, which adds an explicit patent grant and patent retaliation — for a standard other hosts implement, implementers are licensed for contributors' patents, not only their copyright. Every freedom MIT gave is kept; extensions published through azphalt keep their own licences, and `create-azphalt` still writes whichever licence a creator picks.
- c0c8ee4: Add the `font` package kind: a compiled font family (`ttf`/`otf`/`woff2`) with a `font` manifest block
  (family, designer, scripts, languages, sampleText, faces with variable axes). `verifyAzp` validates it
  (`validateFontManifest`), cross-checking declared axes against the font's own `fvar` table; the registry
  browse summary carries a `font` card; `importFontPackage` builds one; `create-azphalt` gains `template-font`.
  See `spec/font.md`.

### Patch Changes

- d18ff48: Harden the `font` kind. Name-table reading is bounded (a crafted font can no longer stall
  verification). A font package may carry only its faces, `LICENSE` and preview images, may not declare
  `workflow`/`role`/`llm`/`contributes`, and each SFNT face must have `head`, `cmap` and outline tables;
  `workflow`, `role` and `llm` packages may not declare a `font` block. Font packages report the `font`
  media domain. `importFontPackage` drops out-of-range weights, refuses facts it can't state truthfully and
  verifies what it builds. The `create-azphalt` font template no longer packs its own placeholder file and
  stops with the store's reasons when a package wouldn't be accepted.
- b0c6243: The `template-host-app` scaffold now includes a `tsconfig.json`, so its `npm run build` (`tsc && vite build`) type-checks and builds instead of failing at `tsc`.
- fd27cb6: Runtime dependencies updated to their latest stable releases: zod 4 and `@modelcontextprotocol/sdk` 1.30 (`@azphalt/mcp`), Express 5 (`@azphalt/mock-backend`), and `quickjs-emscripten` 0.32 (`@azphalt/runtime-wasm`).
  
  `create-azphalt` scaffolds with the same latest releases (TypeScript 7, Vite 8, Express 5, current `@azphalt/*` versions), and its generated release workflow uses `actions/checkout@v7`, `actions/setup-node@v7` on Node 24, and `softprops/action-gh-release@v3`.
- 078f875: Fix the scaffolder's git `user.name` default (it called `require()` inside an ES module, so the error was swallowed and the author prompt always started empty), stop an "Other" licence choice from leaving the template's `MIT` in `package.json`, and bring `template-host-app` back to the repository's `vite` range. A new test (`tools/template-versions.test.mjs`) fails whenever a template falls behind a workspace package's release line or the repository's shared tooling ranges, and Dependabot now covers the template manifests.

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
