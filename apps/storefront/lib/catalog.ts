/**
 * The storefront's catalog: a single, process-wide {@link Registry} + {@link Marketplace}, backed
 * by an {@link InMemoryStore} and seeded once at module load with a handful of believable example
 * extensions.
 *
 * This is deliberately a stand-in for a real deployment's persistent store: it lets the storefront
 * demonstrate both lanes of the azphalt model (see `docs/ARCHITECTURE.md § The marketplace`) with no
 * database, no network, and no external services. Every example is a genuine `.azp` built with
 * `@azphalt/azp`'s {@link writeAzp} and published through the same verify-and-index path a real
 * upload would take — so the catalog you browse is real registry data, not mock JSON.
 *
 * Two of the examples are consigned for sale via {@link Marketplace.listForSale} (the paid lane); the
 * rest live only in the free registry. The fee — and money in general — exists only on the listings,
 * never in the registry itself.
 */
import { writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import type { Manifest } from "@azphalt/sdk";

/** SPDX MIT text stamped into every example package's required `LICENSE` entry. */
const MIT_LICENSE =
  "MIT License\n\nPermission is hereby granted, free of charge, to any person obtaining a copy " +
  "of this software and associated documentation files (the \"Software\"), to deal in the Software " +
  "without restriction. THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND.\n";

const utf8 = (s: string) => new TextEncoder().encode(s);

/** A tiny but plausible `.cube` LUT payload, so LUT packs ship real (if trivial) asset bytes. */
function cubeLut(title: string): Uint8Array {
  return utf8(
    `TITLE "${title}"\nLUT_3D_SIZE 2\n` +
      "0.0 0.0 0.0\n1.0 0.0 0.0\n0.0 1.0 0.0\n1.0 1.0 0.0\n" +
      "0.0 0.0 1.0\n1.0 0.0 1.0\n0.0 1.0 1.0\n1.0 1.0 1.0\n",
  );
}

/**
 * One seed definition: the manifest (minus computed `files`), its payload bytes, and an optional
 * count of simulated historical downloads used to make the "popular" ordering on the home page
 * meaningful. Downloads are simulated by serving the package that many times.
 */
interface Seed {
  manifest: Omit<Manifest, "files">;
  payload: Record<string, Uint8Array>;
  /** Extra download count to simulate (via repeated `serve`) so browse-by-popularity has signal. */
  simulatedDownloads?: number;
  /** When set, the package is consigned for sale at this price (minor units + ISO-4217 currency). */
  listPriceCents?: number;
  /** The consigning creator's marketplace account id (only used when `listPriceCents` is set). */
  sellerId?: string;
}

/**
 * The example catalog. A spread of both `kind`s and every `assetType`, so every page has something
 * real to render: two executable filters (`kind: "code"`), and asset packs covering LUTs, brushes,
 * and patterns (`kind: "asset"`).
 */
const SEEDS: Seed[] = [
  {
    // A code extension: an on-device halftone filter with a small parameter panel. Consigned.
    manifest: {
      azphalt: "0.1",
      id: "com.hereliesaz.halftone",
      name: "Halftone Studio",
      version: "1.2.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description:
        "A configurable halftone filter — dot, line, and cross-hatch screens with adjustable cell " +
        "size and angle. Runs on-device against the bitmap, no host engine required.",
      author: "Az",
      homepage: "https://hereliesaz.com",
      runtime: "js",
      entry: "code/index.js",
      capabilities: ["bitmap", "params"],
      contributes: {
        filters: [
          { id: "apply-halftone", name: "Apply Halftone", entry: "applyHalftone", ui: "ui/panel.json" },
        ],
      },
    },
    payload: {
      "code/index.js": utf8(
        "export const applyHalftone = (ctx) => {\n" +
          "  const cell = ctx.params.number('cellSize');\n" +
          "  const bmp = ctx.bitmap.read(ctx.target);\n" +
          "  // ...screen the bitmap into halftone dots of size `cell`...\n" +
          "  ctx.bitmap.write(ctx.target, bmp);\n" +
          "};\n",
      ),
      "ui/panel.json": utf8(
        JSON.stringify(
          {
            controls: [
              { type: "slider", key: "cellSize", label: "Cell size", min: 2, max: 64, step: 1, default: 8 },
              { type: "slider", key: "angle", label: "Screen angle", min: 0, max: 180, step: 1, default: 45 },
              {
                type: "select",
                key: "screen",
                label: "Screen",
                options: [
                  { value: "dot", label: "Dot" },
                  { value: "line", label: "Line" },
                  { value: "cross", label: "Cross-hatch" },
                ],
                default: "dot",
              },
            ],
          },
          null,
          2,
        ),
      ),
    },
    simulatedDownloads: 2140,
    listPriceCents: 600,
    sellerId: "seller_hereliesaz",
  },
  {
    // A LUT asset pack — cinematic color grades. Consigned.
    manifest: {
      azphalt: "0.1",
      id: "com.studioaz.cinelut",
      name: "CineGrade LUT Pack",
      version: "2.0.1",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description:
        "Twelve cinematic 3D LUTs — teal-and-orange, bleach bypass, and moody night grades — as " +
        "portable `.cube` files any azphalt host can apply.",
      author: "Studio Az",
      homepage: "https://hereliesaz.com",
      capabilities: ["assets", "bitmap"],
      assets: [
        { type: "lut", path: "assets/teal-orange.cube" },
        { type: "lut", path: "assets/bleach-bypass.cube" },
        { type: "lut", path: "assets/night-moody.cube" },
      ],
    },
    payload: {
      "assets/teal-orange.cube": cubeLut("Teal & Orange"),
      "assets/bleach-bypass.cube": cubeLut("Bleach Bypass"),
      "assets/night-moody.cube": cubeLut("Night / Moody"),
    },
    simulatedDownloads: 1310,
    listPriceCents: 1200,
    sellerId: "seller_studioaz",
  },
  {
    // A free LUT pack — film emulation.
    manifest: {
      azphalt: "0.1",
      id: "com.foldlab.filmluts",
      name: "Film Emulation LUTs",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description:
        "Free, MIT-licensed film-stock emulation LUTs. Reach without a fee — published to the open " +
        "registry lane; grade in any conforming app.",
      author: "Fold Lab",
      capabilities: ["assets", "bitmap"],
      assets: [
        { type: "lut", path: "assets/portra.cube" },
        { type: "lut", path: "assets/tri-x.cube" },
      ],
    },
    payload: {
      "assets/portra.cube": cubeLut("Portra"),
      "assets/tri-x.cube": cubeLut("Tri-X"),
    },
    simulatedDownloads: 980,
  },
  {
    // A brush pack — consigned would be plausible, but kept free to show a paid/free mix per type.
    manifest: {
      azphalt: "0.1",
      id: "com.brushery.inkbrushes",
      name: "Ink & Sumi Brushes",
      version: "1.4.2",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description:
        "Twenty ink and sumi-e brushes with host-neutral spacing and angle parameters — normalized " +
        "from `.abr`/`.brushset` into portable `.azp`.",
      author: "Brushery",
      capabilities: ["assets"],
      assets: [
        { type: "brush", path: "assets/sumi-round.brush", params: { spacing: 0.08, angle: 0, roundness: 0.9 } },
        { type: "brush", path: "assets/ink-flat.brush", params: { spacing: 0.05, angle: 30, roundness: 0.4 } },
      ],
    },
    payload: {
      "assets/sumi-round.brush": utf8("azphalt-brush:sumi-round"),
      "assets/ink-flat.brush": utf8("azphalt-brush:ink-flat"),
    },
    simulatedDownloads: 1725,
  },
  {
    // A pattern pack — free.
    manifest: {
      azphalt: "0.1",
      id: "com.patternsmith.geopatterns",
      name: "Geometric Pattern Pack",
      version: "1.1.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description:
        "Seamless geometric tiles — isometric grids, herringbone, and hex — as tileable pattern " +
        "assets for fills and backgrounds.",
      author: "Pattern Smith",
      capabilities: ["assets"],
      assets: [
        { type: "pattern", path: "assets/herringbone.pattern" },
        { type: "pattern", path: "assets/hexgrid.pattern" },
      ],
    },
    payload: {
      "assets/herringbone.pattern": utf8("azphalt-pattern:herringbone"),
      "assets/hexgrid.pattern": utf8("azphalt-pattern:hexgrid"),
    },
    simulatedDownloads: 540,
  },
  {
    // A second free code extension — a dither filter — with a version history to exercise the UI.
    manifest: {
      azphalt: "0.1",
      id: "com.hereliesaz.dither",
      name: "Dither Kit",
      version: "0.3.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description:
        "Ordered and error-diffusion dithering (Bayer, Floyd–Steinberg, Atkinson) with a palette " +
        "picker. Free on the open lane.",
      author: "Az",
      homepage: "https://hereliesaz.com",
      runtime: "js",
      entry: "code/index.js",
      capabilities: ["bitmap", "params", "color"],
      contributes: {
        filters: [{ id: "apply-dither", name: "Apply Dither", entry: "applyDither", ui: "ui/panel.json" }],
        commands: [{ id: "reset-palette", name: "Reset Palette", entry: "resetPalette" }],
      },
    },
    payload: {
      "code/index.js": utf8(
        "export const applyDither = (ctx) => { /* ...error diffusion... */ };\n" +
          "export const resetPalette = (ctx) => { /* ...restore default palette... */ };\n",
      ),
      "ui/panel.json": utf8(
        JSON.stringify(
          {
            controls: [
              {
                type: "select",
                key: "algorithm",
                label: "Algorithm",
                options: [
                  { value: "bayer", label: "Bayer (ordered)" },
                  { value: "floyd", label: "Floyd–Steinberg" },
                  { value: "atkinson", label: "Atkinson" },
                ],
                default: "floyd",
              },
              { type: "slider", key: "levels", label: "Levels", min: 2, max: 16, step: 1, default: 4 },
            ],
          },
          null,
          2,
        ),
      ),
    },
    simulatedDownloads: 410,
  },
];

/** An earlier version of Dither Kit, published first so its detail page shows a version history. */
const DITHER_OLD: Omit<Manifest, "files"> = {
  azphalt: "0.1",
  id: "com.hereliesaz.dither",
  name: "Dither Kit",
  version: "0.2.0",
  kind: "code",
  license: "MIT",
  compat: ">=0.1",
  description: "Ordered dithering only.",
  author: "Az",
  runtime: "js",
  entry: "code/index.js",
  capabilities: ["bitmap", "params"],
  contributes: { filters: [{ id: "apply-dither", name: "Apply Dither", entry: "applyDither" }] },
};

/** The live registry + marketplace, wired to a single shared store as the marketplace requires. */
const store = new InMemoryStore();
const registry = new Registry(store);
const market = new Marketplace(registry, store);

/**
 * Seed the catalog exactly once. Memoized as a promise so concurrent requests (and Next's parallel
 * route rendering) all await the same in-flight seeding rather than racing to double-publish.
 */
let seeded: Promise<void> | undefined;

async function seed(): Promise<void> {
  // Publish the older Dither Kit version first so the newer one supersedes it in `latest`.
  const oldAzp = writeAzp({
    manifest: DITHER_OLD,
    payload: { "code/index.js": utf8("export const applyDither = (ctx) => {};\n") },
    license: MIT_LICENSE,
  });
  await registry.publish(oldAzp.azp);

  for (const s of SEEDS) {
    const { azp } = writeAzp({ manifest: s.manifest, payload: s.payload, license: MIT_LICENSE });
    await registry.publish(azp);
  }

  // Simulate historical downloads so "popular" ordering is meaningful. `serve` counts a download.
  for (const s of SEEDS) {
    const n = s.simulatedDownloads ?? 0;
    for (let i = 0; i < n; i++) await registry.serve(s.manifest.id);
  }

  // Consign the packages flagged for sale onto the paid lane.
  for (const s of SEEDS) {
    if (s.listPriceCents != null && s.sellerId) {
      await market.listForSale(s.manifest.id, s.sellerId, {
        amountCents: s.listPriceCents,
        currency: "USD",
      });
    }
  }
}

/** Ensure the catalog is seeded, then hand back the shared registry + marketplace. */
export async function getCatalog(): Promise<{ registry: Registry; market: Marketplace }> {
  if (!seeded) seeded = seed();
  await seeded;
  return { registry, market };
}
