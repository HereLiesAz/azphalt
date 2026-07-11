# The extension manifest (`manifest.json`)

*Normative. UTF-8 JSON at the root of every `.azp`. Declares identity, what the package contributes, and — for code — exactly which capabilities it needs.*

## Top-level fields
- `azphalt`: Format version, e.g. `"0.1"`.
- `id`: Reverse-DNS, globally unique — e.g. `com.hereliesaz.halftone`.
- `name`: Human-readable.
- `version`: Semver.
- `kind`: `asset` | `code` | `mixed`.
- `license`: SPDX id. MIT permits closed/sold extensions.
- `compat`: Min host API version, e.g. `">=0.1"`.
- `capabilities`: Declared capabilities (see capability-model.md).
- `contributes`: Extension points the code registers.
- `files`: Map of payload path → SHA-256 digest.

## Example
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
      {
        "id": "halftone",
        "name": "Halftone",
        "entry": "applyHalftone",
        "ui": "ui/panel.json"
      }
    ]
  },
  "files": {
    "code/main.js": "sha256-…",
    "ui/panel.json": "sha256-…"
  }
}
