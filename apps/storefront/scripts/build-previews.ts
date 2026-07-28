/**
 * Generate a store-card preview for every package that has something to show — by **running the
 * extension**, not by drawing an icon for it.
 *
 * A card that shows the same puzzle glyph for 133 packages tells a user nothing; the whole point of
 * a store is deciding what a thing does before installing it. `spec/extension-manifest.md` already
 * defines `preview: { image?, clip? }`, and the repository API already surfaces it on every summary
 * (`registry.ts` → `handler.ts`). Nothing produced one, so the field was universally absent.
 *
 * ## What gets rendered, and how honestly
 *
 * - **`kind: "code"` filters** — genuinely executed. The filter runs on a synthetic source image
 *   through `@azphalt/runtime-reference` (the same host that proves the capability contract), and
 *   the bitmap it writes back *is* the preview. What you see on the card is what the extension does
 *   to pixels.
 * - **motion presets** — their keyframes are sampled at intervals and drawn as a filmstrip, so the
 *   card shows the actual curve the preset describes rather than a generic "motion" badge.
 * - **model headers and packs** — deliberately **no preview**. A model that runs on the user's own
 *   footage has no canonical output, and inventing a picture of one would be a lie in exactly the
 *   place a user is deciding whether to trust it. Absent is honest; a stock image is not.
 *
 * ## Why previews are served, not packaged
 *
 * `preview.image` may be an in-package path *or* an `https:` URL. These are written to
 * `registry/previews/` and referenced by URL, which keeps package bytes — and therefore every
 * `integrity` digest and every signature — untouched. Baking previews into the `.azp` would mean
 * re-signing 133 packages to change a picture.
 *
 *   pnpm --filter @azphalt/storefront build-previews
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { readAzp } from "@azphalt/azp";
import { open, runFilter } from "@azphalt/runtime-reference";
import type { Manifest } from "@azphalt/azdk";
import { encodePng } from "./lib/png.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryDir = resolve(__dirname, "..", "registry");
const packagesDir = join(registryDir, "packages");
/**
 * Generated previews live under `registry/`, **not** `public/`.
 *
 * `public/` is the output directory of the Kotlin/Wasm distribution
 * (`apps/storefront-cmp/build.gradle.kts`), and a Gradle distribution task *clears* its output
 * directory before writing. Anything committed there that the wasm build does not itself re-emit is
 * deleted on every deploy — which is exactly what happened to these PNGs: committed in git, absent
 * from production, and disguised as a 200 by the SPA fallback rewrite.
 *
 * Keeping them beside `previews.json` also puts them where they belong: they are generated registry
 * data, like `registry/packages/*.azp`, and are served by a route handler for the same reason.
 */
const outDir = join(registryDir, "previews");

/** Scratch space for evaluating extension code payloads (see `loadModule`). */
const scratch = join(tmpdir(), "azphalt-previews");

const W = 320;
const H = 180;

/**
 * The source image every filter is run against.
 *
 * Built to make a filter's effect legible rather than to look pretty: a horizontal hue sweep (so
 * anything touching colour shows), a vertical luminance ramp (so tonal work — dithering, halftone,
 * posterisation — has a full range to bite on), and a soft circular subject a bit off centre (so
 * geometry, blur and masking have an edge to act on).
 */
function sourceImage(): Uint8Array {
  const d = new Uint8Array(W * H * 4);
  const cx = W * 0.42;
  const cy = H * 0.5;
  const r = Math.min(W, H) * 0.34;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const hue = (x / W) * 360;
      const lum = 0.22 + 0.62 * (1 - y / H);
      const [rr, gg, bb] = hsl(hue, 0.62, lum);
      const dist = Math.hypot(x - cx, y - cy);
      const inside = Math.max(0, Math.min(1, (r - dist) / 8));
      d[i] = Math.round(rr * (1 - inside) + 245 * inside);
      d[i + 1] = Math.round(gg * (1 - inside) + 243 * inside);
      d[i + 2] = Math.round(bb * (1 - inside) + 232 * inside);
      d[i + 3] = 255;
    }
  }
  return d;
}

function hsl(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const [r, g, b] =
    hp < 1 ? [c, x, 0] : hp < 2 ? [x, c, 0] : hp < 3 ? [0, c, x]
    : hp < 4 ? [0, x, c] : hp < 5 ? [x, 0, c] : [c, 0, x];
  const m = l - c / 2;
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/** A `World` the reference runtime can edit: one layer holding the source image. */
function makeWorld(data: Uint8Array, assets: Record<string, Uint8Array>, params: Record<string, unknown>) {
  return {
    canvas: { width: W, height: H, dpi: 96 },
    layers: [{
      id: "L1", name: "Preview",
      bitmap: { width: W, height: H, data: new Uint8ClampedArray(data) },
      opacity: 1, blendMode: "normal",
    }],
    activeLayerId: "L1",
    selection: null,
    color: { active: { r: 255, g: 255, b: 255, a: 255 }, palette: [] },
    params,
    assets,
    time: { currentMs: 0, durationMs: 1000, fps: 30 },
    audio: null,
    redraws: 0,
  };
}

/**
 * Panel defaults, so a filter renders the look its author intended.
 *
 * A filter reads `ctx.params`; with an empty bag every one of them falls back to its internal
 * default, which is often the identity case (a grid with no lines, a halftone at minimum). Seeding
 * from `ui/panel.json` — the same defaults a host would show — is what makes the preview
 * representative instead of a picture of the no-op.
 */
function defaultsFromPanel(payload: Record<string, Uint8Array>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [path, bytes] of Object.entries(payload)) {
    if (!path.startsWith("ui/") || !path.endsWith(".json")) continue;
    try {
      const panel = JSON.parse(new TextDecoder().decode(bytes)) as { controls?: { key?: string; default?: unknown }[] };
      for (const c of panel.controls ?? []) if (c.key && c.default !== undefined) out[c.key] = c.default;
    } catch { /* a panel we can't parse just leaves the filter on its own defaults */ }
  }
  return out;
}

/**
 * Evaluate an extension's code payload into its module namespace.
 *
 * `open()` verifies and unpacks a `.azp` but deliberately does not execute it — the reference
 * runtime takes an already-loaded module, leaving *how* code is evaluated to the host, which is the
 * right boundary for a sandbox contract. A preview generator is a host, so it does that job here:
 * the payload is written to a scratch directory with `@azphalt/sdk` linked in (extensions import
 * `defineFilter` from it), and the entry is imported.
 *
 * This runs extension code in-process with no sandbox, which is only acceptable because the input is
 * the catalog this repo builds from commit-pinned sources it already trusts. It is emphatically not
 * a model for running a third-party upload.
 */
async function loadModule(manifest: Manifest, payload: Record<string, Uint8Array>): Promise<Record<string, unknown>> {
  const entry = manifest.entry;
  if (!entry) throw new Error("manifest has no entry");
  const dir = join(scratch, manifest.id);
  for (const [rel, bytes] of Object.entries(payload)) {
    const dest = join(dir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, bytes);
  }
  // Extensions `import { defineFilter } from "@azphalt/sdk"`; link the real package so the branded
  // contribution objects the runtime checks for are the *same* symbols it compares against.
  const nm = join(dir, "node_modules", "@azphalt");
  mkdirSync(nm, { recursive: true });
  const sdk = resolve(__dirname, "..", "..", "..", "packages", "sdk-compat");
  if (!existsSync(join(nm, "sdk"))) symlinkSync(sdk, join(nm, "sdk"), "dir");
  return (await import(pathToFileURL(join(dir, entry)).href)) as Record<string, unknown>;
}

/**
 * Render a preset's keyframes as a filmstrip: N sampled frames, left to right.
 *
 * Each frame is composed into its own premultiplied-alpha cell so the effects that act on a *whole
 * image* rather than on a shape — shadow softening, depth-of-field, reflection — can be applied to
 * the drawn subject and not to the card background.
 */
function filmstrip(tracks: Record<string, Key[]>): Uint8Array {
  const frames: number = 6;
  const d = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) { d[i * 4] = 18; d[i * 4 + 1] = 18; d[i * 4 + 2] = 22; d[i * 4 + 3] = 255; }
  const cellW = Math.floor(W / frames);
  for (let f = 0; f < frames; f++) {
    const t = frames === 1 ? 0 : f / (frames - 1);
    const cell = drawCell(sample(tracks, t), cellW, f);
    // Composite the (premultiplied) cell over the card: dst = src + dst·(1−a).
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < cellW; x++) {
        const s = (y * cellW + x) * 4;
        const a = cell[s + 3] / 255;
        if (a <= 0) continue;
        const dx = f * cellW + x;
        if (dx >= W) continue;
        const i = (y * W + dx) * 4;
        for (let c = 0; c < 3; c++) d[i + c] = Math.min(255, Math.round(cell[s + c] + d[i + c] * (1 - a)));
      }
    }
  }
  return d;
}

/** Source-over into a premultiplied-alpha buffer. `r,g,b` are 0–255 straight; `a` is 0–1. */
function over(buf: Uint8Array, i: number, r: number, g: number, b: number, a: number): void {
  buf[i] = Math.min(255, Math.round(r * a + buf[i] * (1 - a)));
  buf[i + 1] = Math.min(255, Math.round(g * a + buf[i + 1] * (1 - a)));
  buf[i + 2] = Math.min(255, Math.round(b * a + buf[i + 2] * (1 - a)));
  buf[i + 3] = Math.min(255, Math.round(255 * a + buf[i + 3] * (1 - a)));
}

/**
 * Separable box blur over premultiplied RGBA — the approximation used for both `blur` (an explicit
 * radius) and a camera's aperture. Premultiplied is what makes it correct at the subject's edge:
 * blurring straight-alpha colour would drag the transparent buffer's black into the fringe.
 */
function boxBlur(buf: Uint8Array, w: number, h: number, radius: number): void {
  const r = Math.min(24, Math.round(radius));
  if (r < 1) return;
  const tmp = new Uint8Array(buf.length);
  for (const [src, dst, horiz] of [[buf, tmp, true], [tmp, buf, false]] as const) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let acc0 = 0, acc1 = 0, acc2 = 0, acc3 = 0, n = 0;
        for (let k = -r; k <= r; k++) {
          const sx = horiz ? x + k : x;
          const sy = horiz ? y : y + k;
          if (sx < 0 || sx >= w || sy < 0 || sy >= h) continue;
          const i = (sy * w + sx) * 4;
          acc0 += src[i]; acc1 += src[i + 1]; acc2 += src[i + 2]; acc3 += src[i + 3]; n++;
        }
        const o = (y * w + x) * 4;
        dst[o] = Math.round(acc0 / n); dst[o + 1] = Math.round(acc1 / n);
        dst[o + 2] = Math.round(acc2 / n); dst[o + 3] = Math.round(acc3 / n);
      }
    }
  }
}

/**
 * Compose one frame of the filmstrip.
 *
 * The subject is a square, inverse-mapped so that every geometric property a preset animates acts on
 * the *same* rasterisation rather than needing its own special case: rotation and skew are an affine
 * inverse, warp is a per-scanline horizontal displacement, bend is a per-column vertical one. What
 * the card shows for a given track is therefore the shape that track actually describes.
 */
function drawCell(v: Sampled, cellW: number, f: number): Uint8Array {
  const cell = new Uint8Array(cellW * H * 4);
  const size = Math.max(4, Math.round(cellW * 0.5 * (0.25 + 0.75 * v.scale)));
  const half = size / 2;
  const cx = cellW / 2 + v.x * cellW * 0.3;
  const cy = H / 2 + v.y * H * 0.3;
  const alpha = 0.2 + 0.8 * v.opacity;
  const [rr, gg, bb] = v.color ? hexRgb(v.color) : hsl(190 + f * 14, 0.7, 0.55);

  const rad = (v.rotation * Math.PI) / 180;
  const cos = Math.cos(-rad), sin = Math.sin(-rad);
  const tanX = Math.tan((v.skewX * Math.PI) / 180);
  const tanY = Math.tan((v.skewY * Math.PI) / 180);
  const warpAmp = v.warp * cellW * 0.22;
  const bendAmp = v.bend * H * 0.3;

  /** Is screen pixel (x, y) inside the subject, after undoing every geometric track? */
  const inside = (x: number, y: number, ox = 0, oy = 0): boolean => {
    let sx = x - cx - ox, sy = y - cy - oy;
    if (bendAmp) { const u = sx / (cellW / 2); sy -= bendAmp * (1 - Math.min(1, u * u)); }
    if (warpAmp) sx -= warpAmp * Math.sin((y / H) * Math.PI * 3);
    let lx = sx * cos - sy * sin;
    const ly = sx * sin + sy * cos;
    const lx0 = lx;
    lx -= tanX * ly;
    const ly2 = ly - tanY * lx0;
    return Math.abs(lx) <= half && Math.abs(ly2) <= half;
  };

  const paint = (buf: Uint8Array, ox: number, oy: number, r: number, g: number, b: number, a: number): void => {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < cellW; x++) {
        if (!inside(x, y, ox, oy)) continue;
        over(buf, (y * cellW + x) * 4, r, g, b, a);
      }
    }
  };

  // A drop shadow is an offset copy softened by its own radius, so it gets its own layer: blurring
  // it after the subject is drawn would smear the subject too.
  if (v.shadow) {
    const sh = new Uint8Array(cellW * H * 4);
    const [sr, sg, sb] = hexRgb(v.shadow.color);
    paint(sh, v.shadow.dx, v.shadow.dy, sr, sg, sb, 0.75 * alpha);
    boxBlur(sh, cellW, H, v.shadow.radius / 3);
    for (let i = 0; i < cell.length; i += 4) {
      const a = sh[i + 3] / 255;
      if (a > 0) over(cell, i, sh[i] / Math.max(a, 0.001), sh[i + 1] / Math.max(a, 0.001), sh[i + 2] / Math.max(a, 0.001), a);
    }
  }

  // Extrusion: the receding side wall, drawn far-to-near before the face so the face caps it.
  if (v.extrude > 0) {
    const [er, eg, eb] = hexRgb(v.extrudeColor ?? "#222222");
    const depth = Math.min(cellW * 0.5, v.extrude * 0.55);
    const steps = Math.max(1, Math.round(depth));
    for (let s = steps; s >= 1; s--) {
      const k = s / steps;
      const shade = 0.45 + 0.35 * (1 - k); // walls darken with distance
      paint(cell, depth * k * 0.7, depth * k * 0.7, er * shade, eg * shade, eb * shade, alpha);
    }
  }

  paint(cell, 0, 0, rr, gg, bb, alpha);

  // Reflection: the subject mirrored below its own base, faded by the preset's opacity.
  if (v.reflect) {
    const baseY = Math.round(cy + half + v.reflect.distance * 0.3);
    const snapshot = cell.slice();
    for (let y = baseY; y < H; y++) {
      const srcY = baseY - (y - baseY);
      if (srcY < 0 || srcY >= H) continue;
      const fade = v.reflect.opacity * Math.max(0, 1 - (y - baseY) / (H * 0.35));
      if (fade <= 0) continue;
      for (let x = 0; x < cellW; x++) {
        const s = (srcY * cellW + x) * 4;
        const a = (snapshot[s + 3] / 255) * fade;
        if (a <= 0) continue;
        over(cell, (y * cellW + x) * 4, snapshot[s] / Math.max(snapshot[s + 3] / 255, 0.001),
          snapshot[s + 1] / Math.max(snapshot[s + 3] / 255, 0.001),
          snapshot[s + 2] / Math.max(snapshot[s + 3] / 255, 0.001), a);
      }
    }
  }

  // A spotlight is a position and a colour; depict it as the falloff it casts across the frame.
  if (v.light) {
    const [lr, lg, lb] = hexRgb(v.light.color);
    const lx = cellW / 2 + v.light.x * cellW * 0.4;
    const ly = H / 2 - v.light.y * H * 0.4;
    const reach = Math.max(cellW, H) * 0.8;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < cellW; x++) {
        const i = (y * cellW + x) * 4;
        if (cell[i + 3] === 0) continue; // light the subject, not the empty card
        const fall = Math.max(0, 1 - Math.hypot(x - lx, y - ly) / reach);
        const a = 0.55 * fall * fall;
        if (a > 0) over(cell, i, lr, lg, lb, a);
      }
    }
  }

  boxBlur(cell, cellW, H, v.blur);
  return cell;
}

function hexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const v = parseInt(n.slice(0, 6), 16);
  return Number.isFinite(v) ? [(v >> 16) & 255, (v >> 8) & 255, v & 255] : [120, 200, 255];
}

interface Sampled {
  x: number; y: number; scale: number; opacity: number; rotation: number; color?: string;
  /** Shear in degrees, from a `skew` track or a camera's roll-free tilt. */
  skewX: number; skewY: number;
  /** Blur radius in px — an explicit `blur` track, or the depth of field a camera's aperture implies. */
  blur: number;
  /** Signed horizontal displacement, −1..1, from a `warp` track. */
  warp: number;
  /** Page-curl style bend, 0..1, from a `bend` track's angle. */
  bend: number;
  /** Extruded depth in preset units, with the side-wall colour the preset names. */
  extrude: number; extrudeColor?: string;
  shadow?: { dx: number; dy: number; radius: number; color: string };
  reflect?: { opacity: number; distance: number };
  light?: { x: number; y: number; color: string };
}

/**
 * One parsed keyframe. `value` is whatever the preset holds — a number, a vector, a colour string,
 * or a structured object (`extrusion` is `{depth, color}`, `camera` is `{position, aim, aperture}`),
 * so this stays `unknown` and the typed accessors below pick out of it.
 */
interface Key { t: number; v: unknown }

/**
 * Parse the preset format these packages actually use:
 * `{ tracks: { position: [{time, value:[x,y,z], easing?}], scale: […], opacity: […], … } }`.
 *
 * Returns `null` when there is no track this renderer understands. That matters more than it looks:
 * an earlier version fell back to a default curve whenever parsing failed, which produced **73
 * byte-identical filmstrips** across 73 different presets — a card that confidently showed the wrong
 * motion. No preview is honest; a generic one pretending to be specific is not.
 */
function parseTracks(preset: unknown): Record<string, Key[]> | null {
  const raw = (preset as { tracks?: unknown })?.tracks;
  if (!raw || typeof raw !== "object") return null;

  const out: Record<string, Key[]> = {};
  const addTrack = (name: string, keys: unknown): void => {
    // A track given as a plain object rather than a keyframe list is a *binding* in the object form
    // (`{bind: "audio.rms", mapIn, mapOut}`) — driven by the user's footage, so it has no fixed curve.
    if (!Array.isArray(keys)) return;
    const parsed = keys
      .map((k): Key | null => {
        const e = k as { time?: unknown; value?: unknown };
        const t = Number(e.time);
        if (!Number.isFinite(t)) return null;
        return e.value === undefined || e.value === null ? null : { t, v: e.value };
      })
      .filter((k): k is Key => k !== null)
      .sort((a, b) => a.t - b.t);
    if (parsed.length) out[name.toLowerCase()] = parsed;
  };

  if (Array.isArray(raw)) {
    // Array form: `[{ type: "keyframe", property, keyframes }, { type: "binding", property, binding }]`.
    // A `binding` track is driven by the user's own footage at runtime — scene motion vectors, audio
    // level, a tracked subject — so it has no fixed curve, and there is nothing truthful to draw for
    // it. Only keyframed tracks contribute.
    for (const entry of raw) {
      const e = entry as { type?: unknown; property?: unknown; keyframes?: unknown };
      if (e.type === "binding") continue;
      if (typeof e.property === "string") addTrack(e.property, e.keyframes);
    }
  } else {
    // Object form: `{ position: [...], scale: [...], opacity: [...] }`.
    for (const [name, keys] of Object.entries(raw as Record<string, unknown>)) addTrack(name, keys);
  }

  // Every track this renderer can draw. A preset animating *only* properties outside this set gets
  // no preview rather than a neutral box that looks like every other neutral box — an earlier version
  // drew one anyway and produced 73 identical filmstrips.
  //
  // The set is deliberately wide, because "cannot be depicted" is almost always false. Extrusion is a
  // depth and a side colour; warp is a signed displacement; a camera is a viewpoint whose dolly,
  // pan and aperture map onto scale, offset and depth of field. Each of those *is* a picture. What
  // genuinely stays out are the runtime bindings — a track driven by the user's own footage has no
  // fixed curve, so there is no single frame that honestly represents it.
  const RENDERABLE = [
    "position", "scale", "opacity", "rotation", "color",
    "extrusion", "warp", "camera", "skew", "blur", "shadow", "bend", "reflection", "spotlights",
  ];
  if (!RENDERABLE.some((k) => out[k]?.length)) return null;
  return out;
}

/**
 * Interpolate a numeric quantity out of a track at `t` (0..1), where `pick` pulls that quantity from
 * whatever shape the keyframe's value happens to be. Easing is ignored — the shape of the motion is
 * what a card conveys, not its exact timing.
 */
function pickAt(keys: Key[] | undefined, t: number, pick: (v: unknown) => number | undefined, dflt: number): number {
  if (!keys?.length) return dflt;
  const num = (k: Key): number => {
    const n = pick(k.v);
    return typeof n === "number" && Number.isFinite(n) ? n : dflt;
  };
  if (t <= keys[0].t) return num(keys[0]);
  if (t >= keys[keys.length - 1].t) return num(keys[keys.length - 1]);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (t >= a.t && t <= b.t) {
      const f = b.t === a.t ? 0 : (t - a.t) / (b.t - a.t);
      return num(a) + (num(b) - num(a)) * f;
    }
  }
  return num(keys[keys.length - 1]);
}

/**
 * The colour a track holds at `t`, interpolated in RGB between the surrounding keys.
 *
 * Interpolating rather than stepping to the nearest previous key is what a motion engine actually
 * does, and skipping it hides real animation: `3d-protrusion` ramps its extrusion wall from
 * `#222222` to `#ff5500`, and holding the first key meant five of six frames drew a dark wall on a
 * dark card — the extrusion was depicted, and invisible.
 */
function pickStr(keys: Key[] | undefined, t: number, pick: (v: unknown) => string | undefined): string | undefined {
  if (!keys?.length) return undefined;
  const at = (i: number): string | undefined => pick(keys[i].v);
  if (t <= keys[0].t) return at(0);
  if (t >= keys[keys.length - 1].t) return at(keys.length - 1);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (t < a.t || t > b.t) continue;
    const ca = pick(a.v), cb = pick(b.v);
    if (!ca) return cb;
    if (!cb) return ca;
    const f = b.t === a.t ? 0 : (t - a.t) / (b.t - a.t);
    const [ar, ag, ab] = hexRgb(ca), [br, bg, bb] = hexRgb(cb);
    const mix = (x: number, y: number): string =>
      Math.round(x + (y - x) * f).toString(16).padStart(2, "0");
    return `#${mix(ar, br)}${mix(ag, bg)}${mix(ab, bb)}`;
  }
  return at(keys.length - 1);
}

/** Scalar tracks are `value: 5`; vector tracks are `value: [x, y, z]`. Read component `c` of either. */
const comp = (c: number) => (v: unknown): number | undefined =>
  typeof v === "number" ? (c === 0 ? v : 0) : Array.isArray(v) && typeof v[c] === "number" ? (v[c] as number) : undefined;

/** Read a named numeric field of an object-valued keyframe (`extrusion.depth`, `camera.aperture`). */
const field = (name: string) => (v: unknown): number | undefined => {
  const n = (v as Record<string, unknown> | null)?.[name];
  return typeof n === "number" ? n : undefined;
};

/** Read component `c` of a named vector field (`camera.position[2]`). */
const fieldComp = (name: string, c: number) => (v: unknown): number | undefined => {
  const arr = (v as Record<string, unknown> | null)?.[name];
  return Array.isArray(arr) && typeof arr[c] === "number" ? (arr[c] as number) : undefined;
};

const str = (name: string) => (v: unknown): string | undefined => {
  const s = (v as Record<string, unknown> | null)?.[name];
  return typeof s === "string" ? s : undefined;
};

function sample(tracks: Record<string, Key[]>, t: number): Sampled {
  // `position` is in preset units (roughly pixels at a 1080-ish reference); normalise to a fraction
  // of the cell so a 100-unit move reads as a clear offset rather than flying off the card.
  let x = pickAt(tracks.position, t, comp(0), 0) / 120;
  let y = pickAt(tracks.position, t, comp(1), 0) / 120;
  let scale = tracks.scale ? pickAt(tracks.scale, t, comp(0), 1) : 1;
  let blur = tracks.blur ? pickAt(tracks.blur, t, comp(0), 0) : 0;

  // A camera track is a viewpoint, and a viewpoint is depictable: dollying along z changes how much
  // of the frame the subject fills, panning in x/y slides it the opposite way, and the aperture sets
  // how shallow the depth of field is (f/1.4 is a wide aperture — soft; f/5.6 is much deeper).
  if (tracks.camera?.length) {
    const z = pickAt(tracks.camera, t, fieldComp("position", 2), 500);
    const camX = pickAt(tracks.camera, t, fieldComp("position", 0), 0);
    const camY = pickAt(tracks.camera, t, fieldComp("position", 1), 0);
    const aperture = pickAt(tracks.camera, t, field("aperture"), 0);
    const REFERENCE_Z = 500;
    scale *= Math.max(0.3, Math.min(2.2, REFERENCE_Z / Math.max(1, Math.abs(z))));
    x -= camX / 240;
    y += camY / 240;
    if (aperture > 0) blur += Math.min(8, 6 / aperture);
  }

  const shadowColor = pickStr(tracks.shadow, t, (v) => (Array.isArray(v) ? v.find((e) => typeof e === "string") as string | undefined : str("color")(v)));

  return {
    x: Math.max(-1, Math.min(1, x)),
    y: Math.max(-1, Math.min(1, y)),
    scale: Math.max(0, Math.min(2.2, scale)),
    opacity: Math.max(0, Math.min(1, tracks.opacity ? pickAt(tracks.opacity, t, comp(0), 1) : 1)),
    rotation: tracks.rotation ? pickAt(tracks.rotation, t, comp(0), 0) : 0,
    color: pickStr(tracks.color, t, (v) => (typeof v === "string" ? v : str("color")(v))),
    skewX: tracks.skew ? pickAt(tracks.skew, t, comp(0), 0) : 0,
    skewY: tracks.skew ? pickAt(tracks.skew, t, comp(1), 0) : 0,
    blur: Math.max(0, Math.min(24, blur)),
    warp: tracks.warp ? Math.max(-1, Math.min(1, pickAt(tracks.warp, t, comp(0), 0))) : 0,
    // `bend` is `{angle, radius}`: the angle is how far the page has curled, in degrees.
    bend: tracks.bend ? Math.max(0, Math.min(1, pickAt(tracks.bend, t, field("angle"), 0) / 180)) : 0,
    extrude: tracks.extrusion ? Math.max(0, pickAt(tracks.extrusion, t, field("depth"), 0)) : 0,
    extrudeColor: pickStr(tracks.extrusion, t, str("color")),
    shadow: tracks.shadow?.length
      ? {
          // CSS-ish `[dx, dy, radius, color]`, or `{offsetX, offsetY, blur, color}`.
          dx: pickAt(tracks.shadow, t, (v) => comp(0)(v) ?? field("offsetX")(v), 0),
          dy: pickAt(tracks.shadow, t, (v) => comp(1)(v) ?? field("offsetY")(v), 0),
          radius: pickAt(tracks.shadow, t, (v) => comp(2)(v) ?? field("blur")(v), 8),
          color: shadowColor ?? "#000000",
        }
      : undefined,
    reflect: tracks.reflection?.length
      ? {
          opacity: pickAt(tracks.reflection, t, field("opacity"), 0.4),
          distance: pickAt(tracks.reflection, t, field("distance"), 0),
        }
      : undefined,
    light: tracks.spotlights?.length
      ? {
          // `spotlights` is an array of lights; the first one carries the read of the setup.
          x: Math.max(-1, Math.min(1, pickAt(tracks.spotlights, t, (v) => fieldComp("position", 0)(fst(v)), 0) / 500)),
          y: Math.max(-1, Math.min(1, pickAt(tracks.spotlights, t, (v) => fieldComp("position", 1)(fst(v)), 0) / 500)),
          color: pickStr(tracks.spotlights, t, (v) => str("color")(fst(v))) ?? "#ffffff",
        }
      : undefined,
  };
}

/** The first light of a `spotlights` keyframe, whose value is an array of light objects. */
const fst = (v: unknown): unknown => (Array.isArray(v) ? v[0] : v);

async function main(): Promise<void> {
  if (!existsSync(packagesDir)) {
    console.error("build-previews: no registry/packages — run build-catalog first");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  for (const f of readdirSync(outDir)) if (f.endsWith(".png")) rmSync(join(outDir, f));

  const source = sourceImage();
  const index: Record<string, { image: string }> = {};
  const rendered: { id: string; png: Uint8Array }[] = [];
  let executed = 0, strips = 0, skipped = 0;
  const failures: string[] = [];

  for (const file of readdirSync(packagesDir).filter((f) => f.endsWith(".azp")).sort()) {
    const bytes = new Uint8Array(readFileSync(join(packagesDir, file)));
    let manifest: Manifest, payload: Record<string, Uint8Array>;
    try { ({ manifest, payload } = readAzp(bytes)); } catch (e) { failures.push(`${file}: ${(e as Error).message}`); continue; }

    let rgba: Uint8Array | undefined;

    if (manifest.kind === "code" && manifest.contributes?.filters?.length) {
      try {
        open(bytes); // verify before executing anything out of it
        const module = await loadModule(manifest, payload);
        const world = makeWorld(source, payload, defaultsFromPanel(payload));
        await runFilter(manifest, module, world as never);
        rgba = new Uint8Array(world.layers[0].bitmap.data);
        executed++;
      } catch (e) {
        // A filter that cannot run is exactly the kind of thing a preview pass should surface rather
        // than paper over with a placeholder.
        failures.push(`${manifest.id}: filter did not run — ${(e as Error).message.split("\n")[0]}`);
        skipped++;
        continue;
      }
    } else if (manifest.kind === "asset" && (manifest.assets ?? []).some((a) => a.type === "motion")) {
      const presetFile = Object.entries(payload).find(([p]) => p.startsWith("assets/") && p.endsWith(".json"));
      if (!presetFile) { skipped++; continue; }
      try {
        const tracks = parseTracks(JSON.parse(new TextDecoder().decode(presetFile[1])));
        if (!tracks) { skipped++; continue; }   // no track we understand — show nothing, not a guess
        rgba = filmstrip(tracks);
        strips++;
      } catch { skipped++; continue; }
    } else {
      // Models, packs, app and mcp headers: nothing truthful to render.
      skipped++;
      continue;
    }

    rendered.push({ id: manifest.id, png: encodePng(rgba, W, H) });
  }

  // Drop any image that more than one package renders to.
  //
  // A collision means the rendering cannot tell those packages apart — two presets whose depictable
  // tracks happen to describe the same motion, or one whose essential character is carried entirely
  // by a runtime binding, leaving only an incidental shared track to draw. The picture is accurate
  // and still misleads, because it implies that is what the preset does. Better to show nothing.
  const byHash = new Map<string, string[]>();
  for (const r of rendered) {
    const h = createHash("sha256").update(r.png).digest("hex");
    byHash.set(h, [...(byHash.get(h) ?? []), r.id]);
  }
  const ambiguous = new Set(
    [...byHash.values()].filter((ids) => ids.length > 1).flat(),
  );
  for (const r of rendered) {
    if (ambiguous.has(r.id)) continue;
    const name = `${r.id}.png`;
    writeFileSync(join(outDir, name), r.png);
    index[r.id] = { image: `/previews/${name}` };
  }

  writeFileSync(join(registryDir, "previews.json"),
    JSON.stringify({ "//": "Generated by scripts/build-previews.ts. Do not edit by hand.", previews: index }, null, 2) + "\n");

  console.log(
    `build-previews: ${Object.keys(index).length} preview(s) written — ${executed} filter(s) executed, ` +
      `${strips} motion filmstrip(s); ${skipped} had nothing truthful to show, ` +
      `${ambiguous.size} dropped as indistinguishable.`,
  );
  if (failures.length) {
    console.log(`build-previews: ${failures.length} could not render:`);
    for (const f of failures) console.log(`  - ${f}`);
  }
}

main().catch((e) => {
  console.error("build-previews: fatal —", e);
  process.exit(1);
});
