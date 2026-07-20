/**
 * Ranged serving (`Registry.serveRange`) — the primitive behind resumable/parallel downloads. Verifies
 * inclusive windows, `latest` resolution, open-ended and suffix ranges, that ranged reads do NOT count
 * a download (only a full `serve` does), the `416` path, and the whole-object fallback for a store that
 * doesn't implement ranged reads.
 */
import { describe, it, expect } from "vitest";
import { Registry, InMemoryStore, RangeNotSatisfiableError, type RegistryStore } from "../src/index";
import { makeAzp } from "./make";

async function seeded() {
  const store = new InMemoryStore();
  const reg = new Registry(store);
  await reg.publish(makeAzp("com.x.pack", "1.0.0"));
  return { store, reg };
}

/** The same store with its optional ranged-read methods hidden, to exercise the fallback path. */
function withoutRangeSupport(store: InMemoryStore): RegistryStore {
  return new Proxy(store, {
    get(target, prop, receiver) {
      if (prop === "getByteRange" || prop === "getByteSize") return undefined;
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
  }) as unknown as RegistryStore;
}

describe("Registry.serveRange", () => {
  it("returns the requested inclusive window and the total size", async () => {
    const { reg } = await seeded();
    const full = (await reg.serve("com.x.pack", "1.0.0")).bytes;
    const { bytes, start, end, totalSize } = await reg.serveRange("com.x.pack", "1.0.0", { start: 0, end: 9 });
    expect(totalSize).toBe(full.length);
    expect([start, end]).toEqual([0, 9]);
    expect([...bytes]).toEqual([...full.slice(0, 10)]);
  });

  it("resolves latest when version is omitted, and honors an open-ended range", async () => {
    const { reg } = await seeded();
    const full = (await reg.serve("com.x.pack")).bytes;
    const { bytes, end, totalSize } = await reg.serveRange("com.x.pack", undefined, { start: 5 });
    expect(end).toBe(totalSize - 1);
    expect([...bytes]).toEqual([...full.slice(5)]);
  });

  it("honors a suffix (last-N bytes) range", async () => {
    const { reg } = await seeded();
    const full = (await reg.serve("com.x.pack", "1.0.0")).bytes;
    const { bytes, start, end, totalSize } = await reg.serveRange("com.x.pack", "1.0.0", { suffix: 4 });
    expect(start).toBe(totalSize - 4);
    expect(end).toBe(totalSize - 1);
    expect([...bytes]).toEqual([...full.slice(-4)]);
  });

  it("does not count a download — many range requests are one logical transfer", async () => {
    const { store, reg } = await seeded();
    await reg.serveRange("com.x.pack", "1.0.0", { start: 0, end: 1 });
    await reg.serveRange("com.x.pack", "1.0.0", { start: 2, end: 3 });
    expect(await store.getDownloads("com.x.pack")).toBe(0);
    await reg.serve("com.x.pack", "1.0.0"); // a full 200 is what counts
    expect(await store.getDownloads("com.x.pack")).toBe(1);
  });

  it("throws RangeNotSatisfiableError (→ 416) past the end, carrying the total size", async () => {
    const { reg } = await seeded();
    const total = (await reg.serve("com.x.pack", "1.0.0")).bytes.length;
    await expect(reg.serveRange("com.x.pack", "1.0.0", { start: total })).rejects.toBeInstanceOf(RangeNotSatisfiableError);
    await reg.serveRange("com.x.pack", "1.0.0", { start: total + 5 }).catch((e) => {
      expect((e as RangeNotSatisfiableError).totalSize).toBe(total);
    });
  });

  it("falls back to a whole-object read + slice when the store has no ranged reads", async () => {
    const { store } = await seeded();
    const reg = new Registry(withoutRangeSupport(store));
    const full = (await reg.serve("com.x.pack", "1.0.0")).bytes;
    const { bytes, start, end } = await reg.serveRange("com.x.pack", "1.0.0", { start: 2, end: 6 });
    expect([start, end]).toEqual([2, 6]);
    expect([...bytes]).toEqual([...full.slice(2, 7)]);
  });
});
