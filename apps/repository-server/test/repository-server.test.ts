import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { verifyAzp, writeAzp, generateSigningKey } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry, issueEntitlement, type EntitlementClaims } from "@azphalt/registry";
import type { Manifest } from "@azphalt/sdk";
import { RepositoryClient } from "@azphalt/repository-client";
import { createRepositoryHandler, createRepositoryServer, EntitlementAuthorizer, InMemoryAuthorizer, type RepoRequest } from "../src/index";

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
  const mk = (path: string, opts: { method?: string; headers?: Record<string, string>; body?: string } = {}): RepoRequest => {
    const url = new URL(path, "http://x");
    return { method: opts.method ?? "GET", path: url.pathname, query: url.searchParams, headers: opts.headers ?? {}, body: opts.body };
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

  it("404s an unknown package with the normative error envelope", async () => {
    const { handle, mk } = await handlerFixture();
    const res = await handle(mk("/packages/com.nope.missing"));
    expect(res.status).toBe(404);
    const err = JSON.parse(res.body as string).error;
    expect(err.code).toBe("not_found");
    expect(typeof err.message).toBe("string");
  });

  it("surfaces `latest` and localized name/description on detail + summary", async () => {
    const registry = new Registry();
    await registry.publish(azp("com.demo.i18n", { version: "1.0.0", name: "Explosions" }));
    // The summary reflects the LATEST version's manifest, so the localized fields live on 1.2.0.
    await registry.publish(
      azp("com.demo.i18n", {
        version: "1.2.0",
        name: "Explosions",
        description: "boom",
        nameLocalized: { en: "Explosions", es: "Explosiones" },
        descriptionLocalized: { en: "boom", es: "auge" },
      }),
    );
    const handle = createRepositoryHandler({ registry, index: INDEX });
    const req = (path: string) =>
      handle({ method: "GET", path, query: new URLSearchParams(), headers: {} }).then((r) => JSON.parse(r.body as string));

    const detail = await req("/packages/com.demo.i18n");
    expect(detail.latest).toBe("1.2.0"); // newest installable, not re-derived by the host
    const summary = (await req("/packages")).packages[0];
    expect(summary.latest).toBe("1.2.0");
    expect(summary.nameLocalized).toEqual({ en: "Explosions", es: "Explosiones" });
    expect(summary.descriptionLocalized.es).toBe("auge");
  });

  describe("POST /updates — batch update check (#42)", () => {
    it("returns only ids with a strictly newer installable version", async () => {
      const registry = new Registry();
      await registry.publish(azp("com.demo.a", { version: "1.0.0" }));
      await registry.publish(azp("com.demo.a", { version: "1.2.0" }));
      await registry.publish(azp("com.demo.b", { version: "2.0.0" }));
      const handle = createRepositoryHandler({ registry, index: INDEX });
      const post = (body: string) =>
        handle({ method: "POST", path: "/updates", query: new URLSearchParams(), headers: {}, body });

      const res = await post(
        JSON.stringify([
          { id: "com.demo.a", version: "1.0.0" }, // 1.2.0 available
          { id: "com.demo.b", version: "2.0.0" }, // current — omitted
          { id: "com.demo.unknown", version: "1.0.0" }, // unknown — omitted
        ]),
      );
      expect(res.status).toBe(200);
      expect(JSON.parse(res.body as string)).toEqual({ updates: [{ id: "com.demo.a", latest: "1.2.0" }] });
    });

    it("405s a GET and 400s a malformed body", async () => {
      const { handle, mk } = await handlerFixture();
      expect((await handle(mk("/updates"))).status).toBe(405); // GET not allowed
      expect((await handle(mk("/updates", { method: "POST", body: "not json" }))).status).toBe(400);
      expect((await handle(mk("/updates", { method: "POST", body: JSON.stringify({}) }))).status).toBe(400);
      const bad = await handle(mk("/updates", { method: "POST", body: JSON.stringify([{ id: "x" }]) }));
      expect(bad.status).toBe(400);
      expect(JSON.parse(bad.body as string).error.code).toBe("bad_request");
    });
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

  it("400s a malformed percent-escape in the path instead of throwing", async () => {
    const { handle } = await handlerFixture();
    // A lone `%` is an invalid URI escape — decodeURIComponent would throw a URIError.
    const res = await handle({ method: "GET", path: "/packages/%E0%A4%A", query: new URLSearchParams(), headers: {} });
    expect(res.status).toBe(400);
    const err = JSON.parse(res.body as string).error;
    expect(err.code).toBe("bad_request");
    expect(err.message).toMatch(/invalid URI encoding/);
  });

  it("scopes browse/search by the ?app= parameter and reports targetApps", async () => {
    const store = new InMemoryStore();
    const registry = new Registry(store);
    await registry.publish(azp("com.demo.global", { name: "Global" }));
    await registry.publish(azp("com.demo.forx", { name: "For X", targetApps: ["com.app.x"] }));
    const handle = createRepositoryHandler({ registry, index: INDEX });
    const list = (path: string) =>
      handle({ method: "GET", path: "/packages", query: new URL("http://x/packages" + path).searchParams, headers: {} }).then((r) => JSON.parse(r.body as string));

    const all = await list("");
    expect(all.total).toBe(2); // no app filter → everything
    const scoped = await list("?app=com.app.x");
    expect(scoped.packages.map((p: { id: string }) => p.id).sort()).toEqual(["com.demo.forx", "com.demo.global"]);
    const other = await list("?app=com.app.z");
    expect(other.packages.map((p: { id: string }) => p.id)).toEqual(["com.demo.global"]); // only global
    // targetApps is surfaced on each summary.
    const forx = scoped.packages.find((p: { id: string }) => p.id === "com.demo.forx");
    expect(forx.targetApps).toEqual(["com.app.x"]);
  });

  it("surfaces ranking metadata and filters by media domain + capability subset", async () => {
    const registry = new Registry();
    await registry.publish(azp("com.demo.brush", { name: "Brush", capabilities: ["bitmap"], assets: [{ type: "brush", path: "assets/x.cube" }] }));
    await registry.publish(azp("com.demo.sfx", { name: "SFX", capabilities: ["audio"], assets: [{ type: "audio", path: "assets/x.cube" }] }));
    const handle = createRepositoryHandler({ registry, index: INDEX });
    const list = (qs: string) =>
      handle({ method: "GET", path: "/packages", query: new URL("http://x/packages" + qs).searchParams, headers: {} }).then((r) => JSON.parse(r.body as string));

    const brush = (await list("")).packages.find((p: { id: string }) => p.id === "com.demo.brush");
    expect(brush.byteSize).toBeGreaterThan(0);
    expect(brush.mediaDomains).toEqual(["image"]);
    expect(typeof brush.downloads).toBe("number");

    // A video/audio host keeps the audio SFX and drops the paint-only brush.
    expect((await list("?mediaDomains=audio")).packages.map((p: { id: string }) => p.id)).toEqual(["com.demo.sfx"]);
    // A host granting only {audio, assets} can't run the bitmap brush (needs `bitmap`).
    expect((await list("?capabilities=audio,assets")).packages.map((p: { id: string }) => p.id)).toEqual(["com.demo.sfx"]);
  });

  it("sorts by name via the `sort` parameter", async () => {
    const registry = new Registry();
    await registry.publish(azp("com.demo.zeb", { name: "Zebra" }));
    await registry.publish(azp("com.demo.app", { name: "Apple" }));
    const handle = createRepositoryHandler({ registry, index: INDEX });
    const res = await handle({ method: "GET", path: "/packages", query: new URL("http://x/packages?sort=name").searchParams, headers: {} });
    expect(JSON.parse(res.body as string).packages.map((p: { name: string }) => p.name)).toEqual(["Apple", "Zebra"]);
  });

  it("serves the /revocations feed for yanked versions", async () => {
    const registry = new Registry();
    await registry.publish(azp("com.demo.bad", { version: "1.0.0" }));
    await registry.publish(azp("com.demo.bad", { version: "1.1.0" }));
    await registry.yank("com.demo.bad", "1.0.0", true, "malware");
    const handle = createRepositoryHandler({ registry, index: INDEX });
    const res = await handle({ method: "GET", path: "/revocations", query: new URLSearchParams(), headers: {} });
    expect(res.status).toBe(200);
    const body = JSON.parse(res.body as string);
    expect(body.revocations).toHaveLength(1);
    expect(body.revocations[0]).toMatchObject({ id: "com.demo.bad", version: "1.0.0", reason: "malware" });

    // A malformed `since` is a 400, not a broken lexical comparison.
    const bad = await handle({ method: "GET", path: "/revocations", query: new URL("http://x/revocations?since=not-a-date").searchParams, headers: {} });
    expect(bad.status).toBe(400);
  });

  it("gates a buy-once download with an offline-verified entitlement token", async () => {
    const reg = generateSigningKey();
    const store = new InMemoryStore();
    const registry = new Registry(store);
    const marketplace = new Marketplace(registry, store);
    await registry.publish(azp("com.demo.buyonce", { name: "Buy Once" }));
    await marketplace.listForSale("com.demo.buyonce", "seller", { amountCents: 500, currency: "USD" });
    const handle = createRepositoryHandler({ registry, marketplace, authorizer: new EntitlementAuthorizer([reg.publicKey]), index: INDEX });

    const path = "/packages/com.demo.buyonce/versions/1.0.0/download";
    const claims = (packageId: string): EntitlementClaims => ({ packageId, subject: "u1", kind: "perpetual", issuedAt: "2026-01-01T00:00:00Z" });
    const bearer = (packageId: string) => "Bearer " + Buffer.from(JSON.stringify(issueEntitlement(reg.privateKey, claims(packageId)))).toString("base64");
    const dl = (authorization?: string) => handle({ method: "GET", path, query: new URLSearchParams(), headers: authorization ? { authorization } : {} });

    expect((await dl()).status).toBe(401); // no token
    expect((await dl("Bearer " + "A".repeat(5000))).status).toBe(401); // oversized token rejected (DoS cap)
    expect((await dl(bearer("com.demo.other"))).status).toBe(402); // valid registry token, wrong package
    const ok = await dl(bearer("com.demo.buyonce")); // valid buy-once token for this package
    expect(ok.status).toBe(200);
    expect(verifyAzp(ok.body as Uint8Array).ok).toBe(true);
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
