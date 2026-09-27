import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { strToU8, unzipSync, zipSync } from "fflate";
import { generateSigningKey, signAzp, writeAzp } from "@azphalt/azp";
import worker from "../src/index";
import { assets, baseVars, durableState } from "./harness";

const catalog = [
  { id: "com.example.handmade", version: "1.0.0", name: "Handmade", kind: "asset", file: "h.azp", integrity: "sha256-x" },
  { id: "com.example.pinned", version: "1.0.0", name: "Pinned", kind: "asset", file: "p.azp", integrity: "sha256-y" },
];
const listings = [
  { packageId: "com.example.paid", sellerId: "s", amountCents: 500, currency: "USD", package: { version: "1.0.0", name: "Paid", kind: "code", integrity: "sha256-z" } },
];

function build(id: string, version: string, key?: { privateKey: string }, payload: Record<string, Uint8Array> = {}) {
  const { azp } = writeAzp({
    manifest: { azphalt: "0.1", id, name: "Test", version, kind: "asset", compat: ">=0.1", license: "MIT" } as never,
    payload: { "assets/look.cube": strToU8("LUT_3D_SIZE 2\n"), ...payload },
    license: "MIT License\n",
  });
  return key ? signAzp(azp, { privateKey: key.privateKey }) : azp;
}

/** A GitHub REST stand-in holding one repository: a main branch, its trees, refs and pull requests. */
function fakeGitHub(opts: { publishers?: Record<string, { publicKey: string; pinnedAt: string }>; pinnedFiles?: string[] } = {}) {
  const calls: Array<{ method: string; path: string; body?: any; auth?: string }> = [];
  const refs = new Set<string>();
  const handler = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input));
    const path = url.pathname.replace("/repos/HereLiesAz/azphalt", "") + url.search;
    const method = init?.method ?? "GET";
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ method, path, body, auth: new Headers(init?.headers).get("authorization") ?? undefined });
    const reply = (status: number, data: unknown) => new Response(JSON.stringify(data), { status });

    if (method === "GET" && path === "/git/ref/heads/main") return reply(200, { object: { sha: "c0" } });
    if (method === "GET" && path === "/git/commits/c0") return reply(200, { tree: { sha: "t0" } });
    if (method === "GET" && path.startsWith("/contents/apps/storefront/registry/publishers.json")) {
      if (!opts.publishers) return reply(404, { message: "Not Found" });
      const text = JSON.stringify({ publishers: opts.publishers });
      return reply(200, { content: btoa(text) });
    }
    if (method === "GET" && path === "/git/trees/t0") return reply(200, { tree: [{ path: "submissions", type: "tree", sha: "ts" }] });
    if (method === "GET" && path === "/git/trees/ts") return reply(200, { tree: [{ path: "com.example.pinned", type: "tree", sha: "tp" }] });
    if (method === "GET" && path === "/git/trees/tp?recursive=1") {
      return reply(200, { tree: (opts.pinnedFiles ?? []).map((p) => ({ path: p, type: "blob" })) });
    }
    if (method === "POST" && path === "/git/blobs") return reply(201, { sha: "b" + calls.length });
    if (method === "POST" && path === "/git/trees") return reply(201, { sha: "t1" });
    if (method === "POST" && path === "/git/commits") return reply(201, { sha: "c1" });
    if (method === "POST" && path === "/git/refs") {
      if (refs.has(body.ref)) return reply(422, { message: "Reference already exists" });
      refs.add(body.ref);
      return reply(201, {});
    }
    if (method === "POST" && path === "/pulls") return reply(201, { html_url: "https://github.com/HereLiesAz/azphalt/pull/900", number: 900 });
    return reply(599, { message: "unexpected " + method + " " + path });
  };
  return { calls, handler };
}

function makeEnv(extra: Record<string, unknown> = {}) {
  return {
    ...baseVars,
    ASSETS: assets({
      "/index.html": "<title>store</title>",
      "/catalog.json": JSON.stringify(catalog),
      "/listings.json": JSON.stringify(listings),
    }),
    STATE: durableState(),
    // The gateway's RepositoryTokens entrypoint, as the service binding exposes it.
    GITHUB_TOKENS: { azphaltPublishToken: async () => ({ token: "ghs_minted", expiresAt: "2026-09-27T07:00:00Z" }) },
    PUBLISH_REPOSITORY: "HereLiesAz/azphalt",
    ...extra,
  } as never;
}

function post(bytes: Uint8Array) {
  return new Request("https://azphalt.store/packages", {
    method: "POST",
    headers: { "content-type": "application/vnd.azphalt.package" },
    body: bytes as Uint8Array<ArrayBuffer>,
  });
}

let github: ReturnType<typeof fakeGitHub>;
beforeEach(() => {
  github = fakeGitHub();
  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) => github.handler(input, init));
});
afterEach(() => vi.unstubAllGlobals());

describe("POST /packages", () => {
  it("opens a review pull request for a new id and pins its signer", async () => {
    const key = generateSigningKey();
    const res = await worker.fetch(post(build("com.example.fresh", "1.0.0", key, { "assets/bin.dat": new Uint8Array([0, 1, 2, 255]) })), makeEnv());
    expect(res.status).toBe(202);
    const body = await res.json() as Record<string, any>;
    expect(body).toMatchObject({
      status: "pending-review",
      id: "com.example.fresh",
      version: "1.0.0",
      review: "https://github.com/HereLiesAz/azphalt/pull/900",
      publisher: { publicKey: key.publicKey, pin: "new" },
    });
    expect(res.headers.get("location")).toBe(body.review);

    const tree = github.calls.find((c) => c.method === "POST" && c.path === "/git/trees")!.body;
    expect(tree.base_tree).toBe("t0");
    const byPath = Object.fromEntries(tree.tree.map((e: any) => [e.path, e]));
    // The submission folder, shaped like a hand-made PR: manifest without `files`, LICENSE, payload.
    const manifest = JSON.parse(byPath["submissions/com.example.fresh/manifest.json"].content);
    expect(manifest).toMatchObject({ id: "com.example.fresh", version: "1.0.0" });
    expect(manifest).not.toHaveProperty("files");
    expect(byPath["submissions/com.example.fresh/LICENSE"].content).toBe("MIT License\n");
    expect(byPath["submissions/com.example.fresh/assets/look.cube"].content).toBe("LUT_3D_SIZE 2\n");
    expect(byPath["submissions/com.example.fresh/assets/bin.dat"].sha).toMatch(/^b/);
    expect(byPath["submissions/com.example.fresh/signature.json"]).toBeUndefined();
    const pins = JSON.parse(byPath["apps/storefront/registry/publishers.json"].content);
    expect(pins.publishers["com.example.fresh"].publicKey).toBe(key.publicKey);

    const blob = github.calls.find((c) => c.path === "/git/blobs")!.body;
    expect(blob).toEqual({ content: "AAEC/w==", encoding: "base64" });
    expect(github.calls.find((c) => c.path === "/git/refs")!.body).toEqual({ ref: "refs/heads/publish/com.example.fresh/1.0.0", sha: "c1" });
    expect(github.calls.find((c) => c.path === "/pulls")!.body).toMatchObject({ head: "publish/com.example.fresh/1.0.0", base: "main" });
  });

  it("updates a pinned id signed by the same key, replacing the previous folder's files", async () => {
    const key = generateSigningKey();
    github = fakeGitHub({
      publishers: { "com.example.pinned": { publicKey: key.publicKey, pinnedAt: "2026-01-01T00:00:00.000Z" } },
      pinnedFiles: ["manifest.json", "LICENSE", "assets/look.cube", "assets/old.cube"],
    });
    const res = await worker.fetch(post(build("com.example.pinned", "1.1.0", key)), makeEnv());
    expect(res.status).toBe(202);
    expect((await res.json() as any).publisher.pin).toBe("matches");
    const tree = github.calls.find((c) => c.method === "POST" && c.path === "/git/trees")!.body.tree;
    expect(tree).toContainEqual({ path: "submissions/com.example.pinned/assets/old.cube", mode: "100644", type: "blob", sha: null });
    expect(tree.some((e: any) => e.path === "apps/storefront/registry/publishers.json")).toBe(false);
  });

  it("refuses a different key for a pinned id", async () => {
    github = fakeGitHub({ publishers: { "com.example.pinned": { publicKey: generateSigningKey().publicKey, pinnedAt: "x" } } });
    const res = await worker.fetch(post(build("com.example.pinned", "1.1.0", generateSigningKey())), makeEnv());
    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ error: { code: "forbidden" } });
    expect(github.calls.some((c) => c.method === "POST")).toBe(false);
  });

  it("refuses ids maintained through git, paid listings, and the published version", async () => {
    const key = generateSigningKey();
    const handmade = await worker.fetch(post(build("com.example.handmade", "2.0.0", key)), makeEnv());
    expect(handmade.status).toBe(409);
    const paid = await worker.fetch(post(build("com.example.paid", "2.0.0", key)), makeEnv());
    expect(paid.status).toBe(409);

    github = fakeGitHub({ publishers: { "com.example.pinned": { publicKey: key.publicKey, pinnedAt: "x" } } });
    const same = await worker.fetch(post(build("com.example.pinned", "1.0.0", key)), makeEnv());
    expect(same.status).toBe(409);
    expect(await same.json()).toMatchObject({ error: { code: "conflict", message: "com.example.pinned 1.0.0 is already published" } });
  });

  it("refuses an unpinned id whose folder is already on main, even before it is deployed", async () => {
    github = fakeGitHub({ pinnedFiles: ["manifest.json", "LICENSE"] });
    const res = await worker.fetch(post(build("com.example.pinned", "9.0.0", generateSigningKey())), makeEnv({
      ASSETS: assets({ "/catalog.json": "[]", "/listings.json": "[]" }),
    }));
    expect(res.status).toBe(409);
    expect(github.calls.some((c) => c.method === "POST")).toBe(false);
  });

  it("refuses a second publish of the same version while the first waits for review", async () => {
    const key = generateSigningKey();
    const env = makeEnv();
    expect((await worker.fetch(post(build("com.example.fresh", "1.0.0", key)), env)).status).toBe(202);
    expect((await worker.fetch(post(build("com.example.fresh", "1.0.0", key)), env)).status).toBe(409);
  });

  it("requires a signature and a verifying container", async () => {
    const unsigned = await worker.fetch(post(build("com.example.fresh", "1.0.0")), makeEnv());
    expect(unsigned.status).toBe(401);

    // Tamper with the payload after signing: the digest no longer matches.
    const signed = unzipSync(build("com.example.fresh", "1.0.0", generateSigningKey()));
    signed["assets/look.cube"] = strToU8("tampered\n");
    const tampered = await worker.fetch(post(zipSync(signed)), makeEnv());
    expect(tampered.status).toBe(400);
    expect(await tampered.json()).toMatchObject({ error: { code: "bad_request", details: ["digest mismatch: assets/look.cube"] } });

    // Re-sign the manifest with nothing else changed but swap in another key's signature.
    const other = unzipSync(build("com.example.fresh", "1.0.0", generateSigningKey()));
    other["signature.json"] = unzipSync(build("com.example.other", "1.0.0", generateSigningKey()))["signature.json"];
    expect((await worker.fetch(post(zipSync(other)), makeEnv())).status).toBe(401);

    expect((await worker.fetch(post(strToU8("not a zip")), makeEnv())).status).toBe(400);
    expect((await worker.fetch(post(new Uint8Array()), makeEnv())).status).toBe(400);
  });

  it("answers 501 when publishing is not configured, and 413 over the size cap", async () => {
    const key = generateSigningKey();
    const off = await worker.fetch(post(build("com.example.fresh", "1.0.0", key)), makeEnv({ GITHUB_TOKENS: undefined }));
    expect(off.status).toBe(501);
    const big = new Request("https://azphalt.store/packages", {
      method: "POST",
      headers: { "content-length": String(5 * 1024 * 1024) },
      body: new Uint8Array(8),
    });
    expect((await worker.fetch(big, makeEnv())).status).toBe(413);
  });

  it("authenticates to GitHub with the token the gateway mints, and only after the package verifies", async () => {
    let minted = 0;
    const env = makeEnv({
      GITHUB_TOKENS: { azphaltPublishToken: async () => (minted++, { token: "ghs_minted", expiresAt: "x" }) },
    });
    expect((await worker.fetch(post(build("com.example.fresh", "1.0.0")), env)).status).toBe(401);
    expect(minted).toBe(0);

    expect((await worker.fetch(post(build("com.example.fresh", "1.0.0", generateSigningKey())), env)).status).toBe(202);
    expect(minted).toBe(1);
    expect(new Set(github.calls.map((c) => c.auth))).toEqual(new Set(["Bearer ghs_minted"]));
  });

  it("prefers a fixed GITHUB_PUBLISH_TOKEN, and answers 503 when the gateway cannot mint", async () => {
    const fixed = makeEnv({ GITHUB_PUBLISH_TOKEN: "ghp_fixed" });
    expect((await worker.fetch(post(build("com.example.fresh", "1.0.0", generateSigningKey())), fixed)).status).toBe(202);
    expect(github.calls[0].auth).toBe("Bearer ghp_fixed");

    const down = makeEnv({ GITHUB_TOKENS: { azphaltPublishToken: async () => { throw new Error("App not installed"); } } });
    const res = await worker.fetch(post(build("com.example.other", "1.0.0", generateSigningKey())), down);
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ error: { code: "unavailable" } });
  });

  it("rate-limits publishes per IP", async () => {
    const res = await worker.fetch(
      post(build("com.example.fresh", "1.0.0", generateSigningKey())),
      makeEnv({ PUBLISH_LIMITER: { limit: async () => ({ success: false }) } }),
    );
    expect(res.status).toBe(429);
  });
});
