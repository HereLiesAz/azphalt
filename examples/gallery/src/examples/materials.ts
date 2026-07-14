import { example, utf8, type Example } from "../shared.js";

/**
 * A matte red surface. Dielectric (`metallicFactor: 0`) with high roughness, so it scatters light
 * evenly and shows no sharp highlight — the glTF `pbrMetallicRoughness` shape most hosts consume.
 */
const MATTE_RED = {
  name: "Matte Red",
  pbrMetallicRoughness: {
    baseColorFactor: [0.72, 0.05, 0.05, 1.0],
    metallicFactor: 0.0,
    roughnessFactor: 0.9,
  },
};

/**
 * A polished gold surface. Fully metallic with low roughness for a tight specular, plus a faint warm
 * `emissiveFactor` so it reads as gold even under dim lighting.
 */
const POLISHED_GOLD = {
  name: "Polished Gold",
  pbrMetallicRoughness: {
    baseColorFactor: [1.0, 0.77, 0.34, 1.0],
    metallicFactor: 1.0,
    roughnessFactor: 0.12,
  },
  emissiveFactor: [0.03, 0.02, 0.0],
};

/** `material` — portable PBR material definitions a host applies to its meshes. */
export const materials: Example[] = [
  example({
    slug: "material-matte-red",
    summary: "A matte red dielectric PBR material (JSON).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.material-matte-red",
      name: "Matte Red",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A non-metallic, high-roughness red surface with no specular highlight.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "material", path: "assets/material-matte-red.json", tags: ["pbr", "matte"] }],
    },
    payload: { "assets/material-matte-red.json": utf8(JSON.stringify(MATTE_RED, null, 2)) },
  }),
  example({
    slug: "material-gold",
    summary: "A polished, emissive gold PBR material (JSON).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.material-gold",
      name: "Polished Gold",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A fully metallic, low-roughness gold surface with a faint warm emissive tint.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "material", path: "assets/material-gold.json", tags: ["pbr", "metal"] }],
    },
    payload: { "assets/material-gold.json": utf8(JSON.stringify(POLISHED_GOLD, null, 2)) },
  }),
];
