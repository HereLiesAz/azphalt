import { writeAzp, readSfntInfo } from "@azphalt/azp";
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

export interface FontPackageOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  /** SPDX id for the manifest; default `"OFL-1.1"`. */
  license?: string;
  /** Full license text written as the package's LICENSE entry. */
  licenseText?: string;
  /** Family name; defaults to the font's own name table. */
  family?: string;
  designer?: string;
  scripts?: string[];
  languages?: string[];
  sampleText?: string;
}

/**
 * Packages a compiled font into a `kind: "font"` .azp — the shape Morphont publishes. Only `.ttf` /
 * `.otf` / `.woff2` qualify. For SFNT fonts the variable axes, weight and italic flag are read from the
 * font itself so the manifest cannot disagree with the file.
 */
export function importFontPackage(bytes: Uint8Array, opts: FontPackageOptions): Uint8Array {
  const ext = detectFontExt(bytes);
  if (ext !== "ttf" && ext !== "otf" && ext !== "woff2") throw new Error(`a font package takes ttf, otf or woff2, not ${ext}`);
  const info = ext === "woff2" ? undefined : readSfntInfo(bytes);
  if (ext !== "woff2" && !info) throw new Error("not a readable font");
  const family = opts.family ?? info?.family;
  if (!family) throw new Error("family name required (the font has none)");

  const path = `fonts/${family.replace(/[^A-Za-z0-9._-]+/g, "")|| "Font"}${info?.style && info.style !== "Regular" ? "-" + info.style.replace(/[^A-Za-z0-9]+/g, "") : ""}.${ext}`;
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || family,
    version: opts.version,
    kind: "font",
    license: opts.license ?? "OFL-1.1",
    compat: ">=0.1",
    author: opts.author,
    font: {
      family,
      ...(opts.designer ? { designer: opts.designer } : {}),
      ...(opts.scripts ? { scripts: opts.scripts } : {}),
      ...(opts.languages ? { languages: opts.languages } : {}),
      ...(opts.sampleText ? { sampleText: opts.sampleText } : {}),
      faces: [{
        path,
        format: ext,
        ...(info?.style ? { style: info.style } : {}),
        ...(info?.weight ? { weight: info.weight } : {}),
        ...(info?.italic ? { italic: true } : {}),
        ...(info?.variable ? { variable: true, axes: info.axes } : {}),
      }],
    },
  };
  const { azp } = writeAzp({
    manifest,
    payload: { [path]: bytes },
    license: opts.licenseText ?? `${opts.license ?? "OFL-1.1"}\n\nProvide the full license text.\n`,
  });
  return azp;
}
