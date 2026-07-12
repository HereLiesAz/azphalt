import { writeAzp } from "@azphalt/azp";
import type { Manifest, AssetContribution } from "@azphalt/sdk";

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
}

export function importSherpa(bytes: Uint8Array | null, opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};
  
  let assetPath = "";
  if (bytes && !opts.remoteUrl) {
    assetPath = `assets/${opts.filename}`;
    payload[assetPath] = bytes;
  }

  const asset: AssetContribution = {
    type: "sherpa-bundle" as any,
    path: assetPath
  };

  if (opts.role) asset.role = opts.role;
  if (opts.remoteUrl) asset.remoteUrl = opts.remoteUrl;
  if (opts.checksum) asset.checksum = opts.checksum;
  if (opts.byteSize) asset.byteSize = opts.byteSize;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "sherpa Asset",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [asset]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
