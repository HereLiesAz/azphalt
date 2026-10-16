---
"@azphalt/importer-audio": patch
"@azphalt/importer-gltf": patch
"@azphalt/runtime-reference": patch
"@azphalt/storefront-worker": patch
---

Tighten format sniffing and runtime parity: the audio importer no longer labels ADTS AAC (and reserved MPEG versions) as `mp3`, the glTF importer rejects a GLB that is not version 2 or declares an impossible length, `runtime-reference` now matches `runtime-wasm` on prototype names (not params/assets), a missing string param (`""` rather than `"undefined"`) and asset reads (a copy, not the live payload), and the Worker's publish endpoint rejects a manifest with duplicate keys.
