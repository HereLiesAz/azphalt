# @azphalt/importer-font

## 0.2.2

### Patch Changes

- Updated dependencies [97aaf3a]
  - @azphalt/azdk@0.8.0
  - @azphalt/azp@0.7.0

## 0.2.1

### Patch Changes

- Updated dependencies [c2e8908]
  - @azphalt/azdk@0.7.0
  - @azphalt/azp@0.6.1

## 0.2.0

### Minor Changes

- 19c0df7: Relicensed from MIT to the Apache License 2.0, which adds an explicit patent grant and patent retaliation — for a standard other hosts implement, implementers are licensed for contributors' patents, not only their copyright. Every freedom MIT gave is kept; extensions published through azphalt keep their own licences, and `create-azphalt` still writes whichever licence a creator picks.
- c0c8ee4: Add the `font` package kind: a compiled font family (`ttf`/`otf`/`woff2`) with a `font` manifest block
  (family, designer, scripts, languages, sampleText, faces with variable axes). `verifyAzp` validates it
  (`validateFontManifest`), cross-checking declared axes against the font's own `fvar` table; the registry
  browse summary carries a `font` card; `importFontPackage` builds one; `create-azphalt` gains `template-font`.
  See `spec/font.md`.
- eabdba6: Harden the importers, which parse untrusted third-party files:
  
  - **ABR.** A whole-file decoded-bitmap budget stops a few-KB `.abr` from forcing gigabytes of allocation across many brushes (the per-brush bound alone did not). PackBits now throws on an under-filled row instead of silently zero-filling it. The descriptor reader caps nesting depth (stack-overflow DoS) and builds objects with a null prototype so a `__proto__` key can't poison the lifted params. A caller-supplied `assetName` is always slugged so it can't become a traversal path.
  - **ONNX / TFLite / LiteRT / Sherpa.** The caller's `filename` is reduced to a safe basename (no `../`), `remoteUrl` must be `https://`, and `byteSize` must be a finite positive number.
  - **Image / Font.** The stored extension is derived from the file's magic bytes (not the caller's filename, which could smuggle a path), and unrecognized bytes are rejected — matching the readme's claim that every importer validates its input. Both now accept `license` / `licenseText` instead of hardcoding MIT.
  - **Palette.** A non-finite ASE colour channel and a short/truncated ASE block are skipped instead of emitting `#NaNNaNNaN` or throwing an uncaught `RangeError`. Accepts `license` / `licenseText`.
  - **Cube.** `LUT_*_SIZE` is parsed strictly (no `"33abc"`), data rows must have exactly three columns, the LUT size is bounded (so `size**3` can't force a huge allocation), duplicate size declarations and `DOMAIN_MIN >= DOMAIN_MAX` are rejected.

### Patch Changes

- d18ff48: Harden the `font` kind. Name-table reading is bounded (a crafted font can no longer stall
  verification). A font package may carry only its faces, `LICENSE` and preview images, may not declare
  `workflow`/`role`/`llm`/`contributes`, and each SFNT face must have `head`, `cmap` and outline tables;
  `workflow`, `role` and `llm` packages may not declare a `font` block. Font packages report the `font`
  media domain. `importFontPackage` drops out-of-range weights, refuses facts it can't state truthfully and
  verifies what it builds. The `create-azphalt` font template no longer packs its own placeholder file and
  stops with the store's reasons when a package wouldn't be accepted.
- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [d18ff48]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [de006ee]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0
  - @azphalt/azp@0.6.0

## 0.1.5

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0
  - @azphalt/azp@0.5.0

## 0.1.4

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
