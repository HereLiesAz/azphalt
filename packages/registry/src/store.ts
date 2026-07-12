/**
 * Storage backend for the registry. The default {@link InMemoryStore} keeps everything in process
 * (used by tests and the reference server); a production deployment implements {@link RegistryStore}
 * over a database + object store without touching the {@link Registry}/{@link Marketplace} logic.
 */
import type { Listing, PackageVersion } from "./types.js";

export interface RegistryStore {
  /** Persist a version's metadata and its `.azp` bytes together. */
  putVersion(version: PackageVersion, bytes: Uint8Array): Promise<void>;
  /** An exact version, or `undefined`. */
  getVersion(id: string, version: string): Promise<PackageVersion | undefined>;
  /** Every stored version of a package, in unspecified order (empty if unknown). */
  getVersions(id: string): Promise<PackageVersion[]>;
  /** The `.azp` bytes for an exact version, or `undefined`. */
  getBytes(id: string, version: string): Promise<Uint8Array | undefined>;
  /** All known package ids. */
  allPackageIds(): Promise<string[]>;
  /** Add [by] (default 1) to a version's download tally. */
  incrementDownloads(id: string, version: string, by?: number): Promise<void>;
  /** Total downloads across all of a package's versions. */
  getDownloads(id: string): Promise<number>;

  /** Create or replace a package's consignment listing. */
  putListing(listing: Listing): Promise<void>;
  /** A package's listing, or `undefined` when it is not listed for sale. */
  getListing(packageId: string): Promise<Listing | undefined>;
  /** Every listing (any status). */
  allListings(): Promise<Listing[]>;
}

/** Non-persistent {@link RegistryStore} — process memory only. */
export class InMemoryStore implements RegistryStore {
  private readonly versions = new Map<string, PackageVersion>(); // `${id}@${version}`
  private readonly bytes = new Map<string, Uint8Array>(); // `${id}@${version}`
  private readonly downloads = new Map<string, number>(); // `${id}@${version}`
  private readonly listings = new Map<string, Listing>(); // packageId

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

  async putListing(listing: Listing): Promise<void> {
    this.listings.set(listing.packageId, listing);
  }

  async getListing(packageId: string): Promise<Listing | undefined> {
    return this.listings.get(packageId);
  }

  async allListings(): Promise<Listing[]> {
    return [...this.listings.values()];
  }
}
