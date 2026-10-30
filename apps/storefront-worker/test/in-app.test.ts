import { createHash } from "node:crypto";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import worker, { quote, runScheduled, sellerBreakdown } from "../src/index";
import { assets, baseVars, durableState } from "./harness";

const BYTES = new Uint8Array([80, 75, 3, 4, 1]);
const DIGEST = "sha256-" + createHash("sha256").update(BYTES).digest("hex");
const GRAFFUX = "com.hereliesaz.graffux";
const STORE = "com.hereliesaz.azphalt.store";
const listings = [
  { packageId: "com.example.paid", sellerId: "seller_1", stripeAccountId: "acct_seller1", amountCents: 1000, currency: "USD", status: "active",
    package: { version: "1.0.0", name: "Paid Brushes", kind: "asset", integrity: DIGEST, bytes: 5, description: "Good brushes" } },
  { packageId: "com.example.Paused-One", sellerId: "seller_1", amountCents: 300, currency: "USD", status: "paused",
    package: { version: "1.0.0", name: "Paused", kind: "asset", integrity: "sha256-p" } },
  { packageId: "com.example.sub", sellerId: "seller_1", amountCents: 300, currency: "USD", status: "active", interval: "month",
    package: { version: "1.0.0", name: "Sub", kind: "code", integrity: "sha256-z" } },
];

let account = "";
beforeAll(async () => {
  const pair = await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"],
  ) as CryptoKeyPair;
  const pkcs8 = Buffer.from(await crypto.subtle.exportKey("pkcs8", pair.privateKey)).toString("base64");
  account = JSON.stringify({ client_email: "inapp@example.iam.gserviceaccount.com", private_key: "-----BEGIN PRIVATE KEY-----\n" + pkcs8 + "\n-----END PRIVATE KEY-----\n" });
});
afterEach(() => vi.unstubAllGlobals());

function makeEnv(extra: Record<string, unknown> = {}) {
  return {
    ...baseVars,
    ASSETS: assets({ "/index.html": "<title>store</title>", "/catalog.json": "[]", "/listings.json": JSON.stringify(listings) }),
    STATE: durableState(),
    ADMIN_TOKEN: "admin-secret",
    PLAY_PACKAGE_NAME: STORE,
    PLAY_PACKAGE_NAMES: STORE + "," + GRAFFUX,
    PLAY_SYNC_PACKAGES: GRAFFUX,
    PLAY_SERVICE_ACCOUNT_JSON: account,
    STRIPE_SECRET_KEY: "sk_test_x",
    ...extra,
  } as never;
}

const req = (method: string, path: string, body?: unknown, headers: Record<string, string> = {}) =>
  new Request("https://azphalt.store" + path, {
    method,
    headers: body === undefined ? headers : { "content-type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
const ADMIN = { authorization: "Bearer admin-secret" };

type Handler = (url: string, init: RequestInit | undefined, body: string) => Response | undefined;
/** Google and Stripe, by URL. Everything else (listings from GitHub raw) 404s. */
function fakeUpstream(handler: Handler) {
  const calls: { method: string; url: string; body: string; headers: Headers }[] = [];
  vi.stubGlobal("fetch", vi.fn(async (input: string | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.url;
    const body = typeof init?.body === "string" ? init.body : "";
    calls.push({ method: init?.method ?? "GET", url, body, headers: new Headers(init?.headers) });
    if (url === "https://oauth2.googleapis.com/token") return new Response(JSON.stringify({ access_token: "ya29.t", expires_in: 3600 }));
    return handler(url, init, body) ?? new Response("{}", { status: 404 });
  }));
  return calls;
}

const API = "https://androidpublisher.googleapis.com/androidpublisher/v3/applications/";
const exchange = (env: never, body: Record<string, unknown>) => worker.fetch(req("POST", "/entitlements/play", body), env);
const purchase = { packageName: GRAFFUX, packageId: "com.example.paid", productId: "com.example.paid", purchaseToken: "tok-1" };

function googleSale(state = 0, extra: Record<string, unknown> = {}): Handler {
  return (url) => {
    if (url === API + GRAFFUX + "/purchases/products/com.example.paid/tokens/tok-1") {
      return new Response(JSON.stringify({ purchaseState: state, acknowledgementState: 0, orderId: "GPA.1", regionCode: "DE", purchaseTimeMillis: String(Date.UTC(2026, 9, 1)), ...extra }));
    }
    if (url.endsWith("/tokens/tok-1:acknowledge")) return new Response("{}");
    if (url === API + GRAFFUX + "/orders/GPA.1") {
      return new Response(JSON.stringify({ orderId: "GPA.1", total: { currencyCode: "EUR", units: "11", nanos: 900000000 }, tax: { currencyCode: "EUR", units: "1", nanos: 900000000 }, buyerAddress: { buyerCountry: "DE" } }));
    }
    return undefined;
  };
}

describe("fees", () => {
  it("web quote is unchanged; in-app adds 5% as its own line", () => {
    const env = makeEnv();
    expect(quote(1000, "USD", env)).toEqual({
      gross: { amountCents: 1000, currency: "USD" }, processorFee: { amountCents: 59, currency: "USD" },
      platformFee: { amountCents: 150, currency: "USD" }, sellerNet: { amountCents: 791, currency: "USD" },
    });
    const app = quote(1000, "USD", env, { inApp: true });
    expect(app.inAppFee).toEqual({ amountCents: 50, currency: "USD" });
    expect(app.sellerNet.amountCents).toBe(741);
    expect(quote(1000, "USD", makeEnv({ IN_APP_FEE_BPS: "0" }), { inApp: true }).sellerNet.amountCents).toBe(791);
  });

  it("the seller breakdown shows web, in-app Stripe and in-app Play with the holdback", async () => {
    const b = sellerBreakdown({ amountCents: 1000, currency: "USD" }, makeEnv());
    expect(b.web.sellerNet.amountCents).toBe(791);
    expect(b.inAppStripe.sellerNet.amountCents).toBe(741);
    expect(b.inAppPlay).toMatchObject({ googleServiceFee: { amountCents: 150 }, platformFee: { amountCents: 150 }, inAppFee: { amountCents: 50 }, sellerNet: { amountCents: 650 }, holdback: { amountCents: 65, releasedAfterDays: 90 } });
    const res = await worker.fetch(req("GET", "/api/listings/com.example.paid/breakdown"), makeEnv());
    expect(((await res.json()) as { inAppPlay: { sellerNet: { amountCents: number } } }).inAppPlay.sellerNet.amountCents).toBe(650);
  });
});

describe("POST /entitlements/play from a host app", () => {
  it("refuses apps outside the allowlist", async () => {
    fakeUpstream(googleSale());
    const res = await exchange(makeEnv(), { ...purchase, packageName: "com.evil.app" });
    expect(res.status).toBe(403);
    // Distinct from a void, so a host never removes a paid package over its own misconfiguration.
    expect(await res.json()).toMatchObject({ error: { code: "app_not_accepted" } });
  });

  it("answers 202 for a pending purchase and never records it", async () => {
    const env = makeEnv();
    fakeUpstream(googleSale(2));
    const res = await exchange(env, purchase);
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ status: "pending" });
    const ledger = await (await worker.fetch(req("GET", "/api/admin/payouts", undefined, ADMIN), env)).json() as { sales: unknown[] };
    expect(ledger.sales).toEqual([]);
  });

  it("issues once, records the sale from orders.get, acknowledges, and restores without asking Google again", async () => {
    const env = makeEnv();
    const calls = fakeUpstream(googleSale());
    const first = await exchange(env, purchase);
    expect(first.status).toBe(200);
    const a = await first.json() as { status: string; entitlement: string };
    expect(a.status).toBe("ready");
    expect(calls.some((c) => c.url.endsWith(":acknowledge"))).toBe(true);

    const googleCalls = calls.length;
    const again = await (await exchange(env, purchase)).json() as { entitlement: string };
    expect(again.entitlement).toBe(a.entitlement);
    expect(calls.length).toBe(googleCalls);

    const { sale } = await (await worker.fetch(req("GET", "/api/admin/payouts/GPA.1", undefined, ADMIN), env)).json() as { sale: Record<string, unknown> };
    // €11.90 incl. €1.90 VAT: net €10.00, Google 15% €1.50, platform 20% €2.00, seller €6.50 → $6.50 of the $10 list.
    expect(sale).toMatchObject({ currency: "EUR", grossMicros: 11_900_000, taxMicros: 1_900_000, googleFeeMicros: 1_500_000, platformFeeMicros: 2_000_000, sellerShareMicros: 6_500_000, amountSource: "order", payoutCurrency: "USD", mainCents: 585, holdbackCents: 65, buyerCountry: "DE" });
  });

  it("a paused listing still restores for its buyers", async () => {
    fakeUpstream((url) => url.includes("/tokens/tok-p")
      ? new Response(JSON.stringify({ purchaseState: 0, acknowledgementState: 1, orderId: "GPA.P" }))
      : undefined);
    const res = await exchange(makeEnv(), { packageName: GRAFFUX, packageId: "com.example.Paused-One", productId: "com.example.paused_one", purchaseToken: "tok-p" });
    expect(res.status).toBe(200);
  });
});

describe("scheduled: payouts and voids", () => {
  async function bought(env: never) {
    fakeUpstream(googleSale());
    expect((await exchange(env, purchase)).status).toBe(200);
  }

  it("transfers the seller share after the hold, retrying on insufficient balance", async () => {
    const env = makeEnv();
    await bought(env);
    let balance = false;
    const calls = fakeUpstream((url) => {
      if (url === "https://api.stripe.com/v1/accounts/acct_seller1") return new Response(JSON.stringify({ id: "acct_seller1", charges_enabled: true, payouts_enabled: true, details_submitted: true }));
      if (url === "https://api.stripe.com/v1/transfers") {
        return balance
          ? new Response(JSON.stringify({ id: "tr_1" }))
          : new Response(JSON.stringify({ error: { code: "balance_insufficient", message: "Insufficient funds" } }), { status: 400 });
      }
      if (url.includes("voidedpurchases")) return new Response(JSON.stringify({}));
      return undefined;
    });
    const t = (h: number) => new Date(Date.UTC(2026, 9, 1) + h * 3600_000);
    expect((await runScheduled(env, t(50))).payouts).toEqual({ paid: 0, retried: 0, review: 0 });
    expect((await runScheduled(env, t(97))).payouts).toMatchObject({ retried: 1 });
    balance = true;
    expect((await runScheduled(env, t(98))).payouts).toMatchObject({ paid: 1 });
    const transfer = calls.filter((c) => c.url.endsWith("/v1/transfers")).at(-1)!;
    expect(new URLSearchParams(transfer.body).get("amount")).toBe("585");
    expect(new URLSearchParams(transfer.body).get("destination")).toBe("acct_seller1");
    expect(transfer.headers.get("idempotency-key")).toBe("azp_payout_main_GPA.1");
    expect((await runScheduled(env, t(99))).payouts).toMatchObject({ paid: 0 });
  });

  it("a void before payout revokes the licence and cancels the transfer", async () => {
    const env = makeEnv();
    await bought(env);
    const calls = fakeUpstream((url) => url.includes("/purchases/voidedpurchases")
      ? new Response(JSON.stringify({ voidedPurchases: [{ purchaseToken: "tok-1", orderId: "GPA.1", voidedTimeMillis: String(Date.UTC(2026, 9, 2)) }] }))
      : undefined);
    const result = await runScheduled(env, new Date(Date.UTC(2026, 9, 10)));
    expect(result.voids).toEqual({ voided: 1, reversed: 0, debited: 0 });
    expect(calls.some((c) => c.url.includes("api.stripe.com/v1/transfers"))).toBe(false);
    const voided = await exchange(env, purchase);
    expect(voided.status).toBe(403);
    expect(await voided.json()).toMatchObject({ error: { code: "revoked" } });
    const { sale } = await (await worker.fetch(req("GET", "/api/admin/payouts/GPA.1", undefined, ADMIN), env)).json() as { sale: Record<string, unknown> };
    expect(sale).toMatchObject({ mainStatus: "cancelled", holdbackStatus: "cancelled" });
  });

  it("a voided Play subscription answers 403 revoked on the next exchange", async () => {
    const env = makeEnv();
    const expiry = new Date(Date.now() + 20 * 86400_000).toISOString();
    let voidedQuery = "";
    let voided = false;
    fakeUpstream((url) => {
      if (url.endsWith("/subscriptionsv2/tokens/sub-tok")) {
        return new Response(JSON.stringify({
          subscriptionState: voided ? "SUBSCRIPTION_STATE_EXPIRED" : "SUBSCRIPTION_STATE_ACTIVE",
          acknowledgementState: "ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED",
          latestOrderId: "GPA.7",
          lineItems: [{ productId: "com.example.sub", expiryTime: expiry, latestSuccessfulOrderId: "GPA.7" }],
        }));
      }
      if (url.includes("/purchases/voidedpurchases")) {
        voidedQuery = url;
        return new Response(JSON.stringify({ voidedPurchases: [{ purchaseToken: "sub-tok", orderId: "GPA.7", voidedTimeMillis: String(Date.now()) }] }));
      }
      return undefined;
    });
    const sub = { packageName: GRAFFUX, packageId: "com.example.sub", productId: "com.example.sub", purchaseToken: "sub-tok" };
    expect((await exchange(env, sub)).status).toBe(200);
    voided = true;
    await runScheduled(env);
    expect(new URL(voidedQuery).searchParams.get("type")).toBe("1");
    const res = await exchange(env, sub);
    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ error: { code: "revoked" } });
  });

  it("a void after payout reverses the transfer, or debits when the reversal fails", async () => {
    for (const reversalWorks of [true, false]) {
      const env = makeEnv();
      await bought(env);
      let voids: unknown[] = [];
      fakeUpstream((url) => {
        if (url.endsWith("/v1/accounts/acct_seller1")) return new Response(JSON.stringify({ id: "acct_seller1", payouts_enabled: true, charges_enabled: true }));
        if (url.endsWith("/v1/transfers")) return new Response(JSON.stringify({ id: "tr_1" }));
        if (url.endsWith("/v1/transfers/tr_1/reversals")) {
          return reversalWorks ? new Response(JSON.stringify({ id: "trr_1" })) : new Response(JSON.stringify({ error: { message: "no balance" } }), { status: 400 });
        }
        if (url.includes("/purchases/voidedpurchases")) return new Response(JSON.stringify({ voidedPurchases: voids }));
        return undefined;
      });
      await runScheduled(env, new Date(Date.UTC(2026, 9, 6)));
      voids = [{ purchaseToken: "tok-1", orderId: "GPA.1", voidedTimeMillis: String(Date.UTC(2026, 9, 7)) }];
      const r = await runScheduled(env, new Date(Date.UTC(2026, 9, 8)));
      expect(r.voids).toEqual(reversalWorks ? { voided: 1, reversed: 1, debited: 0 } : { voided: 1, reversed: 0, debited: 1 });
      const list = await (await worker.fetch(req("GET", "/api/admin/payouts", undefined, ADMIN), env)).json() as { debits: unknown[] };
      // The holdback (65) covered part; 585 was reversed or debited.
      expect(list.debits).toEqual(reversalWorks ? [] : [{ sellerId: "seller_1", currency: "USD", owedCents: 585 }]);
    }
  });

  it("the admin surface is token gated", async () => {
    expect((await worker.fetch(req("GET", "/api/admin/payouts"), makeEnv())).status).toBe(401);
    expect((await worker.fetch(req("POST", "/api/admin/in-app/run"), makeEnv())).status).toBe(401);
  });
});

describe("Play product sync", () => {
  it("creates, activates and then leaves unchanged products; skips subscriptions and never-synced paused listings", async () => {
    const env = makeEnv();
    const calls = fakeUpstream((url) => {
      if (url.endsWith("/pricing:convertRegionPrices")) {
        return new Response(JSON.stringify({
          convertedRegionPrices: {
            US: { regionCode: "US", price: { currencyCode: "USD", units: "9", nanos: 990000000 } },
            DE: { regionCode: "DE", price: { currencyCode: "EUR", units: "11", nanos: 990000000 } },
          },
          convertedOtherRegionsPrice: { usdPrice: { currencyCode: "USD", units: "10" }, eurPrice: { currencyCode: "EUR", units: "10" } },
        }));
      }
      if (url.includes("/onetimeproducts/")) return new Response("{}");
      return undefined;
    });
    const [first] = (await runScheduled(env)).sync as { created: string[]; skipped: { productId: string }[] }[];
    expect(first.created).toEqual(["com.example.paid"]);
    expect(first.skipped.map((s) => s.productId)).toEqual(["com.example.paused_one", "com.example.sub"]);
    const patch = calls.find((c) => c.method === "PATCH")!;
    expect(patch.url).toContain(API + GRAFFUX + "/onetimeproducts/com.example.paid?");
    expect(patch.url).toContain("allowMissing=true");
    const body = JSON.parse(patch.body);
    expect(body.listings[0]).toEqual({ languageCode: "en-US", title: "Paid Brushes", description: "Good brushes" });
    expect(body.purchaseOptions[0].regionalPricingAndAvailabilityConfigs).toHaveLength(2);
    expect(JSON.parse(calls.find((c) => c.url.endsWith("/purchaseOptions:batchUpdateStates"))!.body).requests[0].activatePurchaseOptionRequest.purchaseOptionId).toBe("buy");
    const convert = JSON.parse(calls.find((c) => c.url.endsWith("convertRegionPrices"))!.body);
    expect(convert.price).toEqual({ currencyCode: "USD", units: "10", nanos: 0 });

    const before = calls.length;
    const [second] = (await runScheduled(env)).sync as { unchanged: string[] }[];
    expect(second.unchanged).toEqual(["com.example.paid"]);
    expect(calls.filter((c) => c.url.includes("onetimeproducts")).length).toBe(calls.slice(0, before).filter((c) => c.url.includes("onetimeproducts")).length);
  });
});

describe("in-app Stripe checkout", () => {
  function stripeCheckout() {
    return fakeUpstream((url) => {
      if (url.endsWith("/v1/accounts/acct_seller1")) return new Response(JSON.stringify({ id: "acct_seller1", charges_enabled: true, payouts_enabled: true }));
      if (url.endsWith("/v1/checkout/sessions")) return new Response(JSON.stringify({ id: "cs_1", url: "https://checkout.stripe.com/c/cs_1" }));
      return undefined;
    });
  }
  async function withPackage(env: never) {
    const up = await worker.fetch(new Request("https://azphalt.store/api/admin/packages/com.example.paid/1.0.0", { method: "PUT", headers: ADMIN, body: BYTES }), env);
    expect(up.status).toBeLessThan(300);
  }

  it("charges the in-app fee and turns on Stripe Tax; the web checkout is untouched", async () => {
    const env = makeEnv();
    await withPackage(env);
    const calls = stripeCheckout();
    const app = await (await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid", inApp: true, appId: GRAFFUX }), env)).json() as { breakdown: { inAppFee: { amountCents: number } } };
    expect(app.breakdown.inAppFee.amountCents).toBe(50);
    const appForm = new URLSearchParams(calls.filter((c) => c.url.endsWith("/v1/checkout/sessions")).at(-1)!.body);
    expect(appForm.get("payment_intent_data[application_fee_amount]")).toBe("259");
    expect(appForm.get("automatic_tax[enabled]")).toBe("true");
    expect(appForm.get("metadata[channel]")).toBe("in_app");

    await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid" }), env);
    const webForm = new URLSearchParams(calls.filter((c) => c.url.endsWith("/v1/checkout/sessions")).at(-1)!.body);
    expect(webForm.get("payment_intent_data[application_fee_amount]")).toBe("209");
    expect(webForm.get("automatic_tax[enabled]")).toBeNull();
  });

  it("Stripe Tax can be turned off", async () => {
    const env = makeEnv({ STRIPE_AUTOMATIC_TAX_IN_APP: "false" });
    await withPackage(env);
    const calls = stripeCheckout();
    await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid", inApp: true, appId: GRAFFUX }), env);
    expect(new URLSearchParams(calls.at(-1)!.body).get("automatic_tax[enabled]")).toBeNull();
  });

  it("reports an alternative-billing sale to Google when it is fulfilled", async () => {
    const env = makeEnv();
    await withPackage(env);
    stripeCheckout();
    const res = await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid", inApp: true, appId: GRAFFUX, region: "us", externalTransactionToken: "ext-tok" }), env);
    expect(res.status).toBe(200);
    const calls = fakeUpstream((url) => {
      if (url.endsWith("/v1/checkout/sessions/cs_1")) return new Response(JSON.stringify({ id: "cs_1", payment_status: "paid", status: "complete", amount_total: 1080, currency: "usd", total_details: { amount_tax: 80 }, created: 1790000000 }));
      if (url.includes("/externalTransactions?")) return new Response("{}");
      return undefined;
    });
    expect((await worker.fetch(req("GET", "/api/checkout/session/cs_1"), env)).status).toBe(200);
    const report = calls.find((c) => c.url.includes("/externalTransactions?"))!;
    expect(report.url).toContain(API + GRAFFUX + "/externalTransactions?externalTransactionId=azp-");
    expect(JSON.parse(report.body)).toMatchObject({
      originalPreTaxAmount: { priceMicros: "10000000", currency: "USD" },
      originalTaxAmount: { priceMicros: "800000", currency: "USD" },
      oneTimeTransaction: { externalTransactionToken: "ext-tok" },
      userTaxAddress: { regionCode: "US" },
    });
  });

  it("refuses a Google token without an accepted app", async () => {
    const env = makeEnv();
    stripeCheckout();
    expect((await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid", inApp: true, externalTransactionToken: "x" }), env)).status).toBe(400);
  });
});

describe("GET /billing/route", () => {
  const route = async (q: string, env = makeEnv({ PLAY_BILLING_PROGRAMS: GRAFFUX + ":us_alternative_billing" })) =>
    (await worker.fetch(req("GET", "/billing/route?" + q), env)).json() as Promise<Record<string, unknown>>;
  it("decides by distribution, country and enrolment, and names the Play product", async () => {
    expect(await route("app=" + GRAFFUX + "&distribution=direct&country=DE&packageId=com.example.paid")).toMatchObject({ route: "stripe", reportToGoogle: false });
    expect(await route("app=" + GRAFFUX + "&distribution=play&country=US&packageId=com.example.paid")).toMatchObject({ route: "stripe", reportToGoogle: true, productId: "com.example.paid", price: { amountCents: 1000 } });
    expect(await route("app=" + GRAFFUX + "&distribution=play&country=DE")).toMatchObject({ route: "play", reason: "not_enrolled" });
    expect(await route("app=com.other&distribution=play&country=BR")).toMatchObject({ route: "unavailable", reason: "app_not_accepted" });
    expect(await route("app=" + GRAFFUX + "&distribution=play&country=BR&packageId=com.example.sub")).toMatchObject({ route: "stripe", reason: "subscriptions_not_on_play" });
  });
});
