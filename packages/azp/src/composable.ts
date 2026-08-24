/**
 * Structural validation for a `kind: "composable"` manifest — a header describing UI element(s) a
 * host's own compiled renderer interprets (see `spec/composable.md`). Returns human-readable errors
 * ([] when valid). {@link verifyAzp} calls this **only** for `kind:"composable"` packages, folding
 * the errors into its report; other kinds are unaffected.
 *
 * Rules: a `composable` block with a `library` ({group, artifact} required, `version` optional) and
 * `elements` (≥1); every element has a directory-safe, non-empty `id`, unique within the package,
 * plus non-empty `templateId`/`hue`/`surface`/`scale`/`act` strings and a non-empty `jobs` array of
 * non-empty strings. A `composable` package is header-only — no `entry`/`runtime`, `capabilities`,
 * `assets`, `app`, `mcp`, `pack`, `skill`, or `script` block. This never validates what any value
 * *means* (a `templateId` existing in the named library, a `jobs` claim being accurate) — that is
 * entirely host/reviewer-side, out of scope for a container-format verifier.
 */
import type { Manifest } from "@azphalt/azdk";

/** A directory-safe element id: no path separators, no `.`/`..`, no leading/trailing whitespace. */
const SAFE_ID_RE = /^[^\s/\\]+$/;

function nonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function validateComposableManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const composable = manifest.composable;
  if (!composable) {
    errors.push('composable: kind "composable" requires a "composable" block');
    return errors;
  }

  // Header-only — a composable package carries no code-sandbox surface and no other kind's block.
  if (manifest.entry || manifest.runtime) errors.push("composable: a composable package must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("composable: a composable package must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("composable: a composable package must not declare assets");
  if (manifest.app) errors.push("composable: a composable package must not declare an app block");
  if (manifest.mcp) errors.push("composable: a composable package must not declare an mcp block");
  if (manifest.pack) errors.push("composable: a composable package must not declare a pack block");
  if (manifest.skill) errors.push("composable: a composable package must not declare a skill block");
  if (manifest.script) errors.push("composable: a composable package must not declare a script block");

  const library = composable.library;
  if (!library || typeof library !== "object" || Array.isArray(library)) {
    errors.push("composable: library is required");
  } else {
    if (!nonEmptyString(library.group)) errors.push("composable: library.group is required and must be a non-empty string");
    if (!nonEmptyString(library.artifact)) errors.push("composable: library.artifact is required and must be a non-empty string");
    if (library.version !== undefined && !nonEmptyString(library.version)) {
      errors.push("composable: library.version, when present, must be a non-empty string");
    }
  }

  if (!Array.isArray(composable.elements) || composable.elements.length === 0) {
    errors.push("composable: at least one element is required");
    return errors;
  }

  const seen = new Set<string>();
  for (const entry of composable.elements) {
    if (!entry || typeof entry !== "object" || !nonEmptyString(entry.id)) {
      errors.push("composable: every element needs a non-empty id");
      continue;
    }
    const id = entry.id;
    if (id === "." || id === ".." || !SAFE_ID_RE.test(id)) {
      errors.push(`composable: id "${id}" is not a directory-safe name`);
      continue;
    }
    if (seen.has(id)) {
      errors.push(`composable: duplicate id "${id}"`);
      continue;
    }
    seen.add(id);

    for (const field of ["templateId", "hue", "surface", "scale", "act"] as const) {
      if (!nonEmptyString(entry[field])) {
        errors.push(`composable: element "${id}" is missing a non-empty ${field}`);
      }
    }

    if (!Array.isArray(entry.jobs) || entry.jobs.length === 0) {
      errors.push(`composable: element "${id}" needs at least one job`);
    } else if (entry.jobs.some((j: unknown) => !nonEmptyString(j))) {
      errors.push(`composable: element "${id}" jobs must be non-empty strings`);
    }
  }

  return errors;
}
