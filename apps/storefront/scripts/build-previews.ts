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
 * `public/previews/` and referenced by URL, which keeps package bytes — and therefore every
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
const outDir = resolve(__dirname, "..", "public", "previews");

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

/** Render a preset's keyframes as a filmstrip: N sampled frames, left to right. */
function filmstrip(tracks: Record<string, Key[]>): Uint8Array {
  const frames = 6;
  const d = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) { d[i * 4] = 18; d[i * 4 + 1] = 18; d[i * 4 + 2] = 22; d[i * 4 + 3] = 255; }
  const cellW = Math.floor(W / frames);
  for (let f = 0; f < frames; f++) {
    const t = f / (frames - 1);
    const v = sample(tracks, t);
    const size = Math.max(4, Math.round(cellW * 0.5 * (0.25 + 0.75 * v.scale)));
    const cx = f * cellW + cellW / 2 + v.x * cellW * 0.3;
    const cy = H / 2 + v.y * H * 0.3;
    const a = 0.2 + 0.8 * v.opacity;
    const [rr, gg, bb] = v.color ? hexRgb(v.color) : hsl(190 + f * 14, 0.7, 0.55);
    const rad = (v.rotation * Math.PI) / 180;
    const cos = Math.cos(-rad), sin = Math.sin(-rad);
    const half = size / 2;
    // Rasterise the (optionally rotated) square by inverse-mapping each candidate pixel.
    for (let y = Math.floor(cy - size); y <= Math.ceil(cy + size); y++) {
      for (let x = Math.floor(cx - size); x <= Math.ceil(cx + size); x++) {
        if (x < 0 || x >= W || y < 0 || y >= H) continue;
        const dx = x - cx, dy = y - cy;
        const lx = dx * cos - dy * sin, ly = dx * sin + dy * cos;
        if (Math.abs(lx) > half || Math.abs(ly) > half) continue;
        const i = (y * W + x) * 4;
        d[i] = Math.round(d[i] * (1 - a) + rr * a);
        d[i + 1] = Math.round(d[i + 1] * (1 - a) + gg * a);
        d[i + 2] = Math.round(d[i + 2] * (1 - a) + bb * a);
      }
    }
  }
  return d;
}

function hexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const v = parseInt(n.slice(0, 6), 16);
  return Number.isFinite(v) ? [(v >> 16) & 255, (v >> 8) & 255, v & 255] : [120, 200, 255];
}

interface Sampled { x: number; y: number; scale: number; opacity: number; rotation: number; color?: string }

/** One parsed keyframe: `{ time, value }`, where value is a number, a vector, or a colour string. */
interface Key { t: number; v: number[] | string }

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
    if (!Array.isArray(keys)) return;
    const parsed = keys
      .map((k): Key | null => {
        const e = k as { time?: unknown; value?: unknown };
        const t = Number(e.time);
        if (!Number.isFinite(t)) return null;
        const v = e.value;
        if (typeof v === "string") return { t, v };
        if (typeof v === "number") return { t, v: [v] };
        if (Array.isArray(v) && v.every((n) => typeof n === "number")) return { t, v: v as number[] };
        return null;
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

  // A preset whose only animated properties are ones this renderer cannot depict (blur, shadow,
  // skew, extrusion, camera…) gets no preview rather than a neutral box that looks like every other
  // neutral box. An earlier version drew one anyway and produced 73 identical filmstrips.
  const RENDERABLE = ["position", "scale", "opacity", "rotation", "color"];
  if (!RENDERABLE.some((k) => out[k]?.length)) return null;
  return out;
}

/** Linear sample of one track at `t` (0..1). Easing is ignored — shape matters, not exact timing. */
function at(keys: Key[] | undefined, t: number, component = 0, dflt = 0): number {
  if (!keys?.length) return dflt;
  const num = (k: Key): number => (typeof k.v === "string" ? dflt : (k.v[component] ?? k.v[0] ?? dflt));
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

/** The colour a `color` track holds at `t` (nearest key — colours are not interpolated here). */
function colorAt(keys: Key[] | undefined, t: number): string | undefined {
  if (!keys?.length) return undefined;
  let best = keys[0];
  for (const k of keys) if (k.t <= t) best = k;
  return typeof best.v === "string" ? best.v : undefined;
}

function sample(tracks: Record<string, Key[]>, t: number): Sampled {
  // `position` is in preset units (roughly pixels at a 1080-ish reference); normalise to a fraction
  // of the cell so a 100-unit move reads as a clear offset rather than flying off the card.
  const px = at(tracks.position, t, 0, 0) / 120;
  const py = at(tracks.position, t, 1, 0) / 120;
  const sc = tracks.scale ? at(tracks.scale, t, 0, 1) : 1;
  const op = tracks.opacity ? at(tracks.opacity, t, 0, 1) : 1;
  const rot = tracks.rotation ? at(tracks.rotation, t, 0, 0) : 0;
  return {
    x: Math.max(-1, Math.min(1, px)),
    y: Math.max(-1, Math.min(1, py)),
    scale: Math.max(0, Math.min(1.6, sc)),
    opacity: Math.max(0, Math.min(1, op)),
    rotation: rot,
    color: colorAt(tracks.color, t),
  };
}

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
  // A collision means the rendering cannot tell those packages apart — which happens when a preset's
  // essential motion is a property this renderer cannot depict (extrusion, warp, camera) and only an
  // incidental opacity track shows. The picture is accurate and still misleads, because it implies
  // that is what the preset does. Better to show nothing for all of them.
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
