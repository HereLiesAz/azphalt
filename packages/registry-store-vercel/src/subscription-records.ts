/**
 * {@link PostgresSubscriptionStore} — a durable {@link SubscriptionStore} over Neon. Active
 * subscriptions must survive restarts and be shared across serverless instances: the
 * `checkout.session.completed` that records the subscription and the later `invoice.paid` that renews
 * it typically land on different instances.
 */
import { neon } from "@neondatabase/serverless";
import type { SubscriptionRecord, SubscriptionStore } from "@azphalt/registry";
import type { Sql } from "./schema.js";

export interface PostgresSubscriptionStoreConfig {
  /** Neon connection string (e.g. `DATABASE_URL`). */
  connectionString: string;
}

export class PostgresSubscriptionStore implements SubscriptionStore {
  private readonly sql: Sql;

  constructor(config: PostgresSubscriptionStoreConfig) {
    if (!config.connectionString) throw new Error("PostgresSubscriptionStore: connectionString is required");
    this.sql = neon(config.connectionString);
  }

  async put(record: SubscriptionRecord): Promise<void> {
    await this.sql.query(
      `INSERT INTO subscriptions (subscription_id, record) VALUES ($1, $2)
       ON CONFLICT (subscription_id) DO UPDATE SET record = EXCLUDED.record`,
      [record.subscriptionId, JSON.stringify(record)],
    );
  }

  async get(subscriptionId: string): Promise<SubscriptionRecord | undefined> {
    const rows = (await this.sql.query(`SELECT record FROM subscriptions WHERE subscription_id = $1`, [
      subscriptionId,
    ])) as Array<{ record: SubscriptionRecord }>;
    return rows[0]?.record;
  }

  async delete(subscriptionId: string): Promise<void> {
    await this.sql.query(`DELETE FROM subscriptions WHERE subscription_id = $1`, [subscriptionId]);
  }
}
