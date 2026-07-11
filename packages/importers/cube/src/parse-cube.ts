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
      dimensions = 1;
      size = parseInt(parts[1], 10);
      continue;
    }
    if (upper.startsWith("LUT_3D_SIZE")) {
      dimensions = 3;
      size = parseInt(parts[1], 10);
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

    // Otherwise: a data row of three floats.
    if (parts.length < 3) {
      throw new Error(`cube: malformed data on line ${i + 1}: "${lines[i]}"`);
    }
    entries.push([num(parts[0]), num(parts[1]), num(parts[2])]);
  }

  if (dimensions === undefined || size === undefined || !Number.isFinite(size) || size < 2) {
    throw new Error("cube: missing or invalid LUT_1D_SIZE / LUT_3D_SIZE");
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
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`cube: expected a number, got "${s}"`);
  return n;
}
