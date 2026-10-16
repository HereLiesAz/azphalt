/** A `private` package's detail is access-gated like its bytes, and HEAD works without counting downloads. */
import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import { createRepositoryHandler, InMemoryAuthorizer, type RepoRequest } from "../src/index";

const lut = new TextEncoder().encode("LUT_3D_SIZE 2\n0 0 0\n1 0 0\n0 1 0\n1 1 0\n0 0 1\n1 0 1\n0 1 1\n1 1 1\n");
const azp = (id: string, visibility: "public" | "private") =>
  writeAzp({
    manifest: {
      azphalt: "0.1", id, name: id, version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1",
      visibility, assets: [{ type: "lut", path: "assets/x.cube" }],
    },
    payload: { "assets/x.cube": lut },
    license: "MIT\n",
  }).azp;

async function fixture() {
  const store = new InMemoryStore();
  const registry = new Registry(store, { requireSignature: false });
  await registry.publish(azp("com.demo.pub", "public"));
  await registry.publish(azp("com.demo.secret", "private"));
  const authorizer = new InMemoryAuthorizer().registerToken("stranger").grantLicense("insider", "com.demo.secret");
  const handle = createRepositoryHandler({ registry, marketplace: new Marketplace(registry, store), authorizer, index: { name: "R", version: "0.1" } });
  const mk = (path: string, method = "GET", headers: Record<string, string> = {}): RepoRequest => {
    const url = new URL(path, "http://x");
    return { method, path: url.pathname, query: url.searchParams, headers, body: undefined };
  };
  return { handle, mk, registry };
}

describe("private package detail", () => {
  it("is 401 without a token, 402 for an unlicensed token, 200 for a granted one", async () => {
    const { handle, mk } = await fixture();
    expect((await handle(mk("/packages/com.demo.secret"))).status).toBe(401);
    expect((await handle(mk("/packages/com.demo.secret", "GET", { authorization: "Bearer stranger" }))).status).toBe(402);
    expect((await handle(mk("/packages/com.demo.secret", "GET", { authorization: "Bearer insider" }))).status).toBe(200);
  });

  it("leaves public detail open", async () => {
    const { handle, mk } = await fixture();
    expect((await handle(mk("/packages/com.demo.pub"))).status).toBe(200);
  });
});

describe("HEAD", () => {
  it("answers a download HEAD with size headers and does not count a download", async () => {
    const { handle, mk, registry } = await fixture();
    const before = (await registry.getSummary("com.demo.pub"))!.downloads;
    const res = await handle(mk("/packages/com.demo.pub/versions/1.0.0/download", "HEAD"));
    expect(res.status).toBe(200);
    expect(Number(res.headers["content-length"])).toBeGreaterThan(0);
    expect(res.body).toBe("");
    expect((await registry.getSummary("com.demo.pub"))!.downloads).toBe(before);
  });

  it("routes HEAD on a detail like GET (no 405)", async () => {
    const { handle, mk } = await fixture();
    expect((await handle(mk("/packages/com.demo.pub", "HEAD"))).status).toBe(200);
  });
});
