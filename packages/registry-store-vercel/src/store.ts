/**
 * {@link VercelRegistryStore} — a durable {@link RegistryStore} over Neon Postgres (metadata) and
 * Vercel Blob (`.azp` bytes). It is a drop-in for `InMemoryStore`: the `Registry`/`Marketplace` logic
 * never changes, only where state lives.
 *
 * **Bytes go to private Blob at a deterministic key** `azp/{id}/{version}.azp`. Private is forced by
 * the paid-download gate — a public blob URL is one guessable request away from the bytes, which would
 * make the `401`/`402` on the download route decorative. Deterministic keys make {@link putVersion}
 * safe without a distributed transaction: write the blob, then the row. A blob-write failure writes
 * nothing; a row-write failure leaves an orphaned blob but **no row pointing at missing bytes**; a
 * re-publish overwrites the same key. The residue is always garbage-collectable, never a dangling
 * reference — which is why the keys must not be random.
 */
import { get, put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import type { Listing, PackageVersion, Report, RegistryStore, RevocationEntry } from "@azphalt/registry";
import { migrate, type Sql } from "./schema.js";

/** Blob access mode. `private` is required for the paid gate to hold; `public` only for a free-only store. */
export type BlobAccess = "private" | "public";

export interface VercelRegistryStoreConfig {
  /** Neon connection string (e.g. `DATABASE_URL`). Credentials are config, never read from `process.env` here. */
  connectionString: string;
  /** Vercel Blob read-write token (e.g. `BLOB_READ_WRITE_TOKEN`). */
  blobToken: string;
  /** Blob access mode. Default `private` — see the class doc; only relax it for a free-only catalog. */
  blobAccess?: BlobAccess;
  /** Blob key prefix. Default `azp`. Keys are `{prefix}/{id}/{version}.azp`. */
  blobPrefix?: string;
}

/** Deterministic, collision-free Blob key for a version's `.azp` bytes. */
function blobKey(prefix: string, id: string, version: string): string {
  // `id`/`version` are validated package coordinates (reverse-DNS id, semver); encode defensively so a
  // key can never escape the prefix even if a caller passes something odd.
  return `${prefix}/${encodeURIComponent(id)}/${encodeURIComponent(version)}.azp`;
}

/** Drain a `ReadableStream<Uint8Array>` into one `Uint8Array`. */
async function drain(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      total += value.length;
    }
  }
  const out = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) {
    out.set(c, at);
    at += c.length;
  }
  return out;
}

export class VercelRegistryStore implements RegistryStore {
  private readonly sql: Sql;
  private readonly blobToken: string;
  private readonly blobAccess: BlobAccess;
  private readonly blobPrefix: string;

  constructor(config: VercelRegistryStoreConfig) {
    if (!config.connectionString) throw new Error("VercelRegistryStore: connectionString is required");
    if (!config.blobToken) throw new Error("VercelRegistryStore: blobToken is required");
    this.sql = neon(config.connectionString);
    this.blobToken = config.blobToken;
    this.blobAccess = config.blobAccess ?? "private";
    this.blobPrefix = config.blobPrefix ?? "azp";
  }

  /** Create the schema (idempotent). Call once at deploy/seed time; safe to repeat. */
  async migrate(): Promise<void> {
    await migrate(this.sql);
  }

  async putVersion(version: PackageVersion, bytes: Uint8Array): Promise<void> {
    // 1) Blob first, at the deterministic key. A failure here writes nothing downstream.
    const key = blobKey(this.blobPrefix, version.id, version.version);
    // Blob's PutBody wants a Buffer/Blob/stream, not a bare Uint8Array — wrap without copying.
    const body = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const { url } = await put(key, body, {
      access: this.blobAccess,
      addRandomSuffix: false,
      allowOverwrite: true,
      token: this.blobToken,
      contentType: "application/zip",
    });
    // 2) Then the row. On conflict, refresh metadata + blob_url but preserve the download tally.
    await this.sql.query(
      `INSERT INTO versions (id, version, metadata, blob_url, downloads)
       VALUES ($1, $2, $3, $4, 0)
       ON CONFLICT (id, version)
       DO UPDATE SET metadata = EXCLUDED.metadata, blob_url = EXCLUDED.blob_url`,
      [version.id, version.version, JSON.stringify(version), url],
    );
  }

  async getVersion(id: string, version: string): Promise<PackageVersion | undefined> {
    const rows = (await this.sql.query(
      `SELECT metadata FROM versions WHERE id = $1 AND version = $2`,
      [id, version],
    )) as Array<{ metadata: PackageVersion }>;
    return rows[0]?.metadata;
  }

  async getVersions(id: string): Promise<PackageVersion[]> {
    const rows = (await this.sql.query(`SELECT metadata FROM versions WHERE id = $1`, [id])) as Array<{
      metadata: PackageVersion;
    }>;
    return rows.map((r) => r.metadata);
  }

  async getBytes(id: string, version: string): Promise<Uint8Array | undefined> {
    // No row ⇒ nothing to serve (and no point hitting Blob for a key that shouldn't exist).
    const rows = (await this.sql.query(
      `SELECT 1 FROM versions WHERE id = $1 AND version = $2`,
      [id, version],
    )) as unknown[];
    if (rows.length === 0) return undefined;
    const key = blobKey(this.blobPrefix, id, version);
    try {
      const res = await get(key, { access: this.blobAccess, token: this.blobToken });
      if (!res || res.stream == null) return undefined;
      return await drain(res.stream);
    } catch (e) {
      // A missing blob (BlobNotFoundError) is a torn write, not a crash: report absent, don't throw.
      if (e && typeof e === "object" && (e as { name?: string }).name === "BlobNotFoundError") return undefined;
      throw e;
    }
  }

  async allPackageIds(): Promise<string[]> {
    const rows = (await this.sql.query(`SELECT DISTINCT id FROM versions`)) as Array<{ id: string }>;
    return rows.map((r) => r.id);
  }

  async incrementDownloads(id: string, version: string, by = 1): Promise<void> {
    // One atomic UPDATE — the operation most likely to be raced, and the one a read-modify-write loses.
    await this.sql.query(
      `UPDATE versions SET downloads = downloads + $3 WHERE id = $1 AND version = $2`,
      [id, version, by],
    );
  }

  async getDownloads(id: string): Promise<number> {
    const rows = (await this.sql.query(
      `SELECT COALESCE(SUM(downloads), 0)::bigint AS total FROM versions WHERE id = $1`,
      [id],
    )) as Array<{ total: string | number }>;
    return Number(rows[0]?.total ?? 0);
  }

  /**
   * Record one rating (0–5). Not part of {@link RegistryStore} (ratings are a backend concern), but
   * provided for parity with `InMemoryStore.addRating` so seeding and any rating flow work durably.
   */
  async addRating(id: string, stars: number): Promise<void> {
    await this.sql.query(
      `INSERT INTO ratings (package_id, sum, count) VALUES ($1, $2, 1)
       ON CONFLICT (package_id) DO UPDATE SET sum = ratings.sum + EXCLUDED.sum, count = ratings.count + 1`,
      [id, stars],
    );
  }

  async getRating(id: string): Promise<{ rating?: number; ratingCount: number }> {
    const rows = (await this.sql.query(
      `SELECT sum, count FROM ratings WHERE package_id = $1`,
      [id],
    )) as Array<{ sum: string | number; count: string | number }>;
    const r = rows[0];
    const count = Number(r?.count ?? 0);
    if (!r || count === 0) return { ratingCount: 0 };
    return { rating: Number(r.sum) / count, ratingCount: count };
  }

  async putRevocation(entry: RevocationEntry): Promise<void> {
    await this.sql.query(
      `INSERT INTO revocations (entry, revoked_at) VALUES ($1, $2)`,
      [JSON.stringify(entry), entry.revokedAt],
    );
  }

  async getRevocations(since?: string): Promise<RevocationEntry[]> {
    const rows = since
      ? ((await this.sql.query(
          `SELECT entry FROM revocations WHERE revoked_at > $1 ORDER BY revoked_at DESC`,
          [since],
        )) as Array<{ entry: RevocationEntry }>)
      : ((await this.sql.query(`SELECT entry FROM revocations ORDER BY revoked_at DESC`)) as Array<{
          entry: RevocationEntry;
        }>);
    return rows.map((r) => r.entry);
  }

  async putListing(listing: Listing): Promise<void> {
    await this.sql.query(
      `INSERT INTO listings (package_id, listing) VALUES ($1, $2)
       ON CONFLICT (package_id) DO UPDATE SET listing = EXCLUDED.listing`,
      [listing.packageId, JSON.stringify(listing)],
    );
  }

  async getListing(packageId: string): Promise<Listing | undefined> {
    const rows = (await this.sql.query(`SELECT listing FROM listings WHERE package_id = $1`, [packageId])) as Array<{
      listing: Listing;
    }>;
    return rows[0]?.listing;
  }

  async allListings(): Promise<Listing[]> {
    const rows = (await this.sql.query(`SELECT listing FROM listings`)) as Array<{ listing: Listing }>;
    return rows.map((r) => r.listing);
  }

  async putReport(report: Report): Promise<void> {
    await this.sql.query(
      `INSERT INTO reports (package_id, version, report, reported_at) VALUES ($1, $2, $3, $4)`,
      [report.packageId, report.version ?? null, JSON.stringify(report), report.reportedAt],
    );
  }

  async getReports(packageId: string, version?: string): Promise<Report[]> {
    const rows =
      version === undefined
        ? ((await this.sql.query(
            `SELECT report FROM reports WHERE package_id = $1 ORDER BY reported_at DESC`,
            [packageId],
          )) as Array<{ report: Report }>)
        : ((await this.sql.query(
            `SELECT report FROM reports WHERE package_id = $1 AND version = $2 ORDER BY reported_at DESC`,
            [packageId, version],
          )) as Array<{ report: Report }>);
    return rows.map((r) => r.report);
  }
}
