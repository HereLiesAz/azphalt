---
"@azphalt/storefront-cmp": minor
---

The store app now handles `kind: "llm"` listings (`spec/llm.md` § Discovery). Catalogue entries show where the model runs ("hosted llm" or "sandbox llm") instead of just "llm". The detail screen gets the same "Before you install" record as the web store: where prompts go, the operator's data handling and terms, the model, the weights' licence and download size, what the runner needs, and the setup token's permissions.
