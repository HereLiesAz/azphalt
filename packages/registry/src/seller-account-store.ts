/**
 * Persistence seam for the **seller → Stripe connected account** mapping — the payout destination the
 * consignment charge transfers each seller's share to.
 *
 * Before this, the mapping was a static `AZPHALT_STRIPE_CONNECTED_ACCOUNTS` env blob: fine for a fixed
 * roster, useless for self-service onboarding, where a seller's `acct_…` is created at runtime and its
 * capability flags (can it accept charges / receive payouts yet?) change as Stripe finishes verifying
 * them. Storing the mapping lets a seller onboard through Stripe Connect and lets checkout resolve — and
 * gate on — a seller's live payout status.
 *
 * The default {@link InMemorySellerAccountStore} keeps dev/test behavior with no services; a durable
 * deployment supplies a database-backed store (see `@azphalt/registry-store-vercel`'s
 * `PostgresSellerAccountStore`).
 */

/** A seller's onboarded Stripe connected account and its current capability status. */
export interface SellerAccount {
  /** The marketplace-side seller id (the registry stays identity-agnostic). */
  sellerId: string;
  /** The Stripe connected account id (`acct_…`) payouts route to. */
  accountId: string;
  /** Stripe has enabled charges on this account (onboarding sufficiently complete). */
  chargesEnabled: boolean;
  /** Stripe has enabled payouts to this account. */
  payoutsEnabled: boolean;
  /** The seller has submitted all required onboarding details. */
  detailsSubmitted: boolean;
  /** ISO-8601 instant this record was last refreshed from Stripe. */
  updatedAt: string;
}

export interface SellerAccountStore {
  /** A seller's connected-account record, or `undefined` if they haven't onboarded. */
  get(sellerId: string): Promise<SellerAccount | undefined>;
  /** Reverse lookup by Stripe account id (for `account.updated` webhooks), or `undefined`. */
  getByAccountId(accountId: string): Promise<SellerAccount | undefined>;
  /** Create or replace a seller's record. */
  put(account: SellerAccount): Promise<void>;
  /** Every onboarded seller. */
  all(): Promise<SellerAccount[]>;
}

/** In-process {@link SellerAccountStore} — the default, used by tests and single-process dev. */
export class InMemorySellerAccountStore implements SellerAccountStore {
  private readonly bySeller = new Map<string, SellerAccount>();

  async get(sellerId: string): Promise<SellerAccount | undefined> {
    return this.bySeller.get(sellerId);
  }

  async getByAccountId(accountId: string): Promise<SellerAccount | undefined> {
    for (const a of this.bySeller.values()) if (a.accountId === accountId) return a;
    return undefined;
  }

  async put(account: SellerAccount): Promise<void> {
    this.bySeller.set(account.sellerId, { ...account });
  }

  async all(): Promise<SellerAccount[]> {
    return [...this.bySeller.values()];
  }
}
