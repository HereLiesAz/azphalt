---
"@azphalt/submit-check": minor
"@azphalt/storefront": minor
"@azphalt/storefront-react": minor
"@azphalt/storefront-worker": patch
---

Twelve first-party `kind: "llm"` packages on the store: eight free hosted endpoints (Kilo, LLM7, OVHcloud, OpenRouter, Groq, Cerebras, Z.ai, Mistral) and four open-weight models run by pinned llama.cpp in a private GitHub Actions sandbox (Qwen2.5 1.5B, Qwen2.5 Coder 1.5B, SmolLM2 1.7B, Phi-3.5 Mini). They are generated from one table by `gen-llm-packages` and share one setup script, runner and workflow shape. Store cards show the tier; the detail page shows what `spec/llm.md` requires before install: where prompts go, the operator's data handling, the weights' licence, and the setup token's permissions. `submit-check` accepts `kind: "llm"`, and `build-catalog --only` now takes a folder package's id.
