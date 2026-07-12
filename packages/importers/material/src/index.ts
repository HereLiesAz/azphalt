import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  maps: Record<string, Uint8Array>;
}

/**
 * Packages a set of PBR texture maps into a .azp material asset.
 */
export function importMaterial(opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};
  const params: Record<string, unknown> = {};

  for (const [role, bytes] of Object.entries(opts.maps)) {
    const ext = "png"; // Assuming png for simplicity in this importer
    const path = `assets/${role}.${ext}`;
    payload[path] = bytes;
    params[role] = path;
  }

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "PBR Material",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "material",
        path: "assets/",
        params
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
