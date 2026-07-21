import { describe, it, expect } from "vitest";
import {
  Marketplace,
  Registry,
  InMemoryStore,
  StripePaymentProvider,
  StubPaymentProvider,
  periodEnd,
  type CheckoutInput,
} from "../src/index";
import { makeAzp } from "./make.js";

const USD = (amountCents: number) => ({ amountCents, currency: "USD" });

/** A fake `fetch` recording requests and replaying queued responses (no network). */
function fakeStripe(responses: Array<{ status: number; body: unknown }>) {
  const calls: Array<{ url: string; fields: URLSearchParams }> = [];
  let i = 0;
  const fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const body = typeof init?.body === "string" ? init.body : "";
    calls.push({ url: String(url), fields: new URLSearchParams(body) });
    const r = responses[Math.min(i++, responses.length - 1)];
    return new Response(JSON.stringify(r.body), { status: r.status, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
  return { fetch, calls };
}

describe("periodEnd", () => {
  it("advances a month and a year in UTC", () => {
    expect(periodEnd("2026-01-15T00:00:00.000Z", "month")).toBe("2026-02-15T00:00:00.000Z");
    expect(periodEnd("2026-01-15T00:00:00.000Z", "year")).toBe("2027-01-15T00:00:00.000Z");
  });
});

describe("Marketplace — subscription listings", () => {
  function setup() {
    const store = new InMemoryStore();
    const registry = new Registry(store);
    const market = new Marketplace(registry, store, { payments: new StubPaymentProvider() });
    return { registry, market };
  }

  it("lists a subscription and carries the interval into checkout", async () => {
    const { registry, market } = setup();
    await registry.publish(makeAzp("com.you.sub", "1.0.0"));
    const listing = await market.listForSale("com.you.sub", "seller_1", USD(500), { interval: "month" });
    expect(listing.interval).toBe("month");

    const { session, listing: got } = await market.checkout("com.you.sub", "buyer_1");
    expect(got.interval).toBe("month");
    expect(session.status).toBe("pending");
  });

  it("rejects a bogus interval", async () => {
    const { registry, market } = setup();
    await registry.publish(makeAzp("com.you.bad", "1.0.0"));
    // @ts-expect-error deliberately invalid interval
    await expect(market.listForSale("com.you.bad", "s", USD(500), { interval: "week" })).rejects.toThrow(/interval/);
  });
});

describe("StripePaymentProvider — subscription mode", () => {
  const baseConfig = {
    secretKey: "sk_test_123",
    connectedAccountFor: () => "acct_seller1",
    successUrl: "https://shop.example/ok",
    cancelUrl: "https://shop.example/no",
  };
  const subInput: CheckoutInput = {
    packageId: "com.you.sub",
    sellerId: "seller_1",
    buyerId: "buyer_1",
    amount: USD(1000),
    applicationFee: USD(150),
    interval: "month",
  };

  it("opens a recurring Connect checkout with an application-fee percent", async () => {
    const { fetch, calls } = fakeStripe([{ status: 200, body: { id: "cs_sub_1", url: "https://checkout/cs_sub_1", status: "open" } }]);
    const provider = new StripePaymentProvider({ ...baseConfig, fetch, apiBase: "https://api.test" });
    await provider.createCheckout(subInput);

    const f = calls[0].fields;
    expect(f.get("mode")).toBe("subscription");
    expect(f.get("line_items[0][price_data][recurring][interval]")).toBe("month");
    expect(f.get("line_items[0][price_data][unit_amount]")).toBe("1000");
    // 150/1000 = 15% platform fee.
    expect(Number(f.get("subscription_data[application_fee_percent]"))).toBeCloseTo(15, 4);
    expect(f.get("subscription_data[transfer_data][destination]")).toBe("acct_seller1");
    expect(f.get("metadata[interval]")).toBe("month");
    // Not a one-time payment intent.
    expect(f.get("payment_intent_data[application_fee_amount]")).toBeNull();
  });

  it("still opens a one-time destination charge when there is no interval", async () => {
    const { fetch, calls } = fakeStripe([{ status: 200, body: { id: "cs_1", url: "https://checkout/cs_1", status: "open" } }]);
    const provider = new StripePaymentProvider({ ...baseConfig, fetch, apiBase: "https://api.test" });
    await provider.createCheckout({ ...subInput, interval: undefined });

    const f = calls[0].fields;
    expect(f.get("mode")).toBe("payment");
    expect(f.get("payment_intent_data[application_fee_amount]")).toBe("150");
    expect(f.get("subscription_data[application_fee_percent]")).toBeNull();
  });
});
