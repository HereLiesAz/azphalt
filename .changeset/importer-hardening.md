---
"@azphalt/importer-abr": minor
"@azphalt/importer-onnx": minor
"@azphalt/importer-tflite": minor
"@azphalt/importer-litert": minor
"@azphalt/importer-sherpa": minor
"@azphalt/importer-image": minor
"@azphalt/importer-font": minor
"@azphalt/importer-palette": minor
"@azphalt/importer-cube": minor
---

Harden the importers, which parse untrusted third-party files:

- **ABR.** A whole-file decoded-bitmap budget stops a few-KB `.abr` from forcing gigabytes of allocation across many brushes (the per-brush bound alone did not). PackBits now throws on an under-filled row instead of silently zero-filling it. The descriptor reader caps nesting depth (stack-overflow DoS) and builds objects with a null prototype so a `__proto__` key can't poison the lifted params. A caller-supplied `assetName` is always slugged so it can't become a traversal path.
- **ONNX / TFLite / LiteRT / Sherpa.** The caller's `filename` is reduced to a safe basename (no `../`), `remoteUrl` must be `https://`, and `byteSize` must be a finite positive number.
- **Image / Font.** The stored extension is derived from the file's magic bytes (not the caller's filename, which could smuggle a path), and unrecognized bytes are rejected — matching the readme's claim that every importer validates its input. Both now accept `license` / `licenseText` instead of hardcoding MIT.
- **Palette.** A non-finite ASE colour channel and a short/truncated ASE block are skipped instead of emitting `#NaNNaNNaN` or throwing an uncaught `RangeError`. Accepts `license` / `licenseText`.
- **Cube.** `LUT_*_SIZE` is parsed strictly (no `"33abc"`), data rows must have exactly three columns, the LUT size is bounded (so `size**3` can't force a huge allocation), duplicate size declarations and `DOMAIN_MIN >= DOMAIN_MAX` are rejected.
