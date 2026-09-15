/**
 * Structural validation for `kind:"workflow"` packages.
 *
 * A workflow package is signed orchestration DATA. It can describe workflows, agents, dependencies,
 * and declarative host-rendered screens, but it cannot carry an azphalt sandbox entry point, editor
 * capabilities, arbitrary executable payload, or another mutually-exclusive package-kind block.
 */
import type {
  Manifest,
  WorkflowAgentEntry,
  WorkflowDependency,
  WorkflowPayloadEntry,
  WorkflowScreenEntry,
} from "@azphalt/azdk";

const SAFE_ID_RE = /^[^\s/\\]+$/;
const EXECUTABLE_SUFFIX_RE = /\.(?:js|mjs|cjs|jsx|ts|tsx|wasm|class|jar|dex|so|dll|dylib|exe|com|bat|cmd|sh|bash|zsh|fish|ps1|py|pyc|rb|php|pl|swift|kt|kts)$/i;
const DECLARATIVE_SCREEN_RE = /\.(?:json|ya?ml)$/i;

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function safeId(id: unknown): id is string {
  return nonEmptyString(id) && SAFE_ID_RE.test(id);
}

function safePayloadPath(path: unknown): path is string {
  if (!nonEmptyString(path) || path.startsWith("/") || path.includes("\\")) return false;
  const segments = path.split("/");
  return segments.every((segment) => segment.length > 0 && segment !== "." && segment !== "..");
}

function validatePayloadEntries(
  label: string,
  entries: unknown,
  files: Record<string, string>,
  errors: string[],
  required: boolean,
): void {
  if (!Array.isArray(entries)) {
    errors.push(`workflow.${label} must be an array`);
    return;
  }
  if (required && entries.length === 0) {
    errors.push(`workflow.${label} must contain at least one entry`);
  }

  const seen = new Set<string>();
  entries.forEach((raw, index) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      errors.push(`workflow.${label}[${index}] must be an object`);
      return;
    }
    const entry = raw as WorkflowPayloadEntry | WorkflowAgentEntry;
    if (!safeId(entry.id)) {
      errors.push(`workflow.${label}[${index}].id must be a non-empty directory-safe name`);
    } else if (seen.has(entry.id)) {
      errors.push(`workflow.${label} has duplicate id ${JSON.stringify(entry.id)}`);
    } else {
      seen.add(entry.id);
    }
    if (entry.name !== undefined && !nonEmptyString(entry.name)) {
      errors.push(`workflow.${label}[${index}].name must be non-empty when present`);
    }
    if (entry.description !== undefined && !nonEmptyString(entry.description)) {
      errors.push(`workflow.${label}[${index}].description must be non-empty when present`);
    }
    if (!safePayloadPath(entry.path)) {
      errors.push(`workflow.${label}[${index}].path must be a safe relative payload path`);
    } else if (!Object.hasOwn(files, entry.path)) {
      errors.push(`workflow.${label}[${index}].path is not listed in manifest.files: ${entry.path}`);
    } else if (EXECUTABLE_SUFFIX_RE.test(entry.path)) {
      errors.push(`workflow.${label}[${index}].path must contain declarative data, not executable code: ${entry.path}`);
    }
  });
}

function validateScreens(entries: unknown, files: Record<string, string>, errors: string[]): void {
  if (!Array.isArray(entries)) {
    errors.push("workflow.screens must be an array");
    return;
  }
  const seen = new Set<string>();
  entries.forEach((raw, index) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      errors.push(`workflow.screens[${index}] must be an object`);
      return;
    }
    const screen = raw as WorkflowScreenEntry;
    if (!safeId(screen.id)) {
      errors.push(`workflow.screens[${index}].id must be a non-empty directory-safe name`);
    } else if (seen.has(screen.id)) {
      errors.push(`workflow.screens has duplicate id ${JSON.stringify(screen.id)}`);
    } else {
      seen.add(screen.id);
    }
    if (screen.name !== undefined && !nonEmptyString(screen.name)) {
      errors.push(`workflow.screens[${index}].name must be non-empty when present`);
    }
    if (!safePayloadPath(screen.path)) {
      errors.push(`workflow.screens[${index}].path must be a safe relative payload path`);
    } else {
      if (!Object.hasOwn(files, screen.path)) {
        errors.push(`workflow.screens[${index}].path is not listed in manifest.files: ${screen.path}`);
      }
      if (!DECLARATIVE_SCREEN_RE.test(screen.path)) {
        errors.push(`workflow.screens[${index}].path must be declarative JSON/YAML, never downloaded UI code: ${screen.path}`);
      }
    }
    if (screen.placements !== undefined) {
      if (!Array.isArray(screen.placements)) {
        errors.push(`workflow.screens[${index}].placements must be an array`);
      } else {
        const placements = new Set<string>();
        screen.placements.forEach((placement, placementIndex) => {
          if (!nonEmptyString(placement)) {
            errors.push(`workflow.screens[${index}].placements[${placementIndex}] must be non-empty`);
          } else if (placements.has(placement)) {
            errors.push(`workflow.screens[${index}].placements contains duplicate ${JSON.stringify(placement)}`);
          } else {
            placements.add(placement);
          }
        });
      }
    }
  });
}

function validateDependencies(entries: unknown, packageId: string, errors: string[]): void {
  if (!Array.isArray(entries)) {
    errors.push("workflow.dependencies must be an array");
    return;
  }
  const seen = new Set<string>();
  entries.forEach((raw, index) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      errors.push(`workflow.dependencies[${index}] must be an object`);
      return;
    }
    const dependency = raw as WorkflowDependency;
    if (!nonEmptyString(dependency.id)) {
      errors.push(`workflow.dependencies[${index}].id must be non-empty`);
      return;
    }
    if (dependency.id === packageId) {
      errors.push(`workflow.dependencies[${index}] must not reference the package itself`);
    }
    if (dependency.version !== undefined && !nonEmptyString(dependency.version)) {
      errors.push(`workflow.dependencies[${index}].version must be non-empty when present`);
    }
    if (dependency.purpose !== undefined && !nonEmptyString(dependency.purpose)) {
      errors.push(`workflow.dependencies[${index}].purpose must be non-empty when present`);
    }
    if (dependency.note !== undefined && !nonEmptyString(dependency.note)) {
      errors.push(`workflow.dependencies[${index}].note must be non-empty when present`);
    }
    const key = `${dependency.id}\u0000${dependency.version ?? ""}`;
    if (seen.has(key)) {
      errors.push(`workflow.dependencies has duplicate id/version pair ${JSON.stringify(dependency.id)}@${JSON.stringify(dependency.version ?? "")}`);
    } else {
      seen.add(key);
    }
  });
}

function validateHostPermissions(value: unknown, errors: string[]): void {
  if (!Array.isArray(value)) {
    errors.push("workflow.hostPermissions must be an array");
    return;
  }
  const seen = new Set<string>();
  value.forEach((permission, index) => {
    if (!nonEmptyString(permission)) {
      errors.push(`workflow.hostPermissions[${index}] must be a non-empty string`);
    } else if (seen.has(permission)) {
      errors.push(`workflow.hostPermissions contains duplicate ${JSON.stringify(permission)}`);
    } else {
      seen.add(permission);
    }
  });
}

/** Return human-readable structural errors (`[]` when valid). */
export function validateWorkflowManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const workflow = manifest.workflow;
  if (!workflow || typeof workflow !== "object" || Array.isArray(workflow)) {
    return ['kind:"workflow" requires a "workflow" block'];
  }

  if (manifest.entry !== undefined || manifest.runtime !== undefined) {
    errors.push('kind:"workflow" must not declare entry/runtime');
  }
  if (manifest.capabilities !== undefined) {
    errors.push('kind:"workflow" must not declare capabilities; hostPermissions are opaque host requests, not azphalt grants');
  }
  if (manifest.assets !== undefined) {
    errors.push('kind:"workflow" must not declare assets');
  }
  if (manifest.contributes !== undefined) {
    errors.push('kind:"workflow" must not declare contributes');
  }

  for (const block of ["app", "mcp", "pack", "skill", "script", "composable"] as const) {
    if (manifest[block] !== undefined) {
      errors.push(`kind:"workflow" must not declare a ${block} block`);
    }
  }

  if (!nonEmptyString(workflow.format)) {
    errors.push("workflow.format must be a non-empty string");
  }

  const files = manifest.files ?? {};
  validatePayloadEntries("definitions", workflow.definitions, files, errors, true);
  if (workflow.fragments !== undefined) validatePayloadEntries("fragments", workflow.fragments, files, errors, false);
  if (workflow.agents !== undefined) validatePayloadEntries("agents", workflow.agents, files, errors, false);
  if (workflow.dependencies !== undefined) validateDependencies(workflow.dependencies, manifest.id, errors);
  if (workflow.screens !== undefined) validateScreens(workflow.screens, files, errors);
  if (workflow.hostPermissions !== undefined) validateHostPermissions(workflow.hostPermissions, errors);

  // A workflow package may carry documentation/data beyond the declared workflow entries, but never
  // executable-looking payload. The dependency mechanism exists precisely so executable packages keep
  // their own signature, entitlement, capability, update, and revocation lifecycle.
  for (const path of Object.keys(files)) {
    if (path === "LICENSE") continue;
    if (EXECUTABLE_SUFFIX_RE.test(path)) {
      errors.push(`kind:"workflow" must not bundle executable payload: ${path}`);
    }
  }

  return errors;
}
