/**
 * {@link PostgresSessionStore} — a durable {@link PaymentSessionStore} over Neon. Persisting the
 * checkout session **and its originating input** is what lets `POST /api/checkout` on one serverless
 * instance and fulfilment on another agree on what a session was for, and what lets a session survive
 * a restart. Without it the stub's in-memory sessions vanish between instances and fulfilment fails
 * with "unknown session".
 */
import { neon } from "@neondatabase/serverless";
import type { CheckoutInput, CheckoutSession, PaymentSessionStore } from "@azphalt/registry";
import type { Sql } from "./schema.js";

export interface PostgresSessionStoreConfig {
  /** Neon connection string (e.g. `DATABASE_URL`). */
  connectionString: string;
}

export class PostgresSessionStore implements PaymentSessionStore {
  private readonly sql: Sql;

  constructor(config: PostgresSessionStoreConfig) {
    if (!config.connectionString) throw new Error("PostgresSessionStore: connectionString is required");
    this.sql = neon(config.connectionString);
  }

  async put(session: CheckoutSession, input: CheckoutInput): Promise<void> {
    await this.sql.query(
      `INSERT INTO sessions (id, session, input) VALUES ($1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET session = EXCLUDED.session, input = EXCLUDED.input`,
      [session.id, JSON.stringify(session), JSON.stringify(input)],
    );
  }

  async get(id: string): Promise<{ session: CheckoutSession; input: CheckoutInput } | undefined> {
    const rows = (await this.sql.query(`SELECT session, input FROM sessions WHERE id = $1`, [id])) as Array<{
      session: CheckoutSession;
      input: CheckoutInput;
    }>;
    const row = rows[0];
    return row ? { session: row.session, input: row.input } : undefined;
  }

  async setStatus(id: string, status: CheckoutSession["status"]): Promise<CheckoutSession | undefined> {
    // jsonb_set patches `status` in place, then RETURNING hands back the updated session — one round-trip.
    const rows = (await this.sql.query(
      `UPDATE sessions SET session = jsonb_set(session, '{status}', to_jsonb($2::text))
       WHERE id = $1 RETURNING session`,
      [id, status],
    )) as Array<{ session: CheckoutSession }>;
    return rows[0]?.session;
  }
}
