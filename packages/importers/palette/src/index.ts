import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
}

/** One normalized swatch (spec/package-format.md § Palette format). */
interface Swatch {
  name: string;
  color: string; // "#RRGGBB"
}

/** Normalize any hex form (`#fff`, `abcabc`, `#ABCABC`) to the spec's 7-char lowercase `#RRGGBB`. */
function normalizeHex(input: string): string {
  let h = input.trim().toLowerCase();
  if (!h.startsWith("#")) h = `#${h}`;
  if (/^#[0-9a-f]{3}$/.test(h)) h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  if (!/^#[0-9a-f]{6}$/.test(h)) throw new Error(`invalid hex color "${input}"`);
  return h;
}

function channelToHex(v: number): string {
  return Math.round(Math.max(0, Math.min(1, v)) * 255)
    .toString(16)
    .padStart(2, "0");
}

/** Parse a JSON palette: either an array of hex strings / `{name?, color}` objects, or a `{colors:[…]}`. */
function parseJsonPalette(bytes: Uint8Array): Swatch[] {
  let json: unknown;
  try {
    json = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error("Palette JSON is not valid JSON.");
  }
  const entries: unknown[] = Array.isArray(json)
    ? json
    : json && typeof json === "object" && Array.isArray((json as { colors?: unknown }).colors)
      ? ((json as { colors: unknown[] }).colors)
      : (() => {
          throw new Error("Palette JSON must be an array of colors or an object with a `colors` array.");
        })();

  return entries.map((e) => {
    if (typeof e === "string") {
      const color = normalizeHex(e);
      return { name: color.toUpperCase(), color };
    }
    if (e && typeof e === "object" && typeof (e as { color?: unknown }).color === "string") {
      const color = normalizeHex((e as { color: string }).color);
      const name = (e as { name?: unknown }).name;
      return { name: typeof name === "string" && name.length > 0 ? name : color.toUpperCase(), color };
    }
    throw new Error("Each palette color must be a hex string or an object with a `color`.");
  });
}

/**
 * Parse an Adobe Swatch Exchange (.ase) file into swatches. Handles the common RGB and Gray colour
 * entries (CMYK/LAB entries and group markers are skipped best-effort). Binary layout: `ASEF` magic,
 * a version (4 bytes), a uint32 block count, then blocks of `[uint16 type][uint32 length][data]`; a
 * colour entry (type 0x0001) holds a UTF-16BE name (uint16 unit count incl. null), a 4-char colour
 * model, the model's float32 channels (big-endian, 0..1), and a uint16 colour type.
 */
function parseAsePalette(bytes: Uint8Array): Swatch[] {
  if (bytes.length < 12) return [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const blockCount = view.getUint32(8, false);
  const swatches: Swatch[] = [];
  let off = 12;
  for (let b = 0; b < blockCount && off + 6 <= bytes.length; b++) {
    const type = view.getUint16(off, false);
    const len = view.getUint32(off + 2, false);
    let p = off + 6;
    const blockEnd = p + len;
    if (type === 0x0001 && blockEnd <= bytes.length) {
      const nameUnits = view.getUint16(p, false);
      p += 2;
      let name = "";
      for (let i = 0; i < nameUnits && p + 1 < blockEnd; i++) {
        const code = view.getUint16(p, false);
        p += 2;
        if (code !== 0) name += String.fromCharCode(code);
      }
      const model = String.fromCharCode(view.getUint8(p), view.getUint8(p + 1), view.getUint8(p + 2), view.getUint8(p + 3));
      p += 4;
      let color: string | undefined;
      if (model === "RGB ") {
        color = `#${channelToHex(view.getFloat32(p, false))}${channelToHex(view.getFloat32(p + 4, false))}${channelToHex(view.getFloat32(p + 8, false))}`;
      } else if (model === "Gray") {
        const g = channelToHex(view.getFloat32(p, false));
        color = `#${g}${g}${g}`;
      }
      if (color) swatches.push({ name: name.length > 0 ? name : color.toUpperCase(), color });
    }
    off = blockEnd;
  }
  return swatches;
}

/**
 * Package a colour palette (`.ase` or JSON) into an `.azp` asset package. The emitted asset is always
 * the **normalized** `palette` wire format — a UTF-8 JSON `{ colors: [{ name, color: "#RRGGBB" }] }`
 * (spec/package-format.md § Palette format) — never the raw `.ase`/input bytes, so any conforming host
 * can read it.
 */
export function importPalette(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const isAse =
    bytes.length >= 4 && bytes[0] === 0x41 && bytes[1] === 0x53 && bytes[2] === 0x45 && bytes[3] === 0x46;

  const colors = isAse ? parseAsePalette(bytes) : parseJsonPalette(bytes);
  if (colors.length === 0) {
    throw new Error(
      isAse
        ? "No RGB/Gray colours found in the .ase file."
        : "Palette must be an Adobe Swatch Exchange (.ase) file or a JSON palette of hex colours.",
    );
  }

  const normalized = JSON.stringify({ colors }, null, 2);
  const payload: Record<string, Uint8Array> = {
    "assets/palette.json": new TextEncoder().encode(normalized),
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Color Palette",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [{ type: "palette", path: "assets/palette.json" }],
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
