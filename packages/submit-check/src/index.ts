/**
 * Validate registry **submissions**. A submission is a folder `submissions/<id>/` holding a
 * `manifest.json` (without the computed `files`), a `LICENSE`, and the payload files at their
 * in-package paths. This packages each folder into a `.azp` and checks it — the same gate the
 * submission PR workflow runs (see `submissions/README.md`).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, sep } from "node:path";
import { writeAzp, verifyAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface SubmissionResult {
  /** The manifest id (or the folder name if the manifest couldn't be read). */
  id: string;
  /** Absolute or relative path to the submission folder. */
  dir: string;
  ok: boolean;
  errors: string[];
}

const ID_RE = /^[a-z0-9]+(\.[a-z0-9-]+)+$/i; // reverse-DNS, ≥2 dot-separated labels
const SEMVER_RE = /^\d+\.\d+\.\d+(?:[-+].+)?$/;
const REQUIRED = ["azphalt", "name", "version", "kind", "license", "compat"] as const;
const KINDS = ["asset", "code", "mixed"];

/** All files under `dir`, as `/`-separated paths relative to `dir`. */
function walk(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (statSync(abs).isDirectory()) out.push(...walk(abs, rel));
    else out.push(rel.split(sep).join("/"));
  }
  return out;
}

/** Validate a single submission folder. */
export function validateSubmission(dir: string): SubmissionResult {
  const folder = basename(dir);
  const errors: string[] = [];
  const manifestPath = join(dir, "manifest.json");
  if (!existsSync(manifestPath)) {
    return { id: folder, dir, ok: false, errors: ["missing manifest.json"] };
  }

  let manifest: Manifest & { targetApps?: unknown };
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (e) {
    return { id: folder, dir, ok: false, errors: [`manifest.json is not valid JSON: ${(e as Error).message}`] };
  }

  const id = typeof manifest.id === "string" ? manifest.id : "";
  if (!id || !ID_RE.test(id)) errors.push(`invalid id (want reverse-DNS): ${JSON.stringify(manifest.id)}`);
  if (id && id !== folder) errors.push(`folder name '${folder}' must equal manifest.id '${id}'`);
  for (const f of REQUIRED) if (!manifest[f]) errors.push(`missing required manifest field: ${f}`);
  if (manifest.kind && !KINDS.includes(manifest.kind)) errors.push(`invalid kind: ${JSON.stringify(manifest.kind)}`);
  if (manifest.version && !SEMVER_RE.test(manifest.version)) errors.push(`version must be semver: ${JSON.stringify(manifest.version)}`);
  if (!existsSync(join(dir, "LICENSE"))) errors.push("missing LICENSE file");
  if (
    manifest.targetApps !== undefined &&
    (!Array.isArray(manifest.targetApps) || manifest.targetApps.some((a) => typeof a !== "string"))
  ) {
    errors.push("targetApps must be an array of strings");
  }

  // Gather payload = every file except manifest.json and LICENSE.
  const payload: Record<string, Uint8Array> = {};
  for (const rel of walk(dir)) {
    if (rel === "manifest.json" || rel === "LICENSE") continue;
    payload[rel] = new Uint8Array(readFileSync(join(dir, rel)));
  }

  // Referenced payload must exist (or be a declared remote asset).
  for (const a of manifest.assets ?? []) {
    if (a.path) {
      if (!(a.path in payload)) errors.push(`asset path not found in folder: ${a.path}`);
    } else if (!a.remoteUrl) {
      errors.push(`asset of type '${a.type}' has an empty path but no remoteUrl`);
    }
  }
  if (manifest.entry && !(manifest.entry in payload)) errors.push(`entry module not found in folder: ${manifest.entry}`);

  // Package and verify — catches unsafe paths, digest issues, malformed containers.
  if (errors.length === 0) {
    try {
      const { files: _drop, ...clean } = manifest as Manifest;
      const license = readFileSync(join(dir, "LICENSE"), "utf8");
      const { azp } = writeAzp({ manifest: clean, payload, license });
      const v = verifyAzp(azp);
      if (!v.ok) errors.push(...v.errors.map((e) => `verifyAzp: ${e}`));
    } catch (e) {
      errors.push(`packaging failed: ${(e as Error).message}`);
    }
  }

  return { id: id || folder, dir, ok: errors.length === 0, errors };
}

/** Validate every submission folder directly under `root` (ignoring files like `README.md`). */
export function validateSubmissions(root: string): SubmissionResult[] {
  if (!existsSync(root)) return [];
  return readdirSync(root)
    .filter((name) => statSync(join(root, name)).isDirectory())
    .sort()
    .map((name) => validateSubmission(join(root, name)));
}
