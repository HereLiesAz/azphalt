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
/spec/          normative, language-neutral (package format, manifest, capabilities, UI schema)
/packages/      sdk · importers · runtime-reference · registry
/apps/          storefront (the marketplace)
/examples/      sample extensions
/docs/          ARCHITECTURE.md · RATIONALE.md · ADOPTION.md · GOVERNANCE.md
LICENSE         MIT
~~~

## Status

Spec-first and early. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design and its reasoning, and [`docs/RATIONALE.md`](docs/RATIONALE.md) for the research it's built on. The first conforming host is [GraffitiXR](https://github.com/HereLiesAz/GraffitiXR).

## License

MIT. See [`LICENSE`](LICENSE).
