/**
 * A small, defensive reader for the parts of an SFNT font (`.ttf` / `.otf`) a package validator and an
 * importer need: the family and style names, the weight, whether it is italic, and the `fvar` axes of a
 * variable font. It reads untrusted bytes, so every offset is bounds-checked and a malformed font
 * yields `undefined` rather than a throw (see `spec/font.md`).
 *
 * WOFF2 is Brotli-compressed and is deliberately not read here: a validator can only check a WOFF2 face
 * against what its manifest declares.
 */
import type { FontAxis } from "@azphalt/azdk";

export interface SfntTable {
  offset: number;
  length: number;
}

export interface SfntInfo {
  /** Typographic family (name ID 16) when present, else the legacy family (name ID 1). */
  family?: string;
  /** Typographic subfamily (name ID 17) when present, else the legacy subfamily (name ID 2). */
  style?: string;
  /** `OS/2.usWeightClass`, when the table is present. */
  weight?: number;
  italic: boolean;
  /** True when the font has an `fvar` table. */
  variable: boolean;
  /** The `fvar` axes, in table order. Empty for a static font. */
  axes: FontAxis[];
  /** Outline flavour: `glyf` (TrueType) or `CFF ` / `CFF2` (PostScript). */
  outlines: "truetype" | "cff" | "cff2" | "unknown";
}

const MAX_TABLES = 128;

/** The SFNT table directory, or undefined if `bytes` isn't a single (non-collection) SFNT font. */
export function readSfntTables(bytes: Uint8Array): Map<string, SfntTable> | undefined {
  if (bytes.length < 12) return undefined;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const version = view.getUint32(0);
  // 0x00010000 (TrueType), 'true' (Apple TrueType), 'OTTO' (CFF). 'ttcf' is a collection: not a single face.
  if (version !== 0x00010000 && version !== 0x74727565 && version !== 0x4f54544f) return undefined;
  const count = view.getUint16(4);
  if (count === 0 || count > MAX_TABLES || 12 + count * 16 > bytes.length) return undefined;
  const tables = new Map<string, SfntTable>();
  for (let i = 0; i < count; i++) {
    const at = 12 + i * 16;
    const tag = String.fromCharCode(bytes[at], bytes[at + 1], bytes[at + 2], bytes[at + 3]);
    const offset = view.getUint32(at + 8);
    const length = view.getUint32(at + 12);
    if (offset > bytes.length || length > bytes.length - offset) return undefined;
    tables.set(tag, { offset, length });
  }
  return tables;
}

function readName(bytes: Uint8Array, view: DataView, table: SfntTable | undefined, wanted: number[]): Map<number, string> {
  const out = new Map<number, string>();
  if (!table || table.length < 6) return out;
  const base = table.offset;
  const count = view.getUint16(base + 2);
  const stringOffset = view.getUint16(base + 4);
  for (let i = 0; i < count; i++) {
    const rec = base + 6 + i * 12;
    if (rec + 12 > base + table.length) break;
    const platform = view.getUint16(rec);
    const nameId = view.getUint16(rec + 6);
    if (!wanted.includes(nameId)) continue;
    const length = view.getUint16(rec + 8);
    const offset = view.getUint16(rec + 10);
    const start = base + stringOffset + offset;
    if (start + length > base + table.length) continue;
    let text = "";
    if (platform === 0 || platform === 3) {
      for (let j = 0; j + 1 < length; j += 2) text += String.fromCharCode(view.getUint16(start + j));
    } else {
      for (let j = 0; j < length; j++) text += String.fromCharCode(bytes[start + j]);
    }
    // Prefer a Windows or Unicode record over a Mac one, and never overwrite a better one.
    if (text && (!out.has(nameId) || platform === 3)) out.set(nameId, text);
  }
  return out;
}

const fixed = (view: DataView, at: number) => view.getInt32(at) / 65536;

/** Family, style, weight and `fvar` axes of an SFNT font; undefined if `bytes` isn't a readable one. */
export function readSfntInfo(bytes: Uint8Array): SfntInfo | undefined {
  const tables = readSfntTables(bytes);
  if (!tables) return undefined;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  try {
    const names = readName(bytes, view, tables.get("name"), [1, 2, 16, 17]);

    const os2 = tables.get("OS/2");
    const head = tables.get("head");
    let weight: number | undefined;
    let italic = false;
    if (os2 && os2.length >= 64) {
      weight = view.getUint16(os2.offset + 4);
      italic = (view.getUint16(os2.offset + 62) & 1) !== 0;
    } else if (head && head.length >= 46) {
      italic = (view.getUint16(head.offset + 44) & 2) !== 0;
    }

    const axes: FontAxis[] = [];
    const fvar = tables.get("fvar");
    if (fvar && fvar.length >= 16) {
      const axesOffset = view.getUint16(fvar.offset + 4);
      const axisCount = view.getUint16(fvar.offset + 8);
      const axisSize = view.getUint16(fvar.offset + 10);
      if (axisSize >= 20 && axisCount <= 64) {
        const axisNameIds: number[] = [];
        const raw: Array<Omit<FontAxis, "name"> & { nameId: number }> = [];
        for (let i = 0; i < axisCount; i++) {
          const at = fvar.offset + axesOffset + i * axisSize;
          if (at + 20 > fvar.offset + fvar.length) return undefined;
          const tag = String.fromCharCode(bytes[at], bytes[at + 1], bytes[at + 2], bytes[at + 3]);
          const nameId = view.getUint16(at + 18);
          axisNameIds.push(nameId);
          raw.push({ tag, min: fixed(view, at + 4), default: fixed(view, at + 8), max: fixed(view, at + 12), nameId });
        }
        const axisNames = readName(bytes, view, tables.get("name"), axisNameIds);
        for (const a of raw) {
          const name = axisNames.get(a.nameId);
          axes.push({ tag: a.tag, ...(name ? { name } : {}), min: a.min, default: a.default, max: a.max });
        }
      }
    }

    const outlines = tables.has("glyf") ? "truetype" : tables.has("CFF2") ? "cff2" : tables.has("CFF ") ? "cff" : "unknown";
    return {
      ...(names.get(16) ?? names.get(1) ? { family: names.get(16) ?? names.get(1) } : {}),
      ...(names.get(17) ?? names.get(2) ? { style: names.get(17) ?? names.get(2) } : {}),
      ...(weight !== undefined ? { weight } : {}),
      italic,
      variable: !!fvar,
      axes,
      outlines,
    };
  } catch {
    return undefined;
  }
}
