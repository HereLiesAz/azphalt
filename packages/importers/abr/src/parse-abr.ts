/**
 * Parser for the Adobe Photoshop `.abr` brush container. Covers the two shapes that carry sampled
 * (bitmap) brushes: the classic **v1/v2** layout, and the **v6+** `8BIM` section layout (`samp`
 * bitmaps + `desc` dynamics). Computed (procedural) brushes have no bitmap and are reported as
 * such. Anything else throws {@link UnsupportedAbrError} — the importer never emits a guess.
 *
 * Scope note: validated against independently-constructed fixtures for each supported shape (see
 * the tests). Validating against a corpus of real Photoshop `.abr` files is the next step before
 * claiming full Photoshop compatibility; unrecognized structure fails loudly rather than silently.
 */
import { Reader } from "./binary.js";
import { decodePackBits } from "./packbits.js";
import { readDescriptor, type DescObject } from "./descriptor.js";

/** Raised for an `.abr` version or structure this parser does not handle. */
export class UnsupportedAbrError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsupportedAbrError";
  }
}

export interface AbrBounds {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface AbrBrush {
  name?: string;
  kind: "sampled" | "computed";
  bounds: AbrBounds;
  /** Bit depth of the sampled bitmap (8 for supported brushes; 0 for computed). */
  depth: number;
  width: number;
  height: number;
  /** 8-bit grayscale coverage, row-major, length `width*height`. Present for sampled brushes. */
  gray?: Uint8Array;
  /** Brush spacing (v1/v2 store it as a percentage integer). */
  spacing?: number;
  /** Descriptor-derived dynamics from a v6 `desc` section, host-neutral where mappable. */
  params?: Record<string, unknown>;
}

export interface AbrFile {
  version: number;
  subVersion?: number;
  brushes: AbrBrush[];
}

/** Bounds (long) + depth + compression + bitmap — shared by the v1/2 and v6 sampled layouts. */
function readSampledTail(r: Reader): Pick<AbrBrush, "bounds" | "depth" | "width" | "height" | "gray"> {
  const top = r.i32();
  const left = r.i32();
  const bottom = r.i32();
  const right = r.i32();
  const depth = r.u16();
  const compression = r.u8();
  const width = right - left;
  const height = bottom - top;
  if (width <= 0 || height <= 0 || width * height > 64_000_000) {
    throw new UnsupportedAbrError(`implausible brush bounds ${width}x${height}`);
  }
  if (depth !== 8) throw new UnsupportedAbrError(`unsupported brush depth ${depth} (only 8-bit)`);

  let gray: Uint8Array;
  if (compression === 0) {
    gray = r.bytes(width * height).slice();
  } else if (compression === 1) {
    const rowLens: number[] = [];
    for (let y = 0; y < height; y++) rowLens.push(r.u16());
    gray = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      gray.set(decodePackBits(r.bytes(rowLens[y]), width), y * width);
    }
  } else {
    throw new UnsupportedAbrError(`unsupported compression ${compression}`);
  }
  return { bounds: { top, left, bottom, right }, depth, width, height, gray };
}

function readSampledV12(r: Reader, version: number): AbrBrush {
  const name = version === 2 ? r.unicode() : undefined;
  r.u32(); // misc
  const spacing = r.u16();
  r.u8(); // anti-aliasing flag
  r.skip(8); // short bounds: 4 × i16 (long bounds below are authoritative)
  const tail = readSampledTail(r);
  return { ...tail, name, kind: "sampled", spacing };
}

function parseV12(r: Reader, version: number): AbrFile {
  const count = r.u16();
  const brushes: AbrBrush[] = [];
  for (let i = 0; i < count; i++) {
    const type = r.u16();
    const size = r.u32();
    const end = r.pos + size;
    if (type === 2) {
      brushes.push(readSampledV12(r, version));
    } else {
      brushes.push({ kind: "computed", bounds: { top: 0, left: 0, bottom: 0, right: 0 }, depth: 0, width: 0, height: 0 });
    }
    r.seek(end); // block size is authoritative — resync regardless of what we read
  }
  return { version, brushes };
}

const DYNAMICS: Record<string, string> = {
  Dmtr: "diameter",
  Spcn: "spacing",
  Angl: "angle",
  Rndn: "roundness",
  Hrdn: "hardness",
};

function extractBrushParams(desc: Uint8Array): Record<string, unknown> {
  const obj: DescObject = readDescriptor(desc);
  const out: Record<string, unknown> = {};
  for (const [code, name] of Object.entries(DYNAMICS)) {
    if (code in obj) out[name] = obj[code];
  }
  out.descriptor = obj; // full descriptor retained for anything not mapped
  return out;
}

function parseV6(r: Reader, version: number): AbrFile {
  const subVersion = r.u16();
  let sampData: Uint8Array | undefined;
  let descData: Uint8Array | undefined;

  while (r.remaining >= 12) {
    const sig = r.ascii(4);
    if (sig !== "8BIM") break;
    const key = r.ascii(4);
    const len = r.u32();
    const data = r.bytes(len).slice();
    if (key === "samp") sampData = data;
    else if (key === "desc") descData = data;
  }

  const params = descData ? extractBrushParams(descData) : undefined;
  const brushes: AbrBrush[] = [];

  if (sampData) {
    const sr = new Reader(sampData);
    while (sr.remaining >= 4) {
      const entryLen = sr.u32();
      if (entryLen === 0 || entryLen > sr.remaining) break;
      const end = sr.pos + entryLen;
      const name = sr.unicode();
      const tail = readSampledTail(sr);
      brushes.push({ ...tail, name, kind: "sampled", params });
      const pad = end % 4 ? 4 - (end % 4) : 0;
      sr.seek(Math.min(end + pad, sr.length)); // 4-byte aligned; clamp so trailing padding past EOF ends the loop
    }
  }

  if (brushes.length === 0) {
    throw new UnsupportedAbrError("no sampled brushes found in v6 'samp' section");
  }
  return { version, subVersion, brushes };
}

/** Parse `.abr` bytes into a {@link AbrFile}. Throws {@link UnsupportedAbrError} on unhandled input. */
export function parseAbr(bytes: Uint8Array): AbrFile {
  const r = new Reader(bytes);
  const version = r.u16();
  if (version === 1 || version === 2) return parseV12(r, version);
  if (version === 6 || version === 7 || version === 10) return parseV6(r, version);
  throw new UnsupportedAbrError(`unsupported .abr version ${version}`);
}
