/**
 * A subscription listing fulfils as an **expiring** `kind:"subscription"` entitlement — and the
 * paid-download gate honors it while live. Mirrors `download-gate.test.ts`'s env setup.
 */
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";

const { privateKey } = generateKeyPairSync("ed25519");
process.env.AZPHALT_SIGNING_KEY = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
process.env.AZPHALT_ALLOW_STUB_FULFILMENT = "1";

const { POST: checkout } = await import("../app/api/checkout/route");
const { POST: complete } = await import("../app/api/checkout/complete/route");
const { GET: download } = await import("../app/api/download/[id]/route");

/** Seeded as a monthly subscription in lib/catalog.ts. */
const SUB = "com.studioaz.cinelut";

async function buy(packageId: string, buyerId: string): Promise<string> {
  const started = await checkout(
    new Request("http://localhost/api/checkout", { method: "POST", body: JSON.stringify({ packageId, buyerId }) }),
  );
  const { session } = await started.json();
  const done = await complete(
    new Request("http://localhost/api/checkout/complete", { method: "POST", body: JSON.stringify({ sessionId: session.id }) }),
  );
  return (await done.json()).token as string;
}

function claimsOf(token: string): { kind: string; expiresAt?: string; packageId: string } {
  return JSON.parse(Buffer.from(token, "base64").toString("utf8")).claims;
}

describe("subscription fulfilment", () => {
  it("issues an expiring subscription entitlement with a future period end", async () => {
    const token = await buy(SUB, "buyer_sub");
    const claims = claimsOf(token);
    expect(claims.kind).toBe("subscription");
    expect(claims.packageId).toBe(SUB);
    expect(new Date(claims.expiresAt!).getTime()).toBeGreaterThan(Date.now());
  });

  it("downloads the package while the subscription is live", async () => {
    const token = await buy(SUB, "buyer_sub2");
    const res = await download(
      new Request(`http://localhost/api/download/${encodeURIComponent(SUB)}`, {
        headers: { authorization: `Bearer ${token}` },
      }),
      { params: Promise.resolve({ id: SUB }) },
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/zip");
  });
});
