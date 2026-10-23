---
"@azphalt/azp": patch
"@azphalt/registry": patch
"@azphalt/importer-font": patch
"create-azphalt": patch
---

Harden the `font` kind. Name-table reading is bounded (a crafted font can no longer stall
verification). A font package may carry only its faces, `LICENSE` and preview images, may not declare
`workflow`/`role`/`llm`/`contributes`, and each SFNT face must have `head`, `cmap` and outline tables;
`workflow`, `role` and `llm` packages may not declare a `font` block. Font packages report the `font`
media domain. `importFontPackage` drops out-of-range weights, refuses facts it can't state truthfully and
verifies what it builds. The `create-azphalt` font template no longer packs its own placeholder file and
stops with the store's reasons when a package wouldn't be accepted.
