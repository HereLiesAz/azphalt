/**
 * The normative Repository API the storefront now serves (spec/repository-api.md), driven through the
 * catch-all route exactly as the `beforeFiles` rewrites feed it. Confirms `azphalt.store` is a
 * conforming repository a `@azphalt/repository-client` can browse, inspect, and download from — with
 * the paid lane gated (401 unauth, 402 unlicensed, 200 with a real entitlement).
 */
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";

const { privateKey } = generateKeyPairSync("ed25519");
process.env.AZPHALT_SIGNING_KEY = privateKey.export({ type: "pkcs8", format: "pem" }).toString();

const { GET } = await import("../app/api/repository/[[...slug]]/route");
const { fulfil } = await import("../lib/catalog");

const FREE = { id: "com.foldlab.filmluts", version: "1.0.0" };
const PAID = { id: "com.hereliesaz.halftone", version: "1.2.0" };

/** Drive the catch-all the way a rewrite would: slug = the normative path segments, query on the URL. */
function call(slug: string[], init?: { query?: string; token?: string }) {
  const url = `http://local/api/repository/${slug.join("/")}${init?.query ?? ""}`;
  const headers = init?.token ? { authorization: `Bearer ${init.token}` } : undefined;
  return GET(new Request(url, { headers }), { params: Promise.resolve({ slug }) });
}

describe("normative Repository API", () => {
  it("serves the .well-known index with the trust-bootstrap signing key", async () => {
    const res = await call([".well-known", "azphalt-repository.json"]);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.name).toBeTruthy();
    expect(body.version).toBeTruthy();
    // Signing is on in this test, so the trust-bootstrap key must be advertised so a host can verify
    // this store's entitlement tokens offline.
    expect(body.signingKeys?.[0]?.publicKey).toBeTruthy();
  });

  it("browses and searches packages", async () => {
    const all = await (await call(["packages"])).json();
    expect(all.total).toBeGreaterThan(0);
    expect(all.packages.some((p: { id: string }) => p.id === FREE.id)).toBe(true);

    const hit = await (await call(["packages"], { query: "?q=halftone" })).json();
    expect(hit.packages.some((p: { id: string }) => p.id === PAID.id)).toBe(true);
  });

  it("returns package detail with version history and price status", async () => {
    const free = await (await call(["packages", FREE.id])).json();
    expect(free.id).toBe(FREE.id);
    expect(free.priceStatus).toBe("free");
    expect(free.versions.length).toBeGreaterThan(0);

    const paid = await (await call(["packages", PAID.id])).json();
    expect(paid.priceStatus).toBe("paid");
  });

  it("404s a non-resolvable package with the normative error envelope", async () => {
    // The dev backend (NpmStore) proxies any *well-formed* unknown id to npm, so a true miss needs a
    // malformed id the proxy refuses outright; the durable store 404s any absent id. Either way the
    // handler answers the normative `{ error: { code, message } }` envelope.
    const res = await call(["packages", "not a real package"]);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error.code).toBe("not_found");
  });

  it("downloads a free package's bytes unconditionally", async () => {
    const res = await call(["packages", FREE.id, "versions", FREE.version, "download"]);
    expect(res.status).toBe(200);
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(bytes.length).toBeGreaterThan(0);
  });

  it("gates a paid download: 401 without a token, 402 with a wrong-package token, 200 with a real one", async () => {
    const unauth = await call(["packages", PAID.id, "versions", PAID.version, "download"]);
    expect(unauth.status).toBe(401);

    // A real, signed entitlement — but for a *different* package: authenticated yet unlicensed ⇒ 402.
    const wrong = await fulfil("sess_wrong", FREE.id, "buyer_repo");
    const denied = await call(["packages", PAID.id, "versions", PAID.version, "download"], { token: wrong! });
    expect(denied.status).toBe(402);

    // The right package's entitlement unlocks the bytes.
    const ok = await fulfil("sess_ok", PAID.id, "buyer_repo");
    const granted = await call(["packages", PAID.id, "versions", PAID.version, "download"], { token: ok! });
    expect(granted.status).toBe(200);
    expect(new Uint8Array(await granted.arrayBuffer()).length).toBeGreaterThan(0);
  });
});
