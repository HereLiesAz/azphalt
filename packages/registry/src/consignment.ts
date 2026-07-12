/**
 * The consignment marketplace overlay — the paid lane, and the ONLY place a fee exists (see
 * `docs/ARCHITECTURE.md § The marketplace — consignment model`). It layers a sell-through listing on
 * a package that already lives in the {@link Registry}, computes the money split so nothing is
 * hand-waved, and hands the actual charge to a {@link PaymentProvider}. Payment is deliberately an
 * interface, not an implementation: a real deployment plugs in a marketplace-capable, split-payout
 * merchant-of-record (Stripe Connect and the like); the bundled {@link StubPaymentProvider} moves no
 * money and exists only for local dev and tests.
 */
import type { Registry } from "./registry.js";
import { RegistryError } from "./registry.js";
import type { RegistryStore } from "./store.js";
import type { ConsignmentTerms, Listing, Money, PriceBreakdown } from "./types.js";

/**
 * Default consignment economics. The platform fee has to clear the processor's cut (~2.9% + 30¢) and
 * still leave the platform a margin; 15% is a deliberately illustrative starting point, not a
 * committed rate — tune per `docs/ARCHITECTURE.md § "Very small" has a floor`.
 */
export const DEFAULT_TERMS: ConsignmentTerms = {
  platformFeeBps: 1500, // 15%
  processorPctBps: 290, // 2.9%
  processorFlatCents: 30,
};

const round = (n: number) => Math.round(n);

/** Split a sale price into processor fee, platform fee, and seller net. All amounts share currency. */
export function quote(price: Money, terms: ConsignmentTerms = DEFAULT_TERMS): PriceBreakdown {
  const processor = round((price.amountCents * terms.processorPctBps) / 10_000) + terms.processorFlatCents;
  const platform = round((price.amountCents * terms.platformFeeBps) / 10_000);
  const sellerNet = Math.max(0, price.amountCents - processor - platform);
  const m = (amountCents: number): Money => ({ amountCents, currency: price.currency });
  return { gross: m(price.amountCents), processorFee: m(processor), platformFee: m(platform), sellerNet: m(sellerNet) };
}

/* ───────────────────────────── Payment provider ───────────────────────────── */

export interface CheckoutInput {
  packageId: string;
  sellerId: string;
  buyerId: string;
  /** Total the buyer is charged. */
  amount: Money;
  /** Platform's application fee (its consignment cut), routed to the platform on settlement. */
  platformFee: Money;
}

export interface CheckoutSession {
  id: string;
  /** Where the buyer completes payment (a hosted checkout, in a real provider). */
  url: string;
  status: "pending" | "completed" | "canceled";
  amount: Money;
}

/** The split-payout charge surface the marketplace depends on. Implemented by a real MoR in prod. */
export interface PaymentProvider {
  /** Begin a split-payout charge; returns a pending session the buyer completes out-of-band. */
  createCheckout(input: CheckoutInput): Promise<CheckoutSession>;
  /** Current session state, or `undefined` if unknown to this provider. */
  getSession(id: string): Promise<CheckoutSession | undefined>;
}

/**
 * A NON-FUNCTIONAL payment provider for local dev and tests. It records sessions in memory and never
 * contacts a processor, holds funds, or moves money — every "payment" is simulated. Do not deploy it.
 */
export class StubPaymentProvider implements PaymentProvider {
  private seq = 0;
  private readonly sessions = new Map<string, CheckoutSession>();

  async createCheckout(input: CheckoutInput): Promise<CheckoutSession> {
    const id = `stub_cs_${++this.seq}`;
    const session: CheckoutSession = {
      id,
      url: `stub://checkout/${id}`,
      status: "pending",
      amount: input.amount,
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<CheckoutSession | undefined> {
    return this.sessions.get(id);
  }

  /** Test/dev only: mark a simulated session completed (or canceled). Real providers use webhooks. */
  async simulate(id: string, status: "completed" | "canceled"): Promise<CheckoutSession> {
    const s = this.sessions.get(id);
    if (!s) throw new RegistryError(`unknown stub session: ${id}`);
    const next = { ...s, status };
    this.sessions.set(id, next);
    return next;
  }
}

/* ───────────────────────────── Marketplace ───────────────────────────── */

export interface MarketplaceOptions {
  terms?: ConsignmentTerms;
  payments?: PaymentProvider;
}

export class Marketplace {
  private readonly terms: ConsignmentTerms;
  private readonly payments: PaymentProvider;

  constructor(
    private readonly registry: Registry,
    /** MUST be the same store the {@link Registry} uses, so listings and packages stay consistent. */
    private readonly store: RegistryStore,
    opts: MarketplaceOptions = {},
  ) {
    this.terms = opts.terms ?? DEFAULT_TERMS;
    this.payments = opts.payments ?? new StubPaymentProvider();
  }

  /**
   * Consign a package for sale. The package must already be published to the registry (you can only
   * sell what exists in the open lane). Creating a listing on an already-listed package updates it.
   */
  async listForSale(packageId: string, sellerId: string, price: Money): Promise<Listing> {
    const summary = await this.registry.getSummary(packageId);
    if (!summary) throw new RegistryError(`cannot list unknown package: ${packageId}`);
    if (!Number.isInteger(price.amountCents) || price.amountCents <= 0) {
      throw new RegistryError(`price must be a positive integer amount of minor units: ${price.amountCents}`);
    }
    if (!price.currency) throw new RegistryError("price.currency is required");

    const now = new Date().toISOString();
    const prior = await this.store.getListing(packageId);
    const listing: Listing = {
      packageId,
      sellerId,
      price,
      status: "active",
      createdAt: prior?.createdAt ?? now,
      updatedAt: now,
    };
    await this.store.putListing(listing);
    return listing;
  }

  /** Withdraw a listing from sale (kept on record as `unlisted`). No-op if there is no listing. */
  async unlist(packageId: string): Promise<void> {
    const listing = await this.store.getListing(packageId);
    if (!listing) return;
    await this.store.putListing({ ...listing, status: "unlisted", updatedAt: new Date().toISOString() });
  }

  /** A package's listing, or `undefined`. */
  async getListing(packageId: string): Promise<Listing | undefined> {
    return this.store.getListing(packageId);
  }

  /** All currently-purchasable listings. */
  async activeListings(): Promise<Listing[]> {
    return (await this.store.allListings()).filter((l) => l.status === "active");
  }

  /** The money split for a listing's price, under this marketplace's terms. */
  async quote(packageId: string): Promise<PriceBreakdown> {
    const listing = await this.store.getListing(packageId);
    if (!listing) throw new RegistryError(`not listed for sale: ${packageId}`);
    return quote(listing.price, this.terms);
  }

  /**
   * Start a purchase: resolve the active listing, compute the split, and open a checkout with the
   * payment provider. Returns the session plus the breakdown. Fulfilment (granting the buyer a
   * download entitlement) happens when the provider confirms the session — out of scope for the stub.
   */
  async checkout(packageId: string, buyerId: string): Promise<{ session: CheckoutSession; breakdown: PriceBreakdown; listing: Listing }> {
    const listing = await this.store.getListing(packageId);
    if (!listing || listing.status !== "active") {
      throw new RegistryError(`not for sale: ${packageId}`);
    }
    const breakdown = quote(listing.price, this.terms);
    const session = await this.payments.createCheckout({
      packageId,
      sellerId: listing.sellerId,
      buyerId,
      amount: breakdown.gross,
      platformFee: breakdown.platformFee,
    });
    return { session, breakdown, listing };
  }
}
