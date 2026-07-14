/**
 * `@azphalt/azp` — read, write, verify, and sign `.azp` packages.
 * See `spec/package-format.md`. Node-side (uses `node:crypto`). `writeAzp` produces an unsigned
 * package; {@link signAzp} adds an Ed25519 `signature.json`, and {@link verifyAzp} validates it
 * when present. A signature is tamper-evidence, not identity, until the trust model is settled.
 */
import { zipSync, unzipSync, strToU8, strFromU8 } from "fflate";
import { createHash, createPublicKey, verify as cryptoVerify } from "node:crypto";
import type { Manifest } from "@azphalt/sdk";

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

  // Deterministic entry order.
  const sorted: Record<string, Uint8Array> = {};
  for (const key of Object.keys(entries).sort()) sorted[key] = entries[key];

  // Fixed timestamp so identical input yields identical bytes — reproducible signing
  // (see spec/package-format.md § Signing). Without this, fflate stamps the current time.
  // A Date (not epoch 0, which is outside ZIP's 1980–2099 range) keeps the value unambiguous.
  return { azp: zipSync(sorted, { mtime: EPOCH }), manifest };
}

export interface ReadResult {
  manifest: Manifest;
  /** Every entry except `manifest.json`, by in-package path. */
  payload: Record<string, Uint8Array>;
}

/** Open a `.azp` and parse its manifest. Does not verify integrity — call {@link verifyAzp}. */
export function readAzp(bytes: Uint8Array): ReadResult {
  const files = unzipSync(bytes);
  const manifestRaw = files["manifest.json"];
  if (!manifestRaw) throw new Error("azp: manifest.json is missing");
  const manifest = JSON.parse(strFromU8(manifestRaw)) as Manifest;

  const payload: Record<string, Uint8Array> = {};
  for (const [path, data] of Object.entries(files)) {
    if (path !== "manifest.json") payload[path] = data;
  }
  return { manifest, payload };
}

export interface VerifyResult {
  ok: boolean;
  errors: string[];
  /** True if the package carries a `signature.json` (whose validity is folded into `ok`/`errors`). */
  signed: boolean;
}

/**
 * Verify a `.azp`: reject unsafe paths, confirm every `manifest.files` digest, reject any payload
 * entry that has no digest in `manifest.files`, and — if a `signature.json` is present — confirm it
 * is a valid Ed25519 signature over the `manifest.json`. A valid signature is tamper-evidence, not
 * identity (spec/package-format.md § Signing); unsigned packages remain valid on integrity alone.
 */
export function verifyAzp(bytes: Uint8Array): VerifyResult {
  const errors: string[] = [];
  let signed = false;

  // Decompress once. (readAzp would decompress a second time — wasteful for large payloads.)
  let files: Record<string, Uint8Array>;
  try {
    files = unzipSync(bytes);
  } catch (e) {
    return { ok: false, errors: [(e as Error).message], signed: false };
  }

  const manifestRaw = files["manifest.json"];
  if (!manifestRaw) return { ok: false, errors: ["azp: manifest.json is missing"], signed: false };
  let manifest: Manifest;
  try {
    manifest = JSON.parse(strFromU8(manifestRaw)) as Manifest;
  } catch (e) {
    return { ok: false, errors: [`azp: manifest.json is not valid JSON: ${(e as Error).message}`], signed: false };
  }

  const payload: Record<string, Uint8Array> = {};
  for (const [path, data] of Object.entries(files)) {
    if (path !== "manifest.json") payload[path] = data;
  }

  for (const path of Object.keys(payload)) {
    if (path.startsWith("/") || path.split("/").includes("..")) {
      errors.push(`unsafe path: ${path}`);
    }
  }

  if (!manifest.files) {
    errors.push("manifest.files is missing");
    return { ok: false, errors, signed };
  }
  for (const [path, want] of Object.entries(manifest.files)) {
    const data = payload[path];
    if (!data) {
      errors.push(`missing payload for ${path}`);
      continue;
    }
    if (digest(data) !== want) errors.push(`digest mismatch: ${path}`);
  }

  // Completeness: every payload entry must be covered by a manifest digest. `hasOwn` avoids
  // matching inherited keys (e.g. a file literally named `__proto__`). `signature.json` is the
  // detached signature, not a signed payload file, so it is exempt.
  for (const path of Object.keys(payload)) {
    if (path !== "signature.json" && !Object.hasOwn(manifest.files, path)) {
      errors.push(`unlisted payload (no digest in manifest.files): ${path}`);
    }
  }

  // Signature (optional): validate an Ed25519 `signature.json` over the stored `manifest.json` bytes.
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

export { generateSigningKey, signAzp } from "./sign.js";
export type { SigningKey, SignOptions, AzpSignature, AzpCountersignature } from "./sign.js";
export { verifyTrust, countersign, trustStoreFromKeys } from "./trust.js";
export type { TrustStore, TrustedKey, TrustResult, CountersignOptions } from "./trust.js";
export { parseCompat, compatSatisfies } from "./compat.js";
export type { Compat, Comparator } from "./compat.js";
