/**
 * `@azphalt/runtime-wasm` — run an azphalt code extension inside a **QuickJS-in-WASM** sandbox
 * (the Javy/Shopify pattern via `quickjs-emscripten`). This is the isolation substrate
 * `spec/capability-model.md` calls for: the guest JS has **no ambient authority** — no filesystem,
 * network, `process`, or `require` — and reaches the editor only through host functions the runtime
 * injects, and only for the capabilities that were granted. It complements `@azphalt/runtime-reference`
 * (which proves the contract in-process); this proves it under real sandboxing.
 */
import { getQuickJS, type QuickJSContext, type QuickJSHandle } from "quickjs-emscripten";
import type { Capability } from "@azphalt/sdk";

/** A bitmap marshaled across the sandbox boundary (RGBA8, `data.length === width*height*4`). */
export interface SandboxBitmap {
  data: number[];
  width: number;
  height: number;
}

export interface SandboxWorld {
  params: Record<string, unknown>;
  bitmap: SandboxBitmap;
}

export interface RunOptions {
  /** Capabilities to grant — only these get host functions; everything else is absent in `ctx`. */
  capabilities: Capability[];
}

export interface SandboxResult {
  bitmap: SandboxBitmap;
  /** How many times the filter called `ctx.canvas.requestRedraw()`. */
  redraws: number;
}

function unwrap(vm: QuickJSContext, result: { error: QuickJSHandle } | { value: QuickJSHandle }): void {
  if ("error" in result) {
    const err = vm.dump(result.error);
    result.error.dispose();
    throw new Error(`sandbox: ${typeof err === "object" ? JSON.stringify(err) : String(err)}`);
  }
  result.value.dispose();
}

/**
 * Run an untrusted filter — a JS expression evaluating to `(ctx) => void | Promise<void>` — in a
 * QuickJS-WASM sandbox. The filter mutates the bitmap through `ctx.bitmap`; the marshaled result is
 * returned. `ctx` exposes only the granted capabilities.
 */
export async function runFilterSandboxed(
  filterCode: string,
  world: SandboxWorld,
  opts: RunOptions,
): Promise<SandboxResult> {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();
  const granted = new Set<Capability>(opts.capabilities);

  let bitmap: SandboxBitmap = { data: [...world.bitmap.data], width: world.bitmap.width, height: world.bitmap.height };
  let redraws = 0;

  const inject = (name: string, fn: Parameters<QuickJSContext["newFunction"]>[1]) => {
    const h = vm.newFunction(name, fn);
    vm.setProp(vm.global, name, h);
    h.dispose();
  };

  try {
    if (granted.has("params")) {
      inject("__paramNumber", (keyH) => vm.newNumber(Number(world.params[vm.getString(keyH)])));
      inject("__paramBool", (keyH) => (world.params[vm.getString(keyH)] ? vm.true : vm.false));
      inject("__paramString", (keyH) => vm.newString(String(world.params[vm.getString(keyH)] ?? "")));
    }
    if (granted.has("bitmap")) {
      inject("__bitmapRead", () => vm.newString(JSON.stringify(bitmap)));
      inject("__bitmapWrite", (jsonH) => {
        const parsed = JSON.parse(vm.getString(jsonH)) as SandboxBitmap;
        bitmap = {
          data: parsed.data.map((n) => Math.max(0, Math.min(255, Math.round(n)))),
          width: parsed.width,
          height: parsed.height,
        };
        return vm.undefined;
      });
    }
    if (granted.has("canvas")) {
      inject("__requestRedraw", () => {
        redraws++;
        return vm.undefined;
      });
    }

    // Build a capability-gated `ctx` from whatever host functions were injected. A sub-API exists
    // only if its host function does — an ungranted capability is absent, not an erroring stub.
    const bootstrap = `
      globalThis.__ctx = {};
      if (typeof __paramNumber === 'function') {
        __ctx.params = { number: __paramNumber, bool: __paramBool, string: __paramString };
      }
      if (typeof __bitmapRead === 'function') {
        __ctx.bitmap = {
          read: function () { return JSON.parse(__bitmapRead()); },
          write: function (b) { __bitmapWrite(JSON.stringify(b)); },
        };
      }
      if (typeof __requestRedraw === 'function') {
        __ctx.canvas = { requestRedraw: __requestRedraw };
      }
    `;
    unwrap(vm, vm.evalCode(bootstrap));
    unwrap(vm, vm.evalCode(`(${filterCode})(globalThis.__ctx);`));

    return { bitmap, redraws };
  } finally {
    vm.dispose();
  }
}

/** Evaluate `code` in a bare sandbox and return the result — handy for probing the (absent) ambient surface. */
export async function evalInSandbox(code: string): Promise<unknown> {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();
  try {
    const r = vm.evalCode(code);
    if (r.error) {
      const e = vm.dump(r.error);
      r.error.dispose();
      throw new Error(`sandbox: ${String(e)}`);
    }
    const val = vm.dump(r.value);
    r.value.dispose();
    return val;
  } finally {
    vm.dispose();
  }
}
