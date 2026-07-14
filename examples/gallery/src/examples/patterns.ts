import { example, TINY_PNG, type Example } from "../shared.js";

/** `pattern` — a tileable bitmap a host repeats to fill regions or back a layer. */
export const patterns: Example[] = [
  example({
    slug: "pattern-dots",
    summary: "A seamless polka-dot tile.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.pattern-dots",
      name: "Polka Dots",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A seamless polka-dot tile for playful fills and backgrounds.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [{ type: "pattern", path: "assets/pattern-dots.png", tags: ["dots", "seamless", "geometric"] }],
    },
    payload: { "assets/pattern-dots.png": TINY_PNG },
  }),
  example({
    slug: "pattern-herringbone",
    summary: "A classic herringbone weave tile.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.pattern-herringbone",
      name: "Herringbone",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A classic herringbone weave that tiles into a continuous zigzag.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [{ type: "pattern", path: "assets/pattern-herringbone.png", tags: ["herringbone", "weave", "seamless"] }],
    },
    payload: { "assets/pattern-herringbone.png": TINY_PNG },
  }),
];
