/**
 * The paid lane's gate on `GET /api/download/[id]`, and the dev-only entitlement issuance that makes
 * a paid download possible at all.
 *
 * `lib/catalog.ts` reads `AZPHALT_SIGNING_KEY` / `AZPHALT_ALLOW_STUB_FULFILMENT` **at module load** to
 * decide whether it can issue and verify entitlements, so the env has to be set before that module
 * graph is evaluated. Static `import`s are hoisted above all module code, so the routes are pulled in
 * with dynamic `import()` below — that is the whole reason this file is shaped this way.
 */
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";

const { privateKey } = generateKeyPairSync("ed25519");
process.env.AZPHALT_SIGNING_KEY = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
process.env.AZPHALT_ALLOW_STUB_FULFILMENT = "1";

const { GET: download } = await import("../app/api/download/[id]/route");
const { POST: checkout } = await import("../app/api/checkout/route");
const { POST: complete } = await import("../app/api/checkout/complete/route");
const { getCatalog } = await import("../lib/catalog");

/** Consigned for sale in the seeded catalog — its bytes are gated. */
const PAID = "com.hereliesaz.halftone";
/** A second consigned package, so a *valid* token can be aimed at the *wrong* package. */
const OTHER_PAID = "com.studioaz.cinelut";
/** Free lane: no listing, so no gate. */
const FREE = "com.foldlab.filmluts";

/** `GET /api/download/[id]` with an optional `Authorization` header. */
function get(id: string, token?: string): Promise<Response> {
  return download(
    new Request(`http://localhost/api/download/${encodeURIComponent(id)}`, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
    }),
    { params: Promise.resolve({ id }) },
  );
}

/** Buy [packageId] through the stub checkout and return its Bearer entitlement token. */
async function buy(packageId: string, buyerId = "buyer_test"): Promise<string> {
  const started = await checkout(
    new Request("http://localhost/api/checkout", { method: "POST", body: JSON.stringify({ packageId, buyerId }) }),
  );
  const { session } = await started.json();
  const fulfilled = await complete(
    new Request("http://localhost/api/checkout/complete", {
      method: "POST",
      body: JSON.stringify({ sessionId: session.id }),
    }),
  );
  const { token } = await fulfilled.json();
  return token;
}

/** Total downloads counted against [id] so far. */
async function downloads(id: string): Promise<number> {
  const { registry } = await getCatalog();
  return (await registry.getSummary(id))!.downloads;
}

describe("GET /api/download/[id] — the free lane stays open", () => {
  it("serves a free package with no token at all", async () => {
    const res = await get(FREE);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/zip");
  });

  it("404s an unknown package rather than treating it as free and failing oddly", async () => {
    const res = await get("com.nope.missing");
    expect(res.status).toBe(404);
  });
});

describe("GET /api/download/[id] — the paid lane is gated", () => {
  it("401s a paid package when no token is presented", async () => {
    const res = await get(PAID);
    expect(res.status).toBe(401);
  });

  it("401s a malformed token — it is not a recognized identity", async () => {
    const res = await get(PAID, "not-a-real-token");
    expect(res.status).toBe(401);
  });

  it("402s a validly-signed token that does not cover this package", async () => {
    // The distinction that matters: this caller IS authenticated (we signed their token), they just
    // have no license for THIS package. Collapsing 401 and 402 into one boolean would lose that.
    const res = await get(PAID, await buy(OTHER_PAID));
    expect(res.status).toBe(402);
  });

  it("serves the bytes for a validly-signed token that does cover this package", async () => {
    const res = await get(PAID, await buy(PAID));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/zip");
    expect(Number(res.headers.get("content-length"))).toBeGreaterThan(0);
  });

  it("does not count a download for a request it denies", async () => {
    // Pins the gate ahead of `registry.serve`, which is what counts the download. Easy to regress by
    // reordering, and silent when it does: the tally just quietly inflates on every refused request.
    const before = await downloads(PAID);
    expect((await get(PAID)).status).toBe(401);
    expect((await get(PAID, await buy(OTHER_PAID))).status).toBe(402);
    expect(await downloads(PAID)).toBe(before);
  });
});
