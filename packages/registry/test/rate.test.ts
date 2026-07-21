/** User ratings: Registry.rate folds a 1–5 star vote into the aggregate getRating returns. */
import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { Registry, InMemoryStore, RegistryError } from "../src/index";

const license = "MIT License\n";
const enc = (s: string) => new TextEncoder().encode(s);

async function seeded() {
  const reg = new Registry(new InMemoryStore());
  await reg.publish(
    writeAzp({
      manifest: { azphalt: "0.1", id: "com.acme.brush", name: "Brush", version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1", assets: [{ type: "brush", path: "assets/b" }] },
      payload: { "assets/b": enc("brush") },
      license,
    }).azp,
  );
  return reg;
}

describe("Registry.rate", () => {
  it("records ratings and averages them", async () => {
    const reg = await seeded();
    expect((await reg.getSummary("com.acme.brush"))?.ratingCount).toBe(0);

    await reg.rate("com.acme.brush", 4);
    const { rating, ratingCount } = await reg.rate("com.acme.brush", 2);
    expect(ratingCount).toBe(2);
    expect(rating).toBe(3); // (4 + 2) / 2

    const summary = await reg.getSummary("com.acme.brush");
    expect(summary?.rating).toBe(3);
    expect(summary?.ratingCount).toBe(2);
  });

  it("rounds and rejects out-of-range stars", async () => {
    const reg = await seeded();
    await reg.rate("com.acme.brush", 4.4); // rounds to 4
    expect((await reg.getSummary("com.acme.brush"))?.rating).toBe(4);
    await expect(reg.rate("com.acme.brush", 0)).rejects.toBeInstanceOf(RegistryError);
    await expect(reg.rate("com.acme.brush", 6)).rejects.toBeInstanceOf(RegistryError);
    await expect(reg.rate("com.acme.brush", Number.NaN)).rejects.toBeInstanceOf(RegistryError);
  });

  it("rejects rating an unknown package", async () => {
    const reg = await seeded();
    await expect(reg.rate("com.nope.missing", 5)).rejects.toBeInstanceOf(RegistryError);
  });

  it("throws when the store cannot collect ratings", async () => {
    // A store without addRating: strip it off a fresh in-memory store.
    const store = new InMemoryStore();
    (store as { addRating?: unknown }).addRating = undefined;
    const reg = new Registry(store);
    await reg.publish(
      writeAzp({
        manifest: { azphalt: "0.1", id: "com.acme.x", name: "X", version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1", assets: [{ type: "brush", path: "a" }] },
        payload: { a: enc("x") },
        license,
      }).azp,
    );
    await expect(reg.rate("com.acme.x", 5)).rejects.toBeInstanceOf(RegistryError);
  });
});
