---
"@azphalt/llm-host": minor
---

New package: the host side of `kind: "llm"` (`spec/llm.md`).
- `llmConsent` gives what a host must show before install.
- `installLlm` verifies the package and refuses a public sandbox. It commits the payload and runner workflow to a private GitHub Actions sandbox in one commit, stores keys as sealed Actions secrets, and runs the one-time setup.
- `runLlm` implements the `github-actions-runner` protocol: dispatch, check-run progress, and the bounded `azphalt-llm-result` artifact, with resume by correlation id.
- `chatLlm` implements `openai-chat`.
- The rolling-delimiter helpers are byte-compatible with the reference runner.
