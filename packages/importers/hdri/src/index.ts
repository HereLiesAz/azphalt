import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";
import { parseHdri, type HdriInfo } from "./parse-hdri.js";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  /** SPDX id recorded in the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text stored as the package's `LICENSE`; default is a placeholder. */
  licenseText?: string;
}

/**
 * Packages an HDRI environment map (Radiance .hdr or OpenEXR .exr) into an .azp asset
 * package. Validates the input by its magic bytes and throws on anything unrecognized —
 * never mislabels an unknown blob as `.exr`.
 */
export function importHdri(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const info: HdriInfo = parseHdri(bytes);
  const assetPath = `assets/env.${info.format}`;

  const payload: Record<string, Uint8Array> = {
    [assetPath]: bytes,
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "HDRI Environment Map",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "hdri",
        path: assetPath,
        params: { format: info.format },
      },
    ],
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license:
      opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`,
  });
  return azp;
}

export { parseHdri } from "./parse-hdri.js";
export type { HdriInfo } from "./parse-hdri.js";
