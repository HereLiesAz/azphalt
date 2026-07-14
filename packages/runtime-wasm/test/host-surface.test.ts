import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";
import { runFilter, runTool, runCommand } from "../src/index";

/** Build a `code` `.azp` with a chosen module source, capabilities, contributes, and extra payload. */
function buildAzp(opts: {
  source: string;
  runtime?: "js" | "wasm";
  entryPath?: string;
  capabilities: Manifest["capabilities"];
  contributes: Manifest["contributes"];
  payload?: Record<string, Uint8Array>;
  bytesEntry?: Uint8Array;
}) {
  const entry = opts.entryPath ?? "code/main.js";
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: "com.example.surface",
    name: "Surface",
    version: "1.0.0",
    kind: "code",
    license: "MIT",
    compat: ">=0.1",
    entry,
    runtime: opts.runtime ?? "js",
    capabilities: opts.capabilities,
    contributes: opts.contributes,
  };
  return writeAzp({
    manifest,
    payload: { [entry]: opts.bytesEntry ?? new TextEncoder().encode(opts.source), ...opts.payload },
    license: "MIT License",
  }).azp;
}

const filterContributes: Manifest["contributes"] = { filters: [{ id: "f", name: "F", entry: "f" }] };

describe("runtime-wasm full Host surface", () => {
  it("bridges the `layers` capability (list / create / opacity)", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => {
        const before = ctx.layers.list().length;
        const created = ctx.layers.create({ name: "extra" });
        ctx.layers.setOpacity(created, 0.5);
        // stash observations into the active layer's first pixels
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = before;
        bmp.data[1] = ctx.layers.list().length;
        bmp.data[2] = Math.round(ctx.layers.opacity(created) * 100);
        ctx.bitmap.write(ctx.target, bmp);
      });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["layers", "bitmap"], contributes: filterContributes });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(r.bitmap.data[0]).toBe(1); // one layer before
    expect(r.bitmap.data[1]).toBe(2); // two after create
    expect(r.bitmap.data[2]).toBe(50); // opacity 0.5
    expect(r.layers).toHaveLength(2);
    expect(r.layers[1].opacity).toBe(0.5);
  });

  it("bridges the `selection` capability (set / mask / clear)", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => {
        if (ctx.selection.mask() !== null) throw new Error("expected no initial selection");
        ctx.selection.set({ data: new Uint8ClampedArray([9, 9, 9, 9]), width: 1, height: 1 });
        const m = ctx.selection.mask();
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = m.data[0];
        ctx.bitmap.write(ctx.target, bmp);
      });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["selection", "bitmap"], contributes: filterContributes });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(r.bitmap.data[0]).toBe(9);
    expect(r.selection).toEqual({ data: [9, 9, 9, 9], width: 1, height: 1 });
  });

  it("bridges the `color` capability (active / setActive / palette)", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => {
        const a = ctx.color.active();
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = a.r; bmp.data[1] = ctx.color.palette().length;
        ctx.bitmap.write(ctx.target, bmp);
        ctx.color.setActive({ r: 1, g: 2, b: 3, a: 255 });
      });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["color", "bitmap"], contributes: filterContributes });
    const r = await runFilter(azp, {
      params: {},
      bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 },
      color: { active: { r: 200, g: 0, b: 0, a: 255 }, palette: [{ r: 1, g: 1, b: 1, a: 1 }] },
    });
    expect(r.bitmap.data[0]).toBe(200);
    expect(r.bitmap.data[1]).toBe(1); // palette length
    expect(r.color.active).toEqual({ r: 1, g: 2, b: 3, a: 255 });
  });

  it("bridges the `assets` capability (read a bundled file)", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => {
        const bytes = ctx.assets.read("assets/data.bin");
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = bytes[0]; bmp.data[1] = bytes[1];
        ctx.bitmap.write(ctx.target, bmp);
      });
    `;
    const azp = buildAzp({
      source: mod,
      capabilities: ["assets", "bitmap"],
      contributes: filterContributes,
      payload: { "assets/data.bin": new Uint8Array([42, 7]) },
    });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(r.bitmap.data[0]).toBe(42);
    expect(r.bitmap.data[1]).toBe(7);
  });

  it("round-trips a 16-bit bitmap through the QuickJS bridge (depth, >255 values, alloc)", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => {
        const bmp = ctx.bitmap.read(ctx.target);
        if (bmp.depth !== 16) throw new Error("expected 16-bit, got " + bmp.depth);
        bmp.data[0] = 40000;             // > 255 — only representable at 16-bit
        bmp.data[1] = bmp.data[1] + 1;
        ctx.bitmap.write(ctx.target, bmp);
        const a = ctx.bitmap.alloc(1, 1, 16);
        if (a.depth !== 16) throw new Error("alloc must honor depth");
      });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["bitmap"], contributes: filterContributes });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [1000, 2, 3, 4], width: 1, height: 1, depth: 16 } });
    expect(r.bitmap.depth).toBe(16);
    expect(r.bitmap.data[0]).toBe(40000);
    expect(r.bitmap.data[1]).toBe(3);
  });

  it("clamps 8-bit channel values instead of wrapping them (input out of 0–255)", async () => {
    const azp = buildAzp({
      source: `import { defineFilter } from "@azphalt/sdk"; export const f = defineFilter(() => {});`,
      capabilities: ["bitmap"],
      contributes: filterContributes,
    });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [300, -5, 256, 128], width: 1, height: 1 } });
    expect(r.bitmap.data).toEqual([255, 0, 255, 128]); // clamp, not 300%256=44 / -5→251 / 256→0
  });

  it("writes a partial-view bitmap correctly (data is a subarray of a larger buffer)", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => {
        const big = new Uint8ClampedArray(12);
        big.set([9, 8, 7, 6], 4);
        ctx.bitmap.write(ctx.target, { data: big.subarray(4, 8), width: 1, height: 1 }); // byteOffset 4
      });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["bitmap"], contributes: filterContributes });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(r.bitmap.data).toEqual([9, 8, 7, 6]);
  });

  it("gates a new capability: ctx.layers is absent when not granted", async () => {
    const mod = `
      import { defineFilter } from "@azphalt/sdk";
      export const f = defineFilter((ctx) => { ctx.layers.list(); });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["bitmap"], contributes: filterContributes });
    await expect(
      runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } }),
    ).rejects.toThrow(/sandbox/);
  });

  it("dispatches a tool contribution via runTool", async () => {
    const mod = `
      import { defineTool } from "@azphalt/sdk";
      export const t = defineTool((ctx) => { ctx.canvas.requestRedraw(); });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["canvas", "bitmap"], contributes: { tools: [{ id: "t", name: "T", entry: "t" }] } });
    const r = await runTool(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(r.redraws).toBe(1);
  });

  it("dispatches a command contribution via runCommand", async () => {
    const mod = `
      import { defineCommand } from "@azphalt/sdk";
      export const c = defineCommand((ctx) => {
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = 5;
        ctx.bitmap.write(ctx.target, bmp);
      });
    `;
    const azp = buildAzp({ source: mod, capabilities: ["bitmap"], contributes: { commands: [{ id: "c", name: "C", entry: "c" }] } });
    const r = await runCommand(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } });
    expect(r.bitmap.data[0]).toBe(5);
  });

  it("rejects a host-supplied bitmap whose length doesn't match its dimensions", async () => {
    const azp = buildAzp({ source: `import { defineFilter } from "@azphalt/sdk"; export const f = defineFilter(() => {});`, capabilities: ["bitmap"], contributes: filterContributes });
    // width*height*4 = 4, but data has 3 bytes.
    await expect(runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0], width: 1, height: 1 } })).rejects.toThrow(
      /width \* height \* 4/,
    );
  });

  it("rejects a world with an empty layers array", async () => {
    const azp = buildAzp({ source: `import { defineFilter } from "@azphalt/sdk"; export const f = defineFilter(() => {});`, capabilities: ["bitmap"], contributes: filterContributes });
    await expect(runFilter(azp, { params: {}, layers: [] })).rejects.toThrow(/non-empty `layers`|`bitmap`/);
  });

  it("rejects a tool export dispatched as a filter (brand mismatch)", async () => {
    const mod = `
      import { defineTool } from "@azphalt/sdk";
      export const f = defineTool((ctx) => {});
    `;
    const azp = buildAzp({ source: mod, capabilities: ["bitmap"], contributes: filterContributes });
    await expect(runFilter(azp, { params: {}, bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 } })).rejects.toThrow(
      /not a filter contribution/,
    );
  });
});

/* ─────────────── raw runtime: "wasm" path ─────────────── */

/**
 * Hand-assemble a minimal WebAssembly module: exports `memory` + `filter(ptr,w,h,stride)` which
 * inverts `[ptr, ptr+h*stride)` in place and calls the imported `env.requestRedraw`. Sections are
 * built with auto-computed sizes so nothing is miscounted.
 */
function buildInvertWasm(): Uint8Array {
  const uleb = (n: number): number[] => {
    const out: number[] = [];
    do {
      let b = n & 0x7f;
      n >>>= 7;
      if (n) b |= 0x80;
      out.push(b);
    } while (n);
    return out;
  };
  const section = (id: number, content: number[]): number[] => [id, ...uleb(content.length), ...content];
  const str = (s: string): number[] => [...uleb(s.length), ...[...s].map((c) => c.charCodeAt(0))];

  // Types: t0 = () -> (); t1 = (i32,i32,i32,i32) -> ()
  const types = section(1, [0x02, 0x60, 0x00, 0x00, 0x60, 0x04, 0x7f, 0x7f, 0x7f, 0x7f, 0x00]);
  // Import env.requestRedraw : func t0  (funcidx 0)
  const imports = section(2, [0x01, ...str("env"), ...str("requestRedraw"), 0x00, 0x00]);
  // Function: our filter uses t1  (funcidx 1)
  const funcs = section(3, [0x01, 0x01]);
  // Memory: min 1 page  (memidx 0)
  const mem = section(5, [0x01, 0x00, 0x01]);
  // Exports: memory (mem 0), filter (func 1)
  const exports = section(7, [0x02, ...str("memory"), 0x02, 0x00, ...str("filter"), 0x00, 0x01]);
  // Code: locals [2 x i32] (end=4, i=5); invert loop; call requestRedraw
  const body = [
    0x20, 0x02, 0x20, 0x03, 0x6c, 0x20, 0x00, 0x6a, 0x21, 0x04, // end = ptr + h*stride
    0x20, 0x00, 0x21, 0x05, // i = ptr
    0x02, 0x40, 0x03, 0x40, // block { loop {
    0x20, 0x05, 0x20, 0x04, 0x4f, 0x0d, 0x01, // if i >= end br 1 (break)
    0x20, 0x05, 0x41, 0xff, 0x01, 0x20, 0x05, 0x2d, 0x00, 0x00, 0x6b, 0x3a, 0x00, 0x00, // mem[i] = 255 - mem[i]
    0x20, 0x05, 0x41, 0x01, 0x6a, 0x21, 0x05, // i = i + 1
    0x0c, 0x00, // br 0 (continue)
    0x0b, 0x0b, // } }
    0x10, 0x00, // call requestRedraw
    0x0b, // end func
  ];
  const funcBody = [0x01, 0x02, 0x7f, ...body]; // 1 local group of 2 i32
  const code = section(10, [0x01, ...uleb(funcBody.length), ...funcBody]);

  return new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, ...types, ...imports, ...funcs, ...mem, ...exports, ...code]);
}

/**
 * Hand-assemble a wasm module exercising the extended env ABI: it writes the key `"on"` into its
 * own memory, calls `env.paramBool(keyPtr, keyLen)` and stores the result at `mem[ptr]`, calls
 * `env.canvasWidth()` and stores it at `mem[ptr+1]`, then calls `env.requestRedraw()`. This proves
 * the string-key marshaling convention (the host reads the key from module memory) end-to-end.
 */
function buildParamsWasm(): Uint8Array {
  const uleb = (n: number): number[] => {
    const out: number[] = [];
    do {
      let b = n & 0x7f;
      n >>>= 7;
      if (n) b |= 0x80;
      out.push(b);
    } while (n);
    return out;
  };
  // `i32.const` operands are *signed* LEB128: a value ≥ 64 needs a continuation byte, or its bit-6
  // reads as a sign bit and decodes negative (e.g. a bare `0x6f` is -17, not 111).
  const sleb = (n: number): number[] => {
    const out: number[] = [];
    for (;;) {
      const b = n & 0x7f;
      n >>= 7;
      const done = (n === 0 && (b & 0x40) === 0) || (n === -1 && (b & 0x40) !== 0);
      out.push(done ? b : b | 0x80);
      if (done) return out;
    }
  };
  const i32c = (n: number): number[] => [0x41, ...sleb(n)];
  const section = (id: number, content: number[]): number[] => [id, ...uleb(content.length), ...content];
  const str = (s: string): number[] => [...uleb(s.length), ...[...s].map((c) => c.charCodeAt(0))];

  // Types: t0 (i32,i32)->i32, t1 ()->i32, t2 ()->(), t3 (i32,i32,i32,i32)->()
  const types = section(1, [
    0x04,
    0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f,
    0x60, 0x00, 0x01, 0x7f,
    0x60, 0x00, 0x00,
    0x60, 0x04, 0x7f, 0x7f, 0x7f, 0x7f, 0x00,
  ]);
  // Imports (funcidx 0..2): env.paramBool t0, env.canvasWidth t1, env.requestRedraw t2
  const imports = section(2, [
    0x03,
    ...str("env"), ...str("paramBool"), 0x00, 0x00,
    ...str("env"), ...str("canvasWidth"), 0x00, 0x01,
    ...str("env"), ...str("requestRedraw"), 0x00, 0x02,
  ]);
  const funcs = section(3, [0x01, 0x03]); // filter uses t3 (funcidx 3)
  const mem = section(5, [0x01, 0x00, 0x01]);
  const exports = section(7, [0x02, ...str("memory"), 0x02, 0x00, ...str("filter"), 0x00, 0x03]);
  const body = [
    ...i32c(200), ...i32c(111), 0x3a, 0x00, 0x00, // mem[200] = 'o'
    ...i32c(201), ...i32c(110), 0x3a, 0x00, 0x00, // mem[201] = 'n'
    0x20, 0x00, ...i32c(200), ...i32c(2), 0x10, 0x00, 0x3a, 0x00, 0x00, // mem[ptr] = paramBool("on")
    0x20, 0x00, ...i32c(1), 0x6a, 0x10, 0x01, 0x3a, 0x00, 0x00, // mem[ptr+1] = canvasWidth()
    0x10, 0x02, // requestRedraw()
    0x0b,
  ];
  const funcBody = [0x00, ...body]; // no locals
  const code = section(10, [0x01, ...uleb(funcBody.length), ...funcBody]);
  return new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, ...types, ...imports, ...funcs, ...mem, ...exports, ...code]);
}

describe("runtime-wasm raw wasm entry", () => {
  it("assembles a valid wasm module", () => {
    expect(WebAssembly.validate(buildInvertWasm().slice().buffer as ArrayBuffer)).toBe(true);
    expect(WebAssembly.validate(buildParamsWasm().slice().buffer as ArrayBuffer)).toBe(true);
  });

  it("bridges params + canvas to a wasm filter via the string-marshaling env ABI", async () => {
    const azp = buildAzp({
      source: "",
      runtime: "wasm",
      entryPath: "code/filter.wasm",
      bytesEntry: buildParamsWasm(),
      capabilities: ["bitmap", "params", "canvas"],
      contributes: { filters: [{ id: "f", name: "F", entry: "filter" }] },
    });
    const r = await runFilter(azp, { params: { on: true }, bitmap: { data: [10, 20, 30, 255, 200, 100, 50, 128], width: 2, height: 1 } });
    expect(r.bitmap.data[0]).toBe(1); // paramBool("on") === true → 1
    expect(r.bitmap.data[1]).toBe(2); // canvasWidth() === 2
    expect(r.redraws).toBe(1);
  });

  it("runs a runtime:\"wasm\" filter over the shared-memory ABI (invert + redraw)", async () => {
    const azp = buildAzp({
      source: "",
      runtime: "wasm",
      entryPath: "code/filter.wasm",
      bytesEntry: buildInvertWasm(),
      capabilities: ["bitmap", "canvas"],
      contributes: { filters: [{ id: "f", name: "F", entry: "filter" }] },
    });
    const r = await runFilter(azp, { params: {}, bitmap: { data: [10, 20, 30, 255, 200, 100, 50, 128], width: 2, height: 1 } });
    expect(r.bitmap.data).toEqual([245, 235, 225, 0, 55, 155, 205, 127]);
    expect(r.redraws).toBe(1);
  });

  it("runs a 16-bit wasm filter: doubled byte stride, values round-trip as Uint16", async () => {
    const azp = buildAzp({
      source: "",
      runtime: "wasm",
      entryPath: "code/filter.wasm",
      bytesEntry: buildInvertWasm(),
      capabilities: ["bitmap", "canvas"],
      contributes: { filters: [{ id: "f", name: "F", entry: "filter" }] },
    });
    // 1×1 RGBA @ 16-bit = 4 channels = 8 bytes; stride = 1*4*2 = 8, so the byte-wise invert covers
    // every byte of both channels. Each channel's little-endian bytes are inverted, then re-read as u16.
    const r = await runFilter(azp, { params: {}, bitmap: { data: [256, 1, 65535, 0], width: 1, height: 1, depth: 16 } });
    expect(r.bitmap.depth).toBe(16);
    expect(r.bitmap.data).toEqual([65279, 65534, 0, 65535]);
    expect(r.redraws).toBe(1);
  });
});
