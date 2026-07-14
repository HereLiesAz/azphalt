/**
 * An in-memory editor surface for the reference runtime to operate on. This stands in for a
 * real host's document while proving the capability contract and the image-buffer ABI. A
 * conforming host backs the same `Host` API with its own layers/canvas instead.
 */
import type { BitDepth, Bitmap, RGBA } from "@azphalt/sdk";

/** One editable layer in the {@link World}. */
export interface WorldLayer {
  id: string;
  name: string;
  /** RGBA8, straight alpha, `stride = width * 4` — see the image-buffer ABI in `spec/capability-model.md`. */
  bitmap: Bitmap;
  /** 0–1. */
  opacity: number;
  blendMode: string;
}

/** The mutable document the reference runtime edits through the host functions. */
export interface World {
  canvas: { width: number; height: number; dpi: number };
  layers: WorldLayer[];
  activeLayerId: string;
  selection: Bitmap | null;
  color: { active: RGBA; palette: RGBA[] };
  params: Record<string, unknown>;
  /** The extension's own package payload, exposed via the `assets` capability. */
  assets: Record<string, Uint8Array>;
  /** Incremented on every `canvas.requestRedraw()` so a test can assert a redraw was requested. */
  redraws: number;
}

/**
 * Allocate a zeroed `width × height` RGBA bitmap, optionally filled with a solid `fill` color.
 * `depth` defaults to 8 (a `Uint8ClampedArray`); pass 16 for a `Uint16Array`. `fill` channels are
 * written verbatim, so a 16-bit fill takes 16-bit channel values.
 */
export function blankBitmap(width: number, height: number, fill?: RGBA, depth: BitDepth = 8): Bitmap {
  const data = depth === 16 ? new Uint16Array(width * height * 4) : new Uint8ClampedArray(width * height * 4);
  if (fill) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = fill.r;
      data[i + 1] = fill.g;
      data[i + 2] = fill.b;
      data[i + 3] = fill.a;
    }
  }
  return depth === 16 ? { data, width, height, depth } : { data, width, height };
}

export interface CreateWorldOptions {
  width?: number;
  height?: number;
  dpi?: number;
  params?: Record<string, unknown>;
  assets?: Record<string, Uint8Array>;
  activeColor?: RGBA;
  palette?: RGBA[];
}

/** Build a single-layer {@link World} — the usual starting point for exercising an extension. */
export function createWorld(opts: CreateWorldOptions = {}): World {
  const width = opts.width ?? 4;
  const height = opts.height ?? 4;
  const layer: WorldLayer = {
    id: "layer-0",
    name: "Layer 0",
    bitmap: blankBitmap(width, height),
    opacity: 1,
    blendMode: "normal",
  };
  return {
    canvas: { width, height, dpi: opts.dpi ?? 72 },
    layers: [layer],
    activeLayerId: layer.id,
    selection: null,
    color: { active: opts.activeColor ?? { r: 0, g: 0, b: 0, a: 255 }, palette: opts.palette ?? [] },
    params: opts.params ?? {},
    assets: opts.assets ?? {},
    redraws: 0,
  };
}
