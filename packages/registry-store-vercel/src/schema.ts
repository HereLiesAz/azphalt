/**
 * Idempotent schema migration for the durable store. Seven tables, `jsonb` payloads mirroring the
 * `@azphalt/registry` types rather than normalized columns — so the schema does not drift every time a
 * type gains a field. The exceptions are columns an operation must filter, sort, or atomically mutate
 * on: `downloads` (a raced counter), `revoked_at` / `issued_at` / `reported_at` (feeds ordered by
 * time), and `subject` (a buyer's purchase list).
 *
 * `migrate()` is safe to run repeatedly (every statement is `IF NOT EXISTS`); the seed script and any
 * cold deploy can call it without coordination.
 */
import type { NeonQueryFunction } from "@neondatabase/serverless";

/** A Neon `sql` handle in its default mode (rows as objects). */
export type Sql = NeonQueryFunction<false, false>;

export async function migrate(sql: Sql): Promise<void> {
  // Published versions: the `.azp` bytes live in Blob at a deterministic key; the row points at them.
  await sql.query(`CREATE TABLE IF NOT EXISTS versions (
    id text NOT NULL,
    version text NOT NULL,
    metadata jsonb NOT NULL,
    blob_url text NOT NULL,
    downloads bigint NOT NULL DEFAULT 0,
    PRIMARY KEY (id, version)
  )`);

  // Consignment listings — one per package.
  await sql.query(`CREATE TABLE IF NOT EXISTS listings (
    package_id text PRIMARY KEY,
    listing jsonb NOT NULL
  )`);

  // Append-only revocation feed, polled newest-first.
  await sql.query(`CREATE TABLE IF NOT EXISTS revocations (
    seq bigserial PRIMARY KEY,
    entry jsonb NOT NULL,
    revoked_at timestamptz NOT NULL
  )`);
  await sql.query(`CREATE INDEX IF NOT EXISTS revocations_revoked_at_idx ON revocations (revoked_at DESC)`);

  // Aggregate ratings — sum + count so the average is a division at read time.
  await sql.query(`CREATE TABLE IF NOT EXISTS ratings (
    package_id text PRIMARY KEY,
    sum bigint NOT NULL DEFAULT 0,
    count bigint NOT NULL DEFAULT 0
  )`);

  // Checkout sessions + the input each was created from, so fulfilment knows what a session was for.
  await sql.query(`CREATE TABLE IF NOT EXISTS sessions (
    id text PRIMARY KEY,
    session jsonb NOT NULL,
    input jsonb NOT NULL
  )`);

  // Issued entitlements, keyed by the checkout session (the fulfilment idempotency key).
  await sql.query(`CREATE TABLE IF NOT EXISTS entitlements (
    session_id text PRIMARY KEY,
    subject text NOT NULL,
    package_id text NOT NULL,
    record jsonb NOT NULL,
    issued_at timestamptz NOT NULL
  )`);
  await sql.query(`CREATE INDEX IF NOT EXISTS entitlements_subject_idx ON entitlements (subject, issued_at DESC)`);

  // Abuse/quality reports (marketplace-integrity § 2).
  await sql.query(`CREATE TABLE IF NOT EXISTS reports (
    seq bigserial PRIMARY KEY,
    package_id text NOT NULL,
    version text,
    report jsonb NOT NULL,
    reported_at timestamptz NOT NULL
  )`);
  await sql.query(`CREATE INDEX IF NOT EXISTS reports_package_idx ON reports (package_id, reported_at DESC)`);
}
