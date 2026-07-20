/**
 * Structural validation for a `kind: "pack"` manifest — an **extension pack** *header* that references
 * other packages (see `spec/pack.md`). Returns human-readable errors ([] when valid). {@link verifyAzp}
 * calls this **only** for `kind:"pack"` packages, folding the errors into its report.
 *
 * Rules: a `pack` block with ≥1 entry; every entry has a non-empty string `id` (and, if present, a
 * non-empty string `version`); no duplicate entries (same id + version); a pack must not list **itself**.
 * A pack is a header of *references* — it declares no `/code` (`entry`/`runtime`/`capabilities`),
 * `assets`, `app`, or `mcp` block, and carries no payload beyond its manifest/license/preview.
 */
import type { Manifest } from "@azphalt/azdk";

export function validatePackManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const pack = manifest.pack;
  if (!pack) {
    errors.push('pack: kind "pack" requires a "pack" block');
    return errors;
  }

  // Header-only — a pack references other packages; it has no runtime surface or bundled assets.
  if (manifest.entry || manifest.runtime) errors.push("pack: a pack must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("pack: a pack must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("pack: a pack must not declare assets");
  if (manifest.app) errors.push("pack: a pack must not declare an app block");
  if (manifest.mcp) errors.push("pack: a pack must not declare an mcp block");

  if (!Array.isArray(pack.entries) || pack.entries.length === 0) {
    errors.push("pack: at least one entry is required");
    return errors;
  }

  const seen = new Set<string>();
  for (let i = 0; i < pack.entries.length; i++) {
    const e = pack.entries[i];
    const where = `pack.entries[${i}]`;
    if (!e || typeof e.id !== "string" || e.id.length === 0) {
      errors.push(`pack: ${where} needs a non-empty string id`);
      continue;
    }
    if (e.version !== undefined && (typeof e.version !== "string" || e.version.length === 0)) {
      errors.push(`pack: ${where} version, when present, must be a non-empty string`);
    }
    if (e.id === manifest.id) errors.push(`pack: ${where} must not reference the pack itself ("${e.id}")`);
    // Dedupe on id + (pinned version | "*"); the same member can't appear twice.
    const key = `${e.id}@${e.version ?? "*"}`;
    if (seen.has(key)) errors.push(`pack: duplicate entry "${key}"`);
    seen.add(key);
  }

  return errors;
}
