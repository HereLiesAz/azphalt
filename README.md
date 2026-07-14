# azphalt

**An open, portable extension standard for creative apps.** Write an extension once — a brush, a filter, a tool — and it runs in any app that adopts azphalt. Plus a consignment marketplace built on top of it.

The pitch in one line: the paint/photo world's extensions are trapped — a Photoshop plugin runs only in Photoshop, a Procreate brush is useless off an iPad, every store is a walled silo. azphalt is the portable format nobody built, and the registry that lets it travel.

## Two things, kept separable

- **The standard** *(this repo, MIT)* — the `.azp` package format, the SDK, the asset importers, a reference runtime, and the registry. Vendor-neutral by construction. This is the part other apps adopt.
- **The marketplace** *(a business, on top)* — a hosted consignment storefront on the open standard, the way a store sits on Open VSX. Never a precondition for adopting the standard. It can carry its own name.

Anyone can implement azphalt and run their own store. Ours is just the flagship.

## Shape

- **`.azp`** — the package: assets and/or code, a manifest, signing. Importers normalize `.abr` / `.brushset` / `.kpp` / `.gbr` / `.cube` **into** `.azp`, so the catalog seeds itself as people bring brushes they already own.
- **TypeScript** end to end — the language every plugin ecosystem already writes in.
- **WASM execution substrate** — extensions run on-device inside a native host (QuickJS-in-WASM for JS; raw WASM for hot filters). Deterministic behavior across every host, for free.
- **Declarative UI schema, host-rendered** — a plugin describes controls; a Kotlin host draws them in Compose, a SwiftUI host draws them natively. No webview tax. This is what keeps it genuinely cross-app.
- **The boundary** — the SDK exposes only *editor* extension points: layers, bitmaps, canvas. It never surfaces a host's proprietary engine. That's why it can be open, and why a host keeps its own core behind it.

## Layout

~~~
/spec/          normative, language-neutral (capabilities, package format, manifest, UI schema, repository API)
/packages/      the standard's libraries (see below)
/apps/          storefront (the marketplace) · repository-server (reference backend)
/examples/      sample extensions
/docs/          the docs site + design/adoption guides (ARCHITECTURE · RATIONALE · ADOPTION · GOVERNANCE)
LICENSE         MIT
~~~

### Packages

| Package | What it is |
|---|---|
| [`@azphalt/sdk`](packages/sdk) | The typed surface an extension is written against. |
| [`@azphalt/azp`](packages/azp) | Read / write / verify / **sign** `.azp` containers (Ed25519 + trust store). |
| [`@azphalt/importer-*`](packages/importers) | Normalize `.abr`, `.cube`, ISF, gl-transitions, glTF, ML models … **into** `.azp`. |
| [`@azphalt/runtime-reference`](packages/runtime-reference) | In-process host that proves the capability contract. |
| [`@azphalt/runtime-wasm`](packages/runtime-wasm) | The real sandbox — QuickJS-in-WASM (`js`) and raw WebAssembly (`wasm`). |
| [`@azphalt/conformance`](packages/conformance) | Executable pass/fail battery for code hosts and asset hosts. |
| [`@azphalt/registry`](packages/registry) | Verify · index · version · serve · search, plus the consignment marketplace overlay. |
| [`@azphalt/repository-client`](packages/repository-client) | Client SDK for the Repository API. |
| [`@azphalt/mcp`](packages/mcp) | An MCP server exposing `.azp` verify/inspect/extract to any MCP host. |
| [`create-azphalt`](packages/create-azphalt) | Scaffolder for a new extension package. |

## Documentation

- **Design & reasoning:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) · [`docs/RATIONALE.md`](docs/RATIONALE.md) · [`docs/GOVERNANCE.md`](docs/GOVERNANCE.md)
- **Adopting azphalt in your app:** [`docs/ADOPTION.md`](docs/ADOPTION.md) (runs code) · [`docs/ADOPTION_ASSET_HOST.md`](docs/ADOPTION_ASSET_HOST.md) (assets only)
- **Normative specs:** [`spec/`](spec) — capability model, package format, manifest, UI schema, repository API
- **Releasing:** [`RELEASING.md`](RELEASING.md)

The `docs/` tree also builds as a VitePress site (`pnpm --filter docs build`).

## Status

Spec-first, and now substantially built: the SDK, the `.azp` container with signing and a trust model, a wide importer family, both runtimes (the reference contract and the QuickJS-in-WASM / raw-WASM sandbox), a conformance suite, and the registry with its consignment marketplace and a reference repository backend. The first conforming native host is [GraffitiXR](https://github.com/HereLiesAz/GraffitiXR); see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design and its reasoning.

## License

MIT. See [`LICENSE`](LICENSE).
