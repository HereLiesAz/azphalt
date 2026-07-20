/**
 * Persistence seam for **issued** entitlements — the fulfilment record that turns a settled payment
 * into a durable license the buyer can retrieve.
 *
 * The gap this closes: a payment webhook (`checkout.session.completed`) mints an
 * {@link EntitlementToken}, but with nowhere to put it the buyer never receives it — they pay and get
 * nothing. Storing the token keyed by its **checkout session id** lets the buyer's return page exchange
 * `session_id` for the token, and lets a "my purchases" view list a subject's licenses. Writes are
 * idempotent on `sessionId` so a webhook retry (or the return page and the webhook racing) can't mint
 * two licenses for one payment.
 *
 * The default {@link InMemoryEntitlementStore} keeps dev/test behavior with no services; a durable
 * deployment supplies a database-backed store (see `@azphalt/registry-store-vercel`'s
 * `PostgresEntitlementStore`).
 */
import type { EntitlementToken } from "./entitlement.js";

/** A fulfilled purchase: the signed token plus the session and identity it was issued against. */
export interface IssuedEntitlement {
  /** The payment session this entitlement fulfils (the idempotency key). */
  sessionId: string;
  /** The package the entitlement grants (mirrors `token.claims.packageId`). */
  packageId: string;
  /** The licensed identity (mirrors `token.claims.subject`). */
  subject: string;
  /** The signed, offline-verifiable entitlement. */
  token: EntitlementToken;
  /** ISO-8601 instant the entitlement was recorded. */
  issuedAt: string;
}

export interface EntitlementStore {
  /** Record an issued entitlement. Idempotent on `sessionId` — a repeat keeps the first record. */
  put(record: IssuedEntitlement): Promise<void>;
  /** The entitlement fulfilled for a checkout session, or `undefined`. */
  getBySession(sessionId: string): Promise<IssuedEntitlement | undefined>;
  /** Every entitlement issued to a subject, newest-first. */
  listBySubject(subject: string): Promise<IssuedEntitlement[]>;
}

/** In-process {@link EntitlementStore} — the default, used by tests and single-process dev. */
export class InMemoryEntitlementStore implements EntitlementStore {
  private readonly bySession = new Map<string, IssuedEntitlement>();

  async put(record: IssuedEntitlement): Promise<void> {
    // Idempotent: first write for a session wins, so a webhook/return-page race can't double-issue.
    if (!this.bySession.has(record.sessionId)) this.bySession.set(record.sessionId, record);
  }

  async getBySession(sessionId: string): Promise<IssuedEntitlement | undefined> {
    return this.bySession.get(sessionId);
  }

  async listBySubject(subject: string): Promise<IssuedEntitlement[]> {
    return [...this.bySession.values()]
      .filter((r) => r.subject === subject)
      .sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : a.issuedAt > b.issuedAt ? -1 : 0));
  }
}
