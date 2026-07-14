import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";
import { runFilterSandboxed, runFilter, loadExtension, evalInSandbox } from "../src/index";

describe("runtime-wasm sandbox (expression probe)", () => {
  it("runs an untrusted filter in QuickJS-WASM and mutates the bitmap", async () => {
    const invert = `(ctx) => {
      const b = ctx.bitmap.read();
      for (let i = 0; i < b.data.length; i += 4) {
        b.data[i] = 255 - b.data[i];
        b.data[i + 1] = 255 - b.data[i + 1];
        b.data[i + 2] = 255 - b.data[i + 2];
      }
      ctx.bitmap.write(b);
      ctx.canvas.requestRedraw();
    }`;
    const result = await runFilterSandboxed(
      invert,
      { params: {}, bitmap: { data: [10, 20, 30, 255, 200, 100, 50, 128], width: 2, height: 1 } },
      { capabilities: ["bitmap", "canvas"] },
    );
    expect(result.bitmap.data).toEqual([245, 235, 225, 255, 55, 155, 205, 128]);
    expect(result.redraws).toBe(1);
  });

  it("reads params through the host bridge", async () => {
    const fill = `(ctx) => {
      const v = ctx.params.number("level");
      const b = ctx.bitmap.read();
      for (let i = 0; i < b.data.length; i++) b.data[i] = v;
      ctx.bitmap.write(b);
    }`;
    const result = await runFilterSandboxed(
      fill,
      { params: { level: 128 }, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } },
      { capabilities: ["bitmap", "params"] },
    );
    expect(result.bitmap.data).toEqual([128, 128, 128, 128]);
  });

  it("denies an ungranted capability (ctx.bitmap absent when not granted)", async () => {
    await expect(
      runFilterSandboxed(
        `(ctx) => { ctx.bitmap.read(); }`,
        { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } },
        { capabilities: ["params"] },
      ),
    ).rejects.toThrow(/sandbox/);
  });

  it("has no ambient authority — no process / require / fetch in the sandbox", async () => {
    expect(await evalInSandbox("typeof process")).toBe("undefined");
    expect(await evalInSandbox("typeof require")).toBe("undefined");
    expect(await evalInSandbox("typeof fetch")).toBe("undefined");
    expect(await evalInSandbox("1 + 2")).toBe(3);
  });

  it("interrupts a runaway loop instead of hanging the host", async () => {
    await expect(
      runFilterSandboxed(
        `(ctx) => { while (true) {} }`,
        { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } },
        { capabilities: ["bitmap"] },
      ),
    ).rejects.toThrow(/sandbox/);
  }, 10000);

  it("rejects a malformed bitmap written from the sandbox", async () => {
    await expect(
      runFilterSandboxed(
        // Claims 1x1 (4 bytes) but hands back a 2-byte buffer — the host must not trust the shape.
        `(ctx) => { ctx.bitmap.write({ width: 1, height: 1, data: new Uint8ClampedArray(2) }); }`,
        { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } },
        { capabilities: ["bitmap"] },
      ),
    ).rejects.toThrow(/invalid bitmap/);
  });

  it("drains async jobs so an awaiting filter runs to completion", async () => {
    const asyncFill = `(ctx) => (async () => {
      await Promise.resolve();
      const b = ctx.bitmap.read();
      for (let i = 0; i < b.data.length; i++) b.data[i] = 42;
      ctx.bitmap.write(b);
    })()`;
    const result = await runFilterSandboxed(
      asyncFill,
      { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } },
      { capabilities: ["bitmap"] },
    );
    expect(result.bitmap.data).toEqual([42, 42, 42, 42]);
  });
});

/* ─────────────── real .azp code-entry loading (runFilter) ─────────────── */

/** The invert extension, written against `@azphalt/sdk` exactly as `examples/invert` is. */
const INVERT_MODULE = `
  import { defineFilter } from "@azphalt/sdk";
  export const invert = defineFilter((ctx) => {
    const s = Math.max(0, Math.min(1, ctx.params.number("strength")));
    const bmp = ctx.bitmap.read(ctx.target);
    const d = bmp.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = d[i] + (255 - 2 * d[i]) * s;
      d[i + 1] = d[i + 1] + (255 - 2 * d[i + 1]) * s;
      d[i + 2] = d[i + 2] + (255 - 2 * d[i + 2]) * s;
    }
    ctx.bitmap.write(ctx.target, bmp);
    ctx.canvas.requestRedraw();
  });
`;

/** Package `moduleSource` as a real `code`-kind `.azp` with an `invert` filter contribution. */
function buildExtensionAzp(
  moduleSource: string,
  capabilities: Manifest["capabilities"] = ["bitmap", "params", "canvas"],
) {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: "com.example.invert",
    name: "Invert",
    version: "1.0.0",
    kind: "code",
    license: "MIT",
    compat: ">=0.1",
    entry: "code/main.js",
    runtime: "js",
    capabilities,
    contributes: { filters: [{ id: "invert", name: "Invert", entry: "invert" }] },
  };
  return writeAzp({
    manifest,
    payload: { "code/main.js": new TextEncoder().encode(moduleSource) },
    license: "MIT License",
  }).azp;
}

describe("runtime-wasm real .azp code entry (runFilter)", () => {
  const bitmap = { data: [10, 20, 30, 255, 200, 100, 50, 128], width: 2, height: 1 };

  it("loads a real .azp module, resolves the filter export, and runs it (strength = 1 → inverse)", async () => {
    const azp = buildExtensionAzp(INVERT_MODULE);
    const result = await runFilter(azp, { params: { strength: 1 }, bitmap: { ...bitmap } });
    expect(result.bitmap.data).toEqual([245, 235, 225, 255, 55, 155, 205, 128]);
    expect(result.redraws).toBe(1);
  });

  it("wires params through: strength = 0 is a no-op", async () => {
    const azp = buildExtensionAzp(INVERT_MODULE);
    const result = await runFilter(azp, { params: { strength: 0 }, bitmap: { ...bitmap } });
    expect(result.bitmap.data).toEqual(bitmap.data);
  });

  it("gates capabilities: granting only params leaves ctx.bitmap absent, so the filter fails", async () => {
    const azp = buildExtensionAzp(INVERT_MODULE);
    await expect(
      runFilter(azp, { params: { strength: 1 }, bitmap: { ...bitmap } }, { capabilities: ["params"] }),
    ).rejects.toThrow(/sandbox/);
  });

  it("rejects an export that is not a defineFilter contribution", async () => {
    const bare = `export const invert = (ctx) => { ctx.canvas.requestRedraw(); };`;
    const azp = buildExtensionAzp(bare);
    await expect(runFilter(azp, { params: {}, bitmap: { ...bitmap } })).rejects.toThrow(/not a filter contribution/);
  });

  it("denies a module importing anything outside the package (no ambient authority)", async () => {
    const evil = `import "node:fs"; import { defineFilter } from "@azphalt/sdk"; export const invert = defineFilter(() => {});`;
    const azp = buildExtensionAzp(evil);
    await expect(runFilter(azp, { params: {}, bitmap: { ...bitmap } })).rejects.toThrow(/module not found/);
  });

  it("runs an async filter to completion", async () => {
    const asyncMod = `
      import { defineFilter } from "@azphalt/sdk";
      export const invert = defineFilter(async (ctx) => {
        await Promise.resolve();
        const bmp = ctx.bitmap.read(ctx.target);
        for (let i = 0; i < bmp.data.length; i++) bmp.data[i] = 7;
        ctx.bitmap.write(ctx.target, bmp);
      });
    `;
    const azp = buildExtensionAzp(asyncMod);
    const result = await runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(result.bitmap.data).toEqual([7, 7, 7, 7]);
  });

  it("loadExtension throws on a tampered package", async () => {
    const azp = buildExtensionAzp(INVERT_MODULE);
    // Corrupt a block of payload data (past the local headers, before the EOCD) so a manifest
    // digest no longer matches — the check that makes a signature meaningful.
    for (let i = 50; i < 130; i++) azp[i] ^= 0xff;
    expect(() => loadExtension(azp)).toThrow(/verification failed/);
  });
});
