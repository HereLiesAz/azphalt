---
"@azphalt/azdk": minor
"@azphalt/azp": minor
---

`kind: "llm"` (`spec/llm.md`): off-device language models. `@azphalt/azdk` adds `"llm"` to `Kind`, an `llm` block to `Manifest`, and the `LlmManifest` types. `@azphalt/azp` adds `validateLlmManifest`, which `verifyAzp` runs for `kind:"llm"` packages (§ Verification), and `role`/`workflow` packages now refuse an `llm` block.
