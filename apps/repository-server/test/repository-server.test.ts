import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { verifyAzp, writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import type { Manifest } from "@azphalt/sdk";
import { RepositoryClient } from "@azphalt/repository-client";
import { createRepositoryHandler, createRepositoryServer, InMemoryAuthorizer, type RepoRequest } from "../src/index";

const LICENSE = "MIT License\n";
const utf8 = (s: string) => new TextEncoder().encode(s);
const lut = utf8("LUT_3D_SIZE 2\n0 0 0\n1 0 0\n0 1 0\n1 1 0\n0 0 1\n1 0 1\n0 1 1\n1 1 1\n");

function azp(id: string, extra: Partial<Omit<Manifest, "files" | "id">> = {}): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id,
    name: extra.name ?? id.split(".").pop()!,
    version: extra.version ?? "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    capabilities: ["assets", "bitmap"],
    assets: [{ type: "lut", path: "assets/x.cube" }],
    ...extra,
  };
  return writeAzp({ manifest, payload: { "assets/x.cube": lut }, license: LICENSE }).azp;
}

/** A seeded repository: a free package and a consigned (paid) one with a demo license. */
async function seededRepo() {
  const store = new InMemoryStore();
  const registry = new Registry(store);
  const marketplace = new Marketplace(registry, store);
  await registry.publish(azp("com.demo.free", { name: "Free Pack", description: "open lane grades" }));
  await registry.publish(azp("com.demo.paid", { name: "Paid Pack", description: "premium cinematic" }));
  await marketplace.listForSale("com.demo.paid", "seller_1", { amountCents: 900, currency: "USD" });
  const authorizer = new InMemoryAuthorizer().registerToken("known-but-unlicensed").grantLicense("good-token", "com.demo.paid");
  return { registry, marketplace, authorizer };
}

const INDEX = { name: "Test Repo", version: "0.1", description: "reference" };

/** Build a handler over a fresh seeded repo, plus a request helper. */
async function handlerFixture() {
  const { registry, marketplace, authorizer } = await seededRepo();
  const handle = createRepositoryHandler({ registry, marketplace, authorizer, index: INDEX });
  const mk = (path: string, opts: { method?: string; headers?: Record<string, string> } = {}): RepoRequest => {
    const url = new URL(path, "http://x");
    return { method: opts.method ?? "GET", path: url.pathname, query: url.searchParams, headers: opts.headers ?? {} };
  };
  return { handle, mk };
}

describe("repository handler — spec/repository-api.md", () => {
  it("serves the discovery index", async () => {
    const { handle, mk } = await handlerFixture();
    const res = await handle(mk("/.well-known/azphalt-repository.json"));
    expect(res.status).toBe(200);
    expect(JSON.parse(res.body as string)).toEqual(INDEX);
  });

  it("lists packages with the correct free/paid status", async () => {
    const { handle, mk } = await handlerFixture();
    const res = await handle(mk("/packages"));
    const body = JSON.parse(res.body as string);
    expect(body.total).toBe(2);
    expect(body.page).toBe(1);
    const byId = Object.fromEntries(body.packages.map((p: { id: string }) => [p.id, p]));
    expect(byId["com.demo.free"].priceStatus).toBe("free");
    expect(byId["com.demo.paid"].priceStatus).toBe("paid");
    expect(byId["com.demo.free"].types).toEqual(["lut"]);
  });

  it("filters search by asset type and by query text", async () => {
    const { handle, mk } = await handlerFixture();
    expect(JSON.parse((await handle(mk("/packages?types=lut"))).body as string).total).toBe(2);
    expect(JSON.parse((await handle(mk("/packages?types=brush"))).body as string).total).toBe(0);
    const q = JSON.parse((await handle(mk("/packages?q=premium"))).body as string);
    expect(q.packages).toHaveLength(1);
    expect(q.packages[0].id).toBe("com.demo.paid");
  });

  it("honors the `tags` parameter as an AND-filter over searchable text", async () => {
    const { handle, mk } = await handlerFixture();
    expect(JSON.parse((await handle(mk("/packages?tags=cinematic"))).body as string).total).toBe(1);
    expect(JSON.parse((await handle(mk("/packages?tags=cinematic,nonexistent"))).body as string).total).toBe(0);
  });

  it("returns full package detail with the manifest and version history", async () => {
    const { handle, mk } = await handlerFixture();
    const res = await handle(mk("/packages/com.demo.paid"));
    expect(res.status).toBe(200);
    const body = JSON.parse(res.body as string);
    expect(body.id).toBe("com.demo.paid");
    expect(body.priceStatus).toBe("paid");
    expect(body.manifest.id).toBe("com.demo.paid");
    expect(body.versions).toEqual([expect.objectContaining({ version: "1.0.0", yanked: false })]);
  });

  it("404s an unknown package", async () => {
    const { handle, mk } = await handlerFixture();
    expect((await handle(mk("/packages/com.nope.missing"))).status).toBe(404);
  });

  it("serves a free package's bytes unconditionally as application/x-azphalt", async () => {
    const { handle, mk } = await handlerFixture();
    const res = await handle(mk("/packages/com.demo.free/versions/1.0.0/download"));
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("application/x-azphalt");
    expect(verifyAzp(res.body as Uint8Array).ok).toBe(true);
  });

  it("gates a paid download: 401 no token, 402 unlicensed, 200 licensed", async () => {
    const { handle, mk } = await handlerFixture();
    const path = "/packages/com.demo.paid/versions/1.0.0/download";
    expect((await handle(mk(path))).status).toBe(401);
    expect((await handle(mk(path, { headers: { authorization: "Bearer known-but-unlicensed" } }))).status).toBe(402);
    const ok = await handle(mk(path, { headers: { authorization: "Bearer good-token" } }));
    expect(ok.status).toBe(200);
    expect(verifyAzp(ok.body as Uint8Array).ok).toBe(true);
  });

  it("404s an unknown version and 405s a non-GET", async () => {
    const { handle, mk } = await handlerFixture();
    expect((await handle(mk("/packages/com.demo.free/versions/9.9.9/download"))).status).toBe(404);
    expect((await handle(mk("/packages", { method: "POST" }))).status).toBe(405);
  });
});

describe("repository server — end-to-end over @azphalt/repository-client", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const { registry, marketplace, authorizer } = await seededRepo();
    server = createRepositoryServer({ registry, marketplace, authorizer, index: INDEX });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => server.close((e) => (e ? reject(e) : resolve())));
  });

  it("the reference client round-trips index, search, and free download", async () => {
    const client = new RepositoryClient({ url: baseUrl });
    expect((await client.getIndex()).name).toBe("Test Repo");
    const results = await client.search({ types: ["lut"] });
    expect(results.total).toBe(2);
    const bytes = await client.download("com.demo.free", "1.0.0");
    expect(verifyAzp(bytes).ok).toBe(true);
  });

  it("the client sees 401 for a paid download without a token, and bytes with a licensed token", async () => {
    const anon = new RepositoryClient({ url: baseUrl });
    await expect(anon.download("com.demo.paid", "1.0.0")).rejects.toThrow(/401 Unauthorized/);

    const licensed = new RepositoryClient({ url: baseUrl, token: "good-token" });
    const bytes = await licensed.download("com.demo.paid", "1.0.0");
    expect(verifyAzp(bytes).ok).toBe(true);
  });
});
