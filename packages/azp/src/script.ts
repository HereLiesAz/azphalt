/**
 * Structural validation for a `kind: "script"` manifest — a native script package (see
 * `spec/script.md`). Returns human-readable errors ([] when valid). {@link verifyAzp} calls this
 * **only** for `kind:"script"` packages, folding the errors into its report; other kinds are
 * unaffected.
 *
 * Rules: a `script` block with a non-empty `interpreter` and `entry`; `entry` names a path present
 * in `manifest.files` (integrity-covered — a declared script must be a real bundled payload, not
 * just a claim); `dependencies`, when present, maps each namespace to a non-empty array of
 * non-empty package-name strings. A `script` package is a header — no `entry`/`runtime` (the
 * *code-sandbox* fields, distinct from `script.entry`), `capabilities`, `assets`, `app`, `mcp`,
 * `pack`, or `skill` block.
 */
import type { Manifest } from "@azphalt/azdk";

export function validateScriptManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const script = manifest.script;
  if (!script) {
    errors.push('script: kind "script" requires a "script" block');
    return errors;
  }

  // Header-only — a script package runs outside the azphalt sandbox; it declares no sandbox surface here.
  if (manifest.entry || manifest.runtime) errors.push("script: a script package must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("script: a script package must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("script: a script package must not declare assets");
  if (manifest.app) errors.push("script: a script package must not declare an app block");
  if (manifest.mcp) errors.push("script: a script package must not declare an mcp block");
  if (manifest.pack) errors.push("script: a script package must not declare a pack block");
  if (manifest.skill) errors.push("script: a script package must not declare a skill block");

  if (typeof script.interpreter !== "string" || script.interpreter.trim().length === 0) {
    errors.push("script: interpreter is required and must be a non-empty string");
  }

  const files = manifest.files ?? {};
  if (typeof script.entry !== "string" || script.entry.length === 0) {
    errors.push("script: entry is required");
  } else if (!Object.hasOwn(files, script.entry)) {
    errors.push(`script: entry "${script.entry}" is not in manifest.files`);
  }

  if (script.command !== undefined && (typeof script.command !== "string" || script.command.trim().length === 0)) {
    errors.push("script: command, when present, must be a non-empty string");
  }

  if (script.args !== undefined) {
    if (!Array.isArray(script.args) || script.args.some((a) => typeof a !== "string")) {
      errors.push("script: args, when present, must be an array of strings");
    }
  }

  if (script.dependencies !== undefined) {
    if (typeof script.dependencies !== "object" || script.dependencies === null || Array.isArray(script.dependencies)) {
      errors.push("script: dependencies, when present, must be an object");
    } else {
      for (const [namespace, pkgs] of Object.entries(script.dependencies)) {
        if (!Array.isArray(pkgs) || pkgs.length === 0) {
          errors.push(`script: dependencies.${namespace} must be a non-empty array`);
          continue;
        }
        if (pkgs.some((p) => typeof p !== "string" || p.trim().length === 0)) {
          errors.push(`script: dependencies.${namespace} must contain only non-empty strings`);
        }
      }
    }
  }

  return errors;
}
