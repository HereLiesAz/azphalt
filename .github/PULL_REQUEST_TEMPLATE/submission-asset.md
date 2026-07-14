<!--
  Store submission — ASSET pack (no code runs).
  Types: brush | lut | pattern | stamp | shader | transition | mesh | material | hdri
       | motion | palette | image | video | font | audio | vector
  For AI models use ?template=submission-model.md . For code use ?template=submission-code.md .
  See submissions/README.md and spec/extension-manifest.md.
-->
# Store submission — asset

Adding an asset package under `submissions/<id>/`. Assets carry data the host consumes (a `.cube` LUT, a brush, a shader, a transition, a font, …) — **no code executes**, so no capabilities or `entry` are needed.

## Listing

- **id (reverse-DNS):** `com.you.my-pack`
- **name:**
- **version (semver):** `1.0.0`
- **license (SPDX):** `MIT`
- **asset type(s):** e.g. `lut`, `brush`, `shader`, `transition`
- **what it is (one line):**
- **tags (marketplace filtering):** e.g. `cinematic`, `warm`
- **app scope:** global · or `targetApps`: `com.the.app`

## Compliance checklist

- [ ] `kind` is `"asset"`.
- [ ] The folder is named **exactly** `<manifest.id>` (reverse-DNS).
- [ ] Required fields present: `azphalt`, `name`, `version` (semver), `kind`, `license`, `compat`. **No** `files` field.
- [ ] A `LICENSE` file matching the SPDX id is present.
- [ ] Each `assets[]` entry has a `type` from the supported list and **either** a `path` that exists in the folder **or** the remote header (`"path": ""` + `remoteUrl` + `checksum` + `byteSize`).
- [ ] Every bundled file the manifest references sits at its stated in-package path (`assets/…`, `ui/…`).
- [ ] If an asset ships a control panel, `ui` points at a valid panel schema (see spec/ui-schema.md).
- [ ] I have the right to distribute this content under the named license.
- [ ] `pnpm --filter @azphalt/submit-check validate` passes locally.

## Starter `manifest.json`

~~~json
{
  "azphalt": "0.1",
  "id": "com.you.my-pack",
  "name": "My Pack",
  "version": "1.0.0",
  "kind": "asset",
  "license": "MIT",
  "compat": ">=0.1",
  "author": "You",
  "description": "One line describing the pack.",
  "assets": [
    { "type": "lut", "path": "assets/warm.cube", "tags": ["cinematic"], "ui": "ui/panel.json" }
  ]
}
~~~

Folder layout:

~~~
submissions/com.you.my-pack/
  manifest.json
  LICENSE
  assets/warm.cube
  ui/panel.json        # optional
~~~
