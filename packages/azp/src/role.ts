/** Structural validation for `kind:"role"` packages. */
import type { Manifest, RolePayloadEntry } from "@azphalt/azdk";

const SAFE_ID_RE = /^[^\s/\\]+$/;
const EXECUTABLE_SUFFIX_RE = /\.(?:js|mjs|cjs|jsx|ts|tsx|wasm|class|jar|dex|so|dll|dylib|exe|com|bat|cmd|sh|bash|zsh|fish|ps1|py|pyc|rb|php|pl|swift|kt|kts)$/i;

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function safeId(id: unknown): id is string {
  return nonEmptyString(id) && SAFE_ID_RE.test(id);
}

function safePayloadPath(path: unknown): path is string {
  if (!nonEmptyString(path) || path.startsWith("/") || path.includes("\\")) return false;
  return path.split("/").every((segment) => segment.length > 0 && segment !== "." && segment !== "..");
}

export function validateRoleManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const role = manifest.role;
  if (!role || typeof role !== "object" || Array.isArray(role)) {
    return ['kind:"role" requires a "role" block'];
  }

  if (manifest.entry !== undefined || manifest.runtime !== undefined) {
    errors.push('kind:"role" must not declare entry/runtime');
  }
  if (manifest.capabilities !== undefined) errors.push('kind:"role" must not declare capabilities');
  if (manifest.assets !== undefined) errors.push('kind:"role" must not declare assets');
  if (manifest.contributes !== undefined) errors.push('kind:"role" must not declare contributes');

  for (const block of ["app", "mcp", "pack", "skill", "script", "composable", "workflow"] as const) {
    if (manifest[block] !== undefined) errors.push(`kind:"role" must not declare a ${block} block`);
  }

  if (!nonEmptyString(role.format)) errors.push("role.format must be a non-empty string");
  if (!Array.isArray(role.roles)) {
    errors.push("role.roles must be an array");
  } else if (role.roles.length === 0) {
    errors.push("role.roles must contain at least one entry");
  } else {
    const seen = new Set<string>();
    const files = manifest.files ?? {};
    role.roles.forEach((raw, index) => {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        errors.push(`role.roles[${index}] must be an object`);
        return;
      }
      const entry = raw as RolePayloadEntry;
      if (!safeId(entry.id)) {
        errors.push(`role.roles[${index}].id must be a non-empty directory-safe name`);
      } else if (seen.has(entry.id)) {
        errors.push(`role.roles has duplicate id ${JSON.stringify(entry.id)}`);
      } else {
        seen.add(entry.id);
      }
      if (entry.name !== undefined && !nonEmptyString(entry.name)) {
        errors.push(`role.roles[${index}].name must be non-empty when present`);
      }
      if (entry.description !== undefined && !nonEmptyString(entry.description)) {
        errors.push(`role.roles[${index}].description must be non-empty when present`);
      }
      if (!safePayloadPath(entry.path)) {
        errors.push(`role.roles[${index}].path must be a safe relative payload path`);
      } else if (!Object.hasOwn(files, entry.path)) {
        errors.push(`role.roles[${index}].path is not listed in manifest.files: ${entry.path}`);
      } else if (EXECUTABLE_SUFFIX_RE.test(entry.path)) {
        errors.push(`role.roles[${index}].path must contain declarative data, not executable code: ${entry.path}`);
      }
    });
  }

  for (const path of Object.keys(manifest.files ?? {})) {
    if (path === "LICENSE") continue;
    if (EXECUTABLE_SUFFIX_RE.test(path)) {
      errors.push(`kind:"role" must not bundle executable payload: ${path}`);
    }
  }

  return errors;
}
