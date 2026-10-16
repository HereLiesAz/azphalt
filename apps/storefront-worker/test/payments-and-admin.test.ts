/**
 * Regression tests for the paid lane and admin surface: unauthenticated Stripe Connect onboarding,
 * fulfilment of unpaid checkout sessions, security headers, and the Worker's zip-bomb cap.
 */
import { describe, expect, it } from "vitest";
import { generateKeyPairSync, createHmac } from "node:crypto";
import { zipSync, strToU8 } from "fflate";
import worker from "../src/index";
import { inspectAzp } from "../src/publish";
import { assets, baseVars, durableState } from "./harness";

const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const ENTITLEMENT = {
  ENTITLEMENT_PRIVATE_KEY_PKCS8_B64: privateKey.export({ type: "pkcs8", format: "der" }).toString("base64"),
  ENTITLEMENT_PUBLIC_KEY_SPKI_B64: publicKey.export({ type: "spki", format: "der" }).toString("base64"),
};

function makeEnv(extra: Record<string, unknown> = {}) {
  return {
    ...baseVars,
    ASSETS: assets({ "/index.html": "<title>store</title>", "/catalog.json": "[]", "/listings.json": "[]" }),
    STATE: durableState(),
    ADMIN_TOKEN: "admin-secret",
    STRIPE_SECRET_KEY: "sk_test_x",
    STRIPE_WEBHOOK_SECRET: "whsec_test",
    ...ENTITLEMENT,
    ...extra,
  } as never;
}

function signedWebhook(secret: string, event: unknown): Request {
  const payload = JSON.stringify(event);
  const t = String(Math.floor(Date.now() / 1000));
  const v1 = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return new Request("https://azphalt.store/api/webhooks/stripe", {
    method: "POST",
    headers: { "stripe-signature": `t=${t},v1=${v1}`, "content-type": "application/json" },
    body: payload,
  });
}

const session = (payment_status: string) => ({
  type: "checkout.session.completed",
  data: { object: { id: "cs_1", payment_status, metadata: { packageId: "com.example.paid", buyerId: "buyer-1" } } },
});

describe("Stripe Connect is operator-only", () => {
  it("refuses unauthenticated onboarding (no account is created for a public sellerId)", async () => {
    const res = await worker.fetch(
      new Request("https://azphalt.store/api/connect/onboard", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sellerId: "seller_1" }),
      }),
      makeEnv(),
    );
    expect(res.status).toBe(401);
  });

  it("an invite code is bound to its sellerId: it works for that seller and no other", async () => {
    const env = makeEnv();
    const mint = await worker.fetch(
      new Request("https://azphalt.store/api/admin/connect/invite", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: "Bearer admin-secret" },
        body: JSON.stringify({ sellerId: "seller_1" }),
      }),
      env,
    );
    const { inviteCode } = (await mint.json()) as { inviteCode: string };
    expect(inviteCode).toMatch(/^[A-Za-z0-9_-]{20,}$/);

    const onboard = (sellerId: string, code: string) =>
      worker.fetch(
        new Request("https://azphalt.store/api/connect/onboard", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sellerId, inviteCode: code }),
        }),
        env,
      );
    // Another seller's id with this code, and a made-up code, are refused before Stripe is touched.
    expect((await onboard("seller_2", inviteCode)).status).toBe(401);
    expect((await onboard("seller_1", "nope")).status).toBe(401);
    // The right code gets past authorization (it then reaches Stripe, which must never be a real
    // network call in a test — so fetch is stubbed to fail, giving a 502 rather than a 401).
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      throw new Error("no network in tests");
    }) as typeof fetch;
    try {
      expect((await onboard("seller_1", inviteCode)).status).toBe(502);
    } finally {
      globalThis.fetch = realFetch;
    }
  });

  it("minting an invite needs the operator token", async () => {
    const res = await worker.fetch(
      new Request("https://azphalt.store/api/admin/connect/invite", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sellerId: "seller_1" }),
      }),
      makeEnv(),
    );
    expect(res.status).toBe(401);
  });

  it("status reports an unknown seller without touching Stripe", async () => {
    const res = await worker.fetch(new Request("https://azphalt.store/api/connect/status?sellerId=seller_1"), makeEnv());
    expect(await res.json()).toEqual({ onboarded: false });
  });
});

describe("fulfilment only on settled payment", () => {
  it("does not fulfil a completed-but-unpaid session (delayed-notification method)", async () => {
    const res = await worker.fetch(signedWebhook("whsec_test", session("unpaid")), makeEnv());
    expect(await res.json()).toEqual({ received: true, fulfilled: false });
  });

  it("fulfils once the payment is paid", async () => {
    const res = await worker.fetch(signedWebhook("whsec_test", session("paid")), makeEnv());
    expect(await res.json()).toEqual({ received: true, fulfilled: true });
  });

  it("rejects a webhook with a bad signature", async () => {
    const res = await worker.fetch(signedWebhook("wrong-secret", session("paid")), makeEnv());
    expect(res.status).toBe(400);
  });
});

describe("response hardening", () => {
  it("adds security headers to API responses", async () => {
    const res = await worker.fetch(new Request("https://azphalt.store/api/health"), makeEnv());
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-frame-options")).toBe("DENY");
    expect(res.headers.get("content-security-policy")).toContain("frame-ancestors 'none'");
    expect(res.headers.get("strict-transport-security")).toContain("max-age=");
  });
});

describe("publish zip cap", () => {
  it("refuses an archive that inflates past the uncompressed ceiling", async () => {
    // 40 MB of zeros deflates to a few KB but exceeds the 32 MB per-entry ceiling.
    const bomb = zipSync({ "big.bin": new Uint8Array(40 * 1024 * 1024), "manifest.json": strToU8("{}") });
    expect(bomb.length).toBeLessThan(200_000);
    const r = await inspectAzp(bomb);
    expect("status" in r && r.status).toBe(400);
    expect("message" in r && r.message).toMatch(/too large|not a valid/i);
  });
});

describe("free download vs the catalog", () => {
  const catalog = [{ id: "com.example.free", version: "1.0.0", name: "F", kind: "asset", file: "f.azp", integrity: "sha256-x", bytes: 10 }];
  const env = () =>
    ({
      ...baseVars,
      ASSETS: assets({ "/index.html": "x", "/catalog.json": JSON.stringify(catalog), "/listings.json": "[]" }),
      STATE: durableState(),
    }) as never;
  const dl = () => new Request("https://azphalt.store/packages/com.example.free/versions/1.0.0/download");

  it("serves the file when its size matches the catalog", async () => {
    const real = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(new Uint8Array(10), { status: 200, headers: { "content-length": "10" } })) as typeof fetch;
    try {
      expect((await worker.fetch(dl(), env())).status).toBe(200);
    } finally {
      globalThis.fetch = real;
    }
  });

  it("refuses a file whose size disagrees (deploy skew, or a swapped file)", async () => {
    const real = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(new Uint8Array(11), { status: 200, headers: { "content-length": "11" } })) as typeof fetch;
    try {
      const res = await worker.fetch(dl(), env());
      expect(res.status).toBe(502);
      expect(JSON.stringify(await res.json())).toMatch(/disagree/);
    } finally {
      globalThis.fetch = real;
    }
  });
});

describe("publish manifest integrity", () => {
  it("refuses a manifest with duplicate keys (signature is over raw bytes)", async () => {
    const dup = '{"id":"com.example.dup","version":"1.0.0","files":{},"files":{"LICENSE":"sha256-00"}}';
    const azp = zipSync({ "manifest.json": strToU8(dup), LICENSE: strToU8("MIT") });
    const r = await inspectAzp(azp);
    expect("status" in r && r.status).toBe(400);
    expect("message" in r && r.message).toMatch(/duplicate manifest key/);
  });
});
