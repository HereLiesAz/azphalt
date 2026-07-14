<!--
  Store submission — AI MODEL asset (onnx | tflite | litert | sherpa-bundle).
  Models are usually large: prefer the remote-header pattern over bundling.
  See submissions/README.md and spec/extension-manifest.md § Remote Assets.
-->
# Store submission — AI model

Delivering an on-device model as a signed `.azp`. A model is an **asset** (`kind: "asset"`) with a `role` that routes it to the right host engine.

## Listing

- **id (reverse-DNS):** `com.you.depth-model`
- **name:**
- **version (semver):** `1.0.0`
- **license (SPDX):** e.g. `Apache-2.0` (models often are **not** MIT — use the real one)
- **model format:** `onnx` / `tflite` / `litert` / `sherpa-bundle`
- **role:** e.g. `depth`, `object-detection`, `speech-to-text`
- **delivery:** remote header (recommended for >a few MB) / bundled
- **byteSize:** …
- **app scope:** global · or `targetApps`: `com.the.app`

## Compliance checklist

- [ ] `kind` is `"asset"`; each model `assets[]` entry has a model `type` (`onnx` / `tflite` / `litert` / `sherpa-bundle`).
- [ ] The folder is named **exactly** `<manifest.id>` (reverse-DNS).
- [ ] Required fields present: `azphalt`, `name`, `version` (semver), `kind`, `license`, `compat`. **No** `files` field.
- [ ] A `LICENSE` file is present and reflects the model's **actual** license and any upstream weights' terms.
- [ ] **Heavy weights are not bundled:** `"path": ""`, plus `remoteUrl`, `checksum` (`sha256-…`), and `byteSize`. (Bundling multi-hundred-MB files is hostile to mobile hosts.)
- [ ] `role` is set so the host can route the model without bespoke per-model code.
- [ ] Any bundled companion files (a labels list, config) sit at their stated in-package paths.
- [ ] I have the right to redistribute these weights under the named license.
- [ ] `pnpm --filter @azphalt/submit-check validate` passes locally.

## Starter `manifest.json`

~~~json
{
  "azphalt": "0.1",
  "id": "com.you.depth-model",
  "name": "Depth Model",
  "version": "1.0.0",
  "kind": "asset",
  "license": "Apache-2.0",
  "compat": ">=0.1",
  "author": "You",
  "description": "Monocular depth estimator.",
  "assets": [
    {
      "type": "onnx",
      "role": "depth",
      "path": "",
      "remoteUrl": "https://example.com/models/depth.onnx",
      "checksum": "sha256-0000000000000000000000000000000000000000000000000000000000000000",
      "byteSize": 94371840,
      "tags": ["depth", "midas"]
    }
  ]
}
~~~

Folder layout (remote-header model, nothing heavy bundled):

~~~
submissions/com.you.depth-model/
  manifest.json
  LICENSE
  labels.txt           # optional small companion files may be bundled
~~~
