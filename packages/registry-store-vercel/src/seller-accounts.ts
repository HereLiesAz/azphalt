/**
 * {@link PostgresSellerAccountStore} — a durable {@link SellerAccountStore} over Neon. Onboarded
 * seller → Stripe connected-account mappings (and their capability flags) must survive restarts and be
 * shared across serverless instances: a seller onboards on one request, and a later checkout on another
 * instance must resolve their payout destination and know whether charges are enabled yet.
 */
import { neon } from "@neondatabase/serverless";
import type { SellerAccount, SellerAccountStore } from "@azphalt/registry";
import type { Sql } from "./schema.js";

export interface PostgresSellerAccountStoreConfig {
  /** Neon connection string (e.g. `DATABASE_URL`). */
  connectionString: string;
}

export class PostgresSellerAccountStore implements SellerAccountStore {
  private readonly sql: Sql;

  constructor(config: PostgresSellerAccountStoreConfig) {
    if (!config.connectionString) throw new Error("PostgresSellerAccountStore: connectionString is required");
    this.sql = neon(config.connectionString);
  }

  async get(sellerId: string): Promise<SellerAccount | undefined> {
    const rows = (await this.sql.query(`SELECT record FROM seller_accounts WHERE seller_id = $1`, [sellerId])) as Array<{
      record: SellerAccount;
    }>;
    return rows[0]?.record;
  }

  async getByAccountId(accountId: string): Promise<SellerAccount | undefined> {
    const rows = (await this.sql.query(`SELECT record FROM seller_accounts WHERE account_id = $1`, [accountId])) as Array<{
      record: SellerAccount;
    }>;
    return rows[0]?.record;
  }

  async put(account: SellerAccount): Promise<void> {
    await this.sql.query(
      `INSERT INTO seller_accounts (seller_id, account_id, record) VALUES ($1, $2, $3)
       ON CONFLICT (seller_id) DO UPDATE SET account_id = EXCLUDED.account_id, record = EXCLUDED.record`,
      [account.sellerId, account.accountId, JSON.stringify(account)],
    );
  }

  async all(): Promise<SellerAccount[]> {
    const rows = (await this.sql.query(`SELECT record FROM seller_accounts`)) as Array<{ record: SellerAccount }>;
    return rows.map((r) => r.record);
  }
}
