import { writeAzp } from "@azphalt/azp";
import type { Manifest, AssetContribution } from "@azphalt/azdk";

/** Strip any directory component from a caller-supplied filename and reject traversal/empty names. */
function safeFilename(filename: string): string {
  const base = filename.replace(/^.*[\\/]/, "");
  if (base === "" || base === "." || base === ".." || base.includes("\0")) {
    throw new Error("unsafe filename: " + JSON.stringify(filename));
  }
  return base;
}

/** Only https remote model URLs — never http/file/javascript. */
function requireHttps(url: string): string {
  let u: URL;
  try { u = new URL(url); } catch { throw new Error("invalid remoteUrl: " + JSON.stringify(url)); }
  if (u.protocol !== "https:") throw new Error("remoteUrl must be https://");
  return url;
}

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  filename: string;
  role?: string;
  remoteUrl?: string;
  checksum?: string;
  byteSize?: number;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text written as the package's LICENSE entry. */
  licenseText?: string;
}

/**
 * Validate the FlatBuffer file identifier for a TFLite/LiteRT model: bytes 4..8
 * must spell ASCII "TFL3".
 */
function validateTflite(bytes: Uint8Array): void {
  if (
    bytes.length < 8 ||
    bytes[4] !== 0x54 ||
    bytes[5] !== 0x46 ||
    bytes[6] !== 0x4c ||
    bytes[7] !== 0x33
  ) {
    throw new Error("not a TFLite/LiteRT flatbuffer (missing TFL3 identifier)");
  }
}

export function importTflite(bytes: Uint8Array | null, opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};

  let assetPath = "";
  if (bytes && !opts.remoteUrl) {
    validateTflite(bytes);
    assetPath = `assets/${safeFilename(opts.filename)}`;
    payload[assetPath] = bytes;
  }

  const asset: AssetContribution = {
    type: "tflite",
    path: assetPath,
    params: { format: "tflite" }
  };

  if (opts.role) asset.role = opts.role;
  if (opts.remoteUrl) asset.remoteUrl = requireHttps(opts.remoteUrl);
  if (opts.checksum) asset.checksum = opts.checksum;
  if (opts.byteSize != null && Number.isFinite(opts.byteSize) && opts.byteSize > 0) asset.byteSize = opts.byteSize;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "tflite Asset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [asset]
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`
  });
  return azp;
}
