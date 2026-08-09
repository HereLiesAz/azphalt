/**
 * Structural validation for a `kind: "skill"` manifest — an agent-skill *bundle* (see `spec/skill.md`).
 * Returns human-readable errors ([] when valid). {@link verifyAzp} calls this **only** for `kind:"skill"`
 * packages, folding the errors into its report; other kinds are unaffected.
 *
 * Rules: a `skill` block with ≥1 entry; every entry has a directory-safe, non-empty `id`, unique within
 * the package, whose `skills/<id>/SKILL.md` names a path present in `manifest.files` (integrity-covered
 * — a declared skill must be a real bundled payload, not just a claim). A `skill` package is a header —
 * no `entry`/`runtime`, `capabilities`, `assets`, `app`, `mcp`, or `pack` block. The `SKILL.md` contents
 * themselves are validated against the external Agent Skills format by the host, not here.
 */
import type { Manifest } from "@azphalt/azdk";

/** A directory-safe skill id: no path separators, no `.`/`..`, no leading/trailing whitespace. */
const SAFE_ID_RE = /^[^\s/\\]+$/;

export function validateSkillManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const skill = manifest.skill;
  if (!skill) {
    errors.push('skill: kind "skill" requires a "skill" block');
    return errors;
  }

  // Header-only — a skill package bundles instructional text a host's agent reads, not sandboxed code.
  if (manifest.entry || manifest.runtime) errors.push("skill: a skill package must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("skill: a skill package must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("skill: a skill package must not declare assets");
  if (manifest.app) errors.push("skill: a skill package must not declare an app block");
  if (manifest.mcp) errors.push("skill: a skill package must not declare an mcp block");
  if (manifest.pack) errors.push("skill: a skill package must not declare a pack block");

  if (!Array.isArray(skill.skills) || skill.skills.length === 0) {
    errors.push("skill: at least one skill is required");
    return errors;
  }

  const files = manifest.files ?? {};
  const seen = new Set<string>();

  for (const entry of skill.skills) {
    if (!entry || typeof entry.id !== "string" || entry.id.length === 0) {
      errors.push("skill: every skill needs a non-empty id");
      continue;
    }
    const id = entry.id;
    if (id === "." || id === ".." || !SAFE_ID_RE.test(id)) {
      errors.push(`skill: id "${id}" is not a directory-safe name`);
      continue;
    }
    if (seen.has(id)) {
      errors.push(`skill: duplicate id "${id}"`);
      continue;
    }
    seen.add(id);

    const skillMdPath = `skills/${id}/SKILL.md`;
    if (!Object.hasOwn(files, skillMdPath)) {
      errors.push(`skill: "${skillMdPath}" is not in manifest.files`);
    }
  }

  return errors;
}
