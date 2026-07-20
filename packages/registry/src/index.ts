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
export {
  Registry,
  RegistryError,
  RangeNotSatisfiableError,
  compareSemver,
  mediaDomainsForManifest,
  type RegistryOptions,
  type ByteRangeSpec,
} from "./registry.js";
export { InMemoryStore, type RegistryStore } from "./store.js";
export { scanPackage } from "./sweep.js";
export type { ScanReport, ScanCheck, ScanVerdict, ScanOptions } from "./sweep.js";
export {
  Marketplace,
  StubPaymentProvider,
  InMemoryPaymentSessionStore,
  DEFAULT_TERMS,
  quote,
  periodEnd,
  type PaymentProvider,
  type PaymentSessionStore,
  type StubPaymentProviderOptions,
  type CheckoutInput,
  type CheckoutSession,
  type MarketplaceOptions,
} from "./consignment.js";
export { StripePaymentProvider, stripeConfigFromEnv, type StripeConfig } from "./stripe.js";
export {
  StripeConnect,
  type StripeConnectConfig,
  type ConnectedAccountStatus,
} from "./connect.js";
export {
  InMemorySellerAccountStore,
  type SellerAccount,
  type SellerAccountStore,
} from "./seller-account-store.js";
export {
  issueEntitlement,
  verifyEntitlement,
  canonicalClaims,
  type EntitlementClaims,
  type EntitlementToken,
  type EntitlementResult,
} from "./entitlement.js";
export {
  InMemoryEntitlementStore,
  type EntitlementStore,
  type IssuedEntitlement,
} from "./entitlement-store.js";
export {
  InMemorySubscriptionStore,
  type SubscriptionStore,
  type SubscriptionRecord,
} from "./subscription-store.js";
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
  SubscriptionInterval,
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
