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
 * Validate the FlatBuffer file identifier for a LiteRT/TFLite model: bytes 4..8
 * must spell ASCII "TFL3".
 */
function validateLitert(bytes: Uint8Array): void {
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

export function importLitert(bytes: Uint8Array | null, opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};

  let assetPath = "";
  if (bytes && !opts.remoteUrl) {
    validateLitert(bytes);
    assetPath = `assets/${opts.filename}`;
    payload[assetPath] = bytes;
  }

  const asset: AssetContribution = {
    type: "litert",
    path: assetPath,
    params: { format: "litert" }
  };

  if (opts.role) asset.role = opts.role;
  if (opts.remoteUrl) asset.remoteUrl = opts.remoteUrl;
  if (opts.checksum) asset.checksum = opts.checksum;
  if (opts.byteSize) asset.byteSize = opts.byteSize;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "litert Asset",
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
