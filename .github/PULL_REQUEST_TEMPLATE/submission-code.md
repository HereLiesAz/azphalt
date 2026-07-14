<!--
  Store submission — CODE extension (a filter / tool / command / transition that runs code).
  Runs sandboxed in a conforming host. Declare least-privilege capabilities.
  For pure assets use ?template=submission-asset.md . For AI models use ?template=submission-model.md .
  See submissions/README.md, spec/extension-manifest.md, spec/capability-model.md.
-->
# Store submission — code extension

Adding a code package under `submissions/<id>/`. It runs **sandboxed** in the host and reaches only the capabilities it declares — nothing else.

## Listing

- **id (reverse-DNS):** `com.you.my-filter`
- **name:**
- **version (semver):** `1.0.0`
- **license (SPDX):** `MIT`
- **runtime:** `js` / `wasm`
- **contributes:** `filters` / `tools` / `commands` / `transitions`
- **what it does (one line):**
- **app scope:** global · or `targetApps`: `com.the.app`

## Capabilities (least privilege)

List **only** what the code actually uses. The host grants exactly these and denies the rest; anything non-baseline is prompted.

- **Requested:** e.g. `bitmap`, `params`
- **Why each is needed:**
  - `bitmap` — …
  - `params` — …

Available: `canvas`, `layers`, `bitmap`, `selection`, `color`, `params`, `assets`, `time`, `audio`. (`time`/`audio` are for temporal / audio hosts.)

## Compliance checklist

- [ ] `kind` is `"code"` (or `"mixed"` if it also bundles assets).
- [ ] The folder is named **exactly** `<manifest.id>` (reverse-DNS).
- [ ] Required fields present: `azphalt`, `id`, `name`, `version` (semver), `kind`, `license`, `compat`. **No** `files` field.
- [ ] A `LICENSE` file matching the SPDX id is present.
- [ ] `entry` names the code module and it exists in the folder (`code/main.js`); `runtime` is `js` or `wasm`.
- [ ] Each contribution in `contributes` names an export that the entry module actually exports, branded with the matching `define*` (`defineFilter` / `defineTool` / `defineCommand` / `defineTransition`).
- [ ] `capabilities` is the least-privilege set — every one is used, none is speculative.
- [ ] The code reaches **nothing on the never-list** — no host engine (SLAM / pose / tracking), camera, sensors, filesystem outside its package, or network. (These have no API; there is nothing to import.)
- [ ] Any `ui` panel referenced points at a valid schema (see spec/ui-schema.md).
- [ ] I have the right to distribute this code under the named license.
- [ ] `pnpm --filter @azphalt/submit-check validate` passes locally.

## Starter `manifest.json`

~~~json
{
  "azphalt": "0.1",
  "id": "com.you.my-filter",
  "name": "My Filter",
  "version": "1.0.0",
  "kind": "code",
  "license": "MIT",
  "compat": ">=0.1",
  "author": "You",
  "description": "One line describing the effect.",
  "entry": "code/main.js",
  "runtime": "js",
  "capabilities": ["bitmap", "params"],
  "contributes": {
    "filters": [
      { "id": "my-filter", "name": "My Filter", "entry": "applyFilter", "ui": "ui/panel.json" }
    ]
  }
}
~~~

Folder layout:

~~~
submissions/com.you.my-filter/
  manifest.json
  LICENSE
  code/main.js
  ui/panel.json        # optional
~~~
