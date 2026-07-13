/**
 * A real {@link PaymentProvider} backed by **Stripe Connect** — the marketplace lane's charge surface
 * against an actual processor. It uses **destination charges**: the buyer is charged the gross, the
 * platform's consignment cut is retained as an `application_fee_amount`, and the remainder is
 * transferred to the seller's connected account. That is the split-payout, merchant-of-record shape
 * the consignment model needs (see `docs/ARCHITECTURE.md § The marketplace`), which a single-vendor
 * MoR cannot express.
 *
 * It talks to Stripe's REST API directly with `fetch` — no `stripe` SDK dependency, so the registry
 * package stays dependency-light and the `fetch` is injectable for tests. The {@link StubPaymentProvider}
 * remains the default; this is opt-in, wired by a deployment that holds live keys.
 *
 * **The one human step:** a live deployment must supply a Stripe **secret key** (`sk_live_…`) and map
 * each marketplace `sellerId` to that seller's onboarded Stripe **connected account** (`acct_…`). Both
 * are secrets/config the operator holds; nothing here hard-codes or fabricates them — see
 * {@link stripeConfigFromEnv} and {@link StripeConfig.connectedAccountFor}.
 */
import { RegistryError } from "./registry.js";
import type { CheckoutInput, CheckoutSession, PaymentProvider } from "./consignment.js";

/** Configuration for {@link StripePaymentProvider}. Secrets come from the operator, never this repo. */
export interface StripeConfig {
  /** Stripe secret key (`sk_live_…` / `sk_test_…`). Read from a secret manager / env; never committed. */
  secretKey: string;
  /**
   * Resolve a marketplace `sellerId` to the seller's Stripe connected account id (`acct_…`) that the
   * seller's share is transferred to. The marketplace owns this mapping (onboarding via Stripe Connect
   * records it); the registry stays identity-agnostic.
   */
  connectedAccountFor: (sellerId: string) => string | Promise<string>;
  /** Absolute URL the buyer returns to after a completed checkout (Stripe appends `?session_id=…`). */
  successUrl: string;
  /** Absolute URL the buyer returns to if they cancel. */
  cancelUrl: string;
  /** Line-item name shown on the hosted checkout page. Defaults to the `packageId`. */
  productName?: (input: CheckoutInput) => string;
  /**
   * Idempotency key for the create-checkout call, so a retried request cannot double-charge. Defaults
   * to a stable key derived from the purchase (`azp_<packageId>_<buyerId>_<amount>`), which is safe to
   * repeat for the same logical purchase.
   */
  idempotencyKey?: (input: CheckoutInput) => string;
  /** API base override (default `https://api.stripe.com`). Point at a mock in tests. */
  apiBase?: string;
  /** Injectable `fetch` (default `globalThis.fetch`). Tests pass a fake. */
  fetch?: typeof fetch;
}

/** Stripe Checkout Session lifecycle → our {@link CheckoutSession.status}. */
function mapStatus(stripeStatus: unknown): CheckoutSession["status"] {
  if (stripeStatus === "complete") return "completed";
  if (stripeStatus === "expired") return "canceled";
  return "pending"; // "open" or anything unexpected — not yet resolved
}

/** Encode a flat map of already-bracketed keys as `application/x-www-form-urlencoded`. */
function form(fields: Record<string, string>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(fields)) p.set(k, v);
  return p.toString();
}

interface StripeSessionResponse {
  id?: string;
  url?: string | null;
  status?: string;
}
interface StripeErrorResponse {
  error?: { message?: string; code?: string; type?: string };
}

export class StripePaymentProvider implements PaymentProvider {
  private readonly apiBase: string;
  private readonly doFetch: typeof fetch;

  constructor(private readonly config: StripeConfig) {
    if (!config.secretKey) throw new RegistryError("StripePaymentProvider: secretKey is required");
    if (typeof config.connectedAccountFor !== "function") {
      throw new RegistryError("StripePaymentProvider: connectedAccountFor is required to route the seller's payout");
    }
    if (!config.successUrl || !config.cancelUrl) {
      throw new RegistryError("StripePaymentProvider: successUrl and cancelUrl are required");
    }
    this.apiBase = (config.apiBase ?? "https://api.stripe.com").replace(/\/$/, "");
    const f = config.fetch ?? globalThis.fetch;
    if (typeof f !== "function") {
      throw new RegistryError("StripePaymentProvider: no fetch available; pass config.fetch");
    }
    this.doFetch = f;
  }

  private authHeaders(extra: Record<string, string> = {}): Record<string, string> {
    return { Authorization: `Bearer ${this.config.secretKey}`, ...extra };
  }

  /** Parse a Stripe response, turning a non-2xx into a {@link RegistryError} carrying Stripe's message. */
  private async parse(res: Response): Promise<StripeSessionResponse> {
    const text = await res.text();
    let json: StripeSessionResponse & StripeErrorResponse;
    try {
      json = text ? (JSON.parse(text) as StripeSessionResponse & StripeErrorResponse) : {};
    } catch {
      throw new RegistryError(`Stripe returned non-JSON (${res.status}): ${text.slice(0, 200)}`);
    }
    if (!res.ok) {
      throw new RegistryError(`Stripe error (${res.status}): ${json.error?.message ?? res.statusText}`);
    }
    return json;
  }

  private toSession(input: Pick<CheckoutInput, "amount">, s: StripeSessionResponse): CheckoutSession {
    if (!s.id) throw new RegistryError("Stripe response missing session id");
    return { id: s.id, url: s.url ?? "", status: mapStatus(s.status), amount: input.amount };
  }

  async createCheckout(input: CheckoutInput): Promise<CheckoutSession> {
    const destination = await this.config.connectedAccountFor(input.sellerId);
    if (!destination) throw new RegistryError(`no Stripe connected account for seller: ${input.sellerId}`);
    const name = this.config.productName?.(input) ?? input.packageId;
    const idem =
      this.config.idempotencyKey?.(input) ??
      `azp_${input.packageId}_${input.buyerId}_${input.amount.amountCents}`;

    const body = form({
      mode: "payment",
      success_url: this.config.successUrl,
      cancel_url: this.config.cancelUrl,
      client_reference_id: input.buyerId,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": input.amount.currency.toLowerCase(),
      "line_items[0][price_data][unit_amount]": String(input.amount.amountCents),
      "line_items[0][price_data][product_data][name]": name,
      // Destination charge: retain the platform fee, transfer the rest to the seller's account.
      "payment_intent_data[application_fee_amount]": String(input.platformFee.amountCents),
      "payment_intent_data[transfer_data][destination]": destination,
      "metadata[packageId]": input.packageId,
      "metadata[sellerId]": input.sellerId,
      "metadata[buyerId]": input.buyerId,
    });

    let res: Response;
    try {
      res = await this.doFetch(`${this.apiBase}/v1/checkout/sessions`, {
        method: "POST",
        headers: this.authHeaders({ "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": idem }),
        body,
      });
    } catch (e) {
      throw new RegistryError(`Stripe request failed: ${e instanceof Error ? e.message : String(e)}`);
    }
    return this.toSession(input, await this.parse(res));
  }

  async getSession(id: string): Promise<CheckoutSession | undefined> {
    let res: Response;
    try {
      res = await this.doFetch(`${this.apiBase}/v1/checkout/sessions/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: this.authHeaders(),
      });
    } catch (e) {
      throw new RegistryError(`Stripe request failed: ${e instanceof Error ? e.message : String(e)}`);
    }
    if (res.status === 404) return undefined; // unknown to Stripe
    const s = await this.parse(res);
    // A GET carries no amount; Stripe echoes `amount_total` + `currency`, but we only need lifecycle here.
    return { id: s.id ?? id, url: s.url ?? "", status: mapStatus(s.status), amount: { amountCents: 0, currency: "" } };
  }
}

/**
 * Build a {@link StripeConfig} from environment variables, merging the operator-supplied
 * `connectedAccountFor` mapping (which can't live in a flat env var). Throws if the secret key or
 * return URLs are absent — a real deployment sets:
 *
 * - `AZPHALT_STRIPE_SECRET_KEY` — the Stripe secret key.
 * - `AZPHALT_STRIPE_SUCCESS_URL`, `AZPHALT_STRIPE_CANCEL_URL` — post-checkout return URLs.
 * - `AZPHALT_STRIPE_API_BASE` — optional API base override.
 */
export function stripeConfigFromEnv(
  env: Record<string, string | undefined>,
  rest: Pick<StripeConfig, "connectedAccountFor"> & Partial<Omit<StripeConfig, "connectedAccountFor" | "secretKey">>,
): StripeConfig {
  const secretKey = env.AZPHALT_STRIPE_SECRET_KEY;
  if (!secretKey) throw new RegistryError("AZPHALT_STRIPE_SECRET_KEY is not set");
  const successUrl = rest.successUrl ?? env.AZPHALT_STRIPE_SUCCESS_URL;
  const cancelUrl = rest.cancelUrl ?? env.AZPHALT_STRIPE_CANCEL_URL;
  if (!successUrl || !cancelUrl) {
    throw new RegistryError("AZPHALT_STRIPE_SUCCESS_URL and AZPHALT_STRIPE_CANCEL_URL are required");
  }
  return {
    secretKey,
    connectedAccountFor: rest.connectedAccountFor,
    successUrl,
    cancelUrl,
    apiBase: rest.apiBase ?? env.AZPHALT_STRIPE_API_BASE,
    productName: rest.productName,
    idempotencyKey: rest.idempotencyKey,
    fetch: rest.fetch,
  };
}
