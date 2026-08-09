---
"@azphalt/azdk": minor
"@azphalt/azp": minor
"@azphalt/conformance": minor
"@azphalt/submit-check": minor
"create-azphalt": minor
---

Add `kind: "skill"` — a bundle of one or more [Agent Skills](https://agentskills.io/specification) (`SKILL.md` + optional `scripts`/`references`/`assets`) an AI-agent host loads. Adds the `Kind`/`SkillManifest`/`SkillEntry` SDK types, `@azphalt/azp`'s `validateSkillManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `skill` host-conformance profile (`runSkillConformance`), a `create-azphalt` "Skill" template, and submission validation for the new kind. See `spec/skill.md`.
