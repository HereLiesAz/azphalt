/** Regression tests for the sandbox fixes: grant ⊆ declared, unsettled promises, prototype keys, layer caps, wasm bounds. */
import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";
import { runFilter, MAX_WASM_MODULE_BYTES } from "../src/index";

function buildAzp(source: string, capabilities: Manifest["capabilities"], extra: Partial<Manifest> = {}, bytes?: Uint8Array) {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1", id: "com.example.hard", name: "H", version: "1.0.0", kind: "code", license: "MIT", compat: ">=0.1",
    entry: "code/main.js", runtime: "js", capabilities,
    contributes: { filters: [{ id: "f", name: "F", entry: "f" }] },
    ...extra,
  };
  return writeAzp({ manifest, payload: { "code/main.js": bytes ?? new TextEncoder().encode(source) }, license: "MIT" }).azp;
}
const world = (extra: object = {}) => ({ params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 }, ...extra });

describe("capability grant", () => {
  it("never widens beyond what the package declared", async () => {
    const src = `import { defineFilter } from "@azphalt/azdk";
      export const f = defineFilter((ctx) => { ctx.layers.create({ name: "x" }); });`;
    // Declares only `bitmap`; the caller tries to grant `layers` too. `ctx.layers` must stay absent.
    const azp = buildAzp(src, ["bitmap"]);
    await expect(runFilter(azp, world(), { capabilities: ["bitmap", "layers"] })).rejects.toThrow();
  });
});

describe("unsettled contribution", () => {
  it("is an error, not a silent success", async () => {
    const src = `import { defineFilter } from "@azphalt/azdk";
      export const f = defineFilter(async (ctx) => { await new Promise(() => {}); });`;
    await expect(runFilter(buildAzp(src, ["bitmap"]), world())).rejects.toThrow(/never completed/);
  });
});

describe("prototype names are not params or assets", () => {
  it("returns the default for a 'constructor' param instead of the host Object function", async () => {
    const src = `import { defineFilter } from "@azphalt/azdk";
      export const f = defineFilter((ctx) => {
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = ctx.params.string("constructor") === "" ? 1 : 2;
        ctx.bitmap.write(ctx.target, bmp);
      });`;
    const r = await runFilter(buildAzp(src, ["bitmap", "params"]), world());
    expect(r.bitmap.data[0]).toBe(1);
  });
});

describe("guest layer allocation is capped", () => {
  it("stops a guest looping layers.create", async () => {
    const src = `import { defineFilter } from "@azphalt/azdk";
      export const f = defineFilter((ctx) => { for (let i = 0; i < 1000; i++) ctx.layers.create({ name: "n" + i }); });`;
    await expect(runFilter(buildAzp(src, ["layers", "bitmap"]), world())).rejects.toThrow(/layer limit/);
  });
});

describe("raw wasm module bounds", () => {
  it("rejects an oversized module before instantiating it", async () => {
    const manifest: Omit<Manifest, "files"> = {
      azphalt: "0.1", id: "com.example.big", name: "B", version: "1.0.0", kind: "code", license: "MIT", compat: ">=0.1",
      entry: "code/main.wasm", runtime: "wasm", capabilities: ["bitmap"],
      contributes: { filters: [{ id: "f", name: "F", entry: "f" }] },
    };
    const big = writeAzp({ manifest, payload: { "code/main.wasm": new Uint8Array(MAX_WASM_MODULE_BYTES + 1) }, license: "MIT" }).azp;
    await expect(runFilter(big, world())).rejects.toThrow(/limit/);
  });
});
