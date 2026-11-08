#!/usr/bin/env node
/**
 * Surface previews: the front outline of every surface in a pack of surfaces, as an SVG.
 *
 * Unlike brush previews (which need Graffux's engine to run a stroke program), a surface is only
 * profile curves, so its front outline can be drawn here from the very data a host would insert: the
 * picture is the shape, not an icon of it. Output goes beside the storefront (never into the `.azp`,
 * so packages and signatures are untouched) and is indexed with a digest of the payload it was drawn
 * from, so `check` fails when a surface changes and its preview was not regenerated.
 *
 *   node tools/surface-previews.mjs write     regenerate the SVGs and index.json
 *   node tools/surface-previews.mjs check     fail on a missing, stale or unexpected preview
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DEFAULTS = {
  submissionsDir: join(root, "submissions"),
  previewsDir: join(root, "apps/storefront-react/public/previews/surfaces"),
  urlBase: "/previews/surfaces",
};
export const INDEX_FILE = "index.json";
export const INDEX_SCHEMA = 1;
const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";

/** Same rule as @azphalt/azp `isClosedOutline` and Graffux's hull: encloses area when closed last-to-first. */
export function isClosed(points) {
  const pts = points.slice();
  const a = pts[0], b = pts[pts.length - 1];
  if (pts.length > 1 && Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-3) pts.pop();
  if (pts.length < 3) return false;
  let area = 0, per = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    area += p[0] * q[1] - q[0] * p[1];
    per += Math.hypot(q[0] - p[0], q[1] - p[1]);
  }
  return per > 0 && Math.abs(area) / 2 >= 1e-5 * per * per;
}

/** The SVG for a surface payload's front outline. Deterministic. */
export function outlineSvg(surface, size = 96, pad = 8) {
  const k = size - 2 * pad;
  const f = (n) => (Math.round((pad + n * k) * 100) / 100).toString();
  const d = surface.front.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join("") + (isClosed(surface.front) ? "Z" : "");
  const closed = isClosed(surface.front);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${surface.name.replace(/[<>&"]/g, "")} front outline">` +
    `<path d="${d}" fill="${closed ? "#7c6bd6" : "none"}" fill-opacity="0.22" stroke="#7c6bd6" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/></svg>\n`;
}

/** Every `{packId, assetPath, name, payloadText}` surface across the submissions, stable order. */
export function listSurfaces(submissionsDir = DEFAULTS.submissionsDir) {
  const out = [];
  for (const dir of readdirSync(submissionsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
    const mp = join(submissionsDir, dir, "manifest.json");
    if (!existsSync(mp)) continue;
    const manifest = JSON.parse(readFileSync(mp, "utf8"));
    for (const asset of manifest.assets ?? []) {
      if (asset.type !== "surface") continue;
      const text = readFileSync(join(submissionsDir, dir, asset.path), "utf8");
      out.push({ packId: manifest.id, assetPath: asset.path, name: asset.params?.name ?? asset.path, text });
    }
  }
  return out;
}

const imageFor = (s, urlBase) => `${urlBase}/${s.packId}/${slug(s.assetPath.replace(/^.*\//, "").replace(/\.[^.]+$/, ""))}.svg`;

export function buildPreviews(submissionsDir = DEFAULTS.submissionsDir, urlBase = DEFAULTS.urlBase) {
  const files = new Map();
  const packs = {};
  for (const s of listSurfaces(submissionsDir)) {
    const image = imageFor(s, urlBase);
    const svg = outlineSvg(JSON.parse(s.text));
    files.set(image.slice(urlBase.length + 1), svg);
    (packs[s.packId] ??= []).push({ surface: s.name, image, payloadDigest: sha256(s.text), imageDigest: sha256(svg) });
  }
  return { files, index: { schema: INDEX_SCHEMA, packs } };
}

export function writePreviews({ submissionsDir = DEFAULTS.submissionsDir, previewsDir = DEFAULTS.previewsDir } = {}) {
  const { files, index } = buildPreviews(submissionsDir);
  rmSync(previewsDir, { recursive: true, force: true });
  for (const [rel, svg] of files) {
    mkdirSync(dirname(join(previewsDir, rel)), { recursive: true });
    writeFileSync(join(previewsDir, rel), svg);
  }
  mkdirSync(previewsDir, { recursive: true });
  writeFileSync(join(previewsDir, INDEX_FILE), JSON.stringify(index, null, 2) + "\n");
  return files.size;
}

export function readIndex(previewsDir = DEFAULTS.previewsDir) {
  const f = join(previewsDir, INDEX_FILE);
  return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : { schema: INDEX_SCHEMA, packs: {} };
}

/** Problems, as strings; empty means every surface has a current preview and nothing else is indexed. */
export function checkPreviews({ submissionsDir = DEFAULTS.submissionsDir, previewsDir = DEFAULTS.previewsDir } = {}) {
  const errors = [];
  const index = readIndex(previewsDir);
  if (index.schema !== INDEX_SCHEMA) errors.push(`${INDEX_FILE}: schema must be ${INDEX_SCHEMA}`);
  const { index: want } = buildPreviews(submissionsDir);
  for (const [pack, entries] of Object.entries(want.packs)) {
    const have = index.packs?.[pack] ?? [];
    for (const e of entries) {
      const h = have.find((x) => x.image === e.image);
      if (!h) { errors.push(`${pack} / ${e.surface}: no preview`); continue; }
      if (h.payloadDigest !== e.payloadDigest) errors.push(`${pack} / ${e.surface}: preview is stale (the surface changed)`);
      const file = join(previewsDir, e.image.slice(DEFAULTS.urlBase.length + 1));
      if (!existsSync(file)) errors.push(`${pack} / ${e.surface}: ${e.image} does not exist`);
      else if (sha256(readFileSync(file, "utf8")) !== e.imageDigest) errors.push(`${pack} / ${e.surface}: ${e.image} does not match its surface`);
    }
  }
  for (const pack of Object.keys(index.packs ?? {})) if (!want.packs[pack]) errors.push(`${pack}: indexed but no such surface pack`);
  return errors;
}

/** `preview.surfaces` for a package, from the index — what the catalog export merges into a summary. */
export function surfacesForPack(index, packId) {
  const e = index.packs?.[packId];
  return e?.length ? e.map(({ surface, image }) => ({ surface, image })) : undefined;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cmd = process.argv[2];
  if (cmd === "write") console.log(`surface-previews: wrote ${writePreviews()} preview(s)`);
  else if (cmd === "check") {
    const errors = checkPreviews();
    for (const e of errors) console.error("surface-previews: " + e);
    console.log(errors.length ? `surface-previews: ${errors.length} problem(s)` : "surface-previews: ok");
    process.exit(errors.length ? 1 : 0);
  } else { console.error("usage: surface-previews.mjs write | check"); process.exit(2); }
}
