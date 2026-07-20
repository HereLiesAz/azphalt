/**
 * Registry & marketplace data model.
 *
 * The registry indexes published `.azp` packages (the free, open distribution lane) and the
 * marketplace overlays a **consignment listing** on a package (the paid lane — the only place a fee
 * exists; see `docs/ARCHITECTURE.md § The marketplace`). The two are kept separable on purpose: a
 * package can live in the registry forever with no listing, and the money model never leaks into the
 * open lane.
 */
import type { AssetType, Capability, Kind, Manifest, MediaDomain, PreviewRef } from "@azphalt/azdk";
import type { ScanReport } from "./sweep.js";

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
  /** The security-sweep report attached at publish (see `spec/marketplace-integrity.md § 1`). */
  scan?: ScanReport;
  /**
   * The base64 SPKI Ed25519 **publisher key** this version was signed with (from `signature.json`), or
   * absent if unsigned. It is the developer's identity for provenance / anti-clone
   * (`spec/marketplace-integrity.md § 4`).
   */
  publisherKey?: string;
}

/** Why a package version was reported (see `spec/marketplace-integrity.md § 2`). */
export type ReportReason = "malware" | "clone" | "deceptive" | "secret-leak" | "broken" | "other";

/** One abuse/quality report against a package version. */
export interface Report {
  packageId: string;
  /** The specific version reported, or absent for the package as a whole. */
  version?: string;
  reason: ReportReason;
  detail?: string;
  /** ISO-8601 instant. */
  reportedAt: string;
  /**
   * Whether this report counts toward auto-quarantine — a report from a counter-signed host or a
   * verified account is *trusted* (`spec/marketplace-integrity.md § 2`). Untrusted reports still queue
   * for human review but don't trip the automatic threshold.
   */
  trusted?: boolean;
}

/** Result of filing a {@link Report}: the stored report and whether it auto-quarantined the version. */
export interface ReportResult {
  report: Report;
  /** True when this report tripped the trusted-report threshold and the version was yanked pending review. */
  quarantined: boolean;
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
  /** Localized `name` / `description` (BCP-47 tag → string) from the manifest; flat fields are the fallback. */
  nameLocalized?: Record<string, string>;
  descriptionLocalized?: Record<string, string>;
  author?: string;
  homepage?: string;
  /** Distinct asset types this package contributes (`brush` / `lut` / `pattern` / `stamp`). */
  assetTypes: AssetType[];
  /** Declared least-privilege capabilities. */
  capabilities: Capability[];
  /** Host apps this package is scoped to (reverse-DNS ids). Empty = global (shown to every app). */
  targetApps: string[];
  /** Discovery/access visibility (`public` default; `unlisted`/`private` hidden from browse). */
  visibility: "public" | "unlisted" | "private";
  /** Counts of executable contributions, for at-a-glance "what does it do". */
  contributes: { filters: number; tools: number; commands: number };
  /** First-publish and latest-publish instants (ISO-8601). */
  publishedAt: string;
  updatedAt: string;
  /** Total served downloads across every version. */
  downloads: number;
  /** Size of the latest version's `.azp` container, in bytes. */
  byteSize: number;
  /** Coarse media domains this package touches, derived from its asset types + capabilities. */
  mediaDomains: MediaDomain[];
  /** The latest manifest's static store-card preview, if any. */
  preview?: PreviewRef;
  /** Average user rating 0–5, if the store tracks ratings (absent when untracked). */
  rating?: number;
  /** Number of ratings behind `rating` (0 when none / untracked). */
  ratingCount: number;
}

/** One revocation record — a version pulled post-publish, for the host-pollable revocation feed. */
export interface RevocationEntry {
  id: string;
  version: string;
  /** Why it was pulled (optional, author/registry-supplied). */
  reason?: string;
  /** ISO-8601 instant the version was revoked. */
  revokedAt: string;
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
  /**
   * Media domains the caller (host) can run. A package is kept when its own `mediaDomains`
   * **intersect** this set — a video/audio host (`["video","audio"]`) keeps a LUT
   * (`["image","video"]`) and audio SFX but drops a paint-only brush (`["image"]`).
   */
  mediaDomains?: MediaDomain[];
  author?: string;
  /**
   * The requesting host app's reverse-DNS id. When set, results are the packages **visible to that
   * app**: global packages (no `targetApps`) plus those whose `targetApps` includes this id. When
   * unset, no app filter is applied (every package, including app-scoped ones, is returned).
   */
  app?: string;
  /**
   * Visibility filter (`spec/marketplace-integrity.md § 3`). **Absent ⇒ browse shows only `public`**
   * (hiding `unlisted`/`private`). Set to a specific value for an owner/moderation view, or `"all"` to
   * include every visibility. Direct-by-id resolution (`getSummary`/`getPackage`) ignores this.
   */
  visibility?: "public" | "unlisted" | "private" | "all";
  /** Default `"downloads"`. `"rating"` orders by average rating (unrated packages last). */
  sort?: "downloads" | "updated" | "name" | "rating";
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

/** Recurring-billing period for a subscription listing. */
export type SubscriptionInterval = "month" | "year";

/** A consignment listing: the sell-through record layered on a registry package. */
export interface Listing {
  packageId: string;
  /** The consigning creator (a marketplace-side account id; the registry stays identity-agnostic). */
  sellerId: string;
  /** The amount charged: once for a one-time listing, or per {@link Listing.interval} for a subscription. */
  price: Money;
  /**
   * When set, this is a **subscription** at `price` per interval — fulfilment issues an *expiring*
   * `kind:"subscription"` entitlement (re-issued each period). Absent, it is a one-time buy-once
   * purchase (a perpetual entitlement). The download gate checks the entitlement's expiry either way
   * (see `entitlement.ts` `verifyEntitlement` → `live`).
   */
  interval?: SubscriptionInterval;
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
