# @azphalt/importer-tflite

## 0.2.0

### Minor Changes

- 19c0df7: Relicensed from MIT to the Apache License 2.0, which adds an explicit patent grant and patent retaliation — for a standard other hosts implement, implementers are licensed for contributors' patents, not only their copyright. Every freedom MIT gave is kept; extensions published through azphalt keep their own licences, and `create-azphalt` still writes whichever licence a creator picks.
- eabdba6: Harden the importers, which parse untrusted third-party files:
  
  - **ABR.** A whole-file decoded-bitmap budget stops a few-KB `.abr` from forcing gigabytes of allocation across many brushes (the per-brush bound alone did not). PackBits now throws on an under-filled row instead of silently zero-filling it. The descriptor reader caps nesting depth (stack-overflow DoS) and builds objects with a null prototype so a `__proto__` key can't poison the lifted params. A caller-supplied `assetName` is always slugged so it can't become a traversal path.
  - **ONNX / TFLite / LiteRT / Sherpa.** The caller's `filename` is reduced to a safe basename (no `../`), `remoteUrl` must be `https://`, and `byteSize` must be a finite positive number.
  - **Image / Font.** The stored extension is derived from the file's magic bytes (not the caller's filename, which could smuggle a path), and unrecognized bytes are rejected — matching the readme's claim that every importer validates its input. Both now accept `license` / `licenseText` instead of hardcoding MIT.
  - **Palette.** A non-finite ASE colour channel and a short/truncated ASE block are skipped instead of emitting `#NaNNaNNaN` or throwing an uncaught `RangeError`. Accepts `license` / `licenseText`.
  - **Cube.** `LUT_*_SIZE` is parsed strictly (no `"33abc"`), data rows must have exactly three columns, the LUT size is bounded (so `size**3` can't force a huge allocation), duplicate size declarations and `DOMAIN_MIN >= DOMAIN_MAX` are rejected.

### Patch Changes

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
