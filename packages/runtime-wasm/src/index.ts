/**
 * `@azphalt/runtime-wasm` — run an azphalt code extension inside a **QuickJS-in-WASM** sandbox
 * (the Javy/Shopify pattern via `quickjs-emscripten`). This is the isolation substrate
 * `spec/capability-model.md` calls for: the guest JS has **no ambient authority** — no filesystem,
 * network, `process`, or `require` — and reaches the editor only through host functions the runtime
 * injects, and only for the capabilities that were granted. It complements `@azphalt/runtime-reference`
 * (which proves the contract in-process); this proves it under real sandboxing.
 *
 * Two entry points:
 * - {@link runFilter} loads a real `.azp` `code` entry as an **ES module** (resolving `@azphalt/sdk`
 *   inside the sandbox), resolves the filter named by `contributes.filters[].entry`, and runs it —
 *   the same contract `runtime-reference` runs, but sandboxed.
 * - {@link runFilterSandboxed} runs a bare `(ctx) => …` filter expression — a smaller probe.
 *
 * Both cross the image buffer as a **binary RGBA8 `ArrayBuffer`** (one copy in, one copy out; the guest
 * mutates a `Uint8ClampedArray` view in place), not per-pixel JSON — the buffer ABI from
 * `spec/capability-model.md`.
 */
import { getQuickJS, type QuickJSContext, type QuickJSHandle } from "quickjs-emscripten";
import { readAzp, verifyAzp } from "@azphalt/azp";
import type { Capability, Manifest } from "@azphalt/sdk";

/** A bitmap marshaled across the sandbox boundary (RGBA8, `data.length === width*height*4`). */
export interface SandboxBitmap {
  data: number[];
  width: number;
  height: number;
}

export interface SandboxWorld {
  params: Record<string, unknown>;
  bitmap: SandboxBitmap;
  /** Canvas metadata exposed via the `canvas` capability; size defaults to the bitmap's. */
  canvas?: { dpi?: number };
  /** Id reported as `ctx.target` to the filter; defaults to `"layer-0"`. */
  targetLayerId?: string;
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

/** A verified, parsed `.azp` ready to run in the sandbox. */
export interface LoadedExtension {
  manifest: Manifest;
  /** Every entry except `manifest.json`, by in-package path. */
  payload: Record<string, Uint8Array>;
}

/** Thrown when a `.azp` fails verification or a contribution cannot be dispatched. */
export class AzpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AzpError";
  }
}

/** Memory ceiling (bytes) and wall-clock timeout (ms) for a single sandboxed run — DoS/OOM guards. */
const MEMORY_LIMIT = 64 * 1024 * 1024;
const TIMEOUT_MS = 2000;

/**
 * The in-sandbox `@azphalt/sdk` module. An extension is built against `@azphalt/sdk`, but at runtime
 * it needs only the author helpers (types are erased) — and they must brand a contribution with the
 * *same* `Symbol.for("azphalt.contribution")` the host checks, so the host resolves it by brand.
 */
const SDK_SHIM = `
  const KIND = Symbol.for("azphalt.contribution");
  export function defineFilter(fn) { fn[KIND] = "filter"; return fn; }
  export function defineTool(fn) { fn[KIND] = "tool"; return fn; }
  export function defineCommand(fn) { fn[KIND] = "command"; return fn; }
  export const FORMAT_VERSION = "0.1";
`;

function unwrap(vm: QuickJSContext, result: { error: QuickJSHandle } | { value: QuickJSHandle }): void {
  if ("error" in result) {
    try {
      const err = vm.dump(result.error);
      throw new AzpError(`sandbox: ${typeof err === "object" ? JSON.stringify(err) : String(err)}`);
    } finally {
      result.error.dispose();
    }
  }
  result.value.dispose();
}

/** Drain the job queue so async filters (await / Promise) run to completion. */
function drainJobs(vm: QuickJSContext): void {
  for (;;) {
    const jobs = vm.runtime.executePendingJobs();
    if (jobs.error) {
      try {
        const err = vm.dump(jobs.error);
        throw new AzpError(`sandbox (async): ${typeof err === "object" ? JSON.stringify(err) : String(err)}`);
      } finally {
        jobs.error.dispose();
      }
    }
    if (jobs.value <= 0) break;
  }
}

/** Mutable pixel state shared between the host functions and the readback. */
interface BitmapState {
  bytes: Uint8Array;
  width: number;
  height: number;
}

const inject = (vm: QuickJSContext, name: string, fn: Parameters<QuickJSContext["newFunction"]>[1]) => {
  const h = vm.newFunction(name, fn);
  vm.setProp(vm.global, name, h);
  h.dispose();
};

/**
 * Install the capability-gated host functions for `world` and return the bitmap state + a redraw
 * counter. Only the functions for granted capabilities are injected — an ungranted capability has
 * no host function, so its `ctx` sub-API is absent by construction (nothing to build it from).
 */
function installHostFunctions(vm: QuickJSContext, world: SandboxWorld, granted: Set<Capability>) {
  const state: BitmapState = {
    bytes: Uint8Array.from(world.bitmap.data, (n) => n & 0xff),
    width: world.bitmap.width,
    height: world.bitmap.height,
  };
  const counter = { redraws: 0 };
  const dpi = world.canvas?.dpi ?? 72;

  if (granted.has("params")) {
    const key = (kH: QuickJSHandle) => vm.getString(kH);
    inject(vm, "__paramNumber", (kH) => vm.newNumber(Number(world.params?.[key(kH)])));
    inject(vm, "__paramBool", (kH) => (world.params?.[key(kH)] ? vm.true : vm.false));
    inject(vm, "__paramString", (kH) => vm.newString(String(world.params?.[key(kH)] ?? "")));
    inject(vm, "__paramJson", (kH) => vm.newString(JSON.stringify(world.params?.[key(kH)] ?? null)));
  }

  if (granted.has("bitmap")) {
    inject(vm, "__bitmapWidth", () => vm.newNumber(state.width));
    inject(vm, "__bitmapHeight", () => vm.newNumber(state.height));
    // Hand the guest a fresh ArrayBuffer of the current pixels; it views it as a Uint8ClampedArray.
    inject(vm, "__bitmapReadBuffer", () => vm.newArrayBuffer(state.bytes.slice().buffer));
    // Take the guest's mutated buffer back, validating the RGBA8 stride before trusting it.
    inject(vm, "__bitmapWriteBuffer", (bufH, wH, hH) => {
      const w = vm.getNumber(wH);
      const h = vm.getNumber(hH);
      let out: Uint8Array;
      let life: ReturnType<QuickJSContext["getArrayBuffer"]> | undefined;
      try {
        life = vm.getArrayBuffer(bufH);
        out = Uint8Array.from(life.value);
      } catch {
        throw new Error("invalid bitmap written from sandbox: not an ArrayBuffer");
      } finally {
        // Dispose even if Uint8Array.from throws (OOM), or the WASM-heap handle leaks.
        life?.dispose();
      }
      if (!Number.isInteger(w) || !Number.isInteger(h) || w < 0 || h < 0 || out.length !== w * h * 4) {
        throw new Error("invalid bitmap written from sandbox: stride must be width * 4");
      }
      state.bytes = out;
      state.width = w;
      state.height = h;
      return vm.undefined;
    });
  }

  if (granted.has("canvas")) {
    inject(vm, "__canvasWidth", () => vm.newNumber(state.width));
    inject(vm, "__canvasHeight", () => vm.newNumber(state.height));
    inject(vm, "__canvasDpi", () => vm.newNumber(dpi));
    inject(vm, "__requestRedraw", () => {
      counter.redraws++;
      return vm.undefined;
    });
  }

  return { state, counter };
}

/** Read the final bitmap out of the host-side state as a JSON-friendly {@link SandboxBitmap}. */
function readbackBitmap(state: BitmapState): SandboxBitmap {
  return { data: Array.from(state.bytes), width: state.width, height: state.height };
}

/** `ctx` builder for {@link runFilter}: the full `@azphalt/sdk` shape (bitmap/params/canvas). */
function specCtxBootstrap(targetLayerId: string): string {
  return `
    function __toRgba(v) {
      if (typeof v === 'string') {
        var m = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(v);
        if (!m) throw new Error('not a hex color: ' + v);
        var n = parseInt(m[1], 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: m[2] ? parseInt(m[2], 16) : 255 };
      }
      if (v && typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v) {
        return { r: v.r || 0, g: v.g || 0, b: v.b || 0, a: v.a == null ? 255 : v.a };
      }
      throw new Error('param is not a color');
    }
    globalThis.__ctx = {};
    if (typeof __paramNumber === 'function') {
      __ctx.params = {
        value: function (k) { return JSON.parse(__paramJson(k)); },
        number: __paramNumber, bool: __paramBool, string: __paramString,
        color: function (k) { return __toRgba(JSON.parse(__paramJson(k))); },
      };
    }
    if (typeof __bitmapReadBuffer === 'function') {
      __ctx.bitmap = {
        read: function () { return { data: new Uint8ClampedArray(__bitmapReadBuffer()), width: __bitmapWidth(), height: __bitmapHeight() }; },
        write: function (layer, bmp) { __bitmapWriteBuffer(bmp.data.buffer, bmp.width, bmp.height); },
        alloc: function (w, h) { return { data: new Uint8ClampedArray(w * h * 4), width: w, height: h }; },
      };
    }
    if (typeof __requestRedraw === 'function') {
      __ctx.canvas = {
        size: function () { return { width: __canvasWidth(), height: __canvasHeight() }; },
        dpi: __canvasDpi, requestRedraw: __requestRedraw,
      };
    }
    __ctx.target = { id: ${JSON.stringify(targetLayerId)} };
  `;
}

/** Verify a `.azp` and parse its manifest + payload. Throws {@link AzpError} if verification fails. */
export function loadExtension(azp: Uint8Array): LoadedExtension {
  const v = verifyAzp(azp);
  if (!v.ok) throw new AzpError(`azp verification failed: ${v.errors.join("; ")}`);
  return readAzp(azp);
}

export interface RunFilterOptions {
  /** Which `contributes.filters[]` to run, by `id`. Defaults to the first. */
  filterId?: string;
  /** Capabilities to grant. Defaults to the manifest's declared `capabilities`. */
  capabilities?: Capability[];
}

/**
 * Load a real `.azp` `code` entry as an ES module in the sandbox and run one of its filter
 * contributions against `world`. Resolves `@azphalt/sdk` to an in-sandbox shim, evaluates the
 * entry module, resolves the export named by `contributes.filters[].entry`, checks its brand, and
 * invokes it with a capability-gated `ctx`. Returns the mutated bitmap + redraw count.
 */
export async function runFilter(
  azp: Uint8Array,
  world: SandboxWorld,
  opts: RunFilterOptions = {},
): Promise<SandboxResult> {
  const { manifest, payload } = loadExtension(azp);
  if (manifest.runtime && manifest.runtime !== "js") {
    throw new AzpError(`runtime-wasm runs 'js' entries; manifest.runtime is '${manifest.runtime}'`);
  }
  const entry = manifest.entry;
  if (!entry) throw new AzpError("manifest has no 'entry' module");
  if (!payload[entry]) throw new AzpError(`entry module not found in package: ${entry}`);

  const filters = manifest.contributes?.filters ?? [];
  const f = opts.filterId ? filters.find((x) => x.id === opts.filterId) : filters[0];
  if (!f) throw new AzpError(`no filter${opts.filterId ? ` '${opts.filterId}'` : ""} in manifest.contributes`);

  const granted = new Set<Capability>(opts.capabilities ?? manifest.capabilities ?? []);
  const targetLayerId = world.targetLayerId ?? "layer-0";
  const decoder = new TextDecoder();
  const decode = (bytes: Uint8Array) => decoder.decode(bytes);

  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();
  vm.runtime.setMemoryLimit(MEMORY_LIMIT);
  const start = Date.now();
  vm.runtime.setInterruptHandler(() => Date.now() - start > TIMEOUT_MS);

  // Resolve module imports to the in-sandbox SDK shim or a payload file; deny everything else.
  // The identity normalizer keeps specifiers verbatim (no filesystem-style path resolution).
  vm.runtime.setModuleLoader(
    (name) => {
      if (name === "@azphalt/sdk") return SDK_SHIM;
      const src = payload[name];
      if (src) return decode(src);
      return { error: new Error(`module not found in package: ${name}`) };
    },
    (_base, name) => name,
  );

  try {
    const { state, counter } = installHostFunctions(vm, world, granted);
    unwrap(vm, vm.evalCode(specCtxBootstrap(targetLayerId), "azphalt:ctx"));

    // A tiny driver module: import the entry, resolve the branded export, run it against __ctx.
    // Async or throwing filters land in globalThis.__error, checked after the job queue drains.
    const driver = `
      import * as __mod from ${JSON.stringify(entry)};
      globalThis.__error = null;
      try {
        const __f = __mod[${JSON.stringify(f.entry)}];
        if (typeof __f !== 'function' || __f[Symbol.for('azphalt.contribution')] !== 'filter') {
          throw new Error(${JSON.stringify(`export '${f.entry}' is not a filter contribution`)});
        }
        Promise.resolve(__f(globalThis.__ctx)).catch(function (e) {
          globalThis.__error = String((e && e.message) || e);
        });
      } catch (e) {
        globalThis.__error = String((e && e.message) || e);
      }
    `;
    unwrap(vm, vm.evalCode(driver, "azphalt:driver", { type: "module" }));
    drainJobs(vm);

    const errH = vm.getProp(vm.global, "__error");
    const err = vm.dump(errH);
    errH.dispose();
    if (err) throw new AzpError(`sandbox: ${String(err)}`);

    return { bitmap: readbackBitmap(state), redraws: counter.redraws };
  } finally {
    vm.dispose();
  }
}

/** `ctx` builder for {@link runFilterSandboxed}: a smaller legacy shape (`read()`/`write(b)`). */
const LEGACY_CTX_BOOTSTRAP = `
  globalThis.__ctx = {};
  if (typeof __paramNumber === 'function') {
    __ctx.params = { number: __paramNumber, bool: __paramBool, string: __paramString };
  }
  if (typeof __bitmapReadBuffer === 'function') {
    __ctx.bitmap = {
      read: function () { return { data: new Uint8ClampedArray(__bitmapReadBuffer()), width: __bitmapWidth(), height: __bitmapHeight() }; },
      write: function (b) { __bitmapWriteBuffer(b.data.buffer, b.width, b.height); },
    };
  }
  if (typeof __requestRedraw === 'function') {
    __ctx.canvas = { requestRedraw: __requestRedraw };
  }
`;

/**
 * Run an untrusted filter — a JS expression evaluating to `(ctx) => void | Promise<void>` — in a
 * QuickJS-WASM sandbox. The filter mutates the bitmap through `ctx.bitmap`; the marshaled result is
 * returned. `ctx` exposes only the granted capabilities. A smaller probe than {@link runFilter},
 * which loads a full `.azp` module.
 */
export async function runFilterSandboxed(
  filterCode: string,
  world: SandboxWorld,
  opts: RunOptions,
): Promise<SandboxResult> {
  const granted = new Set<Capability>(opts.capabilities);
  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();
  vm.runtime.setMemoryLimit(MEMORY_LIMIT);
  const start = Date.now();
  vm.runtime.setInterruptHandler(() => Date.now() - start > TIMEOUT_MS);

  try {
    const { state, counter } = installHostFunctions(vm, world, granted);
    unwrap(vm, vm.evalCode(LEGACY_CTX_BOOTSTRAP, "azphalt:ctx"));
    unwrap(vm, vm.evalCode(`(${filterCode})(globalThis.__ctx);`));
    drainJobs(vm);
    return { bitmap: readbackBitmap(state), redraws: counter.redraws };
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
      // Dispose the handle even if `vm.dump` throws, or its WASM-heap slot leaks.
      try {
        const e = vm.dump(r.error);
        throw new Error(`sandbox: ${String(e)}`);
      } finally {
        r.error.dispose();
      }
    }
    try {
      return vm.dump(r.value);
    } finally {
      r.value.dispose();
    }
  } finally {
    vm.dispose();
  }
}
