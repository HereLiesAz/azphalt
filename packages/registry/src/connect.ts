/**
 * {@link StripeConnect} — the Stripe Connect **onboarding** surface, the companion to
 * {@link StripePaymentProvider}'s charge surface. It creates a seller's **Express** connected account,
 * mints the Stripe-hosted onboarding link the seller completes, and reads back the account's capability
 * status (can it accept charges / receive payouts yet?). Express is the standard marketplace shape:
 * Stripe hosts the onboarding and KYC, the platform never handles the seller's identity documents.
 *
 * Like {@link StripePaymentProvider} it talks to Stripe's REST API directly with `fetch` — no `stripe`
 * SDK dependency, and the `fetch` is injectable for tests. Secrets/config come from the operator.
 */
import { RegistryError } from "./registry.js";

export interface StripeConnectConfig {
  /** Stripe secret key (`sk_live_…` / `sk_test_…`). Read from a secret manager / env; never committed. */
  secretKey: string;
  /** API base override (default `https://api.stripe.com`). Point at a mock in tests. */
  apiBase?: string;
  /** Injectable `fetch` (default `globalThis.fetch`). Tests pass a fake. */
  fetch?: typeof fetch;
}

/** A connected account's id plus the capability flags that decide whether it can transact. */
export interface ConnectedAccountStatus {
  /** The Stripe connected account id (`acct_…`). */
  accountId: string;
  /** Charges are enabled (onboarding sufficiently complete to receive a destination charge). */
  chargesEnabled: boolean;
  /** Payouts to the account are enabled. */
  payoutsEnabled: boolean;
  /** All required onboarding details have been submitted. */
  detailsSubmitted: boolean;
}

interface StripeAccountResponse {
  id?: string;
  charges_enabled?: boolean;
  payouts_enabled?: boolean;
  details_submitted?: boolean;
}
interface StripeAccountLinkResponse {
  url?: string;
}
interface StripeErrorResponse {
  error?: { message?: string };
}

/** Encode a flat map of already-bracketed keys as `application/x-www-form-urlencoded`. */
function form(fields: Record<string, string>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(fields)) p.set(k, v);
  return p.toString();
}

export class StripeConnect {
  private readonly apiBase: string;
  private readonly doFetch: typeof fetch;

  constructor(private readonly config: StripeConnectConfig) {
    if (!config.secretKey) throw new RegistryError("StripeConnect: secretKey is required");
    this.apiBase = (config.apiBase ?? "https://api.stripe.com").replace(/\/$/, "");
    const f = config.fetch ?? globalThis.fetch;
    if (typeof f !== "function") throw new RegistryError("StripeConnect: no fetch available; pass config.fetch");
    this.doFetch = f;
  }

  private authHeaders(extra: Record<string, string> = {}): Record<string, string> {
    return { Authorization: `Bearer ${this.config.secretKey}`, ...extra };
  }

  /** Parse a Stripe JSON response, turning a non-2xx into a {@link RegistryError} carrying Stripe's message. */
  private async parse<T>(res: Response): Promise<T> {
    const text = await res.text();
    let json: T & StripeErrorResponse;
    try {
      json = text ? (JSON.parse(text) as T & StripeErrorResponse) : ({} as T & StripeErrorResponse);
    } catch {
      throw new RegistryError(`Stripe returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
    }
    if (!res.ok) {
      const reason = json.error?.message || res.statusText || "unknown error";
      throw new RegistryError(`Stripe error (${res.status}): ${reason}`);
    }
    return json;
  }

  private async post<T>(path: string, fields: Record<string, string>): Promise<T> {
    let res: Response;
    try {
      res = await this.doFetch(`${this.apiBase}${path}`, {
        method: "POST",
        headers: this.authHeaders({ "Content-Type": "application/x-www-form-urlencoded" }),
        body: form(fields),
      });
    } catch (e) {
      throw new RegistryError(`Stripe request failed: ${e instanceof Error ? e.message : String(e)}`);
    }
    return this.parse<T>(res);
  }

  private toStatus(a: StripeAccountResponse): ConnectedAccountStatus {
    if (!a.id) throw new RegistryError("Stripe response missing account id");
    return {
      accountId: a.id,
      chargesEnabled: a.charges_enabled === true,
      payoutsEnabled: a.payouts_enabled === true,
      detailsSubmitted: a.details_submitted === true,
    };
  }

  /**
   * Create a new **Express** connected account for a seller, requesting the transfer + card-payment
   * capabilities a destination charge needs. Returns the fresh account's id and (still-`false`)
   * capability flags — the seller enables them by completing {@link createAccountLink} onboarding.
   */
  async createExpressAccount(opts: { email?: string; country?: string } = {}): Promise<ConnectedAccountStatus> {
    const fields: Record<string, string> = {
      type: "express",
      "capabilities[transfers][requested]": "true",
      "capabilities[card_payments][requested]": "true",
    };
    if (opts.country) fields.country = opts.country;
    if (opts.email) fields.email = opts.email;
    return this.toStatus(await this.post<StripeAccountResponse>("/v1/accounts", fields));
  }

  /**
   * Mint a single-use Stripe-hosted onboarding link for a connected account. `returnUrl` is where
   * Stripe sends the seller when they finish (or leave); `refreshUrl` is used if the link expires
   * before it is followed. Both must be absolute URLs the operator controls.
   */
  async createAccountLink(
    accountId: string,
    opts: { refreshUrl: string; returnUrl: string },
  ): Promise<{ url: string }> {
    if (!accountId) throw new RegistryError("StripeConnect: accountId is required");
    if (!opts.refreshUrl || !opts.returnUrl) {
      throw new RegistryError("StripeConnect: refreshUrl and returnUrl are required");
    }
    const link = await this.post<StripeAccountLinkResponse>("/v1/account_links", {
      account: accountId,
      refresh_url: opts.refreshUrl,
      return_url: opts.returnUrl,
      type: "account_onboarding",
    });
    if (!link.url) throw new RegistryError("Stripe account_link response missing url");
    return { url: link.url };
  }

  /** Read a connected account's current capability status (used after onboarding / on `account.updated`). */
  async getAccount(accountId: string): Promise<ConnectedAccountStatus> {
    if (!accountId) throw new RegistryError("StripeConnect: accountId is required");
    let res: Response;
    try {
      res = await this.doFetch(`${this.apiBase}/v1/accounts/${encodeURIComponent(accountId)}`, {
        method: "GET",
        headers: this.authHeaders(),
      });
    } catch (e) {
      throw new RegistryError(`Stripe request failed: ${e instanceof Error ? e.message : String(e)}`);
    }
    return this.toStatus(await this.parse<StripeAccountResponse>(res));
  }
}
