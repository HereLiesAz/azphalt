/**
 * Persistence seam for **active subscriptions** — the record that lets a recurring payment renew the
 * buyer's access. A subscription entitlement is issued for one billing period and expires; without a
 * way to map the processor's subscription id back to `{packageId, subject, interval}`, the renewal
 * invoice (`invoice.paid`) has nothing to re-issue against, so access would lapse after the first
 * period even though the buyer keeps paying.
 *
 * Keyed by the **processor subscription id** (a Stripe `sub_…`). The default
 * {@link InMemorySubscriptionStore} keeps dev/test behavior with no services; a durable deployment
 * supplies a database-backed store (see `@azphalt/registry-store-vercel`'s `PostgresSubscriptionStore`).
 */
import type { SubscriptionInterval } from "./types.js";

/** What an active subscription grants and how often it renews. */
export interface SubscriptionRecord {
  /** The payment processor's subscription id (e.g. a Stripe `sub_…`). */
  subscriptionId: string;
  /** The package the subscription licenses. */
  packageId: string;
  /** The licensed identity (buyer). */
  subject: string;
  /** Billing period — each renewal issues a fresh entitlement expiring one interval out. */
  interval: SubscriptionInterval;
}

export interface SubscriptionStore {
  /** Record (or replace) an active subscription. */
  put(record: SubscriptionRecord): Promise<void>;
  /** The subscription for a processor subscription id, or `undefined` (cancelled / unknown). */
  get(subscriptionId: string): Promise<SubscriptionRecord | undefined>;
  /** Drop a subscription (cancelled/ended) — future invoices won't renew it. */
  delete(subscriptionId: string): Promise<void>;
}

/** In-process {@link SubscriptionStore} — the default, used by tests and single-process dev. */
export class InMemorySubscriptionStore implements SubscriptionStore {
  private readonly bySub = new Map<string, SubscriptionRecord>();

  async put(record: SubscriptionRecord): Promise<void> {
    this.bySub.set(record.subscriptionId, { ...record });
  }

  async get(subscriptionId: string): Promise<SubscriptionRecord | undefined> {
    return this.bySub.get(subscriptionId);
  }

  async delete(subscriptionId: string): Promise<void> {
    this.bySub.delete(subscriptionId);
  }
}
