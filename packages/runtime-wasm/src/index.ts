/**
 * `@azphalt/runtime-wasm` — run an azphalt code extension inside a **QuickJS-in-WASM** sandbox
 * (the Javy/Shopify pattern via `quickjs-emscripten`) — or, for `runtime: "wasm"`, against a raw
 * WebAssembly module. This is the isolation substrate `spec/capability-model.md` calls for: the
 * guest has **no ambient authority** and reaches the editor only through host functions, and only
 * for the capabilities that were granted. It complements `@azphalt/runtime-reference` (which proves
 * the contract in-process); this proves it under real sandboxing.
 *
 * Entry points:
 * - {@link runFilter} / {@link runTool} / {@link runCommand} load a real `.azp` `code` entry and
 *   dispatch the named contribution against a capability-gated `ctx` — the same contract
 *   `runtime-reference` runs, but sandboxed. The full `Host` surface is bridged
 *   (canvas/layers/bitmap/selection/color/params/assets). `runtime: "wasm"` entries run on raw
 *   WebAssembly via the shared-memory image ABI.
 * - {@link runFilterSandboxed} runs a bare `(ctx) => …` filter expression — a smaller probe.
 *
 * Bitmaps cross as a **binary RGBA8 `ArrayBuffer`** (one copy in, one copy out; the guest mutates a
 * `Uint8ClampedArray` view in place); refs/colors cross as JSON — the buffer ABI from
 * `spec/capability-model.md`.
 */
import { getQuickJS, type QuickJSContext, type QuickJSHandle } from "quickjs-emscripten";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { bytesPerChannel, type BitDepth, type Capability, type Manifest } from "@azphalt/sdk";

/**
 * A bitmap marshaled across the sandbox boundary. 4 channels per pixel, so `data.length ===
 * width * height * 4` at any depth. `depth` is opt-in and defaults to 8: absent/`8` ⇒ channels
 * `0–255`, `16` ⇒ channels `0–65535`.
 */
export interface SandboxBitmap {
  data: number[];
  width: number;
  height: number;
  depth?: BitDepth;
}

/** Channels 0–255. */
export interface SandboxRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** One editable layer in a {@link SandboxWorld}. */
export interface SandboxLayer {
  id: string;
  name?: string;
  bitmap: SandboxBitmap;
  /** 0–1. */
  opacity?: number;
  blendMode?: string;
}

/** A PCM audio block crossing the sandbox boundary — float32 in `[-1,1]`, interleaved by channel. */
export interface SandboxAudio {
  samples: number[];
  sampleRate: number;
  channels: number;
}

export interface SandboxWorld {
  params: Record<string, unknown>;
  /** Single-layer convenience — becomes layer `"layer-0"`. Provide this **or** {@link layers}. */
  bitmap?: SandboxBitmap;
  /** Full multi-layer document. */
  layers?: SandboxLayer[];
  activeLayerId?: string;
  canvas?: { width?: number; height?: number; dpi?: number };
  /** Current selection mask, or `null`/absent for none. */
  selection?: SandboxBitmap | null;
  color?: { active?: SandboxRGBA; palette?: SandboxRGBA[] };
  /** Files readable via the `assets` capability; defaults to the loaded `.azp` payload. */
  assets?: Record<string, Uint8Array>;
  /** Playback clock, for the `time` capability. */
  time?: { currentMs?: number; durationMs?: number; fps?: number };
  /** Current audio block, for the `audio` capability. */
  audio?: SandboxAudio | null;
  /** Which layer is `ctx.target` for a filter; defaults to {@link activeLayerId}. */
  targetLayerId?: string;
}

/** A {@link SandboxWorld} plus the two-input transition state (see {@link runTransition}). */
export interface SandboxTransitionWorld extends SandboxWorld {
  /** Outgoing frame (progress 0). */
  from: SandboxBitmap;
  /** Incoming frame (progress 1). */
  to: SandboxBitmap;
  /** Blend position, 0→1. */
  progress: number;
}

export interface RunOptions {
  /** Capabilities to grant — only these get host functions; everything else is absent in `ctx`. */
  capabilities: Capability[];
}

export interface SandboxResult {
  /** The target (or active) layer's final bitmap — convenience for single-layer callers. */
  bitmap: SandboxBitmap;
  /** Every layer's final state. */
  layers: SandboxLayer[];
  /** The final selection mask, or `null`. */
  selection: SandboxBitmap | null;
  /** The final active color + palette. */
  color: { active: SandboxRGBA; palette: SandboxRGBA[] };
  /** The final audio block, or `null`. */
  audio: SandboxAudio | null;
  /** How many times the extension called `ctx.canvas.requestRedraw()`. */
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
  export function defineTransition(fn) { fn[KIND] = "transition"; return fn; }
  export const FORMAT_VERSION = "0.1";
`;

/* ───────────────────────── internal world ───────────────────────── */

interface Layer {
  id: string;
  name: string;
  /** Raw channel bytes (little-endian at 16-bit); `bytes.length === width * height * 4 * bytesPerChannel(depth)`. */
  bytes: Uint8Array;
  width: number;
  height: number;
  depth: BitDepth;
  opacity: number;
  blendMode: string;
}

/** Pack a channel-value array into raw bytes for a depth (16-bit ⇒ little-endian `Uint16`). */
function packBytes(data: number[] | ArrayLike<number>, depth: BitDepth): Uint8Array {
  // 8-bit clamps (matching the Uint8ClampedArray ABI), not wraps mod 256.
  return depth === 16
    ? new Uint8Array(Uint16Array.from(data as ArrayLike<number>).buffer)
    : new Uint8Array(Uint8ClampedArray.from(data as ArrayLike<number>));
}

/** Unpack raw bytes back into a channel-value array for a depth. */
function unpackBytes(bytes: Uint8Array, depth: BitDepth): number[] {
  if (depth !== 16) return Array.from(bytes);
  // `Uint16Array` needs a 2-byte-aligned offset; copy to a fresh (offset-0) buffer if the view is odd.
  const src = bytes.byteOffset % 2 === 0 ? bytes : new Uint8Array(bytes);
  return Array.from(new Uint16Array(src.buffer, src.byteOffset, src.byteLength >> 1));
}

interface World {
  layers: Layer[];
  activeLayerId: string;
  canvas: { width: number; height: number; dpi: number };
  selection: { bytes: Uint8Array; width: number; height: number } | null;
  color: { active: SandboxRGBA; palette: SandboxRGBA[] };
  params: Record<string, unknown>;
  assets: Record<string, Uint8Array>;
  time: { currentMs: number; durationMs: number; fps: number };
  audio: { samples: Float32Array; sampleRate: number; channels: number } | null;
  redraws: number;
}

/** Reject a host-supplied bitmap whose byte length doesn't match its dimensions (RGBA8 stride). */
function assertShape(b: SandboxBitmap, what: string): void {
  if (!b || typeof b.width !== "number" || typeof b.height !== "number" || !b.data || b.data.length !== b.width * b.height * 4) {
    throw new AzpError(`${what}: bitmap data length must equal width * height * 4`);
  }
}

function toLayer(l: SandboxLayer): Layer {
  assertShape(l.bitmap, `layer '${l.id}'`);
  const depth: BitDepth = l.bitmap.depth === 16 ? 16 : 8;
  return {
    id: l.id,
    name: l.name ?? l.id,
    bytes: packBytes(l.bitmap.data, depth),
    width: l.bitmap.width,
    height: l.bitmap.height,
    depth,
    opacity: l.opacity ?? 1,
    blendMode: l.blendMode ?? "normal",
  };
}

/** Normalize the public {@link SandboxWorld} into the mutable internal {@link World}. */
function normalizeWorld(world: SandboxWorld, defaultAssets: Record<string, Uint8Array>): World {
  const layers: Layer[] =
    world.layers && world.layers.length > 0
      ? world.layers.map(toLayer)
      : world.bitmap
        ? [toLayer({ id: "layer-0", bitmap: world.bitmap })]
        : (() => {
            throw new AzpError("world needs a non-empty `layers` array or a `bitmap`");
          })();
  const active = world.activeLayerId ?? layers[0].id;
  const first = layers[0];
  return {
    layers,
    activeLayerId: active,
    canvas: {
      width: world.canvas?.width ?? first.width,
      height: world.canvas?.height ?? first.height,
      dpi: world.canvas?.dpi ?? 72,
    },
    selection: world.selection
      ? (assertShape(world.selection, "selection"),
        { bytes: new Uint8Array(world.selection.data), width: world.selection.width, height: world.selection.height })
      : null,
    color: {
      active: world.color?.active ?? { r: 0, g: 0, b: 0, a: 255 },
      palette: world.color?.palette ?? [],
    },
    params: world.params ?? {},
    assets: world.assets ?? defaultAssets,
    time: { currentMs: world.time?.currentMs ?? 0, durationMs: world.time?.durationMs ?? 0, fps: world.time?.fps ?? 30 },
    audio: world.audio
      ? { samples: Float32Array.from(world.audio.samples), sampleRate: world.audio.sampleRate, channels: world.audio.channels }
      : null,
    redraws: 0,
  };
}

const audioBack = (a: World["audio"]): SandboxAudio | null =>
  a ? { samples: Array.from(a.samples), sampleRate: a.sampleRate, channels: a.channels } : null;

const layerBitmap = (l: Layer): SandboxBitmap =>
  l.depth === 16
    ? { data: unpackBytes(l.bytes, 16), width: l.width, height: l.height, depth: 16 }
    : { data: unpackBytes(l.bytes, 8), width: l.width, height: l.height };

/** Read the mutated world back into a {@link SandboxResult}, with `bitmap` = the target layer. */
function readback(world: World, targetId: string): SandboxResult {
  const target = world.layers.find((l) => l.id === targetId) ?? world.layers.find((l) => l.id === world.activeLayerId) ?? world.layers[0];
  return {
    bitmap: layerBitmap(target),
    layers: world.layers.map((l) => ({ id: l.id, name: l.name, bitmap: layerBitmap(l), opacity: l.opacity, blendMode: l.blendMode })),
    selection: world.selection ? { data: Array.from(world.selection.bytes), width: world.selection.width, height: world.selection.height } : null,
    color: { active: { ...world.color.active }, palette: world.color.palette.map((c) => ({ ...c })) },
    audio: audioBack(world.audio),
    redraws: world.redraws,
  };
}

/* ───────────────────────── QuickJS helpers ───────────────────────── */

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

/** Drain the job queue so async contributions (await / Promise) run to completion. */
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

const inject = (vm: QuickJSContext, name: string, fn: Parameters<QuickJSContext["newFunction"]>[1]) => {
  const h = vm.newFunction(name, fn);
  vm.setProp(vm.global, name, h);
  h.dispose();
};

function layerById(world: World, id: string): Layer {
  const l = world.layers.find((x) => x.id === id) ?? world.layers.find((x) => x.id === world.activeLayerId);
  if (!l) throw new Error(`no such layer: ${id}`);
  return l;
}

/** Copy a guest ArrayBuffer out as bytes, disposing the handle even if the copy throws. */
function readGuestBuffer(vm: QuickJSContext, bufH: QuickJSHandle): Uint8Array {
  let life: ReturnType<QuickJSContext["getArrayBuffer"]> | undefined;
  try {
    life = vm.getArrayBuffer(bufH);
    return life.value.slice();
  } catch {
    throw new Error("invalid bitmap written from sandbox: not an ArrayBuffer");
  } finally {
    life?.dispose();
  }
}

function validateBitmap(out: Uint8Array, w: number, h: number, depth: BitDepth = 8): void {
  if (!Number.isInteger(w) || !Number.isInteger(h) || w < 0 || h < 0 || out.length !== w * h * 4 * bytesPerChannel(depth)) {
    throw new Error("invalid bitmap written from sandbox: byte length must be width * height * 4 * bytesPerChannel(depth)");
  }
}

/**
 * Install the capability-gated host functions for `world`. Only the functions for granted
 * capabilities are injected — an ungranted capability has no host function, so its `ctx` sub-API is
 * absent by construction (nothing to build it from).
 */
function installHostFunctions(vm: QuickJSContext, world: World, granted: Set<Capability>): void {
  const str = (h: QuickJSHandle) => vm.getString(h);
  const num = (h: QuickJSHandle) => vm.getNumber(h);

  if (granted.has("params")) {
    inject(vm, "__paramNumber", (kH) => vm.newNumber(Number(world.params?.[str(kH)])));
    inject(vm, "__paramBool", (kH) => (world.params?.[str(kH)] ? vm.true : vm.false));
    inject(vm, "__paramString", (kH) => vm.newString(String(world.params?.[str(kH)] ?? "")));
    inject(vm, "__paramJson", (kH) => vm.newString(JSON.stringify(world.params?.[str(kH)] ?? null)));
  }

  if (granted.has("canvas")) {
    inject(vm, "__canvasWidth", () => vm.newNumber(world.canvas.width));
    inject(vm, "__canvasHeight", () => vm.newNumber(world.canvas.height));
    inject(vm, "__canvasDpi", () => vm.newNumber(world.canvas.dpi));
    inject(vm, "__requestRedraw", () => {
      world.redraws++;
      return vm.undefined;
    });
  }

  if (granted.has("bitmap") || granted.has("layers")) {
    // The bitmap ABI is shared by `bitmap` (read/write/alloc) and `layers` (which reads/writes pixels).
    inject(vm, "__activeLayer", () => vm.newString(world.activeLayerId));
    inject(vm, "__bitmapW", (idH) => vm.newNumber(layerById(world, str(idH)).width));
    inject(vm, "__bitmapH", (idH) => vm.newNumber(layerById(world, str(idH)).height));
    inject(vm, "__bitmapDepth", (idH) => vm.newNumber(layerById(world, str(idH)).depth));
    inject(vm, "__bitmapRead", (idH) => vm.newArrayBuffer(layerById(world, str(idH)).bytes.buffer));
    inject(vm, "__bitmapWrite", (idH, bufH, wH, hH, dH) => {
      const layer = layerById(world, str(idH));
      const out = readGuestBuffer(vm, bufH);
      const w = num(wH);
      const h = num(hH);
      const depth: BitDepth = num(dH) === 16 ? 16 : 8;
      validateBitmap(out, w, h, depth);
      layer.bytes = out;
      layer.width = w;
      layer.height = h;
      layer.depth = depth;
      return vm.undefined;
    });
  }

  if (granted.has("layers")) {
    inject(vm, "__layerList", () => vm.newString(JSON.stringify(world.layers.map((l) => l.id))));
    inject(vm, "__layerCreate", (nameH) => {
      const id = `layer-${world.layers.length}`;
      world.layers.push({
        id,
        name: str(nameH) || `Layer ${world.layers.length}`,
        bytes: new Uint8Array(world.canvas.width * world.canvas.height * 4),
        width: world.canvas.width,
        height: world.canvas.height,
        depth: 8,
        opacity: 1,
        blendMode: "normal",
      });
      return vm.newString(id);
    });
    inject(vm, "__layerOpacity", (idH) => vm.newNumber(layerById(world, str(idH)).opacity));
    inject(vm, "__layerSetOpacity", (idH, vH) => {
      layerById(world, str(idH)).opacity = num(vH);
      return vm.undefined;
    });
    inject(vm, "__layerBlend", (idH) => vm.newString(layerById(world, str(idH)).blendMode));
    inject(vm, "__layerSetBlend", (idH, mH) => {
      layerById(world, str(idH)).blendMode = str(mH);
      return vm.undefined;
    });
  }

  if (granted.has("selection")) {
    inject(vm, "__selectionHas", () => (world.selection ? vm.true : vm.false));
    inject(vm, "__selectionW", () => vm.newNumber(world.selection?.width ?? 0));
    inject(vm, "__selectionH", () => vm.newNumber(world.selection?.height ?? 0));
    inject(vm, "__selectionRead", () => (world.selection ? vm.newArrayBuffer(world.selection.bytes.buffer) : vm.null));
    inject(vm, "__selectionSet", (bufH, wH, hH) => {
      const out = readGuestBuffer(vm, bufH);
      const w = num(wH);
      const h = num(hH);
      validateBitmap(out, w, h);
      world.selection = { bytes: out, width: w, height: h };
      return vm.undefined;
    });
    inject(vm, "__selectionClear", () => {
      world.selection = null;
      return vm.undefined;
    });
  }

  if (granted.has("color")) {
    inject(vm, "__colorActive", () => vm.newString(JSON.stringify(world.color.active)));
    inject(vm, "__colorSetActive", (jH) => {
      const c = JSON.parse(str(jH)) as Partial<SandboxRGBA>;
      world.color.active = { r: c.r ?? 0, g: c.g ?? 0, b: c.b ?? 0, a: c.a ?? 255 };
      return vm.undefined;
    });
    inject(vm, "__colorPalette", () => vm.newString(JSON.stringify(world.color.palette)));
  }

  if (granted.has("assets")) {
    inject(vm, "__assetRead", (pathH) => {
      const bytes = world.assets[str(pathH)];
      if (!bytes) throw new Error(`asset not found in package: ${str(pathH)}`);
      return vm.newArrayBuffer(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
    });
  }

  if (granted.has("time")) {
    inject(vm, "__timeCurrentMs", () => vm.newNumber(world.time.currentMs));
    inject(vm, "__timeDurationMs", () => vm.newNumber(world.time.durationMs));
    inject(vm, "__timeFps", () => vm.newNumber(world.time.fps));
    inject(vm, "__timeFrameIndex", () => vm.newNumber(Math.round((world.time.currentMs / 1000) * world.time.fps)));
  }

  if (granted.has("audio")) {
    inject(vm, "__audioSampleRate", () => vm.newNumber(world.audio?.sampleRate ?? 0));
    inject(vm, "__audioChannels", () => vm.newNumber(world.audio?.channels ?? 0));
    inject(vm, "__audioRead", () => (world.audio ? vm.newArrayBuffer(world.audio.samples.buffer) : vm.null));
    inject(vm, "__audioWrite", (bufH, srH, chH) => {
      const bytes = readGuestBuffer(vm, bufH); // raw bytes of the guest Float32Array
      const samples = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >> 2);
      const channels = num(chH);
      const sampleRate = num(srH);
      if (channels <= 0 || sampleRate <= 0 || samples.length % channels !== 0) {
        throw new Error("audio: samples.length must be a positive multiple of channels, and sampleRate must be positive");
      }
      world.audio = { samples: Float32Array.from(samples), sampleRate, channels };
      return vm.undefined;
    });
  }
}

/**
 * The `ctx` builder: constructs `globalThis.__ctx` from whatever host functions were injected. A
 * sub-API exists only if its host function does — an ungranted capability is absent, not an erroring
 * stub. `ctx.bitmap.read/write` accept an optional layer ref, defaulting to the active layer, so the
 * spec-shaped `read(target)`/`write(target, bmp)` and the legacy `read()`/`write(bmp)` both work.
 */
function ctxBootstrap(targetLayerId: string): string {
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
    function __lid(layer) { return (layer && layer.id) ? layer.id : __activeLayer(); }
    globalThis.__ctx = {};
    if (typeof __paramNumber === 'function') {
      __ctx.params = {
        value: function (k) { return JSON.parse(__paramJson(k)); },
        number: __paramNumber, bool: __paramBool, string: __paramString,
        color: function (k) { return __toRgba(JSON.parse(__paramJson(k))); },
      };
    }
    if (typeof __requestRedraw === 'function') {
      __ctx.canvas = {
        size: function () { return { width: __canvasWidth(), height: __canvasHeight() }; },
        dpi: __canvasDpi, requestRedraw: __requestRedraw,
      };
    }
    if (typeof __bitmapRead === 'function') {
      __ctx.bitmap = {
        read: function (layer) {
          var id = __lid(layer);
          var d = __bitmapDepth(id);
          var buf = __bitmapRead(id);
          return { data: d === 16 ? new Uint16Array(buf) : new Uint8ClampedArray(buf), width: __bitmapW(id), height: __bitmapH(id), depth: d };
        },
        write: function (a, b) {
          var layer = b === undefined ? null : a;
          var bmp = b === undefined ? a : b;
          var buf = bmp.data.buffer;
          // If data is a partial view of a larger buffer, pass just its bytes (else the host over-reads).
          if (bmp.data.byteOffset !== 0 || bmp.data.byteLength !== buf.byteLength) {
            buf = buf.slice(bmp.data.byteOffset, bmp.data.byteOffset + bmp.data.byteLength);
          }
          __bitmapWrite(__lid(layer), buf, bmp.width, bmp.height, bmp.depth || 8);
        },
        alloc: function (w, h, depth) {
          var d = depth === 16 ? 16 : 8;
          return { data: d === 16 ? new Uint16Array(w * h * 4) : new Uint8ClampedArray(w * h * 4), width: w, height: h, depth: d };
        },
      };
    }
    if (typeof __layerList === 'function') {
      __ctx.layers = {
        active: function () { return { id: __activeLayer() }; },
        list: function () { return JSON.parse(__layerList()).map(function (id) { return { id: id }; }); },
        create: function (opts) { return { id: __layerCreate((opts && opts.name) || '') }; },
        opacity: function (ref) { return __layerOpacity(ref.id); },
        setOpacity: function (ref, v) { __layerSetOpacity(ref.id, v); },
        blendMode: function (ref) { return __layerBlend(ref.id); },
        setBlendMode: function (ref, m) { __layerSetBlend(ref.id, m); },
      };
    }
    if (typeof __selectionHas === 'function') {
      __ctx.selection = {
        mask: function () { if (!__selectionHas()) return null; return { data: new Uint8ClampedArray(__selectionRead()), width: __selectionW(), height: __selectionH() }; },
        set: function (m) { __selectionSet(m.data.buffer, m.width, m.height); },
        clear: function () { __selectionClear(); },
      };
    }
    if (typeof __colorActive === 'function') {
      __ctx.color = {
        active: function () { return JSON.parse(__colorActive()); },
        setActive: function (c) { __colorSetActive(JSON.stringify(c)); },
        palette: function () { return JSON.parse(__colorPalette()); },
      };
    }
    if (typeof __assetRead === 'function') {
      __ctx.assets = { read: function (p) { return new Uint8Array(__assetRead(p)); } };
    }
    if (typeof __timeCurrentMs === 'function') {
      __ctx.time = { currentMs: __timeCurrentMs, durationMs: __timeDurationMs, fps: __timeFps, frameIndex: __timeFrameIndex };
    }
    if (typeof __audioRead === 'function') {
      __ctx.audio = {
        read: function () { var b = __audioRead(); return { samples: b ? new Float32Array(b) : new Float32Array(0), sampleRate: __audioSampleRate(), channels: __audioChannels() }; },
        write: function (buf) {
          var b = buf.samples.buffer;
          if (buf.samples.byteOffset !== 0 || buf.samples.byteLength !== b.byteLength) b = b.slice(buf.samples.byteOffset, buf.samples.byteOffset + buf.samples.byteLength);
          __audioWrite(b, buf.sampleRate, buf.channels);
        },
      };
    }
    if (typeof __txProgress === 'function') {
      var __fd = __txFromDepth();
      var __td = __txToDepth();
      __ctx.from = { data: __fd === 16 ? new Uint16Array(__txFromBuf()) : new Uint8ClampedArray(__txFromBuf()), width: __txFromW(), height: __txFromH(), depth: __fd };
      __ctx.to = { data: __td === 16 ? new Uint16Array(__txToBuf()) : new Uint8ClampedArray(__txToBuf()), width: __txToW(), height: __txToH(), depth: __td };
      __ctx.progress = __txProgress();
    }
    __ctx.target = { id: ${JSON.stringify(targetLayerId)} };
  `;
}

/* ───────────────────────── loading + dispatch ───────────────────────── */

/** Verify a `.azp` and parse its manifest + payload. Throws {@link AzpError} if verification fails. */
export function loadExtension(azp: Uint8Array): LoadedExtension {
  const v = verifyAzp(azp);
  if (!v.ok) throw new AzpError(`azp verification failed: ${v.errors.join("; ")}`);
  return readAzp(azp);
}

export interface RunOptionsById {
  /** Which contribution to run, by `id`. Defaults to the first. */
  id?: string;
  /** Capabilities to grant. Defaults to the manifest's declared `capabilities`. */
  capabilities?: Capability[];
}

type ContributionKind = "filter" | "tool" | "command" | "transition";

function contributionsFor(manifest: Manifest, kind: ContributionKind) {
  const c = manifest.contributes;
  return (kind === "filter" ? c?.filters : kind === "tool" ? c?.tools : kind === "command" ? c?.commands : c?.transitions) ?? [];
}

/** The two input frames + blend position a transition runs against. */
interface TransitionInput {
  from: SandboxBitmap;
  to: SandboxBitmap;
  progress: number;
}

/** Dispatch a contribution of `kind` from a `.azp` against `world` in the sandbox. */
async function runContribution(
  azp: Uint8Array,
  world: SandboxWorld,
  kind: ContributionKind,
  opts: RunOptionsById,
  tx?: TransitionInput,
): Promise<SandboxResult> {
  const { manifest, payload } = loadExtension(azp);
  const granted = new Set<Capability>(opts.capabilities ?? manifest.capabilities ?? []);
  const entry = manifest.entry;
  if (!entry) throw new AzpError("manifest has no 'entry' module");
  if (!payload[entry]) throw new AzpError(`entry module not found in package: ${entry}`);

  const list = contributionsFor(manifest, kind);
  const c = opts.id ? list.find((x) => x.id === opts.id) : list[0];
  if (!c) throw new AzpError(`no ${kind}${opts.id ? ` '${opts.id}'` : ""} in manifest.contributes`);

  // Raw WASM entry: run against the shared-memory ABI instead of QuickJS.
  if (manifest.runtime === "wasm") {
    if (kind !== "filter") throw new AzpError(`runtime: "wasm" supports filter entries in this runtime (${kind} runs on the js runtime)`);
    return runWasmFilter(payload[entry], c.entry, world, granted, payload);
  }
  if (manifest.runtime && manifest.runtime !== "js") {
    throw new AzpError(`unknown runtime '${manifest.runtime}'`);
  }

  const internal = normalizeWorld(world, payload);
  const targetLayerId = world.targetLayerId ?? internal.activeLayerId;
  const decoder = new TextDecoder();

  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();
  vm.runtime.setMemoryLimit(MEMORY_LIMIT);
  const start = Date.now();
  vm.runtime.setInterruptHandler(() => Date.now() - start > TIMEOUT_MS);

  vm.runtime.setModuleLoader(
    (name) => {
      if (name === "@azphalt/sdk") return SDK_SHIM;
      const src = payload[name];
      if (src) return decoder.decode(src);
      return { error: new Error(`module not found in package: ${name}`) };
    },
    (_base, name) => name,
  );

  try {
    installHostFunctions(vm, internal, granted);
    if (kind === "transition") {
      if (!tx) throw new AzpError("internal: a transition needs from/to/progress");
      assertShape(tx.from, "transition.from");
      assertShape(tx.to, "transition.to");
      // Pack at the frame's own depth — `new Uint8Array(u16)` would truncate 16-bit channels to 8
      // and halve the buffer. The depth crosses too, so the sandbox reconstructs the right view.
      const fromDepth: BitDepth = tx.from.depth === 16 ? 16 : 8;
      const toDepth: BitDepth = tx.to.depth === 16 ? 16 : 8;
      const fromBytes = packBytes(tx.from.data, fromDepth);
      const toBytes = packBytes(tx.to.data, toDepth);
      inject(vm, "__txFromBuf", () => vm.newArrayBuffer(fromBytes.buffer));
      inject(vm, "__txFromW", () => vm.newNumber(tx.from.width));
      inject(vm, "__txFromH", () => vm.newNumber(tx.from.height));
      inject(vm, "__txFromDepth", () => vm.newNumber(fromDepth));
      inject(vm, "__txToBuf", () => vm.newArrayBuffer(toBytes.buffer));
      inject(vm, "__txToW", () => vm.newNumber(tx.to.width));
      inject(vm, "__txToH", () => vm.newNumber(tx.to.height));
      inject(vm, "__txToDepth", () => vm.newNumber(toDepth));
      inject(vm, "__txProgress", () => vm.newNumber(tx.progress));
    }
    unwrap(vm, vm.evalCode(ctxBootstrap(targetLayerId), "azphalt:ctx"));

    const driver = `
      import * as __mod from ${JSON.stringify(entry)};
      globalThis.__error = null;
      try {
        const __f = __mod[${JSON.stringify(c.entry)}];
        if (typeof __f !== 'function' || __f[Symbol.for('azphalt.contribution')] !== ${JSON.stringify(kind)}) {
          throw new Error(${JSON.stringify(`export '${c.entry}' is not a ${kind} contribution`)});
        }
        Promise.resolve(__f(globalThis.__ctx)).catch(function (e) { globalThis.__error = String((e && e.message) || e); });
      } catch (e) { globalThis.__error = String((e && e.message) || e); }
    `;
    unwrap(vm, vm.evalCode(driver, "azphalt:driver", { type: "module" }));
    drainJobs(vm);

    const errH = vm.getProp(vm.global, "__error");
    const err = vm.dump(errH);
    errH.dispose();
    if (err) throw new AzpError(`sandbox: ${String(err)}`);

    return readback(internal, targetLayerId);
  } finally {
    vm.dispose();
  }
}

/**
 * Load a real `.azp` `code` entry and run one of its **filter** contributions against `world`.
 * Resolves `@azphalt/sdk` to an in-sandbox shim, resolves the export named by
 * `contributes.filters[].entry`, checks its brand, and invokes it with a capability-gated `ctx`.
 */
export function runFilter(azp: Uint8Array, world: SandboxWorld, opts: RunOptionsById = {}): Promise<SandboxResult> {
  return runContribution(azp, world, "filter", opts);
}

/** Run a **tool** contribution (`contributes.tools[]`). Like {@link runFilter} without `ctx.target` semantics. */
export function runTool(azp: Uint8Array, world: SandboxWorld, opts: RunOptionsById = {}): Promise<SandboxResult> {
  return runContribution(azp, world, "tool", opts);
}

/** Run a **command** contribution (`contributes.commands[]`). */
export function runCommand(azp: Uint8Array, world: SandboxWorld, opts: RunOptionsById = {}): Promise<SandboxResult> {
  return runContribution(azp, world, "command", opts);
}

/**
 * Run a **transition** contribution (`contributes.transitions[]`). The world carries the two input
 * frames (`from`, `to`) and `progress` (0→1); the transition reads `ctx.from`/`ctx.to`/`ctx.progress`
 * and writes the blend to `ctx.target` via `ctx.bitmap.write`. Runs on the `js` runtime.
 */
export function runTransition(azp: Uint8Array, world: SandboxTransitionWorld, opts: RunOptionsById = {}): Promise<SandboxResult> {
  return runContribution(azp, world, "transition", opts, { from: world.from, to: world.to, progress: world.progress });
}

/* ───────────────────────── raw wasm path ───────────────────────── */

/**
 * Build the capability-gated `env` imports for a raw wasm filter. Strings and buffers cross the
 * boundary by convention: an **input** the module provides is a `(ptr, len)` pair it wrote into its
 * own memory; an **output** the host provides is written into a module-supplied `(outPtr, outCap)`
 * scratch buffer, and the call returns the byte length (or the needed length if it exceeded `cap`,
 * `-1` on not-found). `mem` is read lazily so the closures see the instance's memory once it exists.
 */
function wasmEnv(internal: World, granted: Set<Capability>, getMem: () => WebAssembly.Memory): WebAssembly.ModuleImports {
  const view = () => new Uint8Array(getMem().buffer);
  const readStr = (ptr: number, len: number) => new TextDecoder().decode(view().subarray(ptr, ptr + len));
  const writeOut = (outPtr: number, outCap: number, bytes: Uint8Array): number => {
    if (bytes.length <= outCap) view().set(bytes, outPtr);
    return bytes.length; // caller compares to its cap to detect truncation
  };
  const enc = (s: string) => new TextEncoder().encode(s);
  const env: WebAssembly.ModuleImports = {};

  if (granted.has("canvas")) {
    env.requestRedraw = () => void internal.redraws++;
    env.canvasWidth = () => internal.canvas.width;
    env.canvasHeight = () => internal.canvas.height;
    env.canvasDpi = () => internal.canvas.dpi;
  }
  if (granted.has("params")) {
    env.paramNumber = (kp: number, kl: number) => Number(internal.params[readStr(kp, kl)]);
    env.paramBool = (kp: number, kl: number) => (internal.params[readStr(kp, kl)] ? 1 : 0);
    env.paramString = (kp: number, kl: number, op: number, oc: number) =>
      writeOut(op, oc, enc(String(internal.params[readStr(kp, kl)] ?? "")));
  }
  if (granted.has("color")) {
    env.colorActive = (outPtr: number) => {
      const c = internal.color.active;
      view().set([c.r & 0xff, c.g & 0xff, c.b & 0xff, c.a & 0xff], outPtr);
    };
    env.colorSetActive = (inPtr: number) => {
      const b = view().subarray(inPtr, inPtr + 4);
      internal.color.active = { r: b[0], g: b[1], b: b[2], a: b[3] };
    };
  }
  if (granted.has("assets")) {
    env.assetRead = (pp: number, pl: number, op: number, oc: number) => {
      const bytes = internal.assets[readStr(pp, pl)];
      return bytes ? writeOut(op, oc, bytes) : -1;
    };
  }
  if (granted.has("selection")) {
    env.selectionSize = () => (internal.selection ? internal.selection.bytes.length : 0);
    env.selectionRead = (outPtr: number) => {
      if (internal.selection) view().set(internal.selection.bytes, outPtr);
    };
  }
  if (granted.has("layers")) {
    env.layerCount = () => internal.layers.length;
  }
  if (granted.has("time")) {
    env.timeCurrentMs = () => internal.time.currentMs;
    env.timeDurationMs = () => internal.time.durationMs;
    env.timeFps = () => internal.time.fps;
    env.timeFrameIndex = () => Math.round((internal.time.currentMs / 1000) * internal.time.fps);
  }
  if (granted.has("audio")) {
    // Audio samples cross as float32 through the module's memory. `audioRead` copies the block to a
    // module-supplied scratch buffer (float count returned); `audioWrite` reads `frames*channels`
    // floats back. Offsets are float32 element indices into memory, i.e. byte offset = idx*4.
    env.audioFrames = () => (internal.audio ? internal.audio.samples.length / internal.audio.channels : 0);
    env.audioChannels = () => internal.audio?.channels ?? 0;
    env.audioSampleRate = () => internal.audio?.sampleRate ?? 0;
    env.audioRead = (outFloatIdx: number, outCapFloats: number) => {
      if (!internal.audio) return 0;
      const n = internal.audio.samples.length;
      // Scratch too small: write nothing and signal -1, so the guest never reads samples we didn't copy.
      if (n > outCapFloats) return -1;
      new Float32Array(getMem().buffer).set(internal.audio.samples, outFloatIdx);
      return n;
    };
    env.audioWrite = (inFloatIdx: number, frames: number, channels: number, sampleRate: number) => {
      // Validate geometry: a negative `frames` and negative `channels` would multiply to a positive `n`
      // and slip past `new Float32Array`, installing an invalid negative channel count.
      if (frames < 0 || channels <= 0 || sampleRate <= 0) throw new RangeError("audioWrite: invalid audio geometry or sample rate");
      const n = frames * channels;
      const src = new Float32Array(getMem().buffer, inFloatIdx * 4, n);
      internal.audio = { samples: Float32Array.from(src), sampleRate, channels };
    };
  }
  return env;
}

/**
 * Run a raw `runtime: "wasm"` filter against the shared-memory image ABI
 * (`spec/capability-model.md`). The module exports `memory` and the entry function
 * `entry(ptr, width, height, stride)`; the host writes the target layer's RGBA8 bytes into the
 * module's memory, calls the entry, and reads them back. Capability-gated host functions are passed
 * as `env` imports (see {@link wasmEnv} for the string/buffer marshaling convention). The bitmap
 * crosses at `ptr = 0`; the `bitmap` capability is required.
 */
async function runWasmFilter(
  wasmBytes: Uint8Array,
  entryName: string,
  world: SandboxWorld,
  granted: Set<Capability>,
  defaultAssets: Record<string, Uint8Array>,
): Promise<SandboxResult> {
  const internal = normalizeWorld(world, defaultAssets);
  const targetId = world.targetLayerId ?? internal.activeLayerId;
  const target = internal.layers.find((l) => l.id === targetId) ?? internal.layers[0];

  let mem: WebAssembly.Memory | undefined;
  const env = wasmEnv(internal, granted, () => {
    if (!mem) throw new AzpError("wasm: memory accessed before instantiation");
    return mem;
  });

  let instance: WebAssembly.Instance;
  try {
    // `WebAssembly.instantiate` accepts a Uint8Array view directly — no copy needed.
    const source = await WebAssembly.instantiate(wasmBytes as BufferSource, { env });
    instance = source.instance;
  } catch (e) {
    throw new AzpError(`wasm: instantiation failed: ${e instanceof Error ? e.message : String(e)}`);
  }
  const memory = instance.exports.memory as WebAssembly.Memory | undefined;
  mem = memory instanceof WebAssembly.Memory ? memory : undefined;
  const entry = instance.exports[entryName] as ((ptr: number, w: number, h: number, stride: number) => void) | undefined;
  if (!(memory instanceof WebAssembly.Memory)) throw new AzpError("wasm: module must export a `memory`");
  if (typeof entry !== "function") throw new AzpError(`wasm: module must export the entry '${entryName}'`);
  if (!granted.has("bitmap")) throw new AzpError("wasm: the `bitmap` capability is required for a wasm filter");

  // Byte stride accounts for depth: 16-bit channels are two bytes each.
  const stride = target.width * 4 * bytesPerChannel(target.depth);
  const ptr = 0;
  const need = ptr + target.bytes.length;
  if (memory.buffer.byteLength < need) {
    try {
      memory.grow(Math.ceil((need - memory.buffer.byteLength) / 65536));
    } catch (e) {
      throw new AzpError(`wasm: failed to grow memory to ${need} bytes: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  try {
    new Uint8Array(memory.buffer).set(target.bytes, ptr);
    entry(ptr, target.width, target.height, stride);
  } catch (e) {
    throw new AzpError(`wasm: entry threw: ${e instanceof Error ? e.message : String(e)}`);
  }
  target.bytes = new Uint8Array(memory.buffer).slice(ptr, ptr + target.bytes.length);
  return readback(internal, targetId);
}

/* ───────────────────────── probes ───────────────────────── */

/**
 * Run an untrusted filter — a JS expression evaluating to `(ctx) => void | Promise<void>` — in a
 * QuickJS-WASM sandbox. A smaller probe than {@link runFilter}, which loads a full `.azp` module.
 */
export async function runFilterSandboxed(filterCode: string, world: SandboxWorld, opts: RunOptions): Promise<SandboxResult> {
  const granted = new Set<Capability>(opts.capabilities);
  const internal = normalizeWorld(world, {});
  const targetId = world.targetLayerId ?? internal.activeLayerId;

  const QuickJS = await getQuickJS();
  const vm = QuickJS.newContext();
  vm.runtime.setMemoryLimit(MEMORY_LIMIT);
  const start = Date.now();
  vm.runtime.setInterruptHandler(() => Date.now() - start > TIMEOUT_MS);

  try {
    installHostFunctions(vm, internal, granted);
    unwrap(vm, vm.evalCode(ctxBootstrap(targetId), "azphalt:ctx"));
    unwrap(vm, vm.evalCode(`(${filterCode})(globalThis.__ctx);`));
    drainJobs(vm);
    return readback(internal, targetId);
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
