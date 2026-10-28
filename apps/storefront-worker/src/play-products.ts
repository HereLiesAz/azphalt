/**
 * Keeps each host app's Play listing in step with azphalt's paid listings, so a third-party package
 * can be bought with Play Billing inside that app without its developer ever opening Play Console.
 *
 * For every active one-time listing, the matching one-time product (`monetization.onetimeproducts`,
 * the API Google now maintains in place of `inappproducts`) is upserted with `allowMissing=true`, its
 * regional prices derived from the listing price by `pricing:convertRegionPrices` (Play's own
 * regional price mapping, the API successor to Console price templates), and its purchase option is
 * activated. A paused listing's purchase option is deactivated; Play keeps the product so existing
 * buyers can still restore it.
 *
 * Idempotent: a product is only written when its fingerprint (id, price, currency, title, description,
 * status) changed since the last successful sync, so the cron that runs this does nothing most of the
 * time. Subscription listings are skipped: in-app Play sales are one-time products only.
 */
import { playApi, type Money, type ServiceAccount } from "./play";

export interface SyncListing {
  packageId: string;
  amountCents: number;
  currency: string;
  interval?: string;
  status?: string;
  playProductId?: string;
  package: { name: string; description?: string };
}

export interface ProductStore {
  /** The fingerprint last synced for this app's product, if any. */
  fingerprint(packageName: string, productId: string): Promise<string | undefined>;
  save(record: {
    packageName: string;
    productId: string;
    packageId: string;
    fingerprint: string;
    regionPrices: Record<string, { currency: string; micros: number }>;
    syncedAt: string;
  }): Promise<void>;
}

export const PURCHASE_OPTION_ID = "buy";
/** The regions version Google requires on onetimeproducts writes. */
export const REGIONS_VERSION = "2022/02";

export function playSkuFor(packageId: string): string {
  return packageId.toLowerCase().replace(/[^a-z0-9_.]/g, "_");
}

export function productIdFor(listing: SyncListing): string {
  return listing.playProductId || playSkuFor(listing.packageId);
}

export function centsToMoney(cents: number, currency: string): Money {
  return { currencyCode: currency.toUpperCase(), units: String(Math.floor(cents / 100)), nanos: (cents % 100) * 10_000_000 };
}

async function fingerprintOf(listing: SyncListing): Promise<string> {
  const material = JSON.stringify([
    productIdFor(listing), listing.amountCents, listing.currency.toUpperCase(),
    title(listing), description(listing), listing.status ?? "paused",
  ]);
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material)));
  return Array.from(digest).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Play limits: title ≤ 55, description ≤ 200 characters. */
function title(l: SyncListing): string {
  return l.package.name.slice(0, 55) || l.packageId.slice(0, 55);
}
function description(l: SyncListing): string {
  return (l.package.description || l.package.name).slice(0, 200);
}

export interface SyncResult {
  packageName: string;
  created: string[];
  updated: string[];
  deactivated: string[];
  unchanged: string[];
  skipped: { productId: string; reason: string }[];
  failed: { productId: string; error: string }[];
}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

/** Sync every listing into one app's Play catalogue. Errors are per product; one bad listing never stops the rest. */
export async function syncPlayProducts(input: {
  packageName: string;
  serviceAccount: ServiceAccount;
  listings: SyncListing[];
  store: ProductStore;
  fetchImpl?: FetchLike;
  now?: Date;
}): Promise<SyncResult> {
  const { packageName, serviceAccount: account, store, fetchImpl } = input;
  const result: SyncResult = { packageName, created: [], updated: [], deactivated: [], unchanged: [], skipped: [], failed: [] };
  const app = "/" + encodeURIComponent(packageName);

  for (const listing of input.listings) {
    const productId = productIdFor(listing);
    if (listing.interval) {
      result.skipped.push({ productId, reason: "subscription listings are not sold through Play in host apps" });
      continue;
    }
    if (!/^[a-z0-9][a-z0-9_.]{0,138}$/.test(productId)) {
      result.skipped.push({ productId, reason: "not a valid Play product id" });
      continue;
    }
    try {
      const fingerprint = await fingerprintOf(listing);
      const previous = await store.fingerprint(packageName, productId);
      if (previous === fingerprint) {
        result.unchanged.push(productId);
        continue;
      }
      const active = (listing.status ?? "paused") === "active";
      const productPath = app + "/onetimeproducts/" + encodeURIComponent(productId);

      if (!active) {
        if (previous === undefined) {
          // Never on Play and not on sale: nothing to create.
          result.skipped.push({ productId, reason: "listing is paused and was never synced" });
          continue;
        }
        await playApi(account, "POST", productPath + "/purchaseOptions:batchUpdateStates", {
          requests: [{
            deactivatePurchaseOptionRequest: { packageName, productId, purchaseOptionId: PURCHASE_OPTION_ID, latencyTolerance: "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" },
          }],
        }, fetchImpl);
        await store.save({ packageName, productId, packageId: listing.packageId, fingerprint, regionPrices: {}, syncedAt: (input.now ?? new Date()).toISOString() });
        result.deactivated.push(productId);
        continue;
      }

      const converted = await playApi<{
        convertedRegionPrices?: Record<string, { regionCode: string; price: Money }>;
        convertedOtherRegionsPrice?: { usdPrice?: Money; eurPrice?: Money };
      }>(account, "POST", app + "/pricing:convertRegionPrices", { price: centsToMoney(listing.amountCents, listing.currency) }, fetchImpl);

      const regional = Object.values(converted.convertedRegionPrices ?? {})
        .filter((r) => r.regionCode && r.price)
        .sort((a, b) => a.regionCode.localeCompare(b.regionCode));
      if (!regional.length) throw new Error("convertRegionPrices returned no regional prices");

      const product = {
        packageName,
        productId,
        listings: [{ languageCode: "en-US", title: title(listing), description: description(listing) }],
        purchaseOptions: [{
          purchaseOptionId: PURCHASE_OPTION_ID,
          buyOption: { legacyCompatible: true, multiQuantityEnabled: false },
          regionalPricingAndAvailabilityConfigs: regional.map((r) => ({ regionCode: r.regionCode, price: r.price, availability: "AVAILABLE" })),
          ...(converted.convertedOtherRegionsPrice?.usdPrice && converted.convertedOtherRegionsPrice?.eurPrice
            ? { newRegionsConfig: { ...converted.convertedOtherRegionsPrice, availability: "AVAILABLE" } }
            : {}),
        }],
      };
      const q = new URLSearchParams({
        allowMissing: "true",
        updateMask: "listings,purchaseOptions",
        "regionsVersion.version": REGIONS_VERSION,
        latencyTolerance: "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT",
      });
      await playApi(account, "PATCH", productPath + "?" + q, product, fetchImpl);
      await playApi(account, "POST", productPath + "/purchaseOptions:batchUpdateStates", {
        requests: [{
          activatePurchaseOptionRequest: { packageName, productId, purchaseOptionId: PURCHASE_OPTION_ID, latencyTolerance: "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" },
        }],
      }, fetchImpl);

      const regionPrices: Record<string, { currency: string; micros: number }> = {};
      for (const r of regional) {
        regionPrices[r.regionCode] = {
          currency: r.price.currencyCode ?? "",
          micros: Number(r.price.units ?? "0") * 1_000_000 + Math.round((r.price.nanos ?? 0) / 1000),
        };
      }
      await store.save({ packageName, productId, packageId: listing.packageId, fingerprint, regionPrices, syncedAt: (input.now ?? new Date()).toISOString() });
      (previous === undefined ? result.created : result.updated).push(productId);
    } catch (e) {
      result.failed.push({ productId, error: (e as Error).message });
    }
  }
  return result;
}
