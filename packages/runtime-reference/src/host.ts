/**
 * Builds the host-function table from the *granted* capability set only. This is the
 * load-bearing enforcement point of `spec/capability-model.md`: a capability the manifest did
 * not declare has no sub-API at all — the property is **absent** (`undefined`), not an erroring
 * stub. There is no reflection path to widen the grant at runtime.
 */
import type {
  Bitmap,
  Capability,
  Host,
  LayerRef,
  Manifest,
  RGBA,
} from "@azphalt/sdk";
import { blankBitmap, type World, type WorldLayer } from "./world.js";

/** A host table containing only the sub-APIs whose capability was granted. */
export type RuntimeHost = Partial<Host>;

function activeLayer(world: World): WorldLayer {
  const l = world.layers.find((x) => x.id === world.activeLayerId);
  if (!l) throw new Error("world has no active layer");
  return l;
}

function findLayer(world: World, ref: LayerRef): WorldLayer {
  const l = world.layers.find((x) => x.id === ref.id);
  if (!l) throw new Error(`no such layer: ${ref.id}`);
  return l;
}

/**
 * Enforce the image-buffer ABI: 4 channels per pixel (element count `width * height * 4`, depth
 * independent), and the `data` element type must match the declared depth (`Uint16Array` iff 16-bit).
 */
function assertBitmap(bmp: Bitmap): void {
  if (bmp.data.length !== bmp.width * bmp.height * 4) {
    throw new Error("bitmap does not satisfy the RGBA ABI (element count must be width * height * 4)");
  }
  const is16 = bmp.depth === 16;
  if (is16 !== bmp.data instanceof Uint16Array) {
    throw new Error(`bitmap depth ${bmp.depth ?? 8} does not match its data type (16-bit ⇒ Uint16Array)`);
  }
}

/** Coerce a stored param value to {@link RGBA}: accepts `#RRGGBB`/`#RRGGBBAA` or an RGBA object. */
function toRgba(v: unknown): RGBA {
  if (typeof v === "string") {
    const m = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(v);
    if (!m) throw new Error(`not a hex color: ${v}`);
    const n = parseInt(m[1], 16);
    return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff, a: m[2] ? parseInt(m[2], 16) : 255 };
  }
  if (v && typeof v === "object" && "r" in v && "g" in v && "b" in v) {
    const o = v as Partial<RGBA>;
    return { r: o.r ?? 0, g: o.g ?? 0, b: o.b ?? 0, a: o.a ?? 255 };
  }
  throw new Error("param is not a color");
}

/**
 * Construct the {@link RuntimeHost} for `manifest`'s granted capabilities over `world`. Only the
 * sub-APIs listed in `manifest.capabilities` are present; everything else is absent by construction.
 */
export function createHost(manifest: Manifest, world: World): RuntimeHost {
  const granted = new Set<Capability>(manifest.capabilities ?? []);
  const host: RuntimeHost = {};

  if (granted.has("canvas")) {
    host.canvas = {
      size: () => ({ width: world.canvas.width, height: world.canvas.height }),
      dpi: () => world.canvas.dpi,
      requestRedraw: () => {
        world.redraws++;
      },
    };
  }

  if (granted.has("layers")) {
    host.layers = {
      active: () => ({ id: activeLayer(world).id }),
      list: () => world.layers.map((l) => ({ id: l.id })),
      create: (opts) => {
        const l: WorldLayer = {
          id: `layer-${world.layers.length}`,
          name: opts?.name ?? `Layer ${world.layers.length}`,
          bitmap: blankBitmap(world.canvas.width, world.canvas.height),
          opacity: 1,
          blendMode: "normal",
        };
        world.layers.push(l);
        return { id: l.id };
      },
      opacity: (ref) => findLayer(world, ref).opacity,
      setOpacity: (ref, value) => {
        findLayer(world, ref).opacity = value;
      },
      blendMode: (ref) => findLayer(world, ref).blendMode,
      setBlendMode: (ref, mode) => {
        findLayer(world, ref).blendMode = mode;
      },
    };
  }

  if (granted.has("bitmap")) {
    host.bitmap = {
      read: (ref) => findLayer(world, ref).bitmap,
      write: (ref, bmp) => {
        assertBitmap(bmp);
        findLayer(world, ref).bitmap = bmp;
      },
      alloc: (width, height, depth) => blankBitmap(width, height, undefined, depth),
    };
  }

  if (granted.has("selection")) {
    host.selection = {
      mask: () => world.selection,
      set: (mask) => {
        assertBitmap(mask);
        world.selection = mask;
      },
      clear: () => {
        world.selection = null;
      },
    };
  }

  if (granted.has("color")) {
    host.color = {
      active: () => ({ ...world.color.active }),
      setActive: (c) => {
        world.color.active = { ...c };
      },
      palette: () => world.color.palette.map((c) => ({ ...c })),
    };
  }

  if (granted.has("params")) {
    host.params = {
      value: <T = unknown>(key: string) => world.params[key] as T,
      number: (key) => Number(world.params[key]),
      bool: (key) => Boolean(world.params[key]),
      string: (key) => String(world.params[key]),
      color: (key) => toRgba(world.params[key]),
    };
  }

  if (granted.has("assets")) {
    host.assets = {
      read: (path) => {
        const b = world.assets[path];
        if (!b) throw new Error(`asset not found in package: ${path}`);
        return b;
      },
    };
  }

  // `storage` is a 0.1 *candidate* with no Host API yet (see spec/capability-model.md) — absent on purpose.
  return host;
}
