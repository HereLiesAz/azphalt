import { example, TINY_PNG, type Example } from "../shared.js";

/** `image` — a plain raster a host places or references, with no paint-engine dynamics. */
export const images: Example[] = [
  example({
    slug: "image-logo",
    summary: "A placeable brand logo raster.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.image-logo",
      name: "Logo",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A placeable brand logo raster for watermarks and overlays.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "image", path: "assets/image-logo.png", tags: ["logo", "brand", "raster"] }],
    },
    payload: { "assets/image-logo.png": TINY_PNG },
  }),
  example({
    slug: "image-noise",
    summary: "A tileable noise texture.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.image-noise",
      name: "Noise Texture",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A neutral grain texture for overlays, grunge, and film-like finishes.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "image", path: "assets/image-noise.png", tags: ["noise", "grain", "texture"] }],
    },
    payload: { "assets/image-noise.png": TINY_PNG },
  }),
];
