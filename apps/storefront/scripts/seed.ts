/**
 * Seed the **durable** catalog: migrate the schema, then publish the example packages idempotently.
 *
 * Seeding lives here rather than at module load because a durable `registry.publish` rejects duplicate
 * versions — every cold serverless instance re-seeding would throw, and two instances racing an empty
 * store would double-publish. This script is safe to run once, or repeatedly (`seedCatalog` skips any
 * version already present).
 *
 *   DATABASE_URL=... BLOB_READ_WRITE_TOKEN=... pnpm --filter @azphalt/storefront seed
 */
import { Marketplace, Registry, StubPaymentProvider } from "@azphalt/registry";
import { createVercelStores } from "@azphalt/registry-store-vercel";
import { seedCatalog } from "../lib/catalog";

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!connectionString || !blobToken) {
    console.error("seed: set DATABASE_URL and BLOB_READ_WRITE_TOKEN to seed the durable store.");
    process.exit(1);
  }

  const { store, sessions, migrate } = createVercelStores({ connectionString, blobToken });
  console.log("seed: migrating schema…");
  await migrate();

  const registry = new Registry(store);
  const market = new Marketplace(registry, store, { payments: new StubPaymentProvider({ sessions }) });

  console.log("seed: publishing example packages (idempotent)…");
  await seedCatalog(registry, market, store, { idempotent: true });

  const ids = await store.allPackageIds();
  console.log(`seed: done — ${ids.length} packages in the catalog.`);
}

main().catch((e) => {
  console.error("seed: failed —", e);
  process.exit(1);
});
