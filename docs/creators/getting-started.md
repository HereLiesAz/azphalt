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

## Bundling an extension pack

An **extension pack** (`kind: "pack"`) is a curated set of packages published as one — a **recommended**
bundle, or a **base set** your app installs for a new user. Scaffold one with `npm create azphalt@latest`
→ **Extension Pack**, and edit the `pack.entries` in its `manifest.json`:

```jsonc
{
  "kind": "pack",
  "targetApps": ["com.example.myapp"],   // scope it to your app (omit for a global pack)
  "pack": {
    "entries": [
      { "id": "com.foldlab.filmluts", "required": true,  "note": "core LUTs" },
      { "id": "com.other.author.brushes", "required": true },       // someone else's package — fine
      { "id": "com.hereliesaz.halftone", "required": false }        // recommended paid add-on
    ]
  }
}
```

- A pack **references** packages by id — it never re-bundles them, so it can include **other creators'**
  extensions, and a paid member still needs its own purchase to install.
- `required: true` is the **base set** (installed with the pack); omit it for **recommended** members.
- Omit an entry's `version` to always track that member's latest; pin it for reproducibility.

Publish it like any package. A host installs it with `@azphalt/repository-client`'s `resolvePack(id)`,
then downloads each member.

**Ship it pre-installed, too.** Since an `.azp` is just a signed archive, you can bundle the members'
bytes in your app and load them at startup with `readAzp` — no network — using the pack as the "what to
include" list. Pack = the *which extensions*; your app picks bundle-now vs. fetch-on-first-run. See the
[pack spec](/specs/pack).

## Building a Skill

A **skill** (`kind: "skill"`) bundles one or more [Agent Skills](https://agentskills.io/specification) —
`SKILL.md` plus optional `scripts/`, `references/`, and `assets/` — for an AI-agent host to load, the same
way `kind: "mcp"` packages an MCP server: a signed header the host reads, not sandboxed code an azphalt
runtime executes. Scaffold one with `npm create azphalt@latest` → **Skill**:

```jsonc
{
  "kind": "skill",
  "skill": {
    "skills": [
      { "id": "release-notes", "name": "Release Notes", "description": "Draft release notes from a range of commits." }
    ]
  }
}
```

- Each entry's `id` names a directory in the package: `skills/<id>/SKILL.md` (plus its `scripts/` /
  `references/` / `assets/`). `name` / `description` mirror the `SKILL.md` frontmatter and power the store
  card — a host that parses `SKILL.md` treats it, not this block, as authoritative.
- A skill package carries **no** `capabilities` and **no** `/code` `entry`/`runtime` — it's instructional
  text and support files an agent reads, not code an azphalt runtime executes.
- To bundle more than one skill, add another `skills/<id>/SKILL.md` directory and a matching entry in
  `skill.skills`.

Publish it like any other package. See the [skill spec](/specs/skill).

## Building a Script

A **script** (`kind: "script"`) is a native script — bash, Python, PowerShell, whatever — that a host
installs and runs the way a package manager installs its own package: declare what it needs, and the
host resolves that before making the script runnable. It's not `kind: "code"` — a script needs real
filesystem/process access to do anything useful, the same reason an MCP server can't be a sandboxed
extension either, so it gets its own kind rather than a "native" flavor of `code`. Scaffold one with
`npm create azphalt@latest` → **Script**:

```jsonc
{
  "kind": "script",
  "script": {
    "interpreter": "bash",
    "entry": "script/git-sync.sh",
    "command": "git-sync",
    "dependencies": { "apt": ["git", "openssh"] }
  }
}
```

- `interpreter` and `entry` are required; `entry` is the real, integrity-covered script payload — not a
  pointer to something launched elsewhere.
- `command` is what the script should be callable as once installed; omit it and the host picks a
  reasonable default.
- `dependencies` is optional and namespaced by package manager (`apt`, `brew`, …) — omit it entirely for
  a script needing nothing beyond what the host already guarantees. When the interpreter itself might be
  missing, list its package here too: `dependencies: { "apt": ["python3"] }` alongside
  `interpreter: "python3"` is expected, not redundant — `interpreter` says what runs the script,
  `dependencies` says what to install first.
- A script package carries **no** `capabilities` and **no** `/code` `entry`/`runtime` — dependency
  resolution and execution happen at the host's own OS/package-manager layer, never as an azphalt editor
  capability.

Publish it like any other package. See the [script spec](/specs/script).

## What's Next?
- Check out the [Manifest Schema](/specs/extension-manifest) to see how you can manually write a complex `manifest.json` for multi-asset packs.
- See how apps will **consume** what you publish: [Use the Store from Your App](/hosts/getting-started).
- Understand the trust and moderation model your package lives under: [Marketplace Integrity](/specs/marketplace-integrity).
