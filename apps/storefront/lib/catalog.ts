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
import { createPrivateKey, createPublicKey } from "node:crypto";
import { readAzp, writeAzp } from "@azphalt/azp";
import {
  EntitlementAuthorizer,
  InMemoryEntitlementStore,
  InMemoryPaymentSessionStore,
  InMemorySellerAccountStore,
  InMemorySubscriptionStore,
  Marketplace,
  Registry,
  RegistryError,
  StripeConnect,
  StripePaymentProvider,
  StubPaymentProvider,
  denyAllAuthorizer,
  issueEntitlement,
  periodEnd,
  stripeConfigFromEnv,
  type CheckoutSession,
  type DownloadAuthorizer,
  type EntitlementStore,
  type EntitlementToken,
  type PaymentProvider,
  type PaymentSessionStore,
  type PriceBreakdown,
  type Listing,
  type RegistryStore,
  type Report,
  type ReportReason,
  type SellerAccount,
  type SellerAccountStore,
  type SubscriptionInterval,
  type SubscriptionStore,
} from "@azphalt/registry";
import type { Manifest, RepositoryIndex } from "@azphalt/azdk";



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

const MIT_LICENSE =
  "MIT License\n\nPermission is hereby granted, free of charge, to any person obtaining a copy " +
  "of this software and associated documentation files (the \"Software\"), to deal in the Software " +
  "without restriction. THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND.\n";


function utf8(str: string): Uint8Array { return new TextEncoder().encode(str); }

function svgSwatch(from: string, to: string, label: string): Uint8Array {
  return utf8(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180" role="img" aria-label="${label}">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>` +
      `<rect width="320" height="180" fill="url(#g)"/>` +
      `<text x="16" y="166" font-family="sans-serif" font-size="14" fill="#ffffff" opacity="0.9">${label}</text>` +
      `</svg>`,
  );
}

function cubeLut(title: string): Uint8Array {
  return utf8(
    `TITLE "${title}"\nLUT_3D_SIZE 2\n` +
      "0.0 0.0 0.0\n1.0 0.0 0.0\n0.0 1.0 0.0\n1.0 1.0 0.0\n" +
      "0.0 0.0 1.0\n1.0 0.0 1.0\n0.0 1.0 1.0\n1.0 1.0 1.0\n",
  );
}

interface Seed {
  manifest: Omit<Manifest, "files">;
  payload: Record<string, Uint8Array>;
  /** Extra download count to simulate (via repeated `serve`) so browse-by-popularity has signal. */
  simulatedDownloads?: number;
  /** Star ratings (0–5) to seed, so the "rating" sort and the rating badges have signal. */
  ratings?: number[];
  /** When set, the package is consigned for sale at this price (minor units + ISO-4217 currency). */
  listPriceCents?: number;
  /** The consigning creator's marketplace account id (only used when `listPriceCents` is set). */
  sellerId?: string;
  /** When set (with `listPriceCents`), the listing is a **subscription** at that price per interval. */
  listInterval?: SubscriptionInterval;
}

/**
 * The example catalog. A spread of both `kind`s and every `assetType`, so every page has something
 * real to render: two executable filters (`kind: "code"`), and asset packs covering LUTs, brushes,
 * and patterns (`kind: "asset"`).
 */
const SEEDS: Seed[] = [

  {
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.mobilenetv3",
      name: "MobileNet V3 (Image Labeling)",
      version: "1.0.0",
      kind: "asset",
      license: "Apache-2.0",
      compat: ">=0.1",
      description: "Efficient image labeling and ID embedding model.",
      author: "Azphalt Core",
      homepage: "https://hereliesaz.com",
      assets: [
        { path: "assets/mobilenetv3.tflite", type: "tflite", role: "labeling" },
        { path: "assets/mobilenetv3.onnx", type: "onnx", role: "labeling" }
      ]
    },
    payload: {
      "LICENSE": utf8(MIT_LICENSE),
      "assets/mobilenetv3.tflite": new Uint8Array(100),
      "assets/mobilenetv3.onnx": new Uint8Array(100),
    }
  },
  {
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.yamnet",
      name: "YAMNet (Audio Events)",
      version: "1.0.0",
      kind: "asset",
      license: "Apache-2.0",
      compat: ">=0.1",
      description: "Audio event detection model.",
      author: "Azphalt Core",
      homepage: "https://hereliesaz.com",
      assets: [
        { path: "assets/yamnet.tflite", type: "tflite", role: "audio-event" },
        { path: "assets/yamnet.onnx", type: "onnx", role: "audio-event" }
      ]
    },
    payload: {
      "LICENSE": utf8(MIT_LICENSE),
      "assets/yamnet.tflite": new Uint8Array(100),
      "assets/yamnet.onnx": new Uint8Array(100),
    }
  },
  {
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.rfb-320",
      name: "RFB-320 (Face Detection)",
      version: "1.0.0",
      kind: "asset",
      license: "Apache-2.0",
      compat: ">=0.1",
      description: "Lightweight face detection model.",
      author: "Azphalt Core",
      homepage: "https://hereliesaz.com",
      assets: [
        { path: "assets/version-RFB-320.onnx", type: "onnx", role: "face-detect" }
      ]
    },
    payload: {
      "LICENSE": utf8(MIT_LICENSE),
      "assets/version-RFB-320.onnx": new Uint8Array(100),
    }
  },
  {
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.selfie-segmentation",
      name: "Selfie Segmentation",
      version: "1.0.0",
      kind: "asset",
      license: "Apache-2.0",
      compat: ">=0.1",
      description: "Subject segmentation model.",
      author: "Azphalt Core",
      homepage: "https://hereliesaz.com",
      assets: [
        { path: "assets/selfie_segmentation.tflite", type: "tflite", role: "segmentation" },
        { path: "assets/selfie_segmentation.onnx", type: "onnx", role: "segmentation" }
      ]
    },
    payload: {
      "LICENSE": utf8(MIT_LICENSE),
      "assets/selfie_segmentation.tflite": new Uint8Array(100),
      "assets/selfie_segmentation.onnx": new Uint8Array(100),
    }
  },
  {
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.face-embed",
      name: "Face Embedding",
      version: "1.0.0",
      kind: "asset",
      license: "Apache-2.0",
      compat: ">=0.1",
      description: "Face embedding model for ID matching.",
      author: "Azphalt Core",
      homepage: "https://hereliesaz.com",
      assets: [
        { path: "assets/face-embed.tflite", type: "tflite", role: "face-embedding" }
      ]
    },
    payload: {
      "LICENSE": utf8(MIT_LICENSE),
      "assets/face-embed.tflite": new Uint8Array(100),
    }
  },
  {
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.face-detect",
      name: "Face Detect (TFLite)",
      version: "1.0.0",
      kind: "asset",
      license: "Apache-2.0",
      compat: ">=0.1",
      description: "TFLite face detection for mobile.",
      author: "Azphalt Core",
      homepage: "https://hereliesaz.com",
      assets: [
        { path: "assets/face-detect.tflite", type: "tflite", role: "face-detect" }
      ]
    },
    payload: {
      "LICENSE": utf8(MIT_LICENSE),
      "assets/face-detect.tflite": new Uint8Array(100),
    }
  },

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
    ratings: [5, 5, 4, 5, 4, 5, 3, 5, 4, 5],
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
      preview: { image: "preview/card.svg" },
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
      "preview/card.svg": svgSwatch("#0e7c86", "#f08a24", "CineGrade LUT Pack"),
    },
    simulatedDownloads: 1310,
    ratings: [5, 4, 5, 5, 4, 4],
    listPriceCents: 1200,
    sellerId: "seller_studioaz",
    // Consigned as a monthly subscription — fulfilment issues an expiring entitlement the gate honors.
    listInterval: "month",
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
    ratings: [5, 5, 5, 4, 5, 4, 5],
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
    // A companion app (kind:"app") — an external Android app / PWA the host launches over a handoff
    // and gets a validated result back (companion-app.md). App-scoped to GraffitiXR's store. Carries
    // no /code and no assets — just the header that says how to install and invoke the app.
    manifest: {
      azphalt: "0.1",
      id: "com.acme.ar-stencil-capture",
      name: "AR Stencil Capture",
      version: "1.0.0",
      kind: "app",
      license: "MIT",
      compat: ">=0.1",
      description:
        "Capture a wall stencil in AR and hand it straight back to your editor. A companion app: it " +
        "runs in the OS's own sandbox with its own camera permission — azphalt only standardizes the " +
        "handoff, so the moat holds.",
      author: "Acme AR",
      homepage: "https://arstencil.acme.com",
      preview: { image: "preview/card.svg" },
      targetApps: ["com.hereliesaz.graffitixr"],
      app: {
        platforms: {
          android: {
            packageId: "com.acme.arstencil",
            minSdk: 29,
            minVersionCode: 120,
            install: "https://play.google.com/store/apps/details?id=com.acme.arstencil",
          },
          pwa: {
            manifestUrl: "https://arstencil.acme.com/manifest.webmanifest",
            startUrl: "https://arstencil.acme.com/",
            version: "2026-06-01T00:00:00Z",
            shareTargetUrl: "https://arstencil.acme.com/handoff",
          },
        },
        handoffs: [
          {
            id: "capture-stencil",
            action: "capture",
            name: "Capture AR Stencil",
            input: { assets: ["image"], params: { wallWidthMm: "number?" } },
            output: { assets: ["vector", "image"], params: { scaleMm: "number?" } },
            transport: {
              android: {
                intentAction: "com.acme.arstencil.CAPTURE",
                resultMimeTypes: ["image/svg+xml", "image/png"],
              },
              pwa: { shareTargetUrl: "https://arstencil.acme.com/handoff/capture", return: { kind: "postMessage" } },
            },
          },
          {
            id: "measure-wall",
            action: "measure",
            name: "Measure Wall",
            input: { assets: ["image"] },
            output: { params: { widthMm: "number", heightMm: "number" } },
            minAppVersion: { android: 130, pwa: "2026-06-15T00:00:00Z" },
            transport: {
              android: { intentAction: "com.acme.arstencil.MEASURE" },
              pwa: { return: { kind: "postMessage" } },
            },
          },
        ],
      },
    },
    payload: { "preview/card.svg": svgSwatch("#5b21b6", "#7db7ff", "AR Stencil Capture") },
    simulatedDownloads: 760,
    ratings: [5, 4, 5, 4],
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
  {
    // Phase 2: Massive AI Model (Sherpa-ONNX Transcription)
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.sherpa-onnx",
      name: "Sherpa-ONNX Whisper Base",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "Local Whisper Base model for Sherpa-ONNX transcription. Downloaded by Guillotine for precise offline transcription.",
      author: "Azphalt Models",
      capabilities: ["assets"],
      assets: [
        { type: "model", path: "assets/whisper-base.onnx" },
        { type: "model", path: "assets/tokens.txt" }
      ],
    },
    payload: {
      // We mock the payload bytes here (tiny 1KB dummy files) to prevent InMemoryStore from crashing the Node process.
      "assets/whisper-base.onnx": utf8("MOCK_ONNX_BYTES_WHISPER"),
      "assets/tokens.txt": utf8("MOCK_TOKENS_WHISPER"),
    },
    simulatedDownloads: 8900,
  },
  {
    // Phase 2: Massive AI Model (Depth Anything V2)
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.model.depth-anything",
      name: "Depth Anything V2",
      version: "2.1.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "Monocular depth estimation model for generative object removal and background blur.",
      author: "Azphalt Models",
      capabilities: ["assets"],
      assets: [
        { type: "model", path: "assets/depth-anything-v2.onnx" }
      ],
    },
    payload: {
      "assets/depth-anything-v2.onnx": utf8("MOCK_ONNX_BYTES_DEPTH"),
    },
    simulatedDownloads: 5400,
  },

  {
    manifest: {
      azphalt: "0.1", id: "com.azphalt.model.vosk", name: "Vosk Transcription", version: "0.22.0", kind: "asset", license: "MIT", compat: ">=0.1",
      description: "Offline speech-to-text model for clip transcription.", author: "Azphalt Models", capabilities: ["assets"],
      assets: [{ type: "model", path: "assets/vosk-model" }]
    },
    payload: { "assets/vosk-model": utf8("MOCK_VOSK_BYTES") }, simulatedDownloads: 6200
  },
  {
    manifest: {
      azphalt: "0.1", id: "com.azphalt.model.spleeter", name: "Spleeter Stem Separation", version: "2.0.0", kind: "asset", license: "MIT", compat: ">=0.1",
      description: "Separate vocals and accompaniment via ONNX Spleeter.", author: "Azphalt Models", capabilities: ["assets"],
      assets: [{ type: "model", path: "assets/spleeter.onnx" }]
    },
    payload: { "assets/spleeter.onnx": utf8("MOCK_ONNX_BYTES_SPLEETER") }, simulatedDownloads: 7100
  },

  {
    manifest: {
      azphalt: "0.1", id: "com.azphalt.model.image-effects", name: "Image Effects Pack", version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1",
      description: "TFLite models for super resolution and style transfer.", author: "Azphalt Models", capabilities: ["assets"],
      assets: [{ type: "model", path: "assets/effects.tflite" }]
    },
    payload: { "assets/effects.tflite": utf8("MOCK_TFLITE_BYTES_EFFECTS") }, simulatedDownloads: 4800
  },
  {
    manifest: {
      azphalt: "0.1", id: "com.azphalt.model.vlm-gemma", name: "Gemma VLM", version: "3.0.0", kind: "asset", license: "MIT", compat: ">=0.1",
      description: "Multimodal VLM .task for rich frame captioning.", author: "Azphalt Models", capabilities: ["assets"],
      assets: [{ type: "model", path: "assets/gemma-3n.task" }]
    },
    payload: { "assets/gemma-3n.task": utf8("MOCK_TASK_BYTES_GEMMA") }, simulatedDownloads: 5100
  },
  {
    // An extension pack (kind:"pack") — a curated "starter set" that *references* other packages, two of
    // them by other authors, plus a paid one. It carries no payload; a host resolves + installs each
    // member individually (the paid one still needs its own entitlement). Demonstrates the pack model.
    manifest: {
      azphalt: "0.1",
      id: "com.hereliesaz.paint-starter",
      name: "Paint Starter Pack",
      version: "1.0.0",
      kind: "pack",
      license: "MIT",
      compat: ">=0.1",
      description:
        "A recommended starter set for a paint host: free film LUTs and ink brushes (the base set), plus " +
        "the Halftone filter as an optional paid add-on. A pack references other creators' packages — it " +
        "doesn't re-bundle them.",
      author: "Az",
      homepage: "https://hereliesaz.com",
      pack: {
        entries: [
          { id: "com.foldlab.filmluts", required: true, note: "free film-stock LUTs" },
          { id: "com.brushery.inkbrushes", required: true, note: "ink & sumi brushes" },
          { id: "com.hereliesaz.halftone", required: false, note: "premium halftone filter (paid)" },
        ],
      },
    },
    payload: {},
    simulatedDownloads: 320,
  }
];

import { NpmStore } from "./backend";
import { createVercelStores } from "@azphalt/registry-store-vercel";

/* ─────────────────────────── Store selection ───────────────────────────
 * `DATABASE_URL` **and** `BLOB_READ_WRITE_TOKEN` both present ⇒ the durable Neon + Blob backend, so
 * catalog, listings, checkout sessions and issued entitlements survive a restart and are shared across
 * serverless instances. Otherwise the ephemeral `NpmStore` + in-memory sessions/entitlements with
 * module-load seeding — so `next dev` and the tests run with no services and no credentials. */
const DATABASE_URL = process.env.DATABASE_URL;
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const durable = Boolean(DATABASE_URL && BLOB_READ_WRITE_TOKEN);

const vercel = durable
  ? createVercelStores({ connectionString: DATABASE_URL!, blobToken: BLOB_READ_WRITE_TOKEN! })
  : undefined;

/** The live registry + marketplace, wired to a single shared store as the marketplace requires. */
const store = vercel?.store ?? new NpmStore();
const registry = new Registry(store);

/** Where checkout sessions and issued entitlements live — durable, or process-local for dev/tests. */
const sessions: PaymentSessionStore = vercel?.sessions ?? new InMemoryPaymentSessionStore();
/** Fulfilled purchases, keyed by checkout session (the buyer's retrievable license). */
export const entitlements: EntitlementStore = vercel?.entitlements ?? new InMemoryEntitlementStore();
/** Onboarded seller → Stripe connected-account mappings — durable, or process-local for dev/tests. */
export const sellerAccounts: SellerAccountStore = vercel?.sellerAccounts ?? new InMemorySellerAccountStore();
/** Active subscriptions (processor subscription id → grant), so a renewal invoice can re-issue access. */
export const subscriptions: SubscriptionStore = vercel?.subscriptions ?? new InMemorySubscriptionStore();

/**
 * The payment provider. `AZPHALT_STRIPE_SECRET_KEY` present ⇒ the real split-payout Stripe Connect
 * provider (destination charges: platform fee retained, remainder transferred to the seller's
 * connected account). Absent ⇒ the `StubPaymentProvider`, which records sessions but moves no money,
 * so dev and tests need no secrets or network. See apps/storefront/README.md § payments.
 */
const usingStripe = Boolean(process.env.AZPHALT_STRIPE_SECRET_KEY);

/** The Stripe Connect onboarding surface, when Stripe is configured; else undefined. */
export const sellerConnect: StripeConnect | undefined = usingStripe
  ? new StripeConnect({ secretKey: process.env.AZPHALT_STRIPE_SECRET_KEY! })
  : undefined;

/**
 * Resolve a marketplace `sellerId` to the seller's Stripe **connected account** (`acct_…`) the payout
 * routes to. Preference order: (1) the durable {@link sellerAccounts} store — where self-service
 * onboarding records each seller's account — but only once Stripe reports the account can accept
 * charges, so a buyer is never charged for a seller who can't yet receive it; (2) the operator config
 * `AZPHALT_STRIPE_CONNECTED_ACCOUNTS` (`{"seller_x":"acct_…"}`) as a fallback for a fixed roster. A
 * `sellerId` resolved by neither is a hard error, not a silent misroute.
 */
/** The operator-configured `sellerId → acct_…` fallback map. Parsed once and cached. */
let connectedAccountsEnv: Record<string, string> | undefined;
function envConnectedAccounts(): Record<string, string> {
  if (connectedAccountsEnv === undefined) {
    try {
      connectedAccountsEnv = JSON.parse(process.env.AZPHALT_STRIPE_CONNECTED_ACCOUNTS ?? "{}") as Record<string, string>;
    } catch (e) {
      throw new RegistryError(`AZPHALT_STRIPE_CONNECTED_ACCOUNTS is not valid JSON: ${(e as Error).message}`);
    }
  }
  return connectedAccountsEnv;
}

async function connectedAccountFor(sellerId: string): Promise<string> {
  const onboarded = await sellerAccounts.get(sellerId);
  if (onboarded) {
    if (!onboarded.chargesEnabled) {
      throw new RegistryError(`seller ${sellerId} has not finished Stripe onboarding (charges not enabled)`);
    }
    return onboarded.accountId;
  }
  // An operator-configured seller is never in the store (self-onboarding is refused for them, so an
  // attacker can't insert a store record that overrides the operator's payout destination).
  const account = envConnectedAccounts()[sellerId];
  if (!account) throw new RegistryError(`no Stripe connected account for seller: ${sellerId} (not onboarded, no env mapping)`);
  return account;
}

/** Whether a Stripe error means the referenced connected account no longer exists (deleted/rejected). */
function isMissingAccountError(e: unknown): boolean {
  return /no such account|resource_missing|does not exist/i.test((e as Error)?.message ?? "");
}

const payments: PaymentProvider = usingStripe
  ? new StripePaymentProvider(stripeConfigFromEnv(process.env, { connectedAccountFor }))
  : new StubPaymentProvider({ sessions });

/** The stub provider when in stub mode (its dev-only `simulate`/`getInput` fulfilment path), else undefined. */
const stub = usingStripe ? undefined : (payments as StubPaymentProvider);

/** `"stripe"` when real split-payout checkout is configured, else `"stub"` (moves no money). */
export const paymentsMode: "stripe" | "stub" = usingStripe ? "stripe" : "stub";

const market = new Marketplace(registry, store, { payments });

/** A store that also records ratings and (for the npm proxy) can reserve local-only ids — both used by seeding. */
type RegistryStoreWithRatings = RegistryStore & {
  addRating?: (id: string, stars: number) => Promise<void> | void;
  reserveLocal?: (id: string) => void;
};

/* ─────────────────────────── Seller onboarding (Stripe Connect) ─────────────────────────── */

/** Whether self-service Stripe Connect onboarding is available (Stripe configured). */
export const onboardingEnabled = Boolean(sellerConnect);

/**
 * Begin (or resume) a seller's Stripe **Express** onboarding: create their connected account the first
 * time and persist the mapping, then mint a fresh Stripe-hosted onboarding link to redirect them to.
 * Idempotent on the seller — a repeat reuses the existing account and just issues a new link. Throws
 * when Stripe isn't configured.
 */
export async function onboardSeller(
  sellerId: string,
  opts: { returnUrl: string; refreshUrl: string; email?: string; country?: string },
): Promise<{ url: string; accountId: string }> {
  if (!sellerConnect) throw new RegistryError("Stripe Connect is not configured (AZPHALT_STRIPE_SECRET_KEY unset)");
  // An operator-configured seller (env map) must NOT be self-onboarded: doing so would insert a store
  // record that overrides the operator's payout destination (a payout-hijack). They are managed via env.
  if (envConnectedAccounts()[sellerId]) {
    throw new RegistryError(`seller ${sellerId} is operator-configured and cannot be onboarded via self-service`);
  }

  const connect = sellerConnect; // narrowed for the closures below
  const createAndStore = async (): Promise<SellerAccount> => {
    const created = await connect.createExpressAccount({ email: opts.email, country: opts.country });
    const record: SellerAccount = {
      sellerId,
      accountId: created.accountId,
      chargesEnabled: created.chargesEnabled,
      payoutsEnabled: created.payoutsEnabled,
      detailsSubmitted: created.detailsSubmitted,
      updatedAt: new Date().toISOString(),
    };
    await sellerAccounts.put(record);
    return record;
  };

  let record = (await sellerAccounts.get(sellerId)) ?? (await createAndStore());
  try {
    const { url } = await connect.createAccountLink(record.accountId, {
      returnUrl: opts.returnUrl,
      refreshUrl: opts.refreshUrl,
    });
    return { url, accountId: record.accountId };
  } catch (e) {
    // The stored account was deleted/closed on Stripe — recreate a fresh one and re-link, so a seller
    // is never permanently stuck pointing at a dead account. Any other error propagates.
    if (!isMissingAccountError(e)) throw e;
    record = await createAndStore();
    const { url } = await connect.createAccountLink(record.accountId, {
      returnUrl: opts.returnUrl,
      refreshUrl: opts.refreshUrl,
    });
    return { url, accountId: record.accountId };
  }
}

/** Refresh a connected account's capability flags from Stripe and persist them (for `account.updated`). */
export async function refreshSellerAccount(accountId: string): Promise<SellerAccount | undefined> {
  if (!sellerConnect) return undefined;
  const existing = await sellerAccounts.getByAccountId(accountId);
  if (!existing) return undefined;
  const status = await sellerConnect.getAccount(accountId);
  const updated: SellerAccount = {
    ...existing,
    chargesEnabled: status.chargesEnabled,
    payoutsEnabled: status.payoutsEnabled,
    detailsSubmitted: status.detailsSubmitted,
    updatedAt: new Date().toISOString(),
  };
  await sellerAccounts.put(updated);
  return updated;
}

/** A seller's onboarding record — optionally refreshed live from Stripe — or `undefined` if not onboarded. */
export async function sellerStatus(sellerId: string, refresh = false): Promise<SellerAccount | undefined> {
  const record = await sellerAccounts.get(sellerId);
  if (!record) return undefined;
  if (refresh && sellerConnect) {
    // A live refresh can throw (Stripe hiccup, rate limit, a deleted account). Serve the last-known
    // stored view rather than failing the whole status check.
    try {
      return (await refreshSellerAccount(record.accountId)) ?? record;
    } catch {
      return record;
    }
  }
  return record;
}

/* ─────────────────────────── The paid lane's gate ─────────────────────────── */

/**
 * The registry's Ed25519 signing key (PEM PKCS#8), from `AZPHALT_SIGNING_KEY`.
 *
 * Unset is the safe default, not a broken one: with no key the storefront can neither issue nor
 * verify entitlements, so {@link authorizer} denies every paid download (`401`) and issuance is off.
 * That keeps `next dev` and the tests running with no secrets and no services, and makes gating a
 * deliberate deployment choice rather than something that silently half-works.
 *
 * Generate one with: `openssl genpkey -algorithm ed25519`.
 */
const signingKey = process.env.AZPHALT_SIGNING_KEY?.trim() || undefined;

/** The base64 SPKI DER public key for [pem] — the form `verifyEntitlement` matches `trustedKeys` on. */
function publicKeyOf(pem: string): string {
  const key = createPrivateKey(pem);
  if (key.asymmetricKeyType !== "ed25519") {
    throw new Error("AZPHALT_SIGNING_KEY must be an ed25519 private key (openssl genpkey -algorithm ed25519)");
  }
  return Buffer.from(createPublicKey(key).export({ type: "spki", format: "der" })).toString("base64");
}

/**
 * Gates paid downloads. A key present ⇒ trust entitlements this storefront signed; absent ⇒ deny all.
 *
 * A malformed key throws at module load rather than degrading to `denyAll`: a deployment that meant
 * to enable the paid lane should fail loudly, not serve `401`s that look like a working gate.
 */
export const authorizer: DownloadAuthorizer = signingKey
  ? new EntitlementAuthorizer([publicKeyOf(signingKey)])
  : denyAllAuthorizer;

/**
 * What a package costs the caller: `paid` exactly when it carries an **active** consignment listing.
 * The same rule the reference server gates on (`apps/repository-server/src/handler.ts`).
 */
export async function priceStatus(id: string): Promise<"free" | "paid"> {
  await getCatalog();
  const listing = await market.getListing(id);
  return listing && listing.status === "active" ? "paid" : "free";
}

/**
 * The `GET /.well-known/azphalt-repository.json` document a host reads on first contact. Deliberately
 * **cheap and static** — it is built once when the Repository API handler is constructed (which every
 * endpoint's first call triggers), so it must never scan the catalog: doing so would make a cold
 * `download` pay to load every package summary just to fill in a discovery hint. Its most important
 * job is the trust bootstrap — when signing is configured it advertises the Ed25519 public key(s) a
 * host adds to its trust store to verify this store's buy-once entitlement tokens **offline** (spec
 * `repository-api.md` § Trust bootstrap). `supportedTypes` is intentionally omitted (spec-legal:
 * "Absent = unspecified" — a host learns the catalog's types from `GET /packages?types=`).
 */
export function buildRepositoryIndex(): RepositoryIndex {
  const index: RepositoryIndex = {
    name: "azphalt Store",
    version: "0.1",
    description:
      "The azphalt consignment marketplace, served as a conforming Repository API — browse, search, " +
      "and download portable .azp extensions from any host via @azphalt/repository-client.",
  };
  // Only advertise a signing key when issuance is actually on; otherwise a host would trust a key this
  // store never signs with. Absent ⇒ the store serves only the free lane (paid downloads 401).
  if (signingKey) {
    index.signingKeys = [{ publicKey: publicKeyOf(signingKey), label: "azphalt store entitlement key" }];
  }
  return index;
}

/** Open a checkout session. The provider now records the session **and its input**, so fulfilment can
 * later resolve what the session was for from stored state — never from a request body. */
export async function startCheckout(
  packageId: string,
  buyerId: string,
): Promise<{ session: CheckoutSession; breakdown: PriceBreakdown; listing: Listing }> {
  const { market: m } = await getCatalog();
  return m.checkout(packageId, buyerId);
}

/* ─────────────────────────── Fulfilment ─────────────────────────── */

/** The wire form of an entitlement — base64-encoded JSON — that the download gate decodes as a Bearer credential. */
function encodeToken(token: EntitlementToken): string {
  return Buffer.from(JSON.stringify(token), "utf8").toString("base64");
}

/**
 * Turn a **settled** checkout into a durable, retrievable license: mint the entitlement (once) and
 * store it keyed by the checkout session, returning the Bearer token. Idempotent on `sessionId` — a
 * webhook retry, or the buyer's return page and the webhook racing, reuses the first-issued token
 * rather than minting a second. Returns `null` when issuance is disabled (`AZPHALT_SIGNING_KEY`
 * unset), so callers surface that instead of a broken token.
 *
 * This never trusts a caller: the real Stripe path calls it only from a signature-verified
 * `checkout.session.completed` webhook, and the stub path only behind the dev opt-in.
 */
export async function fulfil(
  sessionId: string,
  packageId: string,
  subject: string,
  interval?: SubscriptionInterval,
): Promise<string | null> {
  await getCatalog();
  const existing = await entitlements.getBySession(sessionId);
  if (existing) return encodeToken(existing.token);
  if (!signingKey) return null;
  const issuedAt = new Date().toISOString();
  // A subscription grants an *expiring* entitlement for the current period (the download gate checks
  // expiry via verifyEntitlement's `live`); a one-time sale grants a perpetual one.
  const claims = interval
    ? { kind: "subscription" as const, packageId, subject, issuedAt, expiresAt: periodEnd(issuedAt, interval) }
    : { kind: "perpetual" as const, packageId, subject, issuedAt };
  const token = issueEntitlement(signingKey, claims);
  await entitlements.put({ sessionId, packageId, subject, token, issuedAt });
  return encodeToken(token);
}

/* ─────────────────────────── Subscription renewal ─────────────────────────── */

/**
 * Remember an active subscription so a later renewal invoice can re-issue access. Called from the
 * `checkout.session.completed` webhook for a subscription, once the first period is fulfilled.
 */
export async function recordSubscription(record: {
  subscriptionId: string;
  packageId: string;
  subject: string;
  interval: SubscriptionInterval;
}): Promise<void> {
  await getCatalog();
  await subscriptions.put(record);
}

/**
 * Renew a subscription's access: issue a **fresh** expiring entitlement for the new period, keyed by
 * the renewal invoice id (idempotent — a re-delivered `invoice.paid` re-issues nothing). Returns the
 * new Bearer token, `null` if issuance is off, or `undefined` if the subscription is unknown (already
 * cancelled). The buyer picks up the new token via `/api/purchases` (their newest live license).
 */
export async function renewSubscription(subscriptionId: string, invoiceId: string): Promise<string | null | undefined> {
  await getCatalog();
  const record = await subscriptions.get(subscriptionId);
  if (!record) return undefined;
  return fulfil(invoiceId, record.packageId, record.subject, record.interval);
}

/** Drop a cancelled/ended subscription — future invoices won't renew it; the last entitlement expires. */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  await getCatalog();
  await subscriptions.delete(subscriptionId);
}

/** The Bearer token already issued for a settled checkout session, or `null` if none yet (e.g. webhook pending). */
export async function issuedToken(sessionId: string): Promise<string | null> {
  await getCatalog();
  const record = await entitlements.getBySession(sessionId);
  return record ? encodeToken(record.token) : null;
}

/** One recovered purchase — the package, when it was licensed, and the Bearer token to download it. */
export interface Purchase {
  packageId: string;
  sessionId: string;
  issuedAt: string;
  token: string;
}

/**
 * Every entitlement issued to a buyer, newest-first — the buyer's "my purchases" recovery view. Each
 * carries its Bearer `token`, so a buyer who lost the one shown on `/checkout/success` can get it back
 * and download again. (Like the rest of this reference storefront it has no buyer authentication; a
 * production deployment gates this behind the buyer's session.)
 */
export async function listPurchases(subject: string): Promise<Purchase[]> {
  await getCatalog();
  const records = await entitlements.listBySubject(subject);
  return records.map((r) => ({
    packageId: r.packageId,
    sessionId: r.sessionId,
    issuedAt: r.issuedAt,
    token: encodeToken(r.token),
  }));
}

/**
 * File an abuse/quality report against a package (marketplace-integrity § 2). A web report is
 * **untrusted** — it queues for review but never trips the auto-quarantine threshold on its own.
 * Returns whether this report tipped a version into quarantine (only possible via trusted reports).
 */
export async function fileReport(input: {
  packageId: string;
  version?: string;
  reason: ReportReason;
  detail?: string;
}): Promise<{ quarantined: boolean }> {
  const { registry } = await getCatalog();
  const result = await registry.report({ ...input, trusted: false });
  return { quarantined: result.quarantined };
}

/**
 * Every report across the catalog, newest-first — the moderation queue. Aggregated by walking known
 * package ids (the reference store has no cross-package report index; a production store would). Like
 * the rest of this reference storefront it has **no moderator authentication** — a real deployment
 * gates this behind a moderator session (the spec's `GET /reports` is authenticated).
 */
export async function listAllReports(): Promise<Report[]> {
  await getCatalog();
  const ids = await store.allPackageIds();
  // Fetch every package's reports concurrently rather than one-at-a-time.
  const perPackage = await Promise.all(ids.map((id) => registry.reports(id)));
  return perPackage.flat().sort((a, b) => (a.reportedAt < b.reportedAt ? 1 : a.reportedAt > b.reportedAt ? -1 : 0));
}

/** The originating input for a **stub** checkout session (dev fulfilment). Undefined for the Stripe path. */
export async function stubSessionInput(
  sessionId: string,
): Promise<{ packageId: string; buyerId: string; interval?: SubscriptionInterval } | undefined> {
  if (!stub) return undefined;
  await getCatalog();
  const record = await sessions.get(sessionId);
  if (!record) return undefined;
  return { packageId: record.input.packageId, buyerId: record.input.buyerId, interval: record.input.interval };
}

/** Mark a stub session completed (dev fulfilment). A no-op when the real Stripe provider is active. */
export async function completeStubSession(sessionId: string): Promise<void> {
  if (stub) await stub.simulate(sessionId, "completed");
}

/* ─────────────────────────── Seeding ─────────────────────────── */

/**
 * Publish the example catalog into `reg`/`mkt` over `str`. Shared by module-load dev seeding and the
 * standalone `seed` script.
 *
 * `opts.idempotent` (the durable seed script) skips any version already present — publish, downloads,
 * ratings, and listing — so re-running is safe against a persistent store where `registry.publish`
 * rejects duplicates. It is **off** for the ephemeral module-load path: that store starts empty every
 * process (so there is nothing to skip), and its `getVersion` is a network-backed npm proxy — probing
 * it per seed would hang seeding on lookups for ids that aren't on npm.
 */
export async function seedCatalog(
  reg: Registry,
  mkt: Marketplace,
  str: RegistryStoreWithRatings,
  opts: { idempotent?: boolean } = {},
): Promise<void> {
  const { idempotent = false } = opts;

  // Reserve every seed id as local-only up front (the npm-proxy store honours this), so
  // `registry.publish`'s pre-publish duplicate check resolves offline instead of firing one npm
  // lookup per seed. A durable store has no such method (its getVersion is a fast DB read).
  str.reserveLocal?.(DITHER_OLD.id);
  for (const s of SEEDS) str.reserveLocal?.(s.manifest.id);

  // Publish the older Dither Kit version first so the newer one supersedes it in `latest`.
  if (!idempotent || !(await str.getVersion(DITHER_OLD.id, DITHER_OLD.version))) {
    const oldAzp = writeAzp({
      manifest: DITHER_OLD,
      payload: { "code/index.js": utf8("export const applyDither = (ctx) => {};\n") },
      license: MIT_LICENSE,
    });
    await reg.publish(oldAzp.azp);
  }

  for (const s of SEEDS) {
    // Per-(id, version) idempotency: skip a version we already have, and everything that hangs off it.
    if (idempotent && (await str.getVersion(s.manifest.id, s.manifest.version))) continue;

    const { azp } = writeAzp({ manifest: s.manifest, payload: s.payload, license: MIT_LICENSE });
    await reg.publish(azp);

    // Simulate historical downloads in one atomic bump — O(1), not an N-round-trip `serve` loop
    // (a durable store would otherwise make thousands of Blob fetches just to seed a counter).
    if (s.simulatedDownloads) await str.incrementDownloads(s.manifest.id, s.manifest.version, s.simulatedDownloads);

    // Seed star ratings so the "rating" sort and badges have signal.
    for (const stars of s.ratings ?? []) await str.addRating?.(s.manifest.id, stars);

    // Consign the packages flagged for sale onto the paid lane.
    if (s.listPriceCents != null && s.sellerId) {
      await mkt.listForSale(
        s.manifest.id,
        s.sellerId,
        { amountCents: s.listPriceCents, currency: "USD" },
        s.listInterval ? { interval: s.listInterval } : {},
      );
    }
  }
}

/**
 * Ensure the catalog is ready, then hand back the shared registry + marketplace. The **durable** store
 * is seeded out-of-band by the `seed` script (seeding at module load would have every cold serverless
 * instance re-`publish` and throw on the duplicate), so here it is a no-op; the **ephemeral** store is
 * seeded once, memoized so concurrent requests await one in-flight seeding rather than double-publishing.
 */
let seeded: Promise<void> | undefined;

export async function getCatalog(): Promise<{ registry: Registry; market: Marketplace }> {
  if (durable) return { registry, market };
  if (!seeded) seeded = seedCatalog(registry, market, store as RegistryStoreWithRatings);
  await seeded;
  return { registry, market };
}

/** MIME type for a preview image, inferred from its in-package extension. */
function previewMime(path: string): string {
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

/**
 * The static store-card preview for [id]: the bytes of the package's declared `manifest.preview.image`
 * plus its MIME type, or `null` when the package declares no in-package preview. The path is taken from
 * the **manifest** (never the request), so there is no user-controlled path — no traversal. Reads the
 * `.azp` via `store.getBytes`, which does **not** count a download (unlike `registry.serve`). An
 * `https:` preview URL is left to the client, not proxied here.
 */
export async function getPreviewImage(id: string): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  await getCatalog();
  const latest = await registry.latest(id);
  if (!latest) return null;
  const image = latest.manifest.preview?.image;
  if (!image || /^https?:/i.test(image)) return null;
  const azpBytes = await store.getBytes(id, latest.version);
  if (!azpBytes) return null;
  const { payload } = readAzp(azpBytes);
  const bytes = payload[image];
  if (!bytes) return null;
  return { bytes, contentType: previewMime(image) };
}
