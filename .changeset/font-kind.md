---
"@azphalt/azdk": minor
"@azphalt/azp": minor
"@azphalt/registry": minor
"@azphalt/submit-check": minor
"@azphalt/importer-font": minor
"create-azphalt": minor
---

Add the `font` package kind: a compiled font family (`ttf`/`otf`/`woff2`) with a `font` manifest block
(family, designer, scripts, languages, sampleText, faces with variable axes). `verifyAzp` validates it
(`validateFontManifest`), cross-checking declared axes against the font's own `fvar` table; the registry
browse summary carries a `font` card; `importFontPackage` builds one; `create-azphalt` gains `template-font`.
See `spec/font.md`.
