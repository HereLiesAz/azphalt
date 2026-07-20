/**
 * `@azphalt/registry` — the azphalt registry and consignment marketplace.
 *
 * Two lanes, kept separable (see `docs/ARCHITECTURE.md`):
 * - {@link Registry} — the free, open distribution lane: verify, index, resolve, serve, search.
 * - {@link Marketplace} — the paid consignment overlay, the only place a fee exists.
 *
 * ```ts
 * import { Registry, Marketplace, InMemoryStore } from "@azphalt/registry";
 *
 * const store = new InMemoryStore();
 * const registry = new Registry(store);
 * await registry.publish(azpBytes);              // open lane
 *
 * const market = new Marketplace(registry, store);
 * await market.listForSale("com.you.thing", "seller_1", { amountCents: 499, currency: "USD" });
 * const { session, breakdown } = await market.checkout("com.you.thing", "buyer_1");
 * ```
 */
export { Registry, RegistryError, compareSemver, mediaDomainsForManifest, type RegistryOptions } from "./registry.js";
export { InMemoryStore, type RegistryStore } from "./store.js";
export { scanPackage } from "./sweep.js";
export type { ScanReport, ScanCheck, ScanVerdict, ScanOptions } from "./sweep.js";
export {
  Marketplace,
  StubPaymentProvider,
  DEFAULT_TERMS,
  quote,
  type PaymentProvider,
  type CheckoutInput,
  type CheckoutSession,
  type MarketplaceOptions,
} from "./consignment.js";
export { StripePaymentProvider, stripeConfigFromEnv, type StripeConfig } from "./stripe.js";
export {
  issueEntitlement,
  verifyEntitlement,
  canonicalClaims,
  type EntitlementClaims,
  type EntitlementToken,
  type EntitlementResult,
} from "./entitlement.js";
export {
  InMemoryAuthorizer,
  EntitlementAuthorizer,
  denyAllAuthorizer,
  type DownloadAuthorizer,
  type AuthDecision,
  type AuthInput,
} from "./authorize.js";
export type {
  Money,
  Listing,
  ConsignmentTerms,
  PriceBreakdown,
  PackageSummary,
  PackageVersion,
  RegistryPackage,
  RevocationEntry,
  SearchResult,
  PublishResult,
  ListQuery,
  Report,
  ReportReason,
  ReportResult,
} from "./types.js";
