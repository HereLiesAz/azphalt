/**
 * `POST /installs` — install reporting (`spec/repository-api.md` § 8, `spec/state-reporting.md` § 4).
 *
 * The registry's own tests cover the token lifecycle. These cover the HTTP contract around it: that a
 * token actually reaches the client on the response it is minted for, that a `206` does not carry one,
 * that a bad body is a `400` while a bad *event* is a counted rejection inside a `200`, and that an
 * unconfigured repository answers `501` rather than pretending to count.
 */
import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry, type RegistryStore } from "@azphalt/registry";
import type { Manifest } from "@azphalt/azdk";
import { createRepositoryHandler, type RepoRequest } from "../src/index";

const LICENSE = "MIT License\n";
const utf8 = (s: string) => new TextEncoder().encode(s);
const ID = "com.demo.thing";

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

async function fixture(store: RegistryStore = new InMemoryStore()) {
  const registry = new Registry(store);
  const marketplace = new Marketplace(registry, store as InMemoryStore);
  await registry.publish(azp(ID));
  const handle = createRepositoryHandler({ registry, marketplace, index: { name: "R", version: "0.1" } });
  return { handle, registry };
}

const get = (path: string, headers: Record<string, string> = {}): RepoRequest => ({
  method: "GET",
  path,
  query: new URLSearchParams(),
  headers,
});

const post = (path: string, body: unknown): RepoRequest => ({
  method: "POST",
  path,
  query: new URLSearchParams(),
  headers: { "content-type": "application/json" },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

const DOWNLOAD = `/packages/${ID}/versions/1.0.0/download`;

/** The package's entry in `GET /packages` — where `downloads` lives, and now the install tallies. */
async function summaryOf(handle: (req: RepoRequest) => Promise<{ body?: unknown }>) {
  const res = await handle(get("/packages"));
  const body = JSON.parse(res.body as string);
  return body.packages.find((p: { id: string }) => p.id === ID);
}

describe("the report token on a download", () => {
  it("is present on a full 200", async () => {
    const { handle } = await fixture();
    const res = await handle(get(DOWNLOAD));
    expect(res.status).toBe(200);
    expect(res.headers?.["azphalt-report-token"]).toBeTruthy();
  });

  it("is absent on a 206, because a ranged read is not a download", async () => {
    const { handle } = await fixture();
    const res = await handle(get(DOWNLOAD, { range: "bytes=0-7" }));
    expect(res.status).toBe(206);
    expect(res.headers?.["azphalt-report-token"]).toBeUndefined();
  });

  it("differs between two downloads of the same version", async () => {
    const { handle } = await fixture();
    const a = (await handle(get(DOWNLOAD))).headers?.["azphalt-report-token"];
    const b = (await handle(get(DOWNLOAD))).headers?.["azphalt-report-token"];
    expect(a).not.toBe(b);
  });
});

describe("POST /installs", () => {
  it("counts an install from a token the download issued, and returns a receipt", async () => {
    const { handle } = await fixture();
    const token = (await handle(get(DOWNLOAD))).headers?.["azphalt-report-token"];

    const res = await handle(post("/installs", { events: [{ id: ID, version: "1.0.0", event: "installed", token }] }));

    expect(res.status).toBe(200);
    const body = JSON.parse(res.body as string);
    expect(body).toMatchObject({ accepted: 1, rejected: 0 });
    expect(body.receipts[0]).toMatchObject({ id: ID, receipt: expect.any(String) });

    // And it shows up on the browse summary the store card renders from — alongside `downloads`,
    // rather than on package detail, which carries no tallies at all.
    expect(await summaryOf(handle)).toMatchObject({ installs: 1, uninstalls: 0 });
  });

  it("round-trips install then uninstall through the receipt", async () => {
    const { handle } = await fixture();
    const token = (await handle(get(DOWNLOAD))).headers?.["azphalt-report-token"];
    const installed = JSON.parse(
      (await handle(post("/installs", { events: [{ id: ID, version: "1.0.0", event: "installed", token }] }))).body as string,
    );
    const receipt = installed.receipts[0].receipt;

    const res = await handle(post("/installs", { events: [{ id: ID, version: "1.0.0", event: "uninstalled", receipt }] }));

    expect(JSON.parse(res.body as string)).toMatchObject({ accepted: 1, rejected: 0 });
    expect(await summaryOf(handle)).toMatchObject({ installs: 1, uninstalls: 1 });
  });

  it("counts a bad event as rejected inside a 200, keeping the good ones", async () => {
    const { handle } = await fixture();
    const token = (await handle(get(DOWNLOAD))).headers?.["azphalt-report-token"];

    // A stale token and a good one in one batch: a client retrying should not lose the good event.
    const res = await handle(
      post("/installs", {
        events: [
          { id: ID, version: "1.0.0", event: "installed", token: "fabricated" },
          { id: ID, version: "1.0.0", event: "installed", token },
          { id: ID, version: "1.0.0", event: "who-knows" },
        ],
      }),
    );

    expect(res.status).toBe(200);
    expect(JSON.parse(res.body as string)).toMatchObject({ accepted: 1, rejected: 2 });
  });

  it("rejects a malformed body with 400 and the error envelope", async () => {
    const { handle } = await fixture();
    for (const body of ["not json", {}, { events: "nope" }, { events: [{ id: ID }] }, { events: [null] }]) {
      const res = await handle(post("/installs", body));
      expect(res.status, JSON.stringify(body)).toBe(400);
      expect(JSON.parse(res.body as string).error.code).toBe("bad_request");
    }
  });

  it("bounds the batch, so the caller cannot set the server's memory budget", async () => {
    const { handle } = await fixture();
    const events = Array.from({ length: 201 }, () => ({ id: ID, version: "1.0.0", event: "activated" }));
    const res = await handle(post("/installs", { events }));
    expect(res.status).toBe(400);
  });

  it("bounds oversized fields", async () => {
    const { handle } = await fixture();
    const res = await handle(
      post("/installs", { events: [{ id: ID, version: "1.0.0", event: "installed", token: "x".repeat(300) }] }),
    );
    expect(res.status).toBe(400);
  });

  it("is 405 on anything but POST", async () => {
    const { handle } = await fixture();
    expect((await handle(get("/installs"))).status).toBe(405);
  });
});

describe("a repository that keeps no install statistics", () => {
  /** The `501` a client must treat as final — distinct from a `200` whose events were all rejected. */
  it("answers 501, and its downloads mint no token", async () => {
    const base = new InMemoryStore();
    const withoutInstalls = Object.create(base) as InMemoryStore;
    // Shadow the optional group with `undefined` so the registry sees it as unimplemented.
    Object.assign(withoutInstalls, {
      putReportToken: undefined,
      redeemReportToken: undefined,
      putInstallReceipt: undefined,
      redeemInstallReceipt: undefined,
      incrementInstalls: undefined,
      getInstalls: undefined,
    });
    const { handle } = await fixture(withoutInstalls);

    expect((await handle(get(DOWNLOAD))).headers?.["azphalt-report-token"]).toBeUndefined();

    const res = await handle(post("/installs", { events: [{ id: ID, version: "1.0.0", event: "activated" }] }));
    expect(res.status).toBe(501);

    // And the summary omits the counters rather than reporting a zero it never measured.
    expect(await summaryOf(handle)).not.toHaveProperty("installs");
  });
});
