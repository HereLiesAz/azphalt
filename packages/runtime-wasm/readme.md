# @azphalt/runtime-wasm

Run an azphalt **code** extension inside a **QuickJS-in-WASM** sandbox (the Javy/Shopify pattern,
via [`quickjs-emscripten`](https://github.com/justjake/quickjs-emscripten)). This is the isolation
substrate `spec/capability-model.md` calls for.

Where [`@azphalt/runtime-reference`](../runtime-reference) proves the *contract* by running a
trusted module in-process, this proves it under **real sandboxing**:

- **No ambient authority** — the guest JS has no `process`, `require`, `fetch`, filesystem, or
  network. The only way out is a host function.
- **Capability-gated host functions** — the runtime injects host functions only for the granted
  capabilities, and builds the `ctx` from them, so an ungranted capability is **absent**, not an
  erroring stub.
- **Image-buffer bridge** — the filter reads/writes the bitmap through `ctx.bitmap`; the runtime
  marshals it in and out.

~~~ts
import { runFilterSandboxed } from "@azphalt/runtime-wasm";

const { bitmap, redraws } = await runFilterSandboxed(
  `(ctx) => {
     const b = ctx.bitmap.read();
     for (let i = 0; i < b.data.length; i += 4) { b.data[i] = 255 - b.data[i]; }
     ctx.bitmap.write(b);
     ctx.canvas.requestRedraw();
   }`,
  { params: {}, bitmap: { data: [/* RGBA8 */], width: 64, height: 64 } },
  { capabilities: ["bitmap", "canvas"] }, // ctx.bitmap + ctx.canvas only; everything else absent
);
~~~

## Scope

This first cut runs a filter supplied as a `(ctx) => …` expression against a JSON-marshaled bitmap
— enough to prove sandboxing, capability gating, and the buffer round-trip. Loading a full `.azp`
`code` entry as an ES module (resolving `@azphalt/sdk` inside the sandbox) and the zero-copy
shared-linear-memory ABI are the next steps.
