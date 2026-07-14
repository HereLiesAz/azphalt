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
 * Packages an image (.png, .jpg, .webp) into an .azp asset package.
 */
export function importImage(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const extMatch = opts.filename.match(/\.([^.]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : "png";
  
  const payload: Record<string, Uint8Array> = {
    [`assets/image.${ext}`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Image Asset",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "image",
        path: `assets/image.${ext}`
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
