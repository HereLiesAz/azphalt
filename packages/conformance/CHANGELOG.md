# @azphalt/conformance

## 0.3.0

### Minor Changes

- f36110b: Add `kind: "script"` — a native script (bash, Python, PowerShell, …) a host installs and runs the way a package manager installs its own package, resolving declared system `dependencies` (namespaced by package manager) before making the script runnable. Adds the `Kind`/`ScriptManifest` SDK types, `@azphalt/azp`'s `validateScriptManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `script` host-conformance profile (`runScriptConformance`), a `create-azphalt` "Script" template, and submission validation for the new kind. Like `kind:"mcp"`, a script needs real OS access to do anything useful, so it gets its own kind rather than a "native" flavor of `kind:"code"` — that keeps `code`'s one unconditional guarantee (sandboxed, powerless, safe to auto-run) intact. See `spec/script.md`.

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0
  - @azphalt/azp@0.5.0

## 0.2.0

### Minor Changes

- bdbdb9b: Add `kind: "skill"` — a bundle of one or more [Agent Skills](https://agentskills.io/specification) (`SKILL.md` + optional `scripts`/`references`/`assets`) an AI-agent host loads. Adds the `Kind`/`SkillManifest`/`SkillEntry` SDK types, `@azphalt/azp`'s `validateSkillManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `skill` host-conformance profile (`runSkillConformance`), a `create-azphalt` "Skill" template, and submission validation for the new kind. See `spec/skill.md`.

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0
  - @azphalt/azp@0.4.0

## 0.1.3

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azdk@0.3.0
  - @azphalt/azp@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
  - @azphalt/azp@0.2.0
  - @azphalt/azdk@0.2.0
