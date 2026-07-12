import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  filename: string;
}

/**
 * Packages a vector graphic (.svg) into an .azp asset package.
 */
export function importVector(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  // Validate it starts with <svg or <?xml basically
  const str = new TextDecoder().decode(bytes.slice(0, 200)).trimLeft();
  if (!str.startsWith("<?xml") && !str.startsWith("<svg") && !str.startsWith("<!--")) {
    throw new Error("File does not appear to be a valid SVG.");
  }
  
  const payload: Record<string, Uint8Array> = {
    [`assets/vector.svg`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Vector Asset",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "vector",
        path: `assets/vector.svg`
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
