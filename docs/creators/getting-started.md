# Getting Started for Creators

`azphalt` lets you build two kinds of thing that run across every conforming host:

- a **code extension** — a sandboxed **filter, transition, tool, or command** (JS or WASM), or
- an **asset pack** — brushes, LUTs, shaders, sound effects, fonts, 3D models, and the like,

…bundled into a single `.azp` file. The fastest start for either is the scaffolding tool:

~~~bash
npm create azphalt@latest
~~~

It asks what you're building and drops a ready-to-run project in place.

## Creating a Code Extension

Pick **Code Extension** in the scaffolder. You get a working starter — a `brightness` filter and a `crossfade` transition — that you edit, test locally, and build:

~~~bash
npm create azphalt@latest      # choose "Code Extension"
cd my-extension
npm install
npm test                       # runs your contributions against the reference runtime
npm run build                  # → my-extension-1.0.0.azp
~~~

- **`code/main.js`** holds your code — one export per contribution, each branded with `defineFilter` / `defineTransition` / `defineTool` / `defineCommand` from `@azphalt/azdk`.
- **`manifest.json`** declares your `capabilities` — the *only* surface your code can reach (the host grants exactly what you list and denies the rest). Ask for the least you need; you can never reach the camera, sensors, the filesystem, the network, or the host's engine. See the [Capability model](/specs/capability-model).
- **`npm test`** dispatches your extension against `@azphalt/runtime-reference` in memory, so you iterate without a host app.
- To scope an extension to **one app** (e.g. your own), add `"targetApps": ["com.the.app"]` to the manifest.

When it's ready, submit it as source via a pull request under `submissions/<your-id>/` (see the repo's `submissions/README.md` and the **code** submission template) — CI re-packages and validates it.

## Creating an Asset Pack

Pick **Asset Pack** in the scaffolder for a workspace that bundles your files into a `.azp`. Or, to package a single asset quickly, use one of the dedicated CLI importers.

### Packaging a Video Overlay

1. Ensure you have Node.js installed.
2. Run the video importer on your asset:
   ```bash
   npx @azphalt/importer-video my-explosion.webm explosion-pack.azp
   ```
3. Your `explosion-pack.azp` is now ready to be uploaded to any `azphalt` repository or dragged-and-dropped directly into compatible host apps!

### Available CLI Importers
- `@azphalt/importer-abr`: Convert Adobe Photoshop Brushes
- `@azphalt/importer-cube`: Convert 3D LUTs for color grading
- `@azphalt/importer-isf`: Convert Interactive Shader Format shaders
- `@azphalt/importer-gltf`: Package 3D meshes
- `@azphalt/importer-hdri`: Package Environment lighting maps
- `@azphalt/importer-material`: Package PBR textures (Albedo, Normal, Roughness)
- `@azphalt/importer-motion`: Package easing curves
- `@azphalt/importer-palette`: Package Adobe Swatch Exchange files
- `@azphalt/importer-image`: Package standard decals and textures
- `@azphalt/importer-video`: Package footage and VFX loops
- `@azphalt/importer-font`: Package typography
- `@azphalt/importer-audio`: Package SFX and music stems

## Publishing to azphalt.store

Once you have a valid `.azp`, there are two ways to get it onto the **azphalt.store** marketplace so
apps can discover and install it:

1. **Submit as source (open lane).** Open a pull request adding your project under
   `submissions/<your-id>/` (see the repo's `submissions/README.md` and the **code** / **asset** /
   **model** templates). CI re-packages and validates it, then it lands in the free registry. Best for
   free, open extensions that live in the open registry.
2. **Upload the bytes.** A conforming repository exposes a publish endpoint that takes raw `.azp` bytes
   and returns the indexed summary (or `400` with the exact verification errors). The store verifies the
   container the same way it verifies a submission — no shortcut around the checks.

Either path runs the **same** verify-and-index pipeline; a listing on the store is never a lower bar
than an open submission.

> **Building an MCP server?** An [MCP server](/specs/mcp-server) is packaged as its own package kind
> (`kind: "mcp"`) and published exactly like any other extension — there is no separate MCP publish
> protocol. The `.azp` is a signed header describing how a host reaches the server; the host runs it
> under its own trust prompt.

## Selling your extension (the consignment lane)

The registry lane is free and fee-free by design. If you want to **charge** for an extension, you
*consign* it onto the paid lane — the only place a fee exists:

- You onboard once (Stripe Connect **Express**), and the store routes payouts to *your* account.
- You set a one-time price or a subscription; a buyer's purchase mints a signed **entitlement token**
  their host app presents to download (see [Use the Store](/hosts/getting-started) § paid packages).
- The store shows the buyer an honest split — gross → processor fee, platform fee → **your net** — and
  the fee never leaks into the open registry. See [Architecture](/ARCHITECTURE) § *The marketplace* and
  [Marketplace Integrity](/specs/marketplace-integrity).

Your extension's *bytes* and *manifest* are identical whether it's free or paid — consignment is an
overlay on a normal package, not a different format. You can list a package for sale without changing a
line of its code.

## What's Next?
- Check out the [Manifest Schema](/specs/extension-manifest) to see how you can manually write a complex `manifest.json` for multi-asset packs.
- See how apps will **consume** what you publish: [Use the Store from Your App](/hosts/getting-started).
- Understand the trust and moderation model your package lives under: [Marketplace Integrity](/specs/marketplace-integrity).
