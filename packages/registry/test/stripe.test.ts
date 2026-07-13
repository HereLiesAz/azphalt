import { describe, it, expect } from "vitest";
import { InMemoryStore, Registry, Marketplace, StripePaymentProvider, stripeConfigFromEnv, RegistryError } from "../src/index";
import type { CheckoutInput } from "../src/index";
import { makeAzp } from "./make";

/** A fake `fetch` that records requests and replays queued responses, so no network is touched. */
function fakeStripe(responses: Array<{ status: number; body: unknown }>) {
  const calls: Array<{ url: string; method: string; headers: Record<string, string>; body: string; fields: URLSearchParams }> = [];
  let i = 0;
  const fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const body = typeof init?.body === "string" ? init.body : "";
    calls.push({
      url: String(url),
      method: init?.method ?? "GET",
      headers: (init?.headers as Record<string, string>) ?? {},
      body,
      fields: new URLSearchParams(body),
    });
    const r = responses[Math.min(i++, responses.length - 1)];
    return new Response(JSON.stringify(r.body), { status: r.status, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
  return { fetch, calls };
}

const input: CheckoutInput = {
  packageId: "com.you.thing",
  sellerId: "seller_1",
  buyerId: "buyer_1",
  amount: { amountCents: 600, currency: "USD" },
  platformFee: { amountCents: 90, currency: "USD" },
};

const baseConfig = {
  secretKey: "sk_test_123",
  connectedAccountFor: () => "acct_seller1",
  successUrl: "https://shop.example/ok",
  cancelUrl: "https://shop.example/no",
};

describe("StripePaymentProvider", () => {
  it("opens a Connect destination-charge checkout with the right split and metadata", async () => {
    const { fetch, calls } = fakeStripe([{ status: 200, body: { id: "cs_test_1", url: "https://checkout.stripe.com/c/cs_test_1", status: "open" } }]);
    const provider = new StripePaymentProvider({ ...baseConfig, fetch, apiBase: "https://api.test" });

    const session = await provider.createCheckout(input);
    expect(session).toEqual({ id: "cs_test_1", url: "https://checkout.stripe.com/c/cs_test_1", status: "pending", amount: input.amount });

    expect(calls).toHaveLength(1);
    const call = calls[0];
    expect(call.url).toBe("https://api.test/v1/checkout/sessions");
    expect(call.method).toBe("POST");
    expect(call.headers.Authorization).toBe("Bearer sk_test_123");
    expect(call.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    expect(call.headers["Idempotency-Key"]).toBe("azp_com.you.thing_buyer_1_600");

    const f = call.fields;
    expect(f.get("mode")).toBe("payment");
    expect(f.get("line_items[0][price_data][unit_amount]")).toBe("600");
    expect(f.get("line_items[0][price_data][currency]")).toBe("usd"); // lowercased for Stripe
    expect(f.get("line_items[0][price_data][product_data][name]")).toBe("com.you.thing");
    // The platform's cut is retained; the rest transfers to the seller's connected account.
    expect(f.get("payment_intent_data[application_fee_amount]")).toBe("90");
    expect(f.get("payment_intent_data[transfer_data][destination]")).toBe("acct_seller1");
    expect(f.get("metadata[packageId]")).toBe("com.you.thing");
    expect(f.get("client_reference_id")).toBe("buyer_1");
  });

  it("resolves the connected account asynchronously and honors a custom product name", async () => {
    const { fetch, calls } = fakeStripe([{ status: 200, body: { id: "cs_2", url: "u", status: "open" } }]);
    const provider = new StripePaymentProvider({
      ...baseConfig,
      fetch,
      connectedAccountFor: async (id) => `acct_${id}`,
      productName: (i) => `Buy ${i.packageId}`,
    });
    await provider.createCheckout(input);
    expect(calls[0].fields.get("payment_intent_data[transfer_data][destination]")).toBe("acct_seller_1");
    expect(calls[0].fields.get("line_items[0][price_data][product_data][name]")).toBe("Buy com.you.thing");
  });

  it("maps session lifecycle: complete → completed, expired → canceled, 404 → undefined", async () => {
    const complete = new StripePaymentProvider({
      ...baseConfig,
      fetch: fakeStripe([{ status: 200, body: { id: "cs_3", url: "u", status: "complete" } }]).fetch,
    });
    expect((await complete.getSession("cs_3"))?.status).toBe("completed");

    const expired = new StripePaymentProvider({
      ...baseConfig,
      fetch: fakeStripe([{ status: 200, body: { id: "cs_4", url: "u", status: "expired" } }]).fetch,
    });
    expect((await expired.getSession("cs_4"))?.status).toBe("canceled");

    const missing = new StripePaymentProvider({
      ...baseConfig,
      fetch: fakeStripe([{ status: 404, body: { error: { code: "resource_missing", message: "No such session" } } }]).fetch,
    });
    expect(await missing.getSession("cs_nope")).toBeUndefined();
  });

  it("surfaces a Stripe API error as a RegistryError carrying Stripe's message", async () => {
    const provider = new StripePaymentProvider({
      ...baseConfig,
      fetch: fakeStripe([{ status: 402, body: { error: { message: "Your card was declined." } } }]).fetch,
    });
    await expect(provider.createCheckout(input)).rejects.toThrow(/Stripe error \(402\): Your card was declined\./);
  });

  it("rejects a missing connected account", async () => {
    const provider = new StripePaymentProvider({
      ...baseConfig,
      connectedAccountFor: () => "",
      fetch: fakeStripe([{ status: 200, body: {} }]).fetch,
    });
    await expect(provider.createCheckout(input)).rejects.toThrow(/no Stripe connected account/);
  });

  it("validates its configuration on construction", () => {
    // @ts-expect-error missing secretKey
    expect(() => new StripePaymentProvider({ ...baseConfig, secretKey: "" })).toThrow(/secretKey is required/);
    expect(() => new StripePaymentProvider({ ...baseConfig, successUrl: "" })).toThrow(/successUrl and cancelUrl/);
  });

  it("drives a Marketplace.checkout end-to-end (application fee equals the platform cut)", async () => {
    const store = new InMemoryStore();
    const registry = new Registry(store);
    await registry.publish(makeAzp("com.you.thing", "1.0.0"));

    const { fetch, calls } = fakeStripe([{ status: 200, body: { id: "cs_e2e", url: "https://checkout/cs_e2e", status: "open" } }]);
    const payments = new StripePaymentProvider({ ...baseConfig, fetch });
    const market = new Marketplace(registry, store, { payments });

    await market.listForSale("com.you.thing", "seller_1", { amountCents: 600, currency: "USD" });
    const { session, breakdown } = await market.checkout("com.you.thing", "buyer_9");

    expect(session.id).toBe("cs_e2e");
    expect(session.status).toBe("pending");
    // The fee sent to Stripe must equal the quoted platform cut — the money model and the charge agree.
    expect(calls[0].fields.get("payment_intent_data[application_fee_amount]")).toBe(String(breakdown.platformFee.amountCents));
  });
});

describe("stripeConfigFromEnv", () => {
  it("reads keys/URLs from env and merges connectedAccountFor", () => {
    const cfg = stripeConfigFromEnv(
      {
        AZPHALT_STRIPE_SECRET_KEY: "sk_test_env",
        AZPHALT_STRIPE_SUCCESS_URL: "https://s/ok",
        AZPHALT_STRIPE_CANCEL_URL: "https://s/no",
        AZPHALT_STRIPE_API_BASE: "https://api.override",
      },
      { connectedAccountFor: () => "acct_x" },
    );
    expect(cfg.secretKey).toBe("sk_test_env");
    expect(cfg.successUrl).toBe("https://s/ok");
    expect(cfg.apiBase).toBe("https://api.override");
    expect(new StripePaymentProvider(cfg)).toBeInstanceOf(StripePaymentProvider);
  });

  it("throws when the secret key is absent", () => {
    expect(() => stripeConfigFromEnv({}, { connectedAccountFor: () => "acct_x" })).toThrow(RegistryError);
    expect(() => stripeConfigFromEnv({}, { connectedAccountFor: () => "acct_x" })).toThrow(/AZPHALT_STRIPE_SECRET_KEY/);
  });
});
