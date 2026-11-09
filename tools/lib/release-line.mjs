// The single definition of "a template's @azphalt/* range is on the workspace package's release line".
// tools/template-versions.test.mjs asserts it and tools/sync-template-ranges.mjs enforces it, both through
// this module, so the check and the fixer cannot disagree.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/** Dependency sections whose workspace-package ranges are kept on the release line. */
export const DEP_SECTIONS = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

/** Workspace package groups scanned for versions (same set the template test has always used). */
export const WORKSPACE_GROUPS = ["packages", "apps"];

/** `^0.8.0` / `~1.2.3` / `1.2.3-next.1` → [major, minor, patch]. Prerelease/build suffixes are ignored. */
export const parse = (v) =>
  String(v).replace(/^[\^~>=\s]+/, "").split(/[-+]/)[0].split(".").map(Number);

/** Whether a range's floor is on the same release line as `version` (0.x: same minor; >=1: same major). */
export function onSameLine(range, version) {
  const [rM, rm, rp] = parse(range);
  const [vM, vm, vp] = parse(version);
  if ([rM, rm, rp, vM, vm, vp].some((n) => !Number.isInteger(n))) return false;
  if (rM !== vM) return false;
  if (rM === 0) return rm === vm && rp <= vp; // caret on 0.x only spans one minor
  return rm < vm || (rm === vm && rp <= vp);
}

/** The caret range written for a workspace package at `version`: ^0.<minor>.0 on 0.x, ^<major>.0.0 otherwise. */
export function caretFor(version) {
  const [M, m] = parse(version);
  return M === 0 ? `^0.${m}.0` : `^${M}.0.0`;
}

/** The range to use for `current`: the existing one when it is already on the line, else a fresh caret. */
export function correctRange(range, version) {
  return onSameLine(range, version) ? range : caretFor(version);
}

/** Only plain semver-ish ranges are managed; workspace:, file:, git, tags, "*" etc. are left alone. */
export const isManagedRange = (range) => /^[\^~]?\d+\.\d+\.\d+([-+][0-9A-Za-z.+-]+)?$/.test(range);

/** name → current version, for every workspace package. */
export function workspaceVersions(root) {
  const out = new Map();
  for (const group of WORKSPACE_GROUPS) {
    const base = join(root, group);
    if (!existsSync(base)) continue;
    for (const dir of readdirSync(base, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const pj = join(base, dir.name, "package.json");
      if (!existsSync(pj)) continue;
      const p = JSON.parse(readFileSync(pj, "utf8"));
      if (p.name && p.version) out.set(p.name, p.version);
    }
  }
  return out;
}

/** Template directories (those with a package.json) under packages/create-azphalt/templates. */
export function templateManifests(root) {
  const dir = join(root, "packages/create-azphalt/templates");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((t) => ({ template: t, path: join(dir, t, "package.json") }))
    .filter((t) => existsSync(t.path));
}

/**
 * Every out-of-line @azphalt/* workspace range in a parsed manifest:
 * [{ section, name, range, current, fixed }].
 */
export function findOffenders(manifest, versions) {
  const out = [];
  for (const section of DEP_SECTIONS) {
    for (const [name, range] of Object.entries(manifest[section] ?? {})) {
      if (!name.startsWith("@azphalt/")) continue;
      const current = versions.get(name);
      if (!current || !isManagedRange(range)) continue;
      if (!onSameLine(range, current)) out.push({ section, name, range, current, fixed: caretFor(current) });
    }
  }
  return out;
}
