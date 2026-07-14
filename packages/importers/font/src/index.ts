import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  filename: string;
}

/**
 * Packages a font (.ttf, .otf, .woff2) into an .azp asset package.
 */
export function importFont(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const extMatch = opts.filename.match(/\.([^.]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : "ttf";
  
  const payload: Record<string, Uint8Array> = {
    [`assets/font.${ext}`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Font Asset",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "font",
        path: `assets/font.${ext}`
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
