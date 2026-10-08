/**
 * Structural validation for a `kind: "llm"` manifest — an off-device language model (see
 * `spec/llm.md` § Verification). Returns human-readable errors ([] when valid). {@link verifyAzp}
 * calls this only for `kind:"llm"` packages.
 *
 * Rules: an `llm` block and no `entry`/`runtime`, `capabilities`, `assets`, or other kind's block; a
 * known tier, with `weights` present exactly for `sandbox-weights` and every member remote and pinned;
 * a `github-actions` setup whose script is a listed payload path and whose fetches are pinned;
 * protocols allowed for the tier, an `https://` `baseUrl` for `openai-chat`, a bearer `authInput` that
 * is a declared input; run permissions within `contents: write`, `checks: write`, `actions: read`;
 * `dataHandling` for the `endpoint` tier; and every `${input:…}` / `secrets[].input` resolving, with
 * no literal secret anywhere in the block.
 */
import type { Manifest } from "@azphalt/azdk";

const TIERS = new Set(["endpoint", "sandbox-weights"]);
const SANDBOXES = new Set(["github-actions"]);
const PROTOCOLS = new Set(["openai-chat", "github-actions-runner", "moyai-session"]);
const AUTH = new Set(["none", "optional-bearer", "required-bearer"]);
const PROMPTS = new Set(["not-retained", "logged", "may-train", "unknown"]);
/** Highest level each runner permission may take; anything unlisted is forbidden. */
const RUN_PERMISSION_CEILING: Record<string, readonly string[]> = {
  contents: ["read", "write"],
  checks: ["read", "write"],
  actions: ["read"],
};
const CHECKSUM_RE = /^sha256-[0-9a-f]{64}$/;
const SECRET_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
// Keys whose string value must be an `${input:…}` reference, never a literal (mcp.ts's rule).
const CREDENTIAL_KEY_RE = /(key|token|secret|password|passwd|api[-_]?key|authorization|credential|bearer)/i;
// Schema keys that name a credential rather than hold one.
const CREDENTIAL_NAME_KEYS = new Set(["authInput", "input"]);
// Bounded quantifier; see mcp.ts (CodeQL js/polynomial-redos).
const INPUT_REF_RE = /\$\{input:([^}]{1,128})\}/g;
const FULL_INPUT_REF_RE = /^\$\{input:([^}]{1,128})\}$/;
const FORBIDDEN_BLOCKS = ["app", "mcp", "pack", "skill", "script", "composable", "workflow", "role"] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function httpsUrl(value: unknown): boolean {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.username === "" && url.password === "";
  } catch {
    return false;
  }
}

function endpointUrl(value: unknown, declared: Set<string>): boolean {
  if (httpsUrl(value)) return true;
  if (typeof value !== "string") return false;
  const ref = FULL_INPUT_REF_RE.exec(value);
  return !!ref && declared.has(ref[1]);
}

export function validateLlmManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const llm = manifest.llm as unknown;
  if (!isObject(llm)) return ['llm: kind "llm" requires an "llm" block'];

  if (manifest.entry !== undefined || manifest.runtime !== undefined) {
    errors.push("llm: an llm package must not declare entry/runtime");
  }
  if (manifest.capabilities !== undefined) errors.push("llm: an llm package must not declare capabilities");
  if (manifest.assets !== undefined) errors.push("llm: an llm package must not declare assets");
  for (const block of FORBIDDEN_BLOCKS) {
    if (manifest[block] !== undefined) errors.push(`llm: an llm package must not declare a ${block} block`);
  }

  const files = manifest.files ?? {};
  const tier = llm.tier;
  if (typeof tier !== "string" || !TIERS.has(tier)) errors.push("llm: tier must be endpoint or sandbox-weights");

  // Inputs.
  const declared = new Set<string>();
  if (llm.inputs !== undefined) {
    if (!Array.isArray(llm.inputs)) {
      errors.push("llm: inputs must be an array");
    } else {
      llm.inputs.forEach((input, i) => {
        if (!isObject(input) || !nonEmptyString(input.id)) {
          errors.push(`llm: inputs[${i}] needs an id`);
        } else if (declared.has(input.id)) {
          errors.push(`llm: duplicate input "${input.id}"`);
        } else {
          declared.add(input.id);
        }
      });
    }
  }

  // Setup.
  const setup = llm.setup;
  if (!isObject(setup)) {
    errors.push("llm: setup is required");
  } else {
    if (typeof setup.sandbox !== "string" || !SANDBOXES.has(setup.sandbox)) {
      errors.push("llm: setup.sandbox must be github-actions");
    }
    if (!nonEmptyString(setup.script)) {
      errors.push("llm: setup.script is required");
    } else if (!Object.hasOwn(files, setup.script)) {
      errors.push(`llm: setup.script "${setup.script}" is not in manifest.files`);
    }
    if (setup.requires !== undefined) {
      const token = isObject(setup.requires) ? setup.requires.githubToken : undefined;
      if (!isObject(setup.requires) || (token !== undefined && (!Array.isArray(token) || !token.every(nonEmptyString)))) {
        errors.push("llm: setup.requires.githubToken must be an array of permission strings");
      }
    }
    if (setup.secrets !== undefined) {
      if (!Array.isArray(setup.secrets)) {
        errors.push("llm: setup.secrets must be an array");
      } else {
        setup.secrets.forEach((secret, i) => {
          if (!isObject(secret) || typeof secret.name !== "string" || !SECRET_NAME_RE.test(secret.name)) {
            errors.push(`llm: setup.secrets[${i}].name must be an Actions secret name`);
          }
          if (!isObject(secret) || !nonEmptyString(secret.input)) {
            errors.push(`llm: setup.secrets[${i}].input is required`);
          } else if (!declared.has(secret.input)) {
            errors.push(`llm: setup.secrets[${i}] references undeclared input "${secret.input}"`);
          }
        });
      }
    }
    if (setup.fetches !== undefined) {
      if (!Array.isArray(setup.fetches)) {
        errors.push("llm: setup.fetches must be an array");
      } else {
        setup.fetches.forEach((fetch, i) => {
          if (!isObject(fetch) || !httpsUrl(fetch.url)) errors.push(`llm: setup.fetches[${i}].url must be https://`);
          if (!isObject(fetch) || typeof fetch.checksum !== "string" || !CHECKSUM_RE.test(fetch.checksum)) {
            errors.push(`llm: setup.fetches[${i}].checksum must be sha256-<hex>`);
          }
        });
      }
    }
  }

  // Weights: exactly for sandbox-weights.
  const weights = llm.weights;
  if (tier === "sandbox-weights" && weights === undefined) errors.push("llm: sandbox-weights requires weights");
  if (tier === "endpoint" && weights !== undefined) errors.push("llm: endpoint must not declare weights");
  if (weights !== undefined) {
    if (!isObject(weights)) {
      errors.push("llm: weights must be an object");
    } else {
      if (!nonEmptyString(weights.runtime)) errors.push("llm: weights.runtime is required");
      if (!Array.isArray(weights.files) || weights.files.length === 0) {
        errors.push("llm: weights.files must list at least one member");
      } else {
        weights.files.forEach((member, i) => {
          const where = `llm: weights.files[${i}]`;
          if (!isObject(member)) return void errors.push(`${where} must be an object`);
          if (!nonEmptyString(member.name)) errors.push(`${where} needs a name`);
          if (member.path !== undefined) errors.push(`${where} must be remote (no path)`);
          if (!httpsUrl(member.remoteUrl)) errors.push(`${where}.remoteUrl must be https://`);
          if (typeof member.checksum !== "string" || !CHECKSUM_RE.test(member.checksum)) {
            errors.push(`${where}.checksum must be sha256-<hex>`);
          }
          if (typeof member.byteSize !== "number" || !Number.isInteger(member.byteSize) || member.byteSize <= 0) {
            errors.push(`${where}.byteSize must be a positive integer`);
          }
        });
      }
    }
  }

  // Endpoint.
  const endpoint = llm.endpoint;
  if (!isObject(endpoint)) {
    errors.push("llm: endpoint is required");
  } else {
    const protocols = endpoint.protocols;
    if (!Array.isArray(protocols) || protocols.length === 0) {
      errors.push("llm: endpoint.protocols must be non-empty");
    } else {
      for (const p of protocols) {
        if (typeof p !== "string" || !PROTOCOLS.has(p)) errors.push(`llm: unknown endpoint protocol ${JSON.stringify(p)}`);
        else if (tier === "sandbox-weights" && p !== "github-actions-runner") {
          errors.push(`llm: sandbox-weights permits only github-actions-runner, not ${p}`);
        }
      }
      if ((protocols.includes("openai-chat") || protocols.includes("moyai-session")) &&
          !endpointUrl(endpoint.baseUrl, declared)) {
        errors.push("llm: direct endpoint protocols require an https:// endpoint.baseUrl or a declared ${input:…} URL");
      }
    }
    if (endpoint.baseUrl !== undefined && !endpointUrl(endpoint.baseUrl, declared)) {
      errors.push("llm: endpoint.baseUrl must be https:// with no credentials or a declared ${input:…} URL");
    }
    if (typeof endpoint.auth !== "string" || !AUTH.has(endpoint.auth)) {
      errors.push("llm: endpoint.auth must be none, optional-bearer, or required-bearer");
    } else if (endpoint.auth !== "none") {
      if (!nonEmptyString(endpoint.authInput)) errors.push(`llm: ${endpoint.auth} auth needs an authInput`);
      else if (!declared.has(endpoint.authInput)) {
        errors.push(`llm: endpoint.authInput "${endpoint.authInput}" is not a declared input`);
      }
    }
  }

  // Run permissions.
  if (llm.run !== undefined) {
    const permissions = isObject(llm.run) ? llm.run.permissions : undefined;
    if (!isObject(permissions)) {
      errors.push("llm: run.permissions must be an object");
    } else {
      for (const [scope, level] of Object.entries(permissions)) {
        const allowed = RUN_PERMISSION_CEILING[scope];
        if (!allowed) errors.push(`llm: run.permissions must not grant ${scope}`);
        else if (typeof level !== "string" || !allowed.includes(level)) {
          errors.push(`llm: run.permissions.${scope} may be at most ${allowed[allowed.length - 1]}`);
        }
      }
    }
  }

  // Data handling.
  if (llm.dataHandling === undefined) {
    if (tier === "endpoint") errors.push("llm: endpoint requires dataHandling");
  } else if (!isObject(llm.dataHandling)) {
    errors.push("llm: dataHandling must be an object");
  } else {
    const dh = llm.dataHandling;
    if (typeof dh.prompts !== "string" || !PROMPTS.has(dh.prompts)) {
      errors.push("llm: dataHandling.prompts must be not-retained, logged, may-train, or unknown");
    }
    if (dh.modelPinned !== undefined && typeof dh.modelPinned !== "boolean") {
      errors.push("llm: dataHandling.modelPinned must be a boolean");
    }
    if (dh.terms !== undefined && !httpsUrl(dh.terms)) errors.push("llm: dataHandling.terms must be an https:// URL");
  }

  // Every input reference resolves; no credential-keyed literal anywhere in the block.
  const walk = (value: unknown, path: string, key: string) => {
    if (typeof value === "string") {
      const refs = [...value.matchAll(INPUT_REF_RE)].map((m) => m[1]);
      for (const id of refs) if (!declared.has(id)) errors.push(`llm: ${path} references undeclared input "${id}"`);
      if (CREDENTIAL_KEY_RE.test(key) && !CREDENTIAL_NAME_KEYS.has(key) && refs.length === 0) {
        errors.push(`llm: literal secret in ${path} — use \${input:…}`);
      }
    } else if (Array.isArray(value)) {
      // Array items are named by their container, so `githubToken: ["contents:write"]` is not a secret.
      value.forEach((item, i) => walk(item, `${path}[${i}]`, ""));
    } else if (isObject(value)) {
      for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, k);
    }
  };
  walk(llm, "llm", "");

  return errors;
}
