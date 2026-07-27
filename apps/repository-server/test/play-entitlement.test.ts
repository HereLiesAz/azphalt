/**
 * `POST /entitlements/play` — the Play Billing → entitlement exchange a Play-distributed store app
 * depends on (`spec/store-app.md` § Paid packages).
 *
 * The interesting cases are the refusals. A route that mints a signed licence is exactly the one an
 * attacker probes with a made-up purchase token, so "an unverified purchase yields nothing" matters
 * more than the happy path, and the issued token has to actually gate a paid download — a signature
 * nobody checks is decoration.
 */
import { describe, it, expect } from "vitest";
import { writeAzp, generateSigningKey } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry, EntitlementAuthorizer } from "@azphalt/registry";
import type { Manifest } from "@azphalt/azdk";
import { createRepositoryHandler, type PlayPurchaseVerifier, type RepoRequest } from "../src/index";

const LICENSE = "MIT License\n";
const utf8 = (s: string) => new TextEncoder().encode(s);

function azp(id: string): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id,
    name: id.split(".").pop()!,
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    capabilities: ["assets"],
    assets: [{ type: "lut", path: "assets/x.cube" }],
  };
  return writeAzp({ manifest, payload: { "assets/x.cube": utf8("LUT_3D_SIZE 2\n0 0 0\n1 1 1\n") }, license: LICENSE }).azp;
}

const post = (path: string, body: unknown): RepoRequest => ({
  method: "POST",
  path,
  query: new URLSearchParams(),
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const get = (path: string, headers: Record<string, string> = {}): RepoRequest => ({
  method: "GET",
  path,
  query: new URLSearchParams(),
  headers,
});

/** A verifier that accepts exactly one token, standing in for the Play Developer API call. */
function fixture(opts: { verifier?: PlayPurchaseVerifier } = {}) {
  const store = new InMemoryStore();
  const registry = new Registry(store);
  const marketplace = new Marketplace(registry, store);
  return (async () => {
    await registry.publish(azp("com.demo.paid"));
    await marketplace.listForSale("com.demo.paid", "seller_1", { amountCents: 900, currency: "USD" });

    const signing = generateSigningKey();
    const verifier: PlayPurchaseVerifier = opts.verifier ?? {
      signingKey: signing.privateKey,
      async verify({ purchaseToken }) {
        return purchaseToken === "genuine-play-token" ? { subject: "user_42" } : null;
      },
    };

    const handle = createRepositoryHandler({
      registry,
      marketplace,
      index: { name: "R", version: "0.1" },
      authorizer: new EntitlementAuthorizer([signing.publicKey]),
      playPurchases: verifier,
    });
    return { handle, signing };
  })();
}

describe("POST /entitlements/play", () => {
  it("issues an entitlement that actually unlocks the paid download", async () => {
    const { handle } = await fixture();

    const res = await handle(
      post("/entitlements/play", {
        packageId: "com.demo.paid",
        productId: "com.demo.paid",
        purchaseToken: "genuine-play-token",
      }),
    );
    expect(res.status).toBe(200);
    const { entitlement } = JSON.parse(res.body as string);
    expect(typeof entitlement).toBe("string");

    // The point of the exchange: the token the store hands to the host must be one the repository
    // accepts. Issuing something the download gate rejects would be a silent, paid-for dead end.
    const gated = await handle(get("/packages/com.demo.paid/versions/1.0.0/download"));
    expect(gated.status).toBe(401);

    const ok = await handle(
      get("/packages/com.demo.paid/versions/1.0.0/download", { authorization: `Bearer ${entitlement}` }),
    );
    expect(ok.status).toBe(200);
  });

  it("refuses a purchase Google does not recognise", async () => {
    const { handle } = await fixture();
    const res = await handle(
      post("/entitlements/play", {
        packageId: "com.demo.paid",
        productId: "com.demo.paid",
        purchaseToken: "i-made-this-up",
      }),
    );
    expect(res.status).toBe(402);
    expect(JSON.parse(res.body as string).error.code).toBe("payment_required");
  });

  it("answers 501 when the paid lane is not configured", async () => {
    const store = new InMemoryStore();
    const registry = new Registry(store);
    const handle = createRepositoryHandler({ registry, index: { name: "R", version: "0.1" } });
    const res = await handle(post("/entitlements/play", { packageId: "a", productId: "b", purchaseToken: "c" }));
    expect(res.status).toBe(501);
  });

  it("rejects a malformed body rather than reaching the verifier", async () => {
    const { handle } = await fixture();
    expect((await handle(post("/entitlements/play", { packageId: "com.demo.paid" }))).status).toBe(400);

    const bad: RepoRequest = { ...post("/entitlements/play", {}), body: "not json" };
    expect((await handle(bad)).status).toBe(400);
  });

  it("bounds an oversized purchase token before forwarding it upstream", async () => {
    let reached = false;
    const { handle } = await fixture({
      verifier: {
        signingKey: generateSigningKey().privateKey,
        async verify() {
          reached = true;
          return { subject: "user_42" };
        },
      },
    });
    const res = await handle(
      post("/entitlements/play", {
        packageId: "com.demo.paid",
        productId: "com.demo.paid",
        purchaseToken: "x".repeat(5000),
      }),
    );
    expect(res.status).toBe(400);
    expect(reached, "an oversized token must not reach the Play API call").toBe(false);
  });

  it("reports an unreachable Google as 502, not as a failed payment", async () => {
    // The distinction matters to the user: 402 says "you did not pay", 502 says "we could not check
    // right now". Telling a paying customer they did not pay is the worse failure.
    const { handle } = await fixture({
      verifier: {
        signingKey: generateSigningKey().privateKey,
        async verify() {
          throw new Error("network unreachable");
        },
      },
    });
    const res = await handle(
      post("/entitlements/play", {
        packageId: "com.demo.paid",
        productId: "com.demo.paid",
        purchaseToken: "genuine-play-token",
      }),
    );
    expect(res.status).toBe(502);
  });

  it("rejects a non-POST", async () => {
    const { handle } = await fixture();
    expect((await handle(get("/entitlements/play"))).status).toBe(405);
  });
});
