/**
 * The azphalt operations exposed over MCP, as pure functions (no transport). A host controller —
 * e.g. Guillotine's MCP client on :6274 — calls these to verify, inspect, and pull assets out of a
 * `.azp` before applying them with its own engine. Kept separate from the server wiring so they are
 * unit-testable without a transport.
 */
import { readAzp, verifyAzp } from "@azphalt/azp";

export interface VerifyReport {
  ok: boolean;
  errors: string[];
  /** Whether a valid `signature.json` was present and verified. Absence is not a failure. */
  signed: boolean;
}

/** Verify a `.azp`'s integrity (and signature, if present). */
export function verifyPackage(bytes: Uint8Array): VerifyReport {
  const v = verifyAzp(bytes);
  return { ok: v.ok, errors: v.errors, signed: v.signed };
}

export interface AssetSummary {
  type: string;
  path: string;
  ui?: string;
  format?: unknown;
}

export interface InspectReport {
  id: string;
  name: string;
  version: string;
  kind: string;
  license: string;
  author?: string;
  description?: string;
  assets: AssetSummary[];
  payload: string[];
  verify: VerifyReport;
}

/** Inspect a `.azp`: manifest identity, its contributed assets, payload file list, and verification. */
export function inspectPackage(bytes: Uint8Array): InspectReport {
  const { manifest, payload } = readAzp(bytes);
  return {
    id: manifest.id,
    name: manifest.name,
    version: manifest.version,
    kind: manifest.kind,
    license: manifest.license,
    author: manifest.author,
    description: manifest.description,
    assets: (manifest.assets ?? []).map((a) => ({
      type: a.type,
      path: a.path,
      ui: a.ui,
      format: (a.params as Record<string, unknown> | undefined)?.format,
    })),
    payload: Object.keys(payload).sort(),
    verify: verifyPackage(bytes),
  };
}

export interface ExtractResult {
  path: string;
  /** The asset's bytes, base64-encoded. */
  bytesBase64: string;
}

/** Extract one payload entry (e.g. `assets/grade.cube`) from a `.azp` as base64. */
export function extractAsset(bytes: Uint8Array, assetPath: string): ExtractResult {
  const { payload } = readAzp(bytes);
  const data = payload[assetPath];
  if (!data) throw new Error(`asset not found: ${assetPath}`);
  return { path: assetPath, bytesBase64: Buffer.from(data).toString("base64") };
}
