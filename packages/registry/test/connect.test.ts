import { describe, it, expect } from "vitest";
import { StripeConnect, InMemorySellerAccountStore, RegistryError, type SellerAccount } from "../src/index";

/** A fake `fetch` that records requests and replays queued responses, so no network is touched. */
function fakeStripe(responses: Array<{ status: number; body: unknown }>) {
  const calls: Array<{ url: string; method: string; headers: Record<string, string>; fields: URLSearchParams }> = [];
  let i = 0;
  const fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const body = typeof init?.body === "string" ? init.body : "";
    calls.push({
      url: String(url),
      method: init?.method ?? "GET",
      headers: (init?.headers as Record<string, string>) ?? {},
      fields: new URLSearchParams(body),
    });
    const r = responses[Math.min(i++, responses.length - 1)];
    return new Response(JSON.stringify(r.body), { status: r.status, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
  return { fetch, calls };
}

const cfg = (fetch: typeof globalThis.fetch) => ({ secretKey: "sk_test_123", apiBase: "https://api.test", fetch });

describe("StripeConnect", () => {
  it("creates an Express account requesting transfer + card-payment capabilities", async () => {
    const { fetch, calls } = fakeStripe([
      { status: 200, body: { id: "acct_new1", charges_enabled: false, payouts_enabled: false, details_submitted: false } },
    ]);
    const status = await new StripeConnect(cfg(fetch)).createExpressAccount({ country: "US", email: "s@x.com" });

    expect(status).toEqual({ accountId: "acct_new1", chargesEnabled: false, payoutsEnabled: false, detailsSubmitted: false });
    const call = calls[0];
    expect(call.url).toBe("https://api.test/v1/accounts");
    expect(call.method).toBe("POST");
    expect(call.headers.Authorization).toBe("Bearer sk_test_123");
    expect(call.fields.get("type")).toBe("express");
    expect(call.fields.get("capabilities[transfers][requested]")).toBe("true");
    expect(call.fields.get("capabilities[card_payments][requested]")).toBe("true");
    expect(call.fields.get("country")).toBe("US");
    expect(call.fields.get("email")).toBe("s@x.com");
  });

  it("mints a hosted onboarding account link", async () => {
    const { fetch, calls } = fakeStripe([{ status: 200, body: { url: "https://connect.stripe.com/setup/acct_new1/abc" } }]);
    const { url } = await new StripeConnect(cfg(fetch)).createAccountLink("acct_new1", {
      refreshUrl: "https://shop.example/connect/refresh",
      returnUrl: "https://shop.example/connect/return",
    });

    expect(url).toBe("https://connect.stripe.com/setup/acct_new1/abc");
    const call = calls[0];
    expect(call.url).toBe("https://api.test/v1/account_links");
    expect(call.fields.get("account")).toBe("acct_new1");
    expect(call.fields.get("type")).toBe("account_onboarding");
    expect(call.fields.get("return_url")).toBe("https://shop.example/connect/return");
    expect(call.fields.get("refresh_url")).toBe("https://shop.example/connect/refresh");
  });

  it("reads back a connected account's capability status", async () => {
    const { fetch, calls } = fakeStripe([
      { status: 200, body: { id: "acct_new1", charges_enabled: true, payouts_enabled: true, details_submitted: true } },
    ]);
    const status = await new StripeConnect(cfg(fetch)).getAccount("acct_new1");

    expect(status).toEqual({ accountId: "acct_new1", chargesEnabled: true, payoutsEnabled: true, detailsSubmitted: true });
    expect(calls[0].url).toBe("https://api.test/v1/accounts/acct_new1");
    expect(calls[0].method).toBe("GET");
  });

  it("surfaces a Stripe error with its message", async () => {
    const { fetch } = fakeStripe([{ status: 400, body: { error: { message: "Invalid country" } } }]);
    await expect(new StripeConnect(cfg(fetch)).createExpressAccount({ country: "ZZ" })).rejects.toThrow(/Invalid country/);
  });

  it("requires a secret key and both link URLs", async () => {
    expect(() => new StripeConnect({ secretKey: "" })).toThrow(RegistryError);
    const { fetch } = fakeStripe([{ status: 200, body: {} }]);
    await expect(
      new StripeConnect(cfg(fetch)).createAccountLink("acct_1", { refreshUrl: "", returnUrl: "https://x" }),
    ).rejects.toThrow(/refreshUrl and returnUrl/);
  });
});

describe("InMemorySellerAccountStore", () => {
  const rec: SellerAccount = {
    sellerId: "seller_1",
    accountId: "acct_1",
    chargesEnabled: true,
    payoutsEnabled: false,
    detailsSubmitted: true,
    updatedAt: "2026-07-20T00:00:00.000Z",
  };

  it("stores, reads by seller, and reverse-looks-up by account id", async () => {
    const store = new InMemorySellerAccountStore();
    await store.put(rec);
    expect((await store.get("seller_1"))?.accountId).toBe("acct_1");
    expect((await store.getByAccountId("acct_1"))?.sellerId).toBe("seller_1");
    expect(await store.get("seller_none")).toBeUndefined();
    expect((await store.all()).length).toBe(1);
  });

  it("replaces a seller's record on re-put (e.g. account.updated refreshing flags)", async () => {
    const store = new InMemorySellerAccountStore();
    await store.put(rec);
    await store.put({ ...rec, chargesEnabled: true, payoutsEnabled: true });
    expect((await store.get("seller_1"))?.payoutsEnabled).toBe(true);
    expect((await store.all()).length).toBe(1);
  });
});
