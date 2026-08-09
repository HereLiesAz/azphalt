# @azphalt/conformance

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
