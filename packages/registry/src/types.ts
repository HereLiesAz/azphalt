/**
 * Registry & marketplace data model.
 *
 * The registry indexes published `.azp` packages (the free, open distribution lane) and the
 * marketplace overlays a **consignment listing** on a package (the paid lane — the only place a fee
 * exists; see `docs/ARCHITECTURE.md § The marketplace`). The two are kept separable on purpose: a
 * package can live in the registry forever with no listing, and the money model never leaks into the
 * open lane.
 */
import type { AssetType, Capability, Kind, Manifest } from "@azphalt/sdk";

/** One published, immutable version of a package. */
export interface PackageVersion {
  /** Reverse-DNS package id (`manifest.id`). */
  id: string;
  /** Semver (`manifest.version`). */
  version: string;
  /** The full manifest as published. */
  manifest: Manifest;
  /** Size of the `.azp` container in bytes. */
  size: number;
  /** `sha256-<hex>` of the whole `.azp` container (distinct from per-file digests in the manifest). */
  digest: string;
  /** ISO-8601 publish instant. */
  publishedAt: string;
  /** A pulled version stays resolvable by exact `version` but is hidden from `latest`/search. */
  yanked?: boolean;
}

/** The aggregate view of a package across all its versions — what browse/search returns. */
export interface PackageSummary {
  id: string;
  name: string;
  /** The latest non-yanked version's semver (or the newest yanked one if all are yanked). */
  version: string;
  kind: Kind;
  license: string;
  description?: string;
  author?: string;
  homepage?: string;
  /** Distinct asset types this package contributes (`brush` / `lut` / `pattern` / `stamp`). */
  assetTypes: AssetType[];
  /** Declared least-privilege capabilities. */
  capabilities: Capability[];
  /** Host apps this package is scoped to (reverse-DNS ids). Empty = global (shown to every app). */
  targetApps: string[];
  /** Counts of executable contributions, for at-a-glance "what does it do". */
  contributes: { filters: number; tools: number; commands: number };
  /** First-publish and latest-publish instants (ISO-8601). */
  publishedAt: string;
  updatedAt: string;
  /** Total served downloads across every version. */
  downloads: number;
}

/** A package with its full version history — the package-detail view. */
export interface RegistryPackage {
  summary: PackageSummary;
  /** Newest-first. */
  versions: PackageVersion[];
}

/** A search hit: the package plus its relevance score (higher = better). */
export interface SearchResult {
  package: PackageSummary;
  score: number;
}

/** Result of a successful publish. */
export interface PublishResult {
  package: PackageSummary;
  version: PackageVersion;
}

/** Filters/sorting for browsing the catalog. */
export interface ListQuery {
  kind?: Kind;
  assetType?: AssetType;
  capability?: Capability;
  author?: string;
  /**
   * The requesting host app's reverse-DNS id. When set, results are the packages **visible to that
   * app**: global packages (no `targetApps`) plus those whose `targetApps` includes this id. When
   * unset, no app filter is applied (every package, including app-scoped ones, is returned).
   */
  app?: string;
  /** Default `"downloads"`. */
  sort?: "downloads" | "updated" | "name";
  limit?: number;
  offset?: number;
}

/* ───────────────────────────── Consignment (paid lane) ───────────────────────────── */

/** A minor-unit money amount (e.g. cents) in an ISO-4217 currency. */
export interface Money {
  /** Amount in the currency's minor unit (cents for USD). Non-negative integer. */
  amountCents: number;
  /** ISO-4217 code, e.g. `"USD"`. */
  currency: string;
}

/** A consignment listing: the sell-through record layered on a registry package. */
export interface Listing {
  packageId: string;
  /** The consigning creator (a marketplace-side account id; the registry stays identity-agnostic). */
  sellerId: string;
  price: Money;
  /** `active` = purchasable; `unlisted` = withdrawn but retained. */
  status: "active" | "unlisted";
  createdAt: string;
  updatedAt: string;
}

/**
 * Consignment economics. The fee must clear the processor's cut *plus* platform overhead or the sale
 * loses money — see `docs/ARCHITECTURE.md § "Very small" has a floor`. Rates are in basis points
 * (1 bps = 0.01%); the processor also takes a fixed per-transaction cost.
 */
export interface ConsignmentTerms {
  /** Platform consignment fee, in basis points of the sale price. */
  platformFeeBps: number;
  /** Payment processor's percentage cut, in basis points. */
  processorPctBps: number;
  /** Payment processor's fixed per-transaction cost, in minor units. */
  processorFlatCents: number;
}

/** Money breakdown for a single sale, so nothing is hand-waved. All amounts share the price currency. */
export interface PriceBreakdown {
  /** What the buyer pays (the list price). */
  gross: Money;
  /** Processor cut (percentage + fixed). */
  processorFee: Money;
  /** Platform consignment fee. */
  platformFee: Money;
  /** What the seller receives after both cuts (never negative). */
  sellerNet: Money;
}
