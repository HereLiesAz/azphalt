---
"@azphalt/storefront-worker": patch
---

`POST /packages` gets its GitHub token from the central gateway Worker over a service binding (`GITHUB_TOKENS` → `RepositoryTokens.azphaltPublishToken()`): a short-lived App installation token narrowed to HereLiesAz/azphalt, fetched only after a package verifies. The Worker stores no GitHub secret; a fixed `GITHUB_PUBLISH_TOKEN` remains as an override for deployments without the gateway, and a failed mint answers `503`.
