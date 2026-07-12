import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
}

/**
 * Packages a glTF (.glb or .gltf) into an .azp asset package.
 */
export function importGltf(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  // Simple validation: .glb magic bytes (0x46546C67 = "glTF")
  const isGlb = bytes.length >= 4 && 
    bytes[0] === 0x67 && bytes[1] === 0x6C && bytes[2] === 0x54 && bytes[3] === 0x46;
  
  const ext = isGlb ? "glb" : "gltf";
  
  const payload: Record<string, Uint8Array> = {
    [`assets/model.${ext}`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "3D Model",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "mesh",
        path: `assets/model.${ext}`
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
