/**
 * Range requests on the download endpoint (resumable/parallel downloads): a `Range` header yields
 * `206 Partial Content` with `Content-Range`, a full request advertises `Accept-Ranges`, an
 * unsatisfiable range is `416`, and the paid gate still runs first (a ranged request for paid bytes
 * needs the entitlement).
 */
import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import type { Manifest } from "@azphalt/azdk";
import { createRepositoryHandler, InMemoryAuthorizer, type RepoRequest } from "../src/index";

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

async function fixture() {
  const store = new InMemoryStore();
  const registry = new Registry(store);
  const marketplace = new Marketplace(registry, store);
  await registry.publish(azp("com.demo.free"));
  await registry.publish(azp("com.demo.paid"));
  await marketplace.listForSale("com.demo.paid", "seller_1", { amountCents: 900, currency: "USD" });
  const authorizer = new InMemoryAuthorizer().grantLicense("good-token", "com.demo.paid");
  const handle = createRepositoryHandler({ registry, marketplace, authorizer, index: { name: "R", version: "0.1" } });
  const total = (await registry.serveRange("com.demo.free", "1.0.0", { start: 0 })).totalSize;
  return { handle, total };
}

const mk = (path: string, headers: Record<string, string> = {}): RepoRequest => ({
  method: "GET",
  path,
  query: new URLSearchParams(),
  headers,
});

const FREE = "/packages/com.demo.free/versions/1.0.0/download";
const PAID = "/packages/com.demo.paid/versions/1.0.0/download";

describe("download — range requests", () => {
  it("answers a Range request with 206 + Content-Range + Accept-Ranges", async () => {
    const { handle, total } = await fixture();
    const res = await handle(mk(FREE, { range: "bytes=0-3" }));
    expect(res.status).toBe(206);
    expect(res.headers["content-range"]).toBe(`bytes 0-3/${total}`);
    expect(res.headers["accept-ranges"]).toBe("bytes");
    expect((res.body as Uint8Array).length).toBe(4);
  });

  it("advertises Accept-Ranges on a full 200 download", async () => {
    const { handle, total } = await fixture();
    const res = await handle(mk(FREE));
    expect(res.status).toBe(200);
    expect(res.headers["accept-ranges"]).toBe("bytes");
    expect((res.body as Uint8Array).length).toBe(total);
  });

  it("returns 416 with Content-Range for an unsatisfiable range", async () => {
    const { handle, total } = await fixture();
    const res = await handle(mk(FREE, { range: `bytes=${total}-` }));
    expect(res.status).toBe(416);
    expect(res.headers["content-range"]).toBe(`bytes */${total}`);
  });

  it("serves a suffix (last-N) range", async () => {
    const { handle, total } = await fixture();
    const res = await handle(mk(FREE, { range: "bytes=-5" }));
    expect(res.status).toBe(206);
    expect(res.headers["content-range"]).toBe(`bytes ${total - 5}-${total - 1}/${total}`);
  });

  it("gates a paid ranged download: 401 without a license, 206 with one", async () => {
    const { handle } = await fixture();
    expect((await handle(mk(PAID, { range: "bytes=0-3" }))).status).toBe(401);
    const ok = await handle(mk(PAID, { range: "bytes=0-3", authorization: "Bearer good-token" }));
    expect(ok.status).toBe(206);
  });
});
