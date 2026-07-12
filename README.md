# azphalt

**An open, portable extension standard for creative apps.** Write an extension once — a brush, a filter, a tool — and it runs in any app that adopts azphalt.

The pitch in one line: the paint/photo world's extensions are trapped — a Photoshop plugin runs only in Photoshop, a Procreate brush is useless off an iPad, every store is a walled silo. azphalt is the portable format nobody built.

## Two things, kept separable

- **The standard** *(this repo, MIT)* — the `.azp` package format, the SDK, the asset importers, and a reference runtime. Vendor-neutral by construction. This is the part other apps adopt.
- **The marketplace** *(planned — a business, on top)* — a hosted consignment storefront on the open standard, the way a store sits on Open VSX. Never a precondition for adopting the standard. It can carry its own name.

Anyone can implement azphalt and run their own store. Ours is just the flagship.

## Shape

- **`.azp`** — the package: assets and/or code, a manifest, integrity digests. Importers normalize `.abr` / `.brushset` / `.kpp` / `.gbr` / `.cube` **into** `.azp`, so the catalog seeds itself as people bring brushes they already own.
- **TypeScript** end to end — the language every plugin ecosystem already writes in.
- **WASM execution substrate** — extensions run on-device inside a native host (QuickJS-in-WASM for JS; raw WASM for hot filters). Deterministic behavior across every host, for free.
- **Declarative UI schema, host-rendered** — a plugin describes controls; a Kotlin host draws them in Compose, a SwiftUI host draws them natively. No webview tax. This is what keeps it genuinely cross-app.
- **The boundary** — the SDK exposes only *editor* extension points: layers, bitmaps, canvas. It never surfaces a host's proprietary engine. That's why it can be open, and why a host keeps its own core behind it.

## Layout

~~~
/spec/              normative, language-neutral (package format, manifest, capabilities, UI schema)
/packages/
  sdk/              typed surface extensions are written against
  azp/              read, write, verify .azp archives
  importers/        abr · cube · isf · gltf · image · video · font · audio · vector · tflite · litert · onnx · sherpa
  runtime-reference/  reference host runtime (proof-of-concept, not production)
  repository-client/  typed client for the repository API
  create-azphalt/   CLI scaffolding tool
/apps/
  marketplace/      web storefront frontend (in development)
  backend/          repository backend (in development)
/examples/          sample extensions
/docs/              VitePress documentation site, specs
LICENSE             MIT
~~~

## Status

Spec-first and early. The format is `0.1` — pre-stable, will break.

**What works today:** the `.azp` package format, the SDK, 15+ asset importers (including AI model primitives), a reference runtime, the repository client, and a CLI scaffolding tool.

**What's in development:** the marketplace frontend and the production repository backend.

**What's not implemented:** package signing. The spec defines the wire format (`signature.json`, Ed25519 over the manifest), but the trust model (who counts as a trusted signer, how keys are distributed) is undecided. Until it is decided, `.azp` files ship unsigned. Hosts MUST verify file-level integrity via the SHA-256 digests in `manifest.files`, but MUST NOT treat an unsigned package as authenticated. See `spec/package-format.md § Signing`.

The first conforming host is [Guillotine](https://github.com/HereLiesAz/Guillotine).

## License

MIT. See [`LICENSE`](LICENSE).

