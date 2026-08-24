/**
 * Validate registry **submissions**. A submission is a folder `submissions/<id>/` holding a
 * `manifest.json` (without the computed `files`), a `LICENSE`, and the payload files at their
 * in-package paths. This packages each folder into a `.azp` and checks it — the same gate the
 * submission PR workflow runs (see `submissions/README.md`).
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { writeAzp, verifyAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

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
/**
 * Every kind `spec/package-format.md` § Package kind defines.
 *
 * This list had drifted: it stopped at the three payload-bearing kinds, so the three **header** kinds
 * — `app`, `mcp`, `pack` — were rejected outright with "invalid kind". That silently made three
 * documented submission paths impossible, including the host listing that
 * `spec/web-handoff.md` § Host directory tells people to publish.
 *
 * The header kinds carry no payload by design, which is why the `assets`/`entry` checks below simply
 * find nothing to complain about; `verifyAzp` is what enforces their structure (`packages/azp`). `skill`
 * and `script` are the exceptions that DO carry a real payload (bundled `SKILL.md` files, or a bundled
 * script file respectively) — see `spec/skill.md` and `spec/script.md`. `composable` is a header kind
 * like `app`/`mcp`/`pack` — see `spec/composable.md`.
 */
const KINDS = ["asset", "code", "mixed", "app", "mcp", "pack", "skill", "script", "composable"];

/** All files under `dir`, as `/`-separated paths relative to `dir`. */
function walk(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  // `withFileTypes` reads the type from the dirent (no per-entry stat) and does not follow symlinks,
  // so a broken or circular symlink can't crash or loop the walk.
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
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

  // Referenced payload must exist (or be a declared remote asset). Guard against a malformed manifest
  // where `assets` isn't an array or an entry isn't an object.
  if (manifest.assets !== undefined && !Array.isArray(manifest.assets)) {
    errors.push("assets must be an array");
  } else {
    for (const a of manifest.assets ?? []) {
      if (!a || typeof a !== "object") {
        errors.push("invalid asset entry (expected an object)");
        continue;
      }
      if (a.path) {
        if (!(a.path in payload)) errors.push(`asset path not found in folder: ${a.path}`);
      } else if (!a.remoteUrl) {
        errors.push(`asset of type '${a.type}' has an empty path but no remoteUrl`);
      }
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
  return readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((name) => validateSubmission(join(root, name)));
}
