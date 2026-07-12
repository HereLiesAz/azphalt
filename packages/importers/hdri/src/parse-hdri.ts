/**
 * Validator for HDRI environment maps in the two formats azphalt accepts: Radiance HDR
 * (`.hdr`) and OpenEXR (`.exr`). The importer stores the original bytes, so this is
 * magic-byte validation + description, not decoding. It never guesses: an unrecognized
 * blob is an error, not a mislabeled `.exr`.
 */

export interface HdriInfo {
  /** The container the bytes were recognized as. */
  format: "hdr" | "exr";
}

/** OpenEXR magic number at offset 0: 0x76 0x2f 0x31 0x01. */
const EXR_MAGIC = [0x76, 0x2f, 0x31, 0x01] as const;

/**
 * Detect the HDRI container from `bytes`, throwing if it is neither Radiance HDR nor
 * OpenEXR.
 */
export function parseHdri(bytes: Uint8Array): HdriInfo {
  // Radiance HDR: an ASCII header beginning with `#?RADIANCE` (or the older `#?RGBE`).
  const head = new TextDecoder().decode(bytes.slice(0, 16));
  if (head.startsWith("#?RADIANCE") || head.startsWith("#?RGBE")) {
    return { format: "hdr" };
  }

  // OpenEXR: a 4-byte magic number at offset 0.
  if (
    bytes.length >= 4 &&
    bytes[0] === EXR_MAGIC[0] &&
    bytes[1] === EXR_MAGIC[1] &&
    bytes[2] === EXR_MAGIC[2] &&
    bytes[3] === EXR_MAGIC[3]
  ) {
    return { format: "exr" };
  }

  throw new Error("unrecognized HDRI format (expected Radiance .hdr or OpenEXR .exr)");
}
