/**
 * Install reporting (`spec/state-reporting.md` § 4, `repository-api.md` § 8).
 *
 * The counters are the easy part. What these tests are actually for is the token lifecycle, because it
 * is the only thing standing between "installs" being a fact and being a number anyone with `curl` can
 * choose. Every test below that says "rejects" is an inflation attempt.
 */
import { describe, it, expect } from "vitest";
import { Registry } from "../src/registry.js";
import { InMemoryStore, type RegistryStore } from "../src/store.js";
import { makeAzp } from "./make.js";

const ID = "com.hereliesaz.halftone";
const OTHER = "com.hereliesaz.dither";

async function seeded(): Promise<Registry> {
  const r = new Registry();
  await r.publish(makeAzp(ID, "1.0.0", { name: "Halftone", kind: "code" }));
  await r.publish(makeAzp(OTHER, "1.0.0", { name: "Dither", kind: "code" }));
  return r;
}

describe("report tokens", () => {
  it("mints a single-use token with every full download", async () => {
    const r = await seeded();
    const first = await r.serve(ID);
    const second = await r.serve(ID);

    expect(first.reportToken).toBeTruthy();
    expect(second.reportToken).toBeTruthy();
    // Unrelated per transfer: a token that repeated for the same client and version would be a device
    // identifier by accident, which spec/state-reporting.md § 2 forbids.
    expect(first.reportToken).not.toBe(second.reportToken);
  });

  it("does not mint a token for a ranged read", async () => {
    const r = await seeded();
    // A ranged read is not a download (repository-api.md § 4), so it must not produce the thing that
    // authorises an install report — otherwise one transfer split into ten chunks would authorise ten.
    const ranged = await r.serveRange(ID, "1.0.0", { start: 0, end: 8 });
    expect("reportToken" in ranged).toBe(false);
  });
});

describe("installed events", () => {
  it("counts an install against a token from a real download", async () => {
    const r = await seeded();
    const { reportToken } = await r.serve(ID);

    const result = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);

    expect(result).toEqual({ accepted: 1, rejected: 0, receipts: [{ id: ID, receipt: expect.any(String) }] });
    const summary = await r.getSummary(ID);
    expect(summary?.installs).toBe(1);
    expect(summary?.uninstalls).toBe(0);
  });

  it("rejects a replayed token", async () => {
    const r = await seeded();
    const { reportToken } = await r.serve(ID);
    await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);

    // The whole point: one download authorises exactly one install.
    const replay = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);

    expect(replay).toMatchObject({ accepted: 0, rejected: 1 });
    expect((await r.getSummary(ID))?.installs).toBe(1);
  });

  it("rejects an install with no token at all", async () => {
    const r = await seeded();
    const result = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed" }]);
    expect(result).toMatchObject({ accepted: 0, rejected: 1 });
    expect((await r.getSummary(ID))?.installs).toBe(0);
  });

  it("rejects a fabricated token", async () => {
    const r = await seeded();
    const result = await r.reportInstalls([
      { id: ID, version: "1.0.0", event: "installed", token: "00000000-0000-4000-8000-000000000000" },
    ]);
    expect(result).toMatchObject({ accepted: 0, rejected: 1 });
    expect((await r.getSummary(ID))?.installs).toBe(0);
  });

  it("rejects a token minted for a different package", async () => {
    const r = await seeded();
    // Download something free and cheap, then try to spend its token on another package. The token
    // proves a download happened; it must also say *which*, or every package's count is spendable by
    // anyone who downloaded any package.
    const { reportToken } = await r.serve(OTHER);

    const result = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);

    expect(result).toMatchObject({ accepted: 0, rejected: 1 });
    expect((await r.getSummary(ID))?.installs).toBe(0);
    // And the token is spent either way, so it cannot be retried against its real package.
    expect((await r.getSummary(OTHER))?.installs).toBe(0);
  });
});

describe("uninstalled events", () => {
  it("counts an uninstall against the receipt from its install", async () => {
    const r = await seeded();
    const { reportToken } = await r.serve(ID);
    const installed = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);
    const receipt = installed!.receipts[0].receipt;

    const result = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "uninstalled", receipt }]);

    expect(result).toMatchObject({ accepted: 1, rejected: 0 });
    const summary = await r.getSummary(ID);
    expect(summary?.installs).toBe(1);
    expect(summary?.uninstalls).toBe(1);
  });

  it("rejects an uninstall with no receipt, so nobody can drive a rival's number down", async () => {
    const r = await seeded();
    const { reportToken } = await r.serve(ID);
    await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);

    const result = await r.reportInstalls([
      { id: ID, version: "1.0.0", event: "uninstalled" },
      { id: ID, version: "1.0.0", event: "uninstalled", receipt: "made-up" },
    ]);

    expect(result).toMatchObject({ accepted: 0, rejected: 2 });
    expect((await r.getSummary(ID))?.uninstalls).toBe(0);
  });

  it("rejects a replayed receipt", async () => {
    const r = await seeded();
    const { reportToken } = await r.serve(ID);
    const installed = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: reportToken }]);
    const receipt = installed!.receipts[0].receipt;
    await r.reportInstalls([{ id: ID, version: "1.0.0", event: "uninstalled", receipt }]);

    const replay = await r.reportInstalls([{ id: ID, version: "1.0.0", event: "uninstalled", receipt }]);

    expect(replay).toMatchObject({ accepted: 0, rejected: 1 });
    expect((await r.getSummary(ID))?.uninstalls).toBe(1);
  });
});

describe("activation events", () => {
  it("accepts them without counting them", async () => {
    const r = await seeded();
    // Unbounded by nature — a user can toggle an extension all day — so a count would mean nothing.
    // Accepted rather than rejected so a well-behaved client stops retrying.
    const result = await r.reportInstalls([
      { id: ID, version: "1.0.0", event: "activated" },
      { id: ID, version: "1.0.0", event: "deactivated" },
      { id: ID, version: "1.0.0", event: "activated" },
    ]);

    expect(result).toMatchObject({ accepted: 3, rejected: 0, receipts: [] });
    const summary = await r.getSummary(ID);
    expect(summary?.installs).toBe(0);
    expect(summary?.uninstalls).toBe(0);
  });
});

describe("batches", () => {
  it("keeps the good events when one is stale", async () => {
    const r = await seeded();
    const a = await r.serve(ID);
    const b = await r.serve(ID);
    await r.reportInstalls([{ id: ID, version: "1.0.0", event: "installed", token: a.reportToken }]);

    // A client retrying a batch after a partial failure: one token already spent, one still good.
    const result = await r.reportInstalls([
      { id: ID, version: "1.0.0", event: "installed", token: a.reportToken },
      { id: ID, version: "1.0.0", event: "installed", token: b.reportToken },
    ]);

    expect(result).toMatchObject({ accepted: 1, rejected: 1 });
    expect((await r.getSummary(ID))?.installs).toBe(2);
  });

  it("rejects an unrecognised event name without failing the batch", async () => {
    const r = await seeded();
    const { reportToken } = await r.serve(ID);
    const result = await r.reportInstalls([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { id: ID, version: "1.0.0", event: "exploded" as any },
      { id: ID, version: "1.0.0", event: "installed", token: reportToken },
    ]);
    expect(result).toMatchObject({ accepted: 1, rejected: 1 });
  });
});

describe("a store that keeps no install statistics", () => {
  /**
   * The optional group omitted — which is the default for a conforming repository. `reportInstalls`
   * must say "unsupported" rather than "everything was rejected", because a transport maps the first to
   * `501` (stop reporting) and the second to `200` (keep trying).
   */
  it("reports unsupported, and the summary omits the counters entirely", async () => {
    const base = new InMemoryStore();
    const withoutInstalls: RegistryStore = {
      putVersion: base.putVersion.bind(base),
      getVersion: base.getVersion.bind(base),
      getVersions: base.getVersions.bind(base),
      getBytes: base.getBytes.bind(base),
      allPackageIds: base.allPackageIds.bind(base),
      incrementDownloads: base.incrementDownloads.bind(base),
      getDownloads: base.getDownloads.bind(base),
      getRating: base.getRating.bind(base),
      putRevocation: base.putRevocation.bind(base),
      getRevocations: base.getRevocations.bind(base),
      putListing: base.putListing.bind(base),
      getListing: base.getListing.bind(base),
      allListings: base.allListings.bind(base),
    };
    const r = new Registry(withoutInstalls);
    await r.publish(makeAzp(ID, "1.0.0", { name: "Halftone", kind: "code" }));

    expect(await r.reportInstalls([{ id: ID, version: "1.0.0", event: "activated" }])).toBeUndefined();

    // Absent, not zero. "0 installs" from a store that never counted any would be a false statement.
    const summary = await r.getSummary(ID);
    expect(summary?.installs).toBeUndefined();
    expect(summary?.uninstalls).toBeUndefined();

    // And a download from such a store mints nothing to report with.
    expect((await r.serve(ID)).reportToken).toBeUndefined();
  });
});
