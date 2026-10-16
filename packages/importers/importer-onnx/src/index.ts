import { writeAzp } from "@azphalt/azp";
import type { Manifest, AssetContribution } from "@azphalt/azdk";

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
 * Validate an ONNX ModelProto. It is protobuf whose first field is `ir_version`
 * (field 1, varint), so a valid file's first byte is 0x08.
 */
function validateOnnx(bytes: Uint8Array): void {
  if (bytes.length === 0 || bytes[0] !== 0x08) {
    throw new Error("not an ONNX protobuf model");
  }
}

/** Strip any directory component from a caller-supplied filename and reject traversal/empty names. */
function safeFilename(filename: string): string {
  const base = filename.replace(/^.*[\\/]/, "");
  if (base === "" || base === "." || base === ".." || base.includes("\0")) {
    throw new Error(`unsafe filename: ${JSON.stringify(filename)}`);
  }
  return base;
}

/** Only https remote model URLs — never http/file/javascript. */
function requireHttps(url: string): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    throw new Error(`invalid remoteUrl: ${JSON.stringify(url)}`);
  }
  if (u.protocol !== "https:") throw new Error("remoteUrl must be https://");
  return url;
}

export function importOnnx(bytes: Uint8Array | null, opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};

  let assetPath = "";
  if (bytes && !opts.remoteUrl) {
    validateOnnx(bytes);
    assetPath = `assets/${safeFilename(opts.filename)}`;
    payload[assetPath] = bytes;
  }

  const asset: AssetContribution = {
    type: "onnx",
    path: assetPath,
    params: { format: "onnx" }
  };

  if (opts.role) asset.role = opts.role;
  if (opts.remoteUrl) asset.remoteUrl = requireHttps(opts.remoteUrl);
  if (opts.checksum) asset.checksum = opts.checksum;
  if (opts.byteSize != null && Number.isFinite(opts.byteSize) && opts.byteSize > 0) asset.byteSize = opts.byteSize;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "onnx Asset",
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
