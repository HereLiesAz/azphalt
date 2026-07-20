/**
 * `@azphalt/registry-store-vercel` — a durable backend for `@azphalt/registry`, over Neon Postgres
 * (metadata, listings, sessions, entitlements) and Vercel Blob (`.azp` bytes). It exists so a
 * deployment of the standard survives restarts and serverless fan-out without changing any
 * `Registry`/`Marketplace` logic; the core package stays free of cloud dependencies (they live only
 * here, behind the `@azphalt/registry` peer).
 *
 * ```ts
 * import { createVercelStores } from "@azphalt/registry-store-vercel";
 * import { Registry, Marketplace, StubPaymentProvider } from "@azphalt/registry";
 *
 * const { store, sessions, entitlements, migrate } = createVercelStores({
 *   connectionString: process.env.DATABASE_URL!,
 *   blobToken: process.env.BLOB_READ_WRITE_TOKEN!,
 * });
 * await migrate();
 * const registry = new Registry(store);
 * const market = new Marketplace(registry, store, { payments: new StubPaymentProvider({ sessions }) });
 * ```
 */
export { VercelRegistryStore, type VercelRegistryStoreConfig, type BlobAccess } from "./store.js";
export { PostgresSessionStore, type PostgresSessionStoreConfig } from "./sessions.js";
export { PostgresEntitlementStore, type PostgresEntitlementStoreConfig } from "./entitlements.js";
export { migrate, type Sql } from "./schema.js";

import { neon } from "@neondatabase/serverless";
import { VercelRegistryStore, type BlobAccess } from "./store.js";
import { PostgresSessionStore } from "./sessions.js";
import { PostgresEntitlementStore } from "./entitlements.js";
import { migrate as runMigrate } from "./schema.js";

export interface VercelStoresConfig {
  /** Neon connection string (e.g. `DATABASE_URL`). */
  connectionString: string;
  /** Vercel Blob read-write token (e.g. `BLOB_READ_WRITE_TOKEN`). */
  blobToken: string;
  /** Blob access mode. Default `private` — required for the paid-download gate to hold. */
  blobAccess?: BlobAccess;
}

/**
 * Build the full durable backend from one config: the {@link VercelRegistryStore}, a
 * {@link PostgresSessionStore}, a {@link PostgresEntitlementStore}, and a bound `migrate()` that
 * creates the schema for all of them. All four share the connection string, so one `migrate()` call
 * provisions the whole store.
 */
export function createVercelStores(config: VercelStoresConfig): {
  store: VercelRegistryStore;
  sessions: PostgresSessionStore;
  entitlements: PostgresEntitlementStore;
  migrate: () => Promise<void>;
} {
  const store = new VercelRegistryStore(config);
  const sessions = new PostgresSessionStore({ connectionString: config.connectionString });
  const entitlements = new PostgresEntitlementStore({ connectionString: config.connectionString });
  const sql = neon(config.connectionString);
  return { store, sessions, entitlements, migrate: () => runMigrate(sql) };
}
