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

function startsWith(bytes: Uint8Array, sig: number[]): boolean {
  if (bytes.length < sig.length) return false;
  return sig.every((b, i) => bytes[i] === b);
}

/** Identify a font by its signature; reject anything that isn't one (per the importers readme). */
function detectFontExt(bytes: Uint8Array): string {
  if (startsWith(bytes, [0x77, 0x4f, 0x46, 0x32])) return "woff2"; // wOF2
  if (startsWith(bytes, [0x77, 0x4f, 0x46, 0x46])) return "woff"; // wOFF
  if (startsWith(bytes, [0x4f, 0x54, 0x54, 0x4f])) return "otf"; // OTTO
  if (startsWith(bytes, [0x00, 0x01, 0x00, 0x00])) return "ttf"; // TrueType
  if (startsWith(bytes, [0x74, 0x72, 0x75, 0x65])) return "ttf"; // 'true'
  if (startsWith(bytes, [0x74, 0x74, 0x63, 0x66])) return "ttc"; // TrueType collection
  throw new Error("not a recognized font (ttf/otf/woff/woff2)");
}

/**
 * Packages a font (.ttf, .otf, .woff, .woff2) into an .azp asset package. The extension is derived
 * from the font's signature, not the caller's filename, so a crafted filename cannot smuggle a path.
 */
export function importFont(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const ext = detectFontExt(bytes);
  const assetPath = `assets/font.${ext}`;
  const payload: Record<string, Uint8Array> = { [assetPath]: bytes };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Font Asset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [{ type: "font", path: assetPath }]
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`
  });
  return azp;
}
