/**
 * Runs the shared {@link runStoreContract} against `InMemoryStore` always, and against
 * `VercelRegistryStore` when a database is configured. A silently-skipped durable suite reads as
 * passing, so the skip is logged.
 *
 * To exercise the durable store, set `DATABASE_URL` (a Neon/Postgres test database) and
 * `BLOB_READ_WRITE_TOKEN` (a Vercel Blob store). The suite migrates the schema before running.
 */
import { InMemoryStore } from "@azphalt/registry";
import { runStoreContract } from "./store-contract.js";
import { VercelRegistryStore } from "../src/index.js";

runStoreContract("InMemoryStore", () => new InMemoryStore());

const DATABASE_URL = process.env.DATABASE_URL;
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (DATABASE_URL && BLOB_READ_WRITE_TOKEN) {
  runStoreContract("VercelRegistryStore", async () => {
    const store = new VercelRegistryStore({ connectionString: DATABASE_URL, blobToken: BLOB_READ_WRITE_TOKEN });
    await store.migrate();
    return store;
  });
} else {
  // eslint-disable-next-line no-console
  console.log(
    "[store-contract] VercelRegistryStore suite skipped — set DATABASE_URL and BLOB_READ_WRITE_TOKEN to run it.",
  );
}
