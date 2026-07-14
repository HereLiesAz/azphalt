# The extension manifest (`manifest.json`)

*Normative. UTF-8 JSON at the root of every `.azp`. Declares identity, what the package contributes, and — for code — exactly which capabilities it needs.*

## Top-level fields
| Field | Req | Notes |
|---|---|---|
| `azphalt` | ✔ | Format version, e.g. `"0.1"`. Marks the file as an azphalt manifest. |
| `id` | ✔ | Reverse-DNS, globally unique — e.g. `com.hereliesaz.halftone`. |
| `name` | ✔ | Human-readable. |
| `version` | ✔ | Semver. |
| `kind` | ✔ | `asset` \| `code` \| `mixed`. |
| `license` | ✔ | SPDX id. MIT permits closed/sold extensions; author's choice. |
| `compat` | ✔ | Min host API version, e.g. `">=0.1"`. |
| `description`, `author`, `homepage` | — | Metadata. |
| `targetApps` | — | Reverse-DNS host-app ids this package is scoped to (e.g. `["com.hereliesaz.graffitixr"]`). Empty/absent = **global** (every app). A repository shows an app-scoped package only to a matching app — see repository-api.md § App scoping. Discovery filter, not access control. |
| `preview` | — | Static store-card preview `{ image?, clip? }` — each an in-package path or `https:` URL. `image` is a still (LUT swatch, brush stroke, shader still); `clip` an optional short motion preview for time-based packages. Surfaced in search so a host renders a browse grid without downloading/executing — see repository-api.md § Static previews. |
| `assets` | asset/mixed | Contributed assets (below). |
| `entry`, `runtime` | code/mixed | Code entry module and `js` \| `wasm`. |
| `capabilities` | code/mixed | Declared capabilities (see capability-model.md). |
| `contributes` | code/mixed | Extension points the code registers (below). |
| `files` | ✔ | Map of payload path → SHA-256 digest (integrity; see package-format.md). |

## `compat`
`compat` declares the host azphalt-API version the package needs, as a **single semver comparator** the host evaluates against its own API version. The `0.1` grammar is a deliberately small, interoperable subset so every host validates it identically:

- one comparator — `>=` `>` `<=` `<` `=` — **optional, defaulting to `>=`** ("minimum host version");
- followed by `MAJOR[.MINOR[.PATCH]]`; omitted parts are `0`, so `0.1` ≡ `0.1.0`.

**Not** in `0.1`: ranges, unions (`||`), hyphen ranges, `^`/`~`, or prerelease tags. A host at API version `H` satisfies `compat` iff `H` (by semver precedence) satisfies the comparator; `>=0.1` is the conventional value. Reference implementation: `@azphalt/azp`'s `compatSatisfies(hostVersion, compat)` and `parseCompat(compat)`.

## `assets`
Each entry requires a `type`, which determines the format of the asset. The supported primitives are:
- **Traditional**: `brush` | `lut` | `pattern` | `stamp` | `shader` | `transition` | `mesh` | `material` | `hdri` | `motion` | `palette` | `image` | `video` | `font` | `audio` | `vector`
- **AI Models**: `tflite` | `litert` | `onnx` | `sherpa-bundle`

Each entry also requires a `path` (relative path into `/assets` inside the `.azp` archive) OR a `remoteUrl` (see below).

**Remote Assets (The VSCode Header Pattern):**
For extremely large files like AI models (e.g. multi-gigabyte `.task` files), bundling the file inside the `.azp` archive is hostile to mobile environments. If an asset is too large to bundle, set `path` to an **empty string** (`"path": ""`) — the key stays present, since it is required — and provide a `remoteUrl` and `checksum` (SHA-256) instead. A host treats an empty `path` as "not bundled" and fetches from `remoteUrl`. The `.azp` acts as a lightweight header, and host applications are responsible for using their own resumable background download managers to fetch the file to local storage. You should also provide a `byteSize` to help hosts allocate space.

**Metadata Fields:**
- `role`: Optional semantic role (e.g., `type: "tflite", role: "depth"`). Crucial for routing generic model graphs to the correct host engine.
- `params`: Normalized, host-neutral settings. A brush's params might be `spacing`, `angle`, `roundness`. 
- `ui`: Optional UI panel path to a control panel schema (see ui-schema.md).
- `tags`: Optional tags (e.g., `["sfx", "impact"]`) for marketplace filtering.

## `contributes`
What the code adds to the host, each with an `id`:
- `filters` — a pixel operation runnable on a layer/selection.
- `tools` — an interactive tool.
- `commands` — a menu/command entry.
- `transitions` — a two-input blend over a normalized `progress` (0→1), for temporal hosts. It receives frame **A** (`from`), frame **B** (`to`), and `progress`, and writes the blended result to the target — see capability-model.md § Transition ABI. Branded by `defineTransition`; the runtime rejects a filter dispatched as a transition and vice versa.

Each names the `entry` export the host invokes and MAY reference a `ui` panel (see ui-schema.md).

## `capabilities`
The least-privilege list the code needs (`canvas`, `layers`, `bitmap`, `selection`, `color`, `params`, `assets`, `time`, `audio`, …). The host grants only what's declared, prompts for anything non-baseline, and denies the rest. A capability not listed is unreachable — there is no ambient API.

Two are for **temporal / audio hosts** (video, motion editors), both editor-surface, neither on the never-list:
- `time` — read-only access to the host's playback clock: `currentMs`, `durationMs`, `fps`, `frameIndex`. Lets a filter or transition animate.
- `audio` — read and write the current PCM audio block (float32, interleaved; see capability-model.md § Audio-buffer ABI).

## Example
~~~
{
  "azphalt": "0.1",
  "id": "com.hereliesaz.halftone",
  "name": "Halftone",
  "version": "1.2.0",
  "kind": "code",
  "license": "MIT",
  "author": "Az",
  "description": "CMYK halftone filter.",
  "compat": ">=0.1",
  "entry": "code/main.js",
  "runtime": "js",
  "capabilities": ["canvas", "bitmap", "params"],
  "contributes": {
    "filters": [
      { "id": "halftone", "name": "Halftone", "entry": "applyHalftone", "ui": "ui/panel.json" }
    ]
  },
  "files": {
    "code/main.js": "sha256-…",
    "ui/panel.json": "sha256-…"
  }
}
~~~

## Open
- Localization of `name` / `description` / UI labels.
- Inter-package dependencies — whether an extension may ever require another.
