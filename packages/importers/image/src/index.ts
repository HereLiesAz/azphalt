import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  filename: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text written as the package's LICENSE entry. */
  licenseText?: string;
}

/** Allowed image extensions, each confirmed by its magic bytes below. */
const IMAGE_EXTS = new Set(["png", "jpg", "jpeg", "webp", "gif"]);

function startsWith(bytes: Uint8Array, sig: number[], offset = 0): boolean {
  if (bytes.length < offset + sig.length) return false;
  return sig.every((b, i) => bytes[offset + i] === b);
}

/** Reject anything whose bytes aren't a recognized image (the readme claims every importer does this). */
function detectImageExt(bytes: Uint8Array): string {
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpg";
  if (startsWith(bytes, [0x47, 0x49, 0x46, 0x38])) return "gif"; // GIF8
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)) return "webp";
  throw new Error("not a recognized image (png/jpg/webp/gif)");
}

/**
 * Packages an image (.png, .jpg, .webp, .gif) into an .azp asset package. The extension comes from
 * the file's magic bytes, not the caller's filename, so a crafted `filename` cannot smuggle a path.
 */
export function importImage(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const ext = detectImageExt(bytes);
  if (!IMAGE_EXTS.has(ext)) throw new Error(`unsupported image type ${ext}`);
  const assetPath = `assets/image.${ext}`;
  const payload: Record<string, Uint8Array> = { [assetPath]: bytes };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Image Asset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [{ type: "image", path: assetPath }]
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`
  });
  return azp;
}
