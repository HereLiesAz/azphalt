import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";
import { parseAbr } from "./parse-abr.js";

export interface ImportOptions {
  id: string;
  name: string;
  version: string;
  author: string;
}

/**
 * Parses an ABR file and packages its brushes into an .azp asset package.
 */
export function importAbr(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const brushes = parseAbr(bytes);
  
  const payload: Record<string, Uint8Array> = {};
  const assets: Manifest["assets"] = [];

  for (let i = 0; i < brushes.length; i++) {
    const brush = brushes[i];
    const path = `assets/brush_${i}.png`;
    
    payload[path] = brush.tipImage;
    assets.push({
      type: "brush",
      path,
      params: {
        name: brush.name,
        spacing: brush.spacing
      }
    });
  }

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name,
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets
  };

  const licenseText = `MIT License\n\nCopyright (c) ${new Date().getFullYear()} ${opts.author}\n`;

  const { azp } = writeAzp({ manifest, payload, license: licenseText });
  return azp;
}
