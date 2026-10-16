/**
 * `@azphalt/azp` — read, write, verify, and sign `.azp` packages.
 * See `spec/package-format.md`. Node-side (uses `node:crypto`). `writeAzp` produces an unsigned
 * package; {@link signAzp} adds an Ed25519 `signature.json`, and {@link verifyAzp} validates it
 * when present. A signature is tamper-evidence, not identity, until the trust model is settled.
 */
import { zipSync, strToU8, strFromU8 } from "fflate";
import { createHash, createPublicKey, verify as cryptoVerify } from "node:crypto";
import type { Manifest } from "@azphalt/azdk";
import { safeUnzip } from "./safe-unzip.js";
import { unsafePathReason } from "./paths.js";
import { parseJsonNoDuplicateKeys } from "./parse-json.js";
import { validateAppManifest } from "./app.js";
import { validateMcpManifest } from "./mcp.js";
import { validatePackManifest } from "./pack.js";
import { validateSkillManifest } from "./skill.js";
import { validateScriptManifest } from "./script.js";
import { validateComposableManifest } from "./composable.js";
import { validateWorkflowManifest } from "./workflow.js";
import { validateRoleManifest } from "./role.js";
import { validateLlmManifest } from "./llm.js";

/**
 * Fixed archive timestamp for reproducible output. Built from LOCAL fields on purpose: fflate
 * encodes ZIP mtime via the Date's local getters (getFullYear/getMonth/…), so a UTC instant
 * would encode to different bytes per timezone. Local construction yields identical bytes in
 * every timezone. Mid-range (2000) keeps it inside ZIP's valid 1980–2099 window everywhere.
 */
export const EPOCH = new Date(2000, 0, 1);

/** SHA-256 of `bytes` as `sha256-<lowercase-hex>` — the digest form used in `manifest.files`. */
export function digest(bytes: Uint8Array): string {
  return "sha256-" + createHash("sha256").update(bytes).digest("hex");
}

export interface AzpInput {
  /** The manifest minus `files`, which is computed from the payload + LICENSE. */
  manifest: Omit<Manifest, "files">;
  /** Payload files by in-package path, e.g. `"assets/foo.cube"`. */
  payload: Record<string, Uint8Array>;
  /** SPDX-identified license text; written as the required `LICENSE` entry. */
  license: string;
}

export interface WriteResult {
  /** The `.azp` (ZIP) bytes. */
  azp: Uint8Array;
  /** The finished manifest, including computed `files` digests. */
  manifest: Manifest;
}

/** Build a `.azp` from a manifest + payload, computing integrity digests. Unsigned. */
export function writeAzp(input: AzpInput): WriteResult {
  const digested: Record<string, Uint8Array> = {
    ...input.payload,
    LICENSE: strToU8(input.license),
  };

  const files: Record<string, string> = {};
  for (const [path, bytes] of Object.entries(digested)) files[path] = digest(bytes);

  const manifest: Manifest = { ...input.manifest, files };
  const entries: Record<string, Uint8Array> = {
    ...digested,
    "manifest.json": strToU8(JSON.stringify(manifest, null, 2) + "\n"),
  };

  const sorted: Record<string, Uint8Array> = {};
  for (const key of Object.keys(entries).sort()) sorted[key] = entries[key];
  return { azp: zipSync(sorted, { mtime: EPOCH }), manifest };
}

export interface ReadResult {
  manifest: Manifest;
  /** Every entry except `manifest.json`, by in-package path. */
  payload: Record<string, Uint8Array>;
}

/** Open a `.azp` and parse its manifest. Does not verify integrity — call {@link verifyAzp}. */
export function readAzp(bytes: Uint8Array): ReadResult {
  const files = safeUnzip(bytes);
  const manifestRaw = files["manifest.json"];
  if (!manifestRaw) throw new Error("azp: manifest.json is missing");
  const manifest = parseJsonNoDuplicateKeys<Manifest>(strFromU8(manifestRaw));

  // Null-prototype so a payload entry literally named `__proto__` or `constructor` is an ordinary
  // own key (`payload["__proto__"] = bytes` on a plain object would otherwise mutate the prototype).
  const payload: Record<string, Uint8Array> = Object.create(null);
  for (const [path, data] of Object.entries(files)) {
    if (path !== "manifest.json") payload[path] = data;
  }
  return { manifest, payload };
}

/** Kinds `verifyAzp` recognizes. Anything else is rejected rather than waved through unvalidated. */
const KNOWN_KINDS = new Set<string>([
  "asset", "code", "mixed", "app", "mcp", "pack", "skill", "script", "composable", "workflow", "role", "llm",
]);

/**
 * Validate the manifest fields every kind shares, plus path-safety of the entry/asset references a
 * host materializes. Returns error strings ([] when clean); never throws.
 */
function validateManifestCore(manifest: Manifest): string[] {
  const errors: string[] = [];
  const str = (v: unknown): v is string => typeof v === "string" && v.length > 0;

  if (!str(manifest.azphalt)) errors.push("manifest.azphalt (format version) is required");
  if (!str(manifest.id)) errors.push("manifest.id is required");
  if (!str(manifest.name)) errors.push("manifest.name is required");
  if (!str(manifest.version)) errors.push("manifest.version is required");
  if (!str(manifest.license)) errors.push("manifest.license is required");
  if (!str(manifest.compat)) errors.push("manifest.compat is required");

  if (typeof manifest.kind !== "string" || !KNOWN_KINDS.has(manifest.kind)) {
    errors.push(`manifest.kind "${String(manifest.kind)}" is not a known kind`);
  }

  const files = manifest.files ?? {};
  // A bundled `entry` and every bundled asset `path` must be a safe name that is actually in the
  // archive (an `asset` package otherwise got no path checks at all).
  if (manifest.entry !== undefined) {
    if (typeof manifest.entry !== "string" || manifest.entry.length === 0) {
      errors.push("manifest.entry, when present, must be a non-empty string");
    } else {
      const reason = unsafePathReason(manifest.entry);
      if (reason) errors.push(`manifest.entry ${reason}: ${manifest.entry}`);
      else if (!Object.hasOwn(files, manifest.entry)) errors.push(`manifest.entry "${manifest.entry}" is not in manifest.files`);
    }
  }
  if (Array.isArray(manifest.assets)) {
    manifest.assets.forEach((asset, idx) => {
      const path = (asset as { path?: unknown }).path;
      const remote = (asset as { remoteUrl?: unknown }).remoteUrl;
      const members = (asset as { files?: unknown }).files;
      const hasMembers = Array.isArray(members) && members.length > 0;
      if (typeof path === "string" && path.length > 0) {
        const reason = unsafePathReason(path);
        if (reason) errors.push(`assets[${idx}].path ${reason}: ${path}`);
        else if (!Object.hasOwn(files, path)) errors.push(`assets[${idx}].path "${path}" is not in manifest.files`);
      } else if ((typeof remote !== "string" || remote.length === 0) && !hasMembers) {
        // A model asset may deliver nothing at the top level and instead list bundled/remote members.
        errors.push(`assets[${idx}] needs a bundled path, a remoteUrl, or files[] members`);
      }
      // Each bundled member path must also be safe and listed.
      if (hasMembers) {
        (members as unknown[]).forEach((m, mi) => {
          const mp = (m as { path?: unknown }).path;
          if (typeof mp === "string" && mp.length > 0) {
            const reason = unsafePathReason(mp);
            if (reason) errors.push(`assets[${idx}].files[${mi}].path ${reason}: ${mp}`);
            else if (!Object.hasOwn(files, mp)) errors.push(`assets[${idx}].files[${mi}].path "${mp}" is not in manifest.files`);
          }
        });
      }
    });
  }
  return errors;
}

export interface VerifyResult {
  ok: boolean;
  errors: string[];
  /** True if the package carries a `signature.json` (whose validity is folded into `ok`/`errors`). */
  signed: boolean;
}

/** Verify archive integrity, kind-specific structure, and optional Ed25519 signature. */
export function verifyAzp(bytes: Uint8Array): VerifyResult {
  const errors: string[] = [];
  let signed = false;

  let files: Record<string, Uint8Array>;
  try {
    files = safeUnzip(bytes);
  } catch (e) {
    return { ok: false, errors: [(e as Error).message], signed: false };
  }

  const manifestRaw = files["manifest.json"];
  if (!manifestRaw) return { ok: false, errors: ["azp: manifest.json is missing"], signed: false };
  let manifest: Manifest;
  try {
    manifest = parseJsonNoDuplicateKeys<Manifest>(strFromU8(manifestRaw));
  } catch (e) {
    return { ok: false, errors: [`azp: manifest.json is not valid JSON: ${(e as Error).message}`], signed: false };
  }
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return { ok: false, errors: ["azp: manifest.json is not an object"], signed: false };
  }

  // Null-prototype payload map — a `__proto__`/`constructor` entry name is then an ordinary key, not
  // a prototype mutation, and `Object.hasOwn` lookups below can't be fooled by inherited properties.
  const payload: Record<string, Uint8Array> = Object.create(null);
  for (const [path, data] of Object.entries(files)) {
    if (path !== "manifest.json") payload[path] = data;
  }

  // The message text `unsafe path: <path>` is pinned by the conformance fixtures other hosts vendor,
  // so keep it byte-stable; the specific reason is not part of the wire contract. A path is reported
  // once even if it also appears as a manifest.files key.
  const unsafeReported = new Set<string>();
  for (const path of Object.keys(payload)) {
    if (unsafePathReason(path)) {
      errors.push(`unsafe path: ${path}`);
      unsafeReported.add(path);
    }
  }

  errors.push(...validateManifestCore(manifest));

  if (!manifest.files || typeof manifest.files !== "object" || Array.isArray(manifest.files)) {
    errors.push("manifest.files is missing");
    return { ok: false, errors, signed };
  }
  for (const [path, want] of Object.entries(manifest.files)) {
    if (unsafePathReason(path)) {
      if (!unsafeReported.has(path)) errors.push(`unsafe path: ${path}`);
      continue;
    }
    const data = Object.hasOwn(payload, path) ? payload[path] : undefined;
    if (!data) {
      errors.push(`missing payload for ${path}`);
      continue;
    }
    if (digest(data) !== want) errors.push(`digest mismatch: ${path}`);
  }
  for (const path of Object.keys(payload)) {
    if (path !== "signature.json" && !Object.hasOwn(manifest.files, path)) {
      errors.push(`unlisted payload (no digest in manifest.files): ${path}`);
    }
  }

  // Kind-specific validators are third-party-input-driven; a malformed block must become an error
  // string, never a thrown exception that turns "ok:false" into an uncaught crash in the caller.
  const kindValidators: Partial<Record<string, (m: Manifest) => string[]>> = {
    mcp: validateMcpManifest,
    pack: validatePackManifest,
    app: validateAppManifest,
    skill: validateSkillManifest,
    script: validateScriptManifest,
    composable: validateComposableManifest,
    workflow: validateWorkflowManifest,
    role: validateRoleManifest,
    llm: validateLlmManifest,
  };
  const validate = kindValidators[manifest.kind];
  if (validate) {
    try {
      errors.push(...validate(manifest));
    } catch (e) {
      errors.push(`azp: ${manifest.kind} validation failed: ${(e as Error).message}`);
    }
  }

  const sigRaw = payload["signature.json"];
  if (sigRaw) {
    signed = true;
    try {
      const sig = JSON.parse(strFromU8(sigRaw)) as Record<string, unknown> | null;
      if (
        !sig ||
        typeof sig !== "object" ||
        Array.isArray(sig) ||
        sig.alg !== "ed25519" ||
        typeof sig.publicKey !== "string" ||
        typeof sig.signature !== "string"
      ) {
        errors.push("signature.json is malformed");
      } else {
        const pub = createPublicKey({ key: Buffer.from(sig.publicKey, "base64"), format: "der", type: "spki" });
        if (pub.asymmetricKeyType !== "ed25519") {
          errors.push("signature public key must be ed25519");
        } else {
          const valid = cryptoVerify(null, Buffer.from(manifestRaw), pub, Buffer.from(sig.signature, "base64"));
          if (!valid) errors.push("signature verification failed");
        }
      }
    } catch (e) {
      errors.push(`signature error: ${(e as Error).message}`);
    }
  }

  return { ok: errors.length === 0, errors, signed };
}

export { unsafePathReason, isUnsafePath } from "./paths.js";
export { safeUnzip, MAX_ENTRIES, MAX_ENTRY_BYTES, MAX_TOTAL_BYTES } from "./safe-unzip.js";
export { parseJsonNoDuplicateKeys } from "./parse-json.js";
export { generateSigningKey, signAzp } from "./sign.js";
export type { SigningKey, SignOptions, AzpSignature, AzpCountersignature } from "./sign.js";
export { verifyTrust, countersign, trustStoreFromKeys } from "./trust.js";
export type { TrustStore, TrustedKey, TrustResult, CountersignOptions } from "./trust.js";
export { parseCompat, compatSatisfies } from "./compat.js";
export type { Compat, Comparator } from "./compat.js";
export { validateAppManifest } from "./app.js";
export { validateMcpManifest } from "./mcp.js";
export { validatePackManifest } from "./pack.js";
export { validateSkillManifest } from "./skill.js";
export { validateScriptManifest } from "./script.js";
export { validateComposableManifest } from "./composable.js";
export { validateWorkflowManifest } from "./workflow.js";
export { validateRoleManifest } from "./role.js";
export { validateLlmManifest } from "./llm.js";
