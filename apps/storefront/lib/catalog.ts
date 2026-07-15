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
  InMemoryStore,
  Marketplace,
  Registry,
  RegistryError,
  StubPaymentProvider,
  denyAllAuthorizer,
  issueEntitlement,
  type CheckoutSession,
  type DownloadAuthorizer,
  type EntitlementToken,
  type PriceBreakdown,
  type Listing,
} from "@azphalt/registry";
import type { Manifest } from "@azphalt/azdk";

/** SPDX MIT text stamped into every example package's required `LICENSE` entry. */
const MIT_LICENSE =
  "MIT License\n\nPermission is hereby granted, free of charge, to any person obtaining a copy " +
  "of this software and associated documentation files (the \"Software\"), to deal in the Software " +
  "without restriction. THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND.\n";

const utf8 = (s: string) => new TextEncoder().encode(s);

/**
 * A tiny self-contained SVG store-card swatch, so a package can ship a real in-package `preview.image`
 * (served by `/api/preview/[id]`). SVG-in-`<img>` can't run script, and the labels are static, so it's
 * safe to render. Kept small and deterministic.
 */
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
  /** Star ratings (0–5) to seed, so the "rating" sort and the rating badges have signal. */
  ratings?: number[];
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
// The stub provider is constructed here rather than left to Marketplace's default so that
// `fulfilStubCheckout` can reach `simulate()` — the dev-only stand-in for a provider's webhook.
const payments = new StubPaymentProvider();
const market = new Marketplace(registry, store, { payments });

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
 * Whether the dev-only stub fulfilment route is reachable (`AZPHALT_ALLOW_STUB_FULFILMENT=1`).
 *
 * It mints real, signed, offline-verifiable licenses for payments that never happened, so it is off
 * unless explicitly opted into. A deployment with this enabled is a demo, not a store.
 */
export const stubFulfilmentEnabled = process.env.AZPHALT_ALLOW_STUB_FULFILMENT === "1";

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
 * What each pending checkout session was for. {@link CheckoutSession} carries only `{id, url, status,
 * amount}` — not the package or buyer — so fulfilment would otherwise have to trust the caller's word
 * about what it just bought. Remembering it here means a token can only ever be minted for a session
 * this process actually opened.
 *
 * In-memory, and deliberately so: this only backs {@link fulfilStubCheckout}, which is dev-only, and
 * dev is a single process. `StubPaymentProvider` holds its sessions in memory too, so the whole stub
 * checkout flow is process-bound either way.
 */
const sessionSubjects = new Map<string, { packageId: string; buyerId: string }>();

/** Open a checkout session and remember what it was for, so {@link fulfilStubCheckout} can fulfil it. */
export async function startCheckout(
  packageId: string,
  buyerId: string,
): Promise<{ session: CheckoutSession; breakdown: PriceBreakdown; listing: Listing }> {
  const { market: m } = await getCatalog();
  const result = await m.checkout(packageId, buyerId);
  sessionSubjects.set(result.session.id, { packageId, buyerId });
  return result;
}

/**
 * Complete a stub session and issue its buy-once entitlement — the dev stand-in for a real provider's
 * webhook confirming payment. The claims come from the remembered session, never from the request.
 *
 * NO MONEY MOVES. The caller must have checked {@link stubFulfilmentEnabled} first.
 */
export async function fulfilStubCheckout(sessionId: string): Promise<EntitlementToken> {
  if (!signingKey) throw new RegistryError("cannot issue entitlements: AZPHALT_SIGNING_KEY is not set");
  const subject = sessionSubjects.get(sessionId);
  if (!subject) throw new RegistryError(`unknown checkout session: ${sessionId}`);

  const session = await payments.simulate(sessionId, "completed");
  if (session.status !== "completed") throw new RegistryError(`session did not complete: ${sessionId}`);

  return issueEntitlement(signingKey, {
    packageId: subject.packageId,
    subject: subject.buyerId,
    kind: "perpetual",
    issuedAt: new Date().toISOString(),
  });
}

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

  // Seed a few star ratings so the "rating" sort and the rating badges have signal.
  for (const s of SEEDS) {
    for (const stars of s.ratings ?? []) store.addRating(s.manifest.id, stars);
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
