/**
 * `@azphalt/azp` — read, write, and verify `.azp` packages.
 * See `spec/package-format.md`. Node-side (uses `node:crypto`); packages are written
 * unsigned for now, pending the trust-model decision in the package-format spec.
 */
import { zipSync, unzipSync, strToU8, strFromU8 } from "fflate";
import { createHash } from "node:crypto";
import type { Manifest } from "@azphalt/sdk";

/**
 * Fixed archive timestamp for reproducible output. Built from LOCAL fields on purpose: fflate
 * encodes ZIP mtime via the Date's local getters (getFullYear/getMonth/…), so a UTC instant
 * would encode to different bytes per timezone. Local construction yields identical bytes in
 * every timezone. Mid-range (2000) keeps it inside ZIP's valid 1980–2099 window everywhere.
 */
const EPOCH = new Date(2000, 0, 1);

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
}

/**
 * Verify a `.azp`: reject unsafe paths, confirm every `manifest.files` digest, and reject any
 * payload entry that has no digest in `manifest.files`. The spec requires the manifest to digest
 * every payload file; an unlisted (hence unverifiable, unsigned) file must not pass.
 */
export function verifyAzp(bytes: Uint8Array): VerifyResult {
  const errors: string[] = [];

  let read: ReadResult;
  try {
    read = readAzp(bytes);
  } catch (e) {
    return { ok: false, errors: [(e as Error).message] };
  }
  const { manifest, payload } = read;

  for (const path of Object.keys(payload)) {
    if (path.startsWith("/") || path.split("/").includes("..")) {
      errors.push(`unsafe path: ${path}`);
    }
  }

  if (!manifest.files) {
    errors.push("manifest.files is missing");
    return { ok: false, errors };
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
  // matching inherited keys (e.g. a file literally named `__proto__`).
  for (const path of Object.keys(payload)) {
    if (!Object.hasOwn(manifest.files, path)) {
      errors.push(`unlisted payload (no digest in manifest.files): ${path}`);
    }
  }

  return { ok: errors.length === 0, errors };
}
