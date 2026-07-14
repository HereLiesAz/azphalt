<!--
  Store submission — generic / mixed.
  Pick a more specific template if one fits:
    ?template=submission-asset.md   (brushes, LUTs, patterns, shaders, transitions, fonts, audio, …)
    ?template=submission-code.md    (filters, tools, commands, transitions that run code)
    ?template=submission-model.md   (AI models: onnx / tflite / litert / sherpa-bundle)
  See submissions/README.md for the full guide.
-->
# Store submission

Adding one package under `submissions/<id>/`. CI packages the folder into a `.azp`, verifies it, and a maintainer reviews this PR.

## Listing

- **id (reverse-DNS):** `com.you.example`
- **name:**
- **version (semver):** `1.0.0`
- **kind:** `asset` / `code` / `mixed`
- **license (SPDX):** `MIT`
- **what it is (one line):**
- **app scope:** global · or `targetApps`: `com.the.app` (only shown to that host)

## Compliance checklist

Every box maps to a check `@azphalt/submit-check` runs — an unchecked box is a failing CI check.

- [ ] The folder is named **exactly** `<manifest.id>`, and `id` is reverse-DNS (`com.you.thing`).
- [ ] `manifest.json` has `azphalt`, `name`, `version` (semver), `kind`, `license` (SPDX), `compat`.
- [ ] `manifest.json` has **no** `files` field — CI computes the digests.
- [ ] A `LICENSE` file is present, matching the SPDX id above.
- [ ] Every payload path the manifest references (`assets[].path`, `entry`, `ui`) is in the folder — or a heavy asset uses the remote header (`"path": ""` + `remoteUrl` + `checksum` + `byteSize`).
- [ ] `targetApps`, if present, is an array of reverse-DNS strings.
- [ ] I have the right to distribute this content under the license the manifest names.
- [ ] `pnpm --filter @azphalt/submit-check validate` passes locally (the exact gate CI runs).

## Starter `manifest.json`

~~~json
{
  "azphalt": "0.1",
  "id": "com.you.example",
  "name": "Example",
  "version": "1.0.0",
  "kind": "asset",
  "license": "MIT",
  "compat": ">=0.1",
  "author": "You",
  "description": "One line describing the package."
}
~~~
