/**
 * Storage backend for the registry. The default {@link InMemoryStore} keeps everything in process
 * (used by tests and the reference server); a production deployment implements {@link RegistryStore}
 * over a database + object store without touching the {@link Registry}/{@link Marketplace} logic.
 */
import type { Listing, PackageVersion, Report, RevocationEntry } from "./types.js";

export interface RegistryStore {
  /** Persist a version's metadata and its `.azp` bytes together. */
  putVersion(version: PackageVersion, bytes: Uint8Array): Promise<void>;
  /** An exact version, or `undefined`. */
  getVersion(id: string, version: string): Promise<PackageVersion | undefined>;
  /** Every stored version of a package, in unspecified order (empty if unknown). */
  getVersions(id: string): Promise<PackageVersion[]>;
  /** The `.azp` bytes for an exact version, or `undefined`. */
  getBytes(id: string, version: string): Promise<Uint8Array | undefined>;
  /**
   * **Optional** cheap byte-length of a version's `.azp`, without reading the bytes. Enables ranged
   * serving to answer `Content-Range` / a `416` without a full read. A store that omits it falls back
   * to reading the whole object; a store over object storage should implement it (a metadata `head`).
   */
  getByteSize?(id: string, version: string): Promise<number | undefined>;
  /**
   * **Optional** ranged read: the `.azp` bytes for the **inclusive** window `[start, end]`, or
   * `undefined` if the version is unknown. Enables resumable/parallel downloads without pulling the
   * whole object per chunk. A store that omits it falls back to `getBytes` + slice (correct, but reads
   * the whole object each time). `start`/`end` are pre-clamped by the caller to `[0, size)`.
   */
  getByteRange?(id: string, version: string, start: number, end: number): Promise<Uint8Array | undefined>;
  /** All known package ids. */
  allPackageIds(): Promise<string[]>;
  /** Add [by] (default 1) to a version's download tally. */
  incrementDownloads(id: string, version: string, by?: number): Promise<void>;
  /** Total downloads across all of a package's versions. */
  getDownloads(id: string): Promise<number>;
  /**
   * A package's aggregate rating. Ratings are a backend concern (a store may collect them, the open
   * registry need not); the default store tracks none and returns `{ ratingCount: 0 }`.
   */
  getRating(id: string): Promise<{ rating?: number; ratingCount: number }>;
  /**
   * Record one 1–5 star rating for a package, folding it into the aggregate {@link getRating} returns.
   * **Optional** — a store that doesn't collect ratings omits it, and {@link Registry.rate} surfaces
   * that clearly. Returns `void` or a `Promise<void>` (the in-memory store is synchronous).
   */
  addRating?(id: string, stars: number): void | Promise<void>;

  /** Append a revocation record (a version pulled post-publish). */
  putRevocation(entry: RevocationEntry): Promise<void>;
  /** Revocation records, newest-first; when [since] is given, only those with `revokedAt` > [since]. */
  getRevocations(since?: string): Promise<RevocationEntry[]>;

  /** Create or replace a package's consignment listing. */
  putListing(listing: Listing): Promise<void>;
  /** A package's listing, or `undefined` when it is not listed for sale. */
  getListing(packageId: string): Promise<Listing | undefined>;
  /** Every listing (any status). */
  allListings(): Promise<Listing[]>;

  /**
   * Append an abuse/quality report (see `spec/marketplace-integrity.md § 2`). **Optional** — a store
   * that doesn't support reporting omits it, and {@link Registry.report} surfaces that clearly.
   */
  putReport?(report: Report): Promise<void>;
  /** Reports against a package (optionally a specific version), newest-first. Pairs with {@link putReport}. */
  getReports?(packageId: string, version?: string): Promise<Report[]>;
}

/** Non-persistent {@link RegistryStore} — process memory only. */
export class InMemoryStore implements RegistryStore {
  private readonly versions = new Map<string, PackageVersion>(); // `${id}@${version}`
  private readonly bytes = new Map<string, Uint8Array>(); // `${id}@${version}`
  private readonly downloads = new Map<string, number>(); // `${id}@${version}`
  private readonly ratings = new Map<string, { sum: number; count: number }>(); // packageId
  private readonly revocations: RevocationEntry[] = []; // append-only log
  private readonly listings = new Map<string, Listing>(); // packageId
  private readonly reports: Report[] = []; // append-only log

  private key(id: string, version: string): string {
    return `${id}@${version}`;
  }

  async putVersion(version: PackageVersion, bytes: Uint8Array): Promise<void> {
    const k = this.key(version.id, version.version);
    this.versions.set(k, version);
    this.bytes.set(k, bytes);
    if (!this.downloads.has(k)) this.downloads.set(k, 0);
  }

  async getVersion(id: string, version: string): Promise<PackageVersion | undefined> {
    return this.versions.get(this.key(id, version));
  }

  async getVersions(id: string): Promise<PackageVersion[]> {
    const out: PackageVersion[] = [];
    for (const v of this.versions.values()) if (v.id === id) out.push(v);
    return out;
  }

  async getBytes(id: string, version: string): Promise<Uint8Array | undefined> {
    return this.bytes.get(this.key(id, version));
  }

  async getByteSize(id: string, version: string): Promise<number | undefined> {
    return this.bytes.get(this.key(id, version))?.length;
  }

  async getByteRange(id: string, version: string, start: number, end: number): Promise<Uint8Array | undefined> {
    const b = this.bytes.get(this.key(id, version));
    // `slice` end is exclusive; the range is inclusive — hence `end + 1`.
    return b ? b.slice(start, end + 1) : undefined;
  }

  async allPackageIds(): Promise<string[]> {
    const ids = new Set<string>();
    for (const v of this.versions.values()) ids.add(v.id);
    return [...ids];
  }

  async incrementDownloads(id: string, version: string, by = 1): Promise<void> {
    const k = this.key(id, version);
    this.downloads.set(k, (this.downloads.get(k) ?? 0) + by);
  }

  async getDownloads(id: string): Promise<number> {
    let total = 0;
    for (const [k, n] of this.downloads) if (k.startsWith(`${id}@`)) total += n;
    return total;
  }

  /** Record one 1–5 star rating for a package, folded into the aggregate (see {@link RegistryStore.addRating}). */
  addRating(id: string, stars: number): void {
    const r = this.ratings.get(id) ?? { sum: 0, count: 0 };
    this.ratings.set(id, { sum: r.sum + stars, count: r.count + 1 });
  }

  async getRating(id: string): Promise<{ rating?: number; ratingCount: number }> {
    const r = this.ratings.get(id);
    if (!r || r.count === 0) return { ratingCount: 0 };
    return { rating: r.sum / r.count, ratingCount: r.count };
  }

  async putRevocation(entry: RevocationEntry): Promise<void> {
    this.revocations.push(entry);
  }

  async getRevocations(since?: string): Promise<RevocationEntry[]> {
    const all = [...this.revocations].sort((a, b) => (a.revokedAt < b.revokedAt ? 1 : a.revokedAt > b.revokedAt ? -1 : 0));
    return since ? all.filter((r) => r.revokedAt > since) : all;
  }

  async putListing(listing: Listing): Promise<void> {
    this.listings.set(listing.packageId, listing);
  }

  async getListing(packageId: string): Promise<Listing | undefined> {
    return this.listings.get(packageId);
  }

  async allListings(): Promise<Listing[]> {
    return [...this.listings.values()];
  }

  async putReport(report: Report): Promise<void> {
    this.reports.push(report);
  }

  async getReports(packageId: string, version?: string): Promise<Report[]> {
    return this.reports
      .filter((r) => r.packageId === packageId && (version === undefined || r.version === version))
      .sort((a, b) => (a.reportedAt < b.reportedAt ? 1 : a.reportedAt > b.reportedAt ? -1 : 0));
  }
}
