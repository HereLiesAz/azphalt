/**
 * Parser for the Adobe/IRIDAS `.cube` LUT format (1D or 3D). Faithful enough to
 * validate a file and extract the metadata a manifest needs; the importer stores the
 * original bytes, so parsing is validation + description, not re-serialization.
 */

export interface CubeLut {
  title?: string;
  dimensions: 1 | 3;
  /** Entries per dimension. */
  size: number;
  domainMin: [number, number, number];
  domainMax: [number, number, number];
  /** Table of `[r, g, b]` float triplets; length is `size` (1D) or `size**3` (3D). */
  entries: [number, number, number][];
}

/** Parse `.cube` text into a {@link CubeLut}, throwing on anything malformed. */
export function parseCube(text: string): CubeLut {
  let title: string | undefined;
  let dimensions: 1 | 3 | undefined;
  let size: number | undefined;
  let domainMin: [number, number, number] = [0, 0, 0];
  let domainMax: [number, number, number] = [1, 1, 1];
  const entries: [number, number, number][] = [];

  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || line.startsWith("#")) continue;

    const upper = line.toUpperCase();
    const parts = line.split(/\s+/);

    if (upper.startsWith("TITLE")) {
      const quoted = line.match(/"([^"]*)"/);
      title = quoted ? quoted[1] : line.slice(5).trim();
      continue;
    }
    if (upper.startsWith("LUT_1D_SIZE")) {
      if (dimensions !== undefined) throw new Error("cube: multiple LUT size declarations");
      dimensions = 1;
      size = intField(parts[1], "LUT_1D_SIZE");
      continue;
    }
    if (upper.startsWith("LUT_3D_SIZE")) {
      if (dimensions !== undefined) throw new Error("cube: multiple LUT size declarations");
      dimensions = 3;
      size = intField(parts[1], "LUT_3D_SIZE");
      continue;
    }
    if (upper.startsWith("DOMAIN_MIN")) {
      domainMin = [num(parts[1]), num(parts[2]), num(parts[3])];
      continue;
    }
    if (upper.startsWith("DOMAIN_MAX")) {
      domainMax = [num(parts[1]), num(parts[2]), num(parts[3])];
      continue;
    }
    if (upper.startsWith("LUT_1D_INPUT_RANGE") || upper.startsWith("LUT_3D_INPUT_RANGE")) {
      const lo = num(parts[1]);
      const hi = num(parts[2]);
      domainMin = [lo, lo, lo];
      domainMax = [hi, hi, hi];
      continue;
    }

    // Otherwise: a data row of exactly three floats — extra columns are malformed, not ignored.
    if (parts.length !== 3) {
      throw new Error(`cube: malformed data on line ${i + 1}: "${lines[i]}"`);
    }
    entries.push([num(parts[0]), num(parts[1]), num(parts[2])]);
  }

  if (dimensions === undefined || size === undefined) {
    throw new Error("cube: missing LUT_1D_SIZE / LUT_3D_SIZE");
  }
  // Bound the size so `size**3` can't be used to force a huge allocation. The `.cube` spec caps a 3D
  // LUT at 256 per side and a 1D LUT at 65536; reject anything outside that.
  const maxSize = dimensions === 1 ? 65536 : 256;
  if (size < 2 || size > maxSize) {
    throw new Error(`cube: LUT size ${size} out of range (2..${maxSize} for ${dimensions}D)`);
  }
  for (let c = 0; c < 3; c++) {
    if (domainMin[c] >= domainMax[c]) throw new Error("cube: DOMAIN_MIN must be below DOMAIN_MAX");
  }
  const expected = dimensions === 1 ? size : size * size * size;
  if (entries.length !== expected) {
    throw new Error(
      `cube: expected ${expected} entries for a ${dimensions}D LUT of size ${size}, got ${entries.length}`,
    );
  }

  return { title, dimensions, size, domainMin, domainMax, entries };
}

function num(s: string | undefined): number {
  // Reject trailing garbage ("33abc") that Number() tolerates via leading/trailing — Number("33abc")
  // is NaN, but Number("33 ") is 33; parts are already whitespace-split, so a strict finite check is
  // enough and "33abc" → NaN → throw.
  const n = Number(s);
  if (s === undefined || s.trim() === "" || !Number.isFinite(n)) {
    throw new Error(`cube: expected a number, got "${s}"`);
  }
  return n;
}

/** A strict non-negative integer field — rejects "33abc", floats, and empty. */
function intField(s: string | undefined, label: string): number {
  if (s === undefined || !/^\d+$/.test(s)) throw new Error(`cube: ${label} must be an integer, got "${s}"`);
  return parseInt(s, 10);
}
