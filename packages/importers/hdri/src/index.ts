import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
}

/**
 * Packages an HDRI environment map into an .azp asset package.
 */
export function importHdri(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  // Simple validation for Radiance HDR signature
  const sig = new TextDecoder().decode(bytes.slice(0, 10));
  const isHdr = sig.startsWith("#?RADIANCE") || sig.startsWith("#?RGBE");
  const ext = isHdr ? "hdr" : "exr";
  
  const payload: Record<string, Uint8Array> = {
    [`assets/env.${ext}`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "HDRI Environment Map",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "hdri",
        path: `assets/env.${ext}`
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
