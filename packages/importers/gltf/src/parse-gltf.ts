/**
 * Validator for glTF 2.0 assets in both the binary `.glb` container and the text `.gltf`
 * JSON form. Faithful enough to validate a file and extract the metadata a manifest needs;
 * the importer stores the original bytes, so this is validation + description, not
 * re-serialization.
 */

export interface GltfInfo {
  /** The container the bytes were recognized as. */
  format: "glb" | "gltf";
  /** GLB header version (number) or the JSON `asset.version` (string). */
  version?: number | string;
  /** Total byte length, for GLB. */
  byteLength?: number;
}

/** glTF magic — ASCII "glTF" read as a little-endian u32 (bytes 0x67 0x6C 0x54 0x46). */
const GLB_MAGIC = 0x46546c67;

/**
 * Validate `bytes` as glTF, returning the container form and version. Throws on anything
 * that is neither a well-formed GLB nor a valid glTF JSON document — never guesses.
 */
export function parseGltf(bytes: Uint8Array): GltfInfo {
  // GLB (binary): a 12-byte header — magic (u32 LE), version (u32 LE), total length (u32 LE).
  if (bytes.length >= 4) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (view.getUint32(0, true) === GLB_MAGIC) {
      if (bytes.length < 12) {
        throw new Error("glTF: GLB header truncated (need at least 12 bytes)");
      }
      const version = view.getUint32(4, true);
      const declaredLength = view.getUint32(8, true);
      if (declaredLength > bytes.length) {
        throw new Error(
          `glTF: GLB declares ${declaredLength} bytes but only ${bytes.length} present`,
        );
      }
      return { format: "glb", version, byteLength: bytes.length };
    }
  }

  // Text glTF: not a GLB, so it must be UTF-8 JSON with a string `asset.version`.
  let json: unknown;
  try {
    json = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error("glTF: not a valid glTF (not a GLB and not JSON)");
  }
  const version = assetVersion(json);
  if (version === undefined) {
    throw new Error("glTF: not a valid glTF (missing string asset.version)");
  }
  return { format: "gltf", version };
}

/** Read a string `asset.version` from a parsed JSON value, or `undefined` if absent. */
function assetVersion(json: unknown): string | undefined {
  if (typeof json !== "object" || json === null) return undefined;
  const asset = (json as Record<string, unknown>).asset;
  if (typeof asset !== "object" || asset === null) return undefined;
  const version = (asset as Record<string, unknown>).version;
  return typeof version === "string" ? version : undefined;
}
