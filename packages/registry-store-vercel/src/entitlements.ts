/**
 * {@link PostgresEntitlementStore} — a durable {@link EntitlementStore} over Neon. This is what turns
 * a settled payment into a license the buyer can actually retrieve: the fulfilment path records the
 * signed token keyed by its checkout session, and the buyer's return page (or a "my purchases" view)
 * reads it back. Writes are idempotent on `session_id`, so a webhook retry — or the return page and
 * the webhook racing — cannot mint two licenses for one payment.
 */
import { neon } from "@neondatabase/serverless";
import type { EntitlementStore, IssuedEntitlement } from "@azphalt/registry";
import type { Sql } from "./schema.js";

export interface PostgresEntitlementStoreConfig {
  /** Neon connection string (e.g. `DATABASE_URL`). */
  connectionString: string;
}

export class PostgresEntitlementStore implements EntitlementStore {
  private readonly sql: Sql;

  constructor(config: PostgresEntitlementStoreConfig) {
    if (!config.connectionString) throw new Error("PostgresEntitlementStore: connectionString is required");
    this.sql = neon(config.connectionString);
  }

  async put(record: IssuedEntitlement): Promise<void> {
    // DO NOTHING on conflict — the first entitlement for a session is the one that stands.
    await this.sql.query(
      `INSERT INTO entitlements (session_id, subject, package_id, record, issued_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (session_id) DO NOTHING`,
      [record.sessionId, record.subject, record.packageId, JSON.stringify(record), record.issuedAt],
    );
  }

  async getBySession(sessionId: string): Promise<IssuedEntitlement | undefined> {
    const rows = (await this.sql.query(`SELECT record FROM entitlements WHERE session_id = $1`, [sessionId])) as Array<{
      record: IssuedEntitlement;
    }>;
    return rows[0]?.record;
  }

  async listBySubject(subject: string): Promise<IssuedEntitlement[]> {
    const rows = (await this.sql.query(
      `SELECT record FROM entitlements WHERE subject = $1 ORDER BY issued_at DESC`,
      [subject],
    )) as Array<{ record: IssuedEntitlement }>;
    return rows.map((r) => r.record);
  }
}
