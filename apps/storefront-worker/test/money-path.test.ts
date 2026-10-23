/**
 * The money path end to end, against the real Worker and the real Durable Object over SQLite: checkout
 * (fee math, listing validation, paused refusal, throttling, error hygiene), every webhook the store
 * acts on (fulfilment, renewals, cancellation, account updates, refunds and disputes), the webhook's
 * replay window, paid-download gating, seller binding and invites, and the upload cap.
 *
 * Stripe and Google are never called: `fetch` is stubbed per test and fails on anything unexpected.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { createHash, createHmac, generateKeyPairSync, sign } from "node:crypto";
import worker from "../src/index";
import { inspectAzp, safeKind } from "../src/publish";
import { zipSync, strToU8 } from "fflate";
import { assets, baseVars, durableState } from "./harness";

const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const ENTITLEMENT = {
  ENTITLEMENT_PRIVATE_KEY_PKCS8_B64: privateKey.export({ type: "pkcs8", format: "der" }).toString("base64"),
  ENTITLEMENT_PUBLIC_KEY_SPKI_B64: publicKey.export({ type: "spki", format: "der" }).toString("base64"),
  BUYER_SESSION_SECRET: "buyer-secret",
};
const ADMIN = { authorization: "Bearer admin-secret" };
const BYTES = new Uint8Array([80, 75, 3, 4, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
const hex = (b: Uint8Array) => createHash("sha256").update(b).digest("hex");
const BUYER = "buyer_" + "a".repeat(24);
const BUYER_2 = "buyer_" + "b".repeat(24);

type Listing = Record<string, unknown>;
const paidListing = (extra: Listing = {}): Listing => ({
  packageId: "com.example.paid",
  sellerId: "seller_1",
  stripeAccountId: "acct_seller",
  amountCents: 1000,
  currency: "USD",
  status: "active",
  package: { version: "1.0.0", name: "Paid", kind: "asset", bytes: BYTES.length, integrity: "sha256-" + hex(BYTES) },
  ...extra,
});
const subListing = (): Listing => paidListing({ packageId: "com.example.sub", interval: "month", package: { version: "1.0.0", name: "Sub", kind: "asset", integrity: "sha256-" + hex(BYTES) } });

function makeEnv(listings: Listing[] = [paidListing(), subListing()], extra: Record<string, unknown> = {}, catalog: unknown[] = []) {
  return {
    ...baseVars,
    ASSETS: assets({
      "/index.html": "<title>store</title>",
      "/catalog.json": JSON.stringify(catalog),
      "/listings.json": JSON.stringify(listings),
    }),
    STATE: durableState(),
    ADMIN_TOKEN: "admin-secret",
    STRIPE_SECRET_KEY: "sk_test_x",
    STRIPE_WEBHOOK_SECRET: "whsec_test",
    ...ENTITLEMENT,
    ...extra,
  } as never;
}

function req(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
  return new Request("https://azphalt.store" + path, {
    method,
    headers: body === undefined ? headers : { "content-type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

type Handler = (url: string, init: RequestInit | undefined) => Response | Promise<Response | undefined> | undefined;
/** Stub `fetch`: the handler answers what it knows; anything else fails the test loudly. */
function stub(handler: Handler = () => undefined) {
  const calls: { url: string; init?: RequestInit }[] = [];
  vi.stubGlobal("fetch", vi.fn(async (input: string | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.url;
    calls.push({ url, init });
    const answer = await handler(url, init);
    if (answer) return answer;
    return new Response(JSON.stringify({ error: { message: "unexpected call " + url } }), { status: 599 });
  }));
  return calls;
}
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const readyAccount = (id = "acct_seller", ready = true) =>
  new Response(JSON.stringify({ id, charges_enabled: ready, payouts_enabled: ready, details_submitted: ready }));

function signedWebhook(event: unknown, at = Math.floor(Date.now() / 1000), secret = "whsec_test"): Request {
  const payload = JSON.stringify(event);
  const v1 = createHmac("sha256", secret).update(`${at}.${payload}`).digest("hex");
  return new Request("https://azphalt.store/api/webhooks/stripe", {
    method: "POST",
    headers: { "stripe-signature": `t=${at},v1=${v1}`, "content-type": "application/json" },
    body: payload,
  });
}

const completed = (id: string, extra: Record<string, unknown> = {}, metadata: Record<string, unknown> = {}) => ({
  type: "checkout.session.completed",
  data: {
    object: {
      id,
      payment_status: "paid",
      payment_intent: "pi_" + id,
      metadata: { packageId: "com.example.paid", buyerId: BUYER, ...metadata },
      ...extra,
    },
  },
});

async function upload(env: never, id = "com.example.paid") {
  const res = await worker.fetch(
    new Request(`https://azphalt.store/api/admin/packages/${id}/1.0.0`, { method: "PUT", headers: ADMIN, body: BYTES }),
    env,
  );
  expect(res.status).toBe(200);
}

async function tokenFor(env: never, sessionId: string): Promise<string> {
  const res = await worker.fetch(req("GET", "/api/admin/entitlements/" + sessionId, undefined, ADMIN), env);
  expect(res.status).toBe(200);
  return ((await res.json()) as { token: string }).token;
}

const download = (env: never, token?: string, id = "com.example.paid") =>
  worker.fetch(req("GET", `/packages/${id}/versions/1.0.0/download`, undefined, token ? { authorization: "Bearer " + token } : {}), env);

/** A store-signed token with arbitrary claims, signed the way the Worker signs. */
function craftToken(claims: Record<string, unknown>, key = privateKey): string {
  const ordered: Record<string, unknown> = {
    packageId: claims.packageId,
    subject: claims.subject,
    kind: claims.kind,
    issuedAt: claims.issuedAt,
  };
  if (claims.expiresAt !== undefined) ordered.expiresAt = claims.expiresAt;
  const signature = sign(null, Buffer.from(JSON.stringify(ordered)), key).toString("base64");
  return Buffer.from(JSON.stringify({ claims: ordered, signature, publicKey: ENTITLEMENT.ENTITLEMENT_PUBLIC_KEY_SPKI_B64 })).toString("base64");
}

describe("checkout", () => {
  function stripeStub(sessionBodies: URLSearchParams[]) {
    return stub((url, init) => {
      if (url === "https://api.stripe.com/v1/accounts/acct_seller") return readyAccount();
      if (url === "https://api.stripe.com/v1/checkout/sessions" && init?.method === "POST") {
        sessionBodies.push(new URLSearchParams(String(init.body)));
        return new Response(JSON.stringify({ id: "cs_test_1", url: "https://checkout.stripe.com/c/cs_test_1" }));
      }
      return undefined;
    });
  }

  it("charges the listed price to the pinned account with the processor + platform fee", async () => {
    const env = makeEnv();
    await upload(env);
    const bodies: URLSearchParams[] = [];
    stripeStub(bodies);
    const res = await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid", email: "b@example.com" }), env);
    expect(res.status).toBe(200);
    const out = await res.json() as { session: { id: string; url: string }; breakdown: Record<string, { amountCents: number }> };
    expect(out.session.url).toBe("https://checkout.stripe.com/c/cs_test_1");
    // 2.9% + 30c processor, 15% platform on $10.00.
    expect(out.breakdown.processorFee.amountCents).toBe(59);
    expect(out.breakdown.platformFee.amountCents).toBe(150);
    expect(out.breakdown.sellerNet.amountCents).toBe(791);
    const body = bodies[0];
    expect(body.get("mode")).toBe("payment");
    expect(body.get("line_items[0][price_data][unit_amount]")).toBe("1000");
    expect(body.get("payment_intent_data[application_fee_amount]")).toBe("209");
    expect(body.get("payment_intent_data[transfer_data][destination]")).toBe("acct_seller");
    expect(body.get("customer_creation")).toBe("always");
    expect(body.get("customer_email")).toBe("b@example.com");
    expect(res.headers.get("set-cookie")).toContain("azphalt_buyer_session=");
  });

  it("uses an application fee percent for a subscription", async () => {
    const env = makeEnv();
    await upload(env, "com.example.sub");
    const bodies: URLSearchParams[] = [];
    stripeStub(bodies);
    const res = await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.sub" }), env);
    expect(res.status).toBe(200);
    expect(bodies[0].get("mode")).toBe("subscription");
    expect(bodies[0].get("subscription_data[application_fee_percent]")).toBe("20.90");
    expect(bodies[0].get("line_items[0][price_data][recurring][interval]")).toBe("month");
  });

  it("validates the request and the listing before touching Stripe", async () => {
    const calls = stub();
    const listings = [paidListing(), paidListing({ packageId: "com.example.paused", status: "paused" }), paidListing({ packageId: "com.example.nostatus", status: undefined })];
    const env = makeEnv(listings);
    const status = async (body: unknown) => (await worker.fetch(req("POST", "/api/checkout", body), env)).status;
    expect(await status({})).toBe(400);
    expect(await status({ packageId: "bad id!" })).toBe(400);
    expect(await status({ packageId: "com.example.unknown" })).toBe(404);
    expect(await status({ packageId: "com.example.paused" })).toBe(409);
    // No `status` is paused, not live.
    expect(await status({ packageId: "com.example.nostatus" })).toBe(409);
    // Listed but no protected bytes uploaded yet.
    expect(await status({ packageId: "com.example.paid" })).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("refuses a paid listing whose id is also publicly downloadable", async () => {
    stub();
    const env = makeEnv([paidListing()], {}, [{ id: "com.example.paid", version: "1.0.0", name: "x", kind: "asset", file: "x.azp" }]);
    expect((await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid" }), env)).status).toBe(409);
  });

  it("is throttled by the write limiter", async () => {
    const calls = stub();
    const env = makeEnv(undefined, { WRITE_LIMITER: { limit: async () => ({ success: false }) } });
    expect((await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid" }), env)).status).toBe(429);
    expect(calls).toHaveLength(0);
  });

  it("never returns Stripe's error text (it can name the seller's account)", async () => {
    const env = makeEnv();
    await upload(env);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    stub((url) => {
      if (url.endsWith("/v1/accounts/acct_seller")) return readyAccount();
      if (url.endsWith("/v1/checkout/sessions")) {
        return new Response(JSON.stringify({ error: { message: "No such destination: 'acct_seller'" } }), { status: 400 });
      }
      return undefined;
    });
    const res = await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid" }), env);
    expect(res.status).toBe(502);
    expect(JSON.stringify(await res.json())).not.toMatch(/acct_/);
  });

  it("refuses when the seller's account is not ready", async () => {
    const env = makeEnv();
    await upload(env);
    stub((url) => (url.endsWith("/v1/accounts/acct_seller") ? readyAccount("acct_seller", false) : undefined));
    expect((await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid" }), env)).status).toBe(409);
  });
});

describe("webhook signature", () => {
  it("accepts a timestamp inside the 300 s window and refuses one outside it, either way", async () => {
    const env = makeEnv();
    const now = Math.floor(Date.now() / 1000);
    const ping = { type: "ping", data: { object: {} } };
    expect((await worker.fetch(signedWebhook(ping, now - 290), env)).status).toBe(200);
    expect((await worker.fetch(signedWebhook(ping, now - 310), env)).status).toBe(400);
    expect((await worker.fetch(signedWebhook(ping, now + 310), env)).status).toBe(400);
    expect((await worker.fetch(signedWebhook(ping, now, "whsec_other"), env)).status).toBe(400);
  });
});

describe("fulfilment", () => {
  it("fulfils a paid session: the entitlement exists, is listed for the buyer, and downloads", async () => {
    const env = makeEnv();
    await upload(env);
    const res = await worker.fetch(signedWebhook(completed("cs_1")), env);
    expect(await res.json()).toEqual({ received: true, fulfilled: true });

    const result = await worker.fetch(req("GET", "/api/checkout/session/cs_1"), env);
    expect(result.status).toBe(200);
    const { token, packageId } = await result.json() as { token: string; packageId: string };
    expect(packageId).toBe("com.example.paid");
    const cookie = result.headers.get("set-cookie")!.split(";")[0];
    const listed = await (await worker.fetch(req("GET", "/api/purchases", undefined, { cookie }), env)).json() as { sessionId: string }[];
    expect(listed.map((p) => p.sessionId)).toEqual(["cs_1"]);

    const dl = await download(env, token);
    expect(dl.status).toBe(200);
    expect(new Uint8Array(await dl.arrayBuffer())).toEqual(BYTES);
  });

  it("fulfils a delayed-notification payment on async_payment_succeeded", async () => {
    const env = makeEnv();
    const unpaid = completed("cs_async", { payment_status: "unpaid" });
    expect(await (await worker.fetch(signedWebhook(unpaid), env)).json()).toEqual({ received: true, fulfilled: false });
    const settled = { ...completed("cs_async"), type: "checkout.session.async_payment_succeeded" };
    expect(await (await worker.fetch(signedWebhook(settled), env)).json()).toEqual({ received: true, fulfilled: true });
    await tokenFor(env, "cs_async");
  });

  it("renews a subscription on invoice.paid, and stops renewing once it is deleted", async () => {
    const env = makeEnv();
    const sub = completed("cs_sub", { subscription: "sub_1", invoice: "in_first" }, { packageId: "com.example.sub", interval: "month" });
    expect(await (await worker.fetch(signedWebhook(sub), env)).json()).toMatchObject({ fulfilled: true });

    const invoice = (id: string, billing_reason: string) => ({
      type: "invoice.paid",
      data: { object: { id, billing_reason, parent: { subscription_details: { subscription: "sub_1" } } } },
    });
    expect(await (await worker.fetch(signedWebhook(invoice("in_first", "subscription_create")), env)).json())
      .toEqual({ received: true, renewed: false });
    expect(await (await worker.fetch(signedWebhook(invoice("in_2", "subscription_cycle")), env)).json())
      .toEqual({ received: true, renewed: true });
    const renewal = JSON.parse(Buffer.from(await tokenFor(env, "invoice:in_2"), "base64").toString()) as { claims: { kind: string; expiresAt: string } };
    expect(renewal.claims.kind).toBe("subscription");
    expect(Date.parse(renewal.claims.expiresAt)).toBeGreaterThan(Date.now());

    const deleted = { type: "customer.subscription.deleted", data: { object: { id: "sub_1" } } };
    expect(await (await worker.fetch(signedWebhook(deleted), env)).json()).toEqual({ received: true, cancelled: true });
    expect(await (await worker.fetch(signedWebhook(invoice("in_3", "subscription_cycle")), env)).json())
      .toEqual({ received: true, renewed: false });
  });

  it("refreshes a known seller on account.updated and ignores an unknown account", async () => {
    const env = makeEnv([]);
    stub((url) => (url.endsWith("/v1/accounts/acct_new") ? readyAccount("acct_new", false) : undefined));
    expect((await worker.fetch(req("PUT", "/api/admin/connect/sellers/seller_9", { accountId: "acct_new" }, ADMIN), env)).status).toBe(200);
    const status = async () => (await (await worker.fetch(req("GET", "/api/connect/status?sellerId=seller_9"), env)).json()) as Record<string, unknown>;
    expect(await status()).toMatchObject({ onboarded: true, chargesEnabled: false });

    const updated = (id: string) => ({ type: "account.updated", data: { object: { id, charges_enabled: true, payouts_enabled: true, details_submitted: true } } });
    await worker.fetch(signedWebhook(updated("acct_new")), env);
    expect(await status()).toMatchObject({ onboarded: true, chargesEnabled: true, payoutsEnabled: true });
    // An account the store never bound is not adopted.
    await worker.fetch(signedWebhook(updated("acct_stranger")), env);
    expect(await (await worker.fetch(req("GET", "/api/connect/status?sellerId=acct_stranger"), env)).json()).toEqual({ onboarded: false });
  });
});

describe("refunds and disputes revoke one buyer, not the version", () => {
  async function twoBuyers() {
    const env = makeEnv();
    await upload(env);
    await worker.fetch(signedWebhook(completed("cs_a")), env);
    await worker.fetch(signedWebhook(completed("cs_b", {}, { buyerId: BUYER_2 })), env);
    return { env, a: await tokenFor(env, "cs_a"), b: await tokenFor(env, "cs_b") };
  }
  const refund = (pi: string, refunded = true) => ({ type: "charge.refunded", data: { object: { id: "ch_" + pi, payment_intent: pi, refunded } } });
  const dispute = (type: string, pi: string, status?: string) => ({ type, data: { object: { id: "dp_1", charge: "ch_x", payment_intent: pi, status } } });

  it("a full refund revokes that purchase only", async () => {
    const { env, a, b } = await twoBuyers();
    expect(await (await worker.fetch(signedWebhook(refund("pi_cs_a")), env)).json()).toEqual({ received: true, revoked: true });
    expect((await download(env, a)).status).toBe(403);
    expect((await download(env, b)).status).toBe(200);
    expect((await worker.fetch(req("GET", "/api/checkout/session/cs_a"), env)).status).toBe(403);
    // The version itself is not yanked.
    expect(await (await worker.fetch(req("GET", "/revocations"), env)).json()).toEqual({ revocations: [] });
  });

  it("a partial refund keeps the licence", async () => {
    const { env, a } = await twoBuyers();
    expect(await (await worker.fetch(signedWebhook(refund("pi_cs_a", false)), env)).json()).toEqual({ received: true, revoked: false });
    expect((await download(env, a)).status).toBe(200);
  });

  it("an unknown charge revokes nothing (and asks Stripe for the session as a fallback)", async () => {
    const { env, a } = await twoBuyers();
    const calls = stub((url) => (url.includes("/v1/checkout/sessions?") ? new Response(JSON.stringify({ data: [] })) : undefined));
    expect(await (await worker.fetch(signedWebhook(refund("pi_unknown")), env)).json()).toEqual({ received: true, revoked: false });
    expect(calls.some((c) => c.url.includes("payment_intent=pi_unknown"))).toBe(true);
    expect((await download(env, a)).status).toBe(200);
  });

  it("a dispute revokes; winning it restores; losing it does not", async () => {
    const { env, a, b } = await twoBuyers();
    await worker.fetch(signedWebhook(dispute("charge.dispute.created", "pi_cs_a")), env);
    await worker.fetch(signedWebhook(dispute("charge.dispute.created", "pi_cs_b")), env);
    expect((await download(env, a)).status).toBe(403);
    expect(await (await worker.fetch(signedWebhook(dispute("charge.dispute.closed", "pi_cs_a", "won")), env)).json())
      .toEqual({ received: true, restored: true });
    expect((await download(env, a)).status).toBe(200);
    await worker.fetch(signedWebhook(dispute("charge.dispute.closed", "pi_cs_b", "lost")), env);
    expect((await download(env, b)).status).toBe(403);
  });

  it("a refunded purchase is not restored by a later dispute win", async () => {
    const { env, a } = await twoBuyers();
    await worker.fetch(signedWebhook(dispute("charge.dispute.created", "pi_cs_a")), env);
    await worker.fetch(signedWebhook(refund("pi_cs_a")), env);
    await worker.fetch(signedWebhook(dispute("charge.dispute.closed", "pi_cs_a", "won")), env);
    expect((await download(env, a)).status).toBe(403);
  });

  it("a renewal refund revokes that period's token", async () => {
    const env = makeEnv();
    await upload(env, "com.example.sub");
    await worker.fetch(signedWebhook(completed("cs_s", { subscription: "sub_9" }, { packageId: "com.example.sub", interval: "month" })), env);
    await worker.fetch(signedWebhook({ type: "invoice.paid", data: { object: { id: "in_9", billing_reason: "subscription_cycle", subscription: "sub_9" } } }), env);
    const renewal = await tokenFor(env, "invoice:in_9");
    expect((await download(env, renewal, "com.example.sub")).status).toBe(200);
    await worker.fetch(signedWebhook({ type: "charge.refunded", data: { object: { id: "ch_9", invoice: "in_9", refunded: true } } }), env);
    expect((await download(env, renewal, "com.example.sub")).status).toBe(403);
  });
});

describe("paid download gating", () => {
  const issuedAt = new Date().toISOString();
  const claims = { packageId: "com.example.paid", subject: BUYER, kind: "perpetual", issuedAt };

  it("serves a valid token and refuses expired, forged and wrong-package tokens", async () => {
    const env = makeEnv();
    await upload(env);
    expect((await download(env)).status).toBe(401);
    expect((await download(env, craftToken(claims))).status).toBe(200);
    expect((await download(env, craftToken({ ...claims, kind: "subscription", expiresAt: new Date(Date.now() - 1000).toISOString() }))).status).toBe(401);
    expect((await download(env, craftToken({ ...claims, packageId: "com.example.sub" }))).status).toBe(401);
    const forger = generateKeyPairSync("ed25519").privateKey;
    expect((await download(env, craftToken(claims, forger))).status).toBe(401);
    const tampered = JSON.parse(Buffer.from(craftToken(claims), "base64").toString());
    tampered.claims.packageId = "com.example.paid";
    tampered.claims.subject = BUYER_2;
    expect((await download(env, Buffer.from(JSON.stringify(tampered)).toString("base64"))).status).toBe(401);
    expect((await download(env, "not-a-token")).status).toBe(401);
  });

  it("pausing a listing stops new checkouts but not an owner's downloads", async () => {
    const env = makeEnv([paidListing({ status: "paused" })]);
    await upload(env);
    expect((await download(env, craftToken(claims))).status).toBe(200);
    expect((await worker.fetch(req("GET", "/api/download/com.example.paid", undefined, { authorization: "Bearer " + craftToken(claims) }), env)).status).toBe(200);
    stub();
    expect((await worker.fetch(req("POST", "/api/checkout", { packageId: "com.example.paid" }), env)).status).toBe(409);
  });
});

describe("seller binding", () => {
  async function mint(env: never, sellerId: string): Promise<string> {
    const res = await worker.fetch(req("POST", "/api/admin/connect/invite", { sellerId }, ADMIN), env);
    return ((await res.json()) as { inviteCode: string }).inviteCode;
  }
  const onboard = (env: never, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
    worker.fetch(req("POST", "/api/connect/onboard", body, headers), env);
  const stripeOnboarding = (delayMs = 0) => {
    let created = 0;
    const calls = stub(async (url, init) => {
      if (url.endsWith("/v1/accounts") && init?.method === "POST") {
        created++;
        await new Promise((r) => setTimeout(r, delayMs));
        return readyAccount("acct_new_" + created, false);
      }
      if (url.includes("/v1/accounts/acct_")) return readyAccount(url.split("/").pop()!, false);
      if (url.endsWith("/v1/account_links")) return new Response(JSON.stringify({ url: "https://connect.stripe.com/x" }));
      return undefined;
    });
    return { calls, created: () => created };
  };

  it("an invite expires after seven days", async () => {
    const env = makeEnv([]);
    stripeOnboarding();
    const realNow = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(realNow - 8 * 24 * 3600 * 1000);
    const old = await mint(env, "seller_x");
    vi.spyOn(Date, "now").mockReturnValue(realNow);
    expect((await onboard(env, { sellerId: "seller_x", inviteCode: old })).status).toBe(401);
    expect((await onboard(env, { sellerId: "seller_x", inviteCode: await mint(env, "seller_x") })).status).toBe(200);
  });

  it("an invite is not a MAC keyed by the admin token itself", async () => {
    const env = makeEnv([]);
    const code = await mint(env, "seller_x");
    const [stamp, mac] = code.split(".");
    const direct = createHmac("sha256", "admin-secret").update("connect-invite:v2:seller_x:" + stamp).digest("base64url");
    const legacy = createHmac("sha256", "admin-secret").update("connect-invite:seller_x").digest("base64url");
    expect(mac).not.toBe(direct);
    expect(mac).not.toBe(legacy);
  });

  it("refuses to onboard a seller whose listings pin a different account; the operator binds it", async () => {
    const env = makeEnv([paidListing()]);
    const { calls } = stripeOnboarding();
    expect((await onboard(env, { sellerId: "seller_1" }, ADMIN)).status).toBe(409);
    expect(calls).toHaveLength(0);
    expect((await worker.fetch(req("PUT", "/api/admin/connect/sellers/seller_1", { accountId: "acct_other" }, ADMIN), env)).status).toBe(409);
    expect((await worker.fetch(req("PUT", "/api/admin/connect/sellers/seller_1", { accountId: "acct_seller" }), env)).status).toBe(401);
    expect((await worker.fetch(req("PUT", "/api/admin/connect/sellers/seller_1", { accountId: "acct_seller" }, ADMIN), env)).status).toBe(200);
    // Now bound to the pinned account, onboarding continues it rather than creating another.
    expect((await onboard(env, { sellerId: "seller_1" }, ADMIN)).status).toBe(200);
    expect(calls.some((c) => c.url.endsWith("/v1/accounts") && c.init?.method === "POST")).toBe(false);
  });

  it("unbinding lets a seller onboard afresh", async () => {
    const env = makeEnv([]);
    const { created } = stripeOnboarding();
    expect((await onboard(env, { sellerId: "seller_u" }, ADMIN)).status).toBe(200);
    expect((await worker.fetch(req("DELETE", "/api/admin/connect/sellers/seller_u", undefined, ADMIN), env)).status).toBe(204);
    expect((await worker.fetch(req("DELETE", "/api/admin/connect/sellers/seller_u", undefined, ADMIN), env)).status).toBe(404);
    expect((await onboard(env, { sellerId: "seller_u" }, ADMIN)).status).toBe(200);
    expect(created()).toBe(2);
  });

  it("two concurrent onboard calls create one Stripe account", async () => {
    const env = makeEnv([]);
    const { created } = stripeOnboarding(30);
    const [x, y] = await Promise.all([onboard(env, { sellerId: "seller_c" }, ADMIN), onboard(env, { sellerId: "seller_c" }, ADMIN)]);
    expect([x.status, y.status].sort()).toEqual([200, 409]);
    expect(created()).toBe(1);
    // After the first finishes, onboarding again continues the same account.
    expect((await onboard(env, { sellerId: "seller_c" }, ADMIN)).status).toBe(200);
    expect(created()).toBe(1);
  });
});

describe("caps and limits", () => {
  it("admin upload enforces the cap on the bytes actually sent, not Content-Length", async () => {
    const env = makeEnv();
    const lying = new Request("https://azphalt.store/api/admin/packages/com.example.paid/1.0.0", {
      method: "PUT",
      headers: { ...ADMIN, "content-length": "100000001" },
      body: BYTES,
    });
    expect((await worker.fetch(lying, env)).status).toBe(413);

    const chunk = new Uint8Array(1024 * 1024);
    let sent = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (sent++ > 100) controller.close();
        else controller.enqueue(chunk);
      },
    });
    const chunked = new Request("https://azphalt.store/api/admin/packages/com.example.paid/1.0.0", {
      method: "PUT",
      headers: ADMIN,
      body: stream,
      duplex: "half",
    } as RequestInit);
    expect((await worker.fetch(chunked, env)).status).toBe(413);
  });

  it("admin upload checks auth, version and digest", async () => {
    const env = makeEnv();
    const put = (path: string, body: Uint8Array<ArrayBuffer>, headers: Record<string, string> = ADMIN) =>
      worker.fetch(new Request("https://azphalt.store" + path, { method: "PUT", headers, body }), env);
    expect((await put("/api/admin/packages/com.example.paid/1.0.0", BYTES, {})).status).toBe(401);
    expect((await put("/api/admin/packages/com.example.paid/2.0.0", BYTES)).status).toBe(409);
    const wrong = BYTES.slice();
    wrong[5] ^= 1;
    expect((await put("/api/admin/packages/com.example.paid/1.0.0", wrong)).status).toBe(409);
    expect((await put("/api/admin/packages/com.example.paid/1.0.0", BYTES)).status).toBe(200);
  });

  it("/entitlements/play is throttled before Google is asked", async () => {
    const calls = stub();
    const env = makeEnv(undefined, {
      PLAY_PACKAGE_NAME: "com.hereliesaz.azphalt.store",
      PLAY_SERVICE_ACCOUNT_JSON: JSON.stringify({ client_email: "x@example.com", private_key: "unused" }),
      WRITE_LIMITER: { limit: async () => ({ success: false }) },
    });
    const res = await worker.fetch(req("POST", "/entitlements/play", { packageId: "com.example.paid", productId: "com.example.paid", purchaseToken: "t" }), env);
    expect(res.status).toBe(429);
    expect(calls).toHaveLength(0);
  });

  it("past the write limit a download still works but mints no report token", async () => {
    let allow = true;
    const env = makeEnv(undefined, { WRITE_LIMITER: { limit: async () => ({ success: allow }) } });
    await upload(env);
    const token = craftToken({ packageId: "com.example.paid", subject: BUYER, kind: "perpetual", issuedAt: new Date().toISOString() });
    expect((await download(env, token)).headers.get("azphalt-report-token")).toBeTruthy();
    allow = false;
    const limited = await download(env, token);
    expect(limited.status).toBe(200);
    expect(limited.headers.get("azphalt-report-token")).toBeNull();
  });
});

describe("public downloads are checked against the catalog digest", () => {
  const file = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
  const entry = (fileDigest: string) => ({ id: "com.example.free", version: "1.0.0", name: "F", kind: "asset", file: "f.azp", bytes: file.length, fileDigest });
  const serve = (bytes: Uint8Array<ArrayBuffer>) =>
    stub((url) => (url.startsWith(baseVars.GITHUB_RAW_BASE) ? new Response(bytes, { headers: { "content-length": String(bytes.length) } }) : undefined));
  const get = (env: never) => worker.fetch(req("GET", "/packages/com.example.free/versions/1.0.0/download"), env);

  it("serves bytes whose sha256 matches", async () => {
    serve(file);
    const res = await get(makeEnv([], {}, [entry("sha256-" + hex(file))]));
    expect(res.status).toBe(200);
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(file);
  });

  it("refuses a same-size swap", async () => {
    const swapped = file.slice().reverse();
    serve(swapped);
    expect((await get(makeEnv([], {}, [entry("sha256-" + hex(file))]))).status).toBe(502);
  });
});

describe("publish hygiene", () => {
  it("never puts a raw manifest.kind in the pull request body", () => {
    expect(safeKind("asset")).toBe("asset");
    expect(safeKind("@everyone `x` [link](https://e.vil)")).toBe("unknown");
    expect(safeKind(undefined)).toBe("unknown");
  });

  it("refuses an id that would make an invalid git ref (`.lock`)", async () => {
    const manifest = { azphalt: "0.1", id: "com.example.lock", name: "x", version: "1.0.0", kind: "asset", files: {} };
    const r = await inspectAzp(zipSync({ "manifest.json": strToU8(JSON.stringify(manifest)) }));
    expect("status" in r && r.status).toBe(400);
    expect(JSON.stringify(r)).toMatch(/\.lock/);
  });
});
