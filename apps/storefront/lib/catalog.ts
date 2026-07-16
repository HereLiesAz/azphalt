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
import { StripePaymentProvider } from "./StripePaymentProvider";
import {
  EntitlementAuthorizer,
  InMemoryStore,
  Marketplace,
  Registry,
  RegistryError,
  denyAllAuthorizer,
  issueEntitlement,
  type CheckoutSession,
  type DownloadAuthorizer,
  type EntitlementToken,
  type PriceBreakdown,
  type Listing,
} from "@azphalt/registry";
import type { Manifest } from "@azphalt/azdk";



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

import { NpmStore } from "./backend";

/** The live registry + marketplace, wired to a single shared store as the marketplace requires. */
const store = new NpmStore();
const registry = new Registry(store);
const payments = new StripePaymentProvider();
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
 * What a package costs the caller: `paid` exactly when it carries an **active** consignment listing.
 * The same rule the reference server gates on (`apps/repository-server/src/handler.ts`).
 */
export async function priceStatus(id: string): Promise<"free" | "paid"> {
  await getCatalog();
  const listing = await market.getListing(id);
  return listing && listing.status === "active" ? "paid" : "free";
}

/** Open a checkout session and remember what it was for, so webhooks can fulfil it. */
export async function startCheckout(
  packageId: string,
  buyerId: string,
): Promise<{ session: CheckoutSession; breakdown: PriceBreakdown; listing: Listing }> {
  const { market: m } = await getCatalog();
  const result = await m.checkout(packageId, buyerId);
  return result;
}

/**
 * Seed the catalog exactly once. Memoized as a promise so concurrent requests (and Next's parallel
 * route rendering) all await the same in-flight seeding rather than racing to double-publish.
 */
let seeded: Promise<void> | undefined;

async function seed(): Promise<void> {
  // NpmStore is dynamically seeded from the NPM registry. Nothing to mock!
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
