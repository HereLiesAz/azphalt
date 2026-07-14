import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";
import { parseGltf, type GltfInfo } from "./parse-gltf.js";

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
 * Packages a glTF (.glb or .gltf) into an .azp asset package. Validates the input by its
 * magic bytes / JSON shape and throws on anything that is not glTF — never mislabels.
 */
export function importGltf(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const info: GltfInfo = parseGltf(bytes);
  const ext = info.format;
  const assetPath = `assets/model.${ext}`;

  const payload: Record<string, Uint8Array> = {
    [assetPath]: bytes,
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "3D Model",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "mesh",
        path: assetPath,
        params: { format: info.format, version: info.version },
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

export { parseGltf } from "./parse-gltf.js";
export type { GltfInfo } from "./parse-gltf.js";
