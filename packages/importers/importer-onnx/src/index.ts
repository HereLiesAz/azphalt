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
  if (bytes[0] !== 0x08) {
    throw new Error("not an ONNX protobuf model");
  }
}

export function importOnnx(bytes: Uint8Array | null, opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};

  let assetPath = "";
  if (bytes && !opts.remoteUrl) {
    validateOnnx(bytes);
    assetPath = `assets/${opts.filename}`;
    payload[assetPath] = bytes;
  }

  const asset: AssetContribution = {
    type: "onnx",
    path: assetPath,
    params: { format: "onnx" }
  };

  if (opts.role) asset.role = opts.role;
  if (opts.remoteUrl) asset.remoteUrl = opts.remoteUrl;
  if (opts.checksum) asset.checksum = opts.checksum;
  if (opts.byteSize) asset.byteSize = opts.byteSize;

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
