import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  maps: Record<string, Uint8Array>;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text stored as the package's `LICENSE`. */
  licenseText?: string;
}

/**
 * Detect an image map's file extension from its magic bytes, so a JPEG albedo
 * isn't mislabeled `.png`. Throws on anything we can't identify.
 */
function imageExt(bytes: Uint8Array, role: string): string {
  // PNG: 89 50 4E 47
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }
  // JPEG: FF D8 FF
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }
  // WebP: "RIFF" ....  "WEBP"
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  throw new Error(`unrecognized image format for map '${role}'`);
}

/**
 * Packages a set of PBR texture maps into a .azp material asset. Each map's
 * extension is derived from its own bytes, and each map lands at
 * `assets/<role>.<ext>` with a `role -> path` entry in the asset params.
 */
export function importMaterial(opts: ImportOptions): Uint8Array {
  const roles = Object.keys(opts.maps);
  if (roles.length === 0) {
    throw new Error("material: at least one texture map is required");
  }

  const payload: Record<string, Uint8Array> = {};
  const params: Record<string, unknown> = {};
  const pathByRole: Record<string, string> = {};

  for (const [role, bytes] of Object.entries(opts.maps)) {
    const ext = imageExt(bytes, role);
    const path = `assets/${role}.${ext}`;
    payload[path] = bytes;
    params[role] = path;
    pathByRole[role] = path;
  }

  // Top-level asset path points at the base-color map when there is one,
  // otherwise the first supplied map.
  const primaryRole = roles.includes("albedo")
    ? "albedo"
    : roles.includes("basecolor")
      ? "basecolor"
      : roles[0];
  const assetPath = pathByRole[primaryRole];

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "PBR Material",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "material",
        path: assetPath,
        params
      }
    ]
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`
  });
  return azp;
}
