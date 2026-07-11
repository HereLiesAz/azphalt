# @azphalt/runtime-reference

A reference host that loads a `.azp`, verifies it, builds the host-function table from the
*granted* capabilities, and runs a contribution against an in-memory document. It is the
executable form of the contract in [`spec/`](../../spec) — read it alongside
[`docs/ADOPTION.md`](../../docs/ADOPTION.md).

## Honest scope

This first cut proves the **contract**, not the sandbox:

- **Capability gating** — `createHost` builds only the sub-APIs a manifest declared; an ungranted
  capability is **absent** (`undefined`), matching `spec/capability-model.md`'s "absent, not
  merely gated."
- **Image-buffer ABI** — bitmaps are RGBA8, straight alpha, `stride = width * 4`, mutated in place.
- **Contribution dispatch** — `runFilter`/`runTool`/`runCommand` resolve the manifest `entry`
  export and run it with a capability-scoped context.

It runs a **trusted** extension module in-process. The WASM isolation substrate
(QuickJS-in-WASM for `runtime: js`) that sandboxes *untrusted* code is the conformance target a
production host adds on top, and is out of scope here — so callers pass the already-imported
extension module.

~~~ts
import { open, createWorld, runFilter } from "@azphalt/runtime-reference";
import * as ext from "my-extension/main.js"; // the extension's contributions

const { manifest } = open(azpBytes);         // verifies; throws AzpError on failure
const world = createWorld({ width: 64, height: 64, params: { strength: 1 } });
await runFilter(manifest, ext, world);       // host built from manifest.capabilities only
// world.layers[0].bitmap now reflects the edit
~~~
