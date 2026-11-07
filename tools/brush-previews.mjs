#!/usr/bin/env node
/**
 * Brush stroke previews: ingest, index and verify.
 *
 * Every brush in the store shows a **rendered sample stroke**, and a kinetic brush (one with a stroke
 * program) shows several, one per scenario (speeds, a held pen, bursts over the same spot).
 *
 * ## Why this tool does not render
 *
 * A brush's stroke program is a script run by the Graffux Kotlin engine (`StrokeProgram.kt`,
 * `IncrementalDynamicDabGenerator`). Re-implementing that interpreter in Node would produce pictures
 * that look right and are not what the brush does, which is worse than no picture. So rendering stays
 * in Graffux (`PackRenderHarness`, `-Pgraffux.packs.brushpreviews=<dir>`), and this tool does the part
 * Node can do honestly:
 *
 *   ingest <renderDir>  copy the engine's PNGs into the store and record, per brush, a digest of the exact
 *                       definition they were rendered from (params + tip image bytes).
 *   check               recompute those digests from the submissions and fail when a brush has no
 *                       preview, too few previews (kinetic), a missing or malformed image, or a preview
 *                       rendered from a definition that has since changed.
 *   report              list every brush and whether its preview is current.
 *
 * Previews are served beside the storefront (`apps/storefront-react/public/previews/brushes/`), never
 * baked into the `.azp`, so adding one never changes a package's integrity digest or its signature.
 *
 *   node tools/brush-previews.mjs check
 *   node tools/brush-previews.mjs ingest <dir written by the Graffux harness>
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DEFAULTS = {
  submissionsDir: join(root, "submissions"),
  previewsDir: join(root, "apps/storefront-react/public/previews/brushes"),
  /** Where the index's image URLs point on the store origin. */
  urlBase: "/previews/brushes",
};
export const INDEX_FILE = "index.json";
export const INDEX_SCHEMA = 1;
/** A kinetic brush must show its behaviour, which one stroke cannot. */
export const MIN_KINETIC_STROKES = 3;
export const MIN_STATIC_STROKES = 1;
export const MAX_STROKES = 12;
export const MAX_PNG_BYTES = 400_000;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

/** JSON with object keys sorted, so a digest does not depend on how an author ordered a manifest. */
export function canonicalJson(value) {
  if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
  if (value && typeof value === "object") {
    return "{" + Object.keys(value).sort().map((k) => JSON.stringify(k) + ":" + canonicalJson(value[k])).join(",") + "}";
  }
  return JSON.stringify(value);
}

/**
 * The digest of everything that decides what a brush looks like: its `params` (size, spacing, dynamics,
 * stroke program, ...) and the bytes of its tip image. Name and tags are metadata and are excluded, so
 * renaming a brush does not invalidate its preview but changing its program does.
 */
export function brushDefinitionDigest(asset, tipBytes) {
  const { name: _name, ...params } = asset.params ?? {};
  return sha256(canonicalJson(params) + "\n" + (tipBytes ? sha256(tipBytes) : "no-tip"));
}

/** A brush is kinetic when its definition carries a stroke program. */
export function isKinetic(asset) {
  return Boolean(asset.params && typeof asset.params === "object" && asset.params.program);
}

/** Every `{pack, asset}` brush across the submissions, in a stable order. */
export function listBrushes(submissionsDir = DEFAULTS.submissionsDir) {
  const out = [];
  for (const dir of readdirSync(submissionsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
    const manifestPath = join(submissionsDir, dir, "manifest.json");
    if (!existsSync(manifestPath)) continue;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    for (const asset of manifest.assets ?? []) {
      if (asset.type !== "brush") continue;
      const tipPath = join(submissionsDir, dir, asset.path);
      const tip = existsSync(tipPath) ? readFileSync(tipPath) : null;
      out.push({
        packId: manifest.id,
        dir,
        asset,
        name: asset.params?.name ?? asset.path,
        kinetic: isKinetic(asset),
        digest: brushDefinitionDigest(asset, tip),
      });
    }
  }
  return out;
}

/** Width and height from a PNG's IHDR, or null when the bytes are not a PNG. */
export function pngSize(bytes) {
  if (bytes.length < 33 || !PNG_MAGIC.equals(bytes.subarray(0, 8))) return null;
  if (bytes.subarray(12, 16).toString("latin1") !== "IHDR") return null;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";

export function readIndex(previewsDir = DEFAULTS.previewsDir) {
  const file = join(previewsDir, INDEX_FILE);
  if (!existsSync(file)) return { schema: INDEX_SCHEMA, packs: {} };
  return JSON.parse(readFileSync(file, "utf8"));
}

/**
 * Problems with the stored previews, as strings; empty means every brush has a current preview.
 * With `onlyIndexed`, brushes that have never been ingested are skipped (coverage is a separate
 * question from correctness: whatever *is* indexed must still be valid and current).
 */
export function checkBrushPreviews({ submissionsDir = DEFAULTS.submissionsDir, previewsDir = DEFAULTS.previewsDir, onlyIndexed = false } = {}) {
  const errors = [];
  const index = readIndex(previewsDir);
  if (index.schema !== INDEX_SCHEMA) errors.push(`${INDEX_FILE}: schema must be ${INDEX_SCHEMA}`);
  const brushes = listBrushes(submissionsDir);
  const known = new Set(brushes.map((b) => `${b.packId}\n${b.asset.path}`));
  for (const [packId, entries] of Object.entries(index.packs ?? {})) {
    for (const assetPath of Object.keys(entries)) {
      if (!known.has(`${packId}\n${assetPath}`)) errors.push(`${packId} / ${assetPath}: indexed but no such brush in submissions`);
    }
  }
  for (const b of brushes) {
    const at = `${b.packId} / ${b.name}`;
    const entry = index.packs?.[b.packId]?.[b.asset.path];
    if (!entry) {
      if (!onlyIndexed) errors.push(`${at}: no preview`);
      continue;
    }
    if (entry.definitionDigest !== b.digest) errors.push(`${at}: preview is stale (the brush definition changed since it was rendered)`);
    if (entry.kinetic !== b.kinetic) errors.push(`${at}: preview was recorded as ${entry.kinetic ? "kinetic" : "static"} but the brush is ${b.kinetic ? "kinetic" : "static"}`);
    const strokes = entry.strokes ?? [];
    const min = b.kinetic ? MIN_KINETIC_STROKES : MIN_STATIC_STROKES;
    if (strokes.length < min) errors.push(`${at}: ${b.kinetic ? "a kinetic brush needs" : "needs"} at least ${min} stroke preview(s), has ${strokes.length}`);
    if (strokes.length > MAX_STROKES) errors.push(`${at}: at most ${MAX_STROKES} stroke previews`);
    const labels = new Set();
    for (const s of strokes) {
      if (typeof s.label !== "string" || !s.label) errors.push(`${at}: a stroke has no label`);
      else if (labels.has(s.label)) errors.push(`${at}: duplicate stroke label "${s.label}"`);
      else labels.add(s.label);
      if (typeof s.image !== "string" || !s.image.startsWith(DEFAULTS.urlBase + "/")) {
        errors.push(`${at}: image "${s.image}" must start with ${DEFAULTS.urlBase}/`);
        continue;
      }
      const rel = s.image.slice(DEFAULTS.urlBase.length + 1);
      if (rel.split("/").some((p) => p === ".." || p === "")) {
        errors.push(`${at}: image path "${s.image}" is not a clean relative path`);
        continue;
      }
      const file = join(previewsDir, rel);
      if (!existsSync(file)) {
        errors.push(`${at}: ${s.image} does not exist`);
        continue;
      }
      const bytes = readFileSync(file);
      if (bytes.length > MAX_PNG_BYTES) errors.push(`${at}: ${s.image} is ${bytes.length} bytes (limit ${MAX_PNG_BYTES})`);
      const size = pngSize(bytes);
      if (!size) errors.push(`${at}: ${s.image} is not a PNG`);
      else if (size.width < 64 || size.height < 32) errors.push(`${at}: ${s.image} is ${size.width}x${size.height}, too small to read`);
      if (entry.imageDigests?.[s.image] !== sha256(bytes)) errors.push(`${at}: ${s.image} does not match its recorded digest`);
    }
  }
  return errors;
}

/**
 * Take a directory written by the Graffux harness
 * (`<renderDir>/<packId>/index.json` + `<brush>/<NN>-<label>.png`) into the store. Brushes are matched by
 * asset path; a render for a brush that does not exist, or a pack the renderer produced no strokes
 * for, is an error rather than silently skipped.
 */
export function ingest(renderDir, { submissionsDir = DEFAULTS.submissionsDir, previewsDir = DEFAULTS.previewsDir } = {}) {
  const brushes = listBrushes(submissionsDir);
  const index = readIndex(previewsDir);
  index.schema = INDEX_SCHEMA;
  index.packs ??= {};
  const summary = [];
  for (const packDirent of readdirSync(renderDir, { withFileTypes: true }).filter((d) => d.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const renderIndexPath = join(renderDir, packDirent.name, "index.json");
    if (!existsSync(renderIndexPath)) continue;
    const render = JSON.parse(readFileSync(renderIndexPath, "utf8"));
    const packBrushes = brushes.filter((b) => b.packId === render.pack);
    if (packBrushes.length === 0) throw new Error(`${packDirent.name}: renders pack "${render.pack}", which is not in submissions`);
    const outPack = {};
    const packDir = join(previewsDir, render.pack);
    rmSync(packDir, { recursive: true, force: true });
    for (const r of render.brushes) {
      const b = packBrushes.find((x) => x.asset.path === r.asset);
      if (!b) throw new Error(`${render.pack}: rendered brush "${r.asset}" is not in the manifest`);
      const strokes = [];
      const imageDigests = {};
      r.strokes.forEach((s, i) => {
        const from = join(renderDir, packDirent.name, s.file);
        const bytes = readFileSync(from);
        if (!pngSize(bytes)) throw new Error(`${from} is not a PNG`);
        const rel = `${render.pack}/${slug(b.asset.path.replace(/^.*\//, "").replace(/\.[^.]+$/, ""))}/${String(i + 1).padStart(2, "0")}-${slug(s.label)}.png`;
        mkdirSync(dirname(join(previewsDir, rel)), { recursive: true });
        copyFileSync(from, join(previewsDir, rel));
        const image = `${DEFAULTS.urlBase}/${rel}`;
        strokes.push({ brush: b.name, label: s.label, image });
        imageDigests[image] = sha256(bytes);
      });
      outPack[b.asset.path] = { name: b.name, kinetic: b.kinetic, definitionDigest: b.digest, renderer: render.renderer, strokes, imageDigests };
      summary.push(`${render.pack} / ${b.name}: ${strokes.length} stroke(s)${b.kinetic ? " (kinetic)" : ""}`);
    }
    index.packs[render.pack] = outPack;
  }
  index.packs = Object.fromEntries(Object.entries(index.packs).sort(([a], [b]) => a.localeCompare(b)));
  mkdirSync(previewsDir, { recursive: true });
  writeFileSync(join(previewsDir, INDEX_FILE), JSON.stringify(index, null, 2) + "\n");
  return summary;
}

/** `preview.strokes` for a package, from the index — what the catalog export merges into a summary. */
export function strokesForPack(index, packId) {
  const entries = index.packs?.[packId];
  if (!entries) return undefined;
  const strokes = Object.values(entries).flatMap((e) => e.strokes);
  return strokes.length ? strokes : undefined;
}

function report({ submissionsDir, previewsDir } = DEFAULTS) {
  const index = readIndex(previewsDir);
  const lines = [];
  let covered = 0;
  const brushes = listBrushes(submissionsDir);
  for (const b of brushes) {
    const e = index.packs?.[b.packId]?.[b.asset.path];
    const state = !e ? "MISSING" : e.definitionDigest === b.digest ? `ok (${e.strokes.length})` : "STALE";
    if (state.startsWith("ok")) covered++;
    lines.push(`${state.padEnd(10)} ${b.kinetic ? "kinetic" : "static "} ${b.packId} / ${b.name}`);
  }
  lines.push(`\n${covered}/${brushes.length} brushes have a current preview`);
  return lines.join("\n");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === "check") {
    // Default: everything indexed must be valid; --all also demands coverage of every brush.
    const all = process.argv.includes("--all");
    const errors = checkBrushPreviews({ onlyIndexed: !all });
    for (const e of errors) console.error("brush-previews: " + e);
    console.log(errors.length ? `brush-previews: ${errors.length} problem(s)` : "brush-previews: ok");
    process.exit(errors.length ? 1 : 0);
  } else if (cmd === "ingest" && arg) {
    for (const line of ingest(resolve(arg))) console.log(line);
  } else if (cmd === "report") {
    console.log(report());
  } else {
    console.error("usage: brush-previews.mjs check [--all] | ingest <renderDir> | report");
    process.exit(2);
  }
}
