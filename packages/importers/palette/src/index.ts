import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
}

/**
 * Packages a color palette (.ase or .json) into an .azp asset package.
 */
export function importPalette(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  // Check for ASE magic bytes (ASEF)
  const isAse = bytes.length >= 4 && 
    bytes[0] === 0x41 && bytes[1] === 0x53 && bytes[2] === 0x45 && bytes[3] === 0x46;
  
  let ext = "json";
  
  if (isAse) {
    ext = "ase";
  } else {
    // Validate it's a JSON array of hex codes
    try {
      const json = JSON.parse(new TextDecoder().decode(bytes));
      if (!Array.isArray(json) || !json.every(v => typeof v === "string" && v.startsWith("#"))) {
        throw new Error();
      }
    } catch {
      throw new Error("Palette must be an Adobe Swatch Exchange (.ase) file or a JSON array of hex strings.");
    }
  }
  
  const payload: Record<string, Uint8Array> = {
    [`assets/palette.${ext}`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Color Palette",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "palette",
        path: `assets/palette.${ext}`
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
