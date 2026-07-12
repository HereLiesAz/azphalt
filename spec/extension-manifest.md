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
| `assets` | asset/mixed | Contributed assets (below). |
| `entry`, `runtime` | code/mixed | Code entry module and `js` \| `wasm`. |
| `capabilities` | code/mixed | Declared capabilities (see capability-model.md). |
| `contributes` | code/mixed | Extension points the code registers (below). |
| `files` | ✔ | Map of payload path → SHA-256 digest (integrity; see package-format.md). |

## `assets`
Each entry: `type` (`brush` | `lut` | `pattern` | `stamp` | `shader` | `transition` | `mesh` | `material` | `hdri` | `motion` | `palette`), `path` (into `/assets`), and `params` — normalized, host-neutral settings. 
Assets like `shader` can also optionally define a `ui` path to a control panel schema (see ui-schema.md).
A brush's params might be `spacing`, `angle`, `roundness`. A material's params maps semantic PBR roles to texture paths (e.g. `{"albedo": "assets/color.png"}`). Losses versus the source engine are expected (RATIONALE § 1.3).

## `contributes`
What the code adds to the host, each with an `id`:
- `filters` — a pixel operation runnable on a layer/selection.
- `tools` — an interactive tool.
- `commands` — a menu/command entry.

Each names the `entry` export the host invokes and MAY reference a `ui` panel (see ui-schema.md).

## `capabilities`
The least-privilege list the code needs (`canvas`, `layers`, `bitmap`, `selection`, `color`, `params`, `assets`, …). The host grants only what's declared, prompts for anything non-baseline, and denies the rest. A capability not listed is unreachable — there is no ambient API.

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
