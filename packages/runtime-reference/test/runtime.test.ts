import { describe, it, expect } from "vitest";
import { defineFilter, defineTransition } from "@azphalt/sdk";
import type { Manifest } from "@azphalt/sdk";
import { writeAzp } from "@azphalt/azp";
import { AzpError, createHost, createWorld, open, runFilter, runTransition } from "../src/index";

const invert = defineFilter((ctx) => {
  const bmp = ctx.bitmap.read(ctx.target);
  const d = bmp.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 255 - d[i];
    d[i + 1] = 255 - d[i + 1];
    d[i + 2] = 255 - d[i + 2];
  }
  ctx.bitmap.write(ctx.target, bmp);
  ctx.canvas.requestRedraw();
});

const module = { invert };

const manifest: Manifest = {
  azphalt: "0.1",
  id: "com.hereliesaz.fixture",
  name: "Fixture",
  version: "1.0.0",
  kind: "code",
  license: "MIT",
  compat: ">=0.1",
  entry: "code/main.js",
  runtime: "js",
  capabilities: ["bitmap", "canvas"],
  contributes: { filters: [{ id: "invert", name: "Invert", entry: "invert" }] },
  files: {},
};

describe("runtime-reference", () => {
  it("dispatches a filter and mutates the active layer's bitmap in place", async () => {
    const world = createWorld({ width: 2, height: 1 });
    world.layers[0].bitmap.data.set([10, 20, 30, 255, 0, 0, 0, 255]);

    await runFilter(manifest, module, world);

    expect(Array.from(world.layers[0].bitmap.data)).toEqual([245, 235, 225, 255, 255, 255, 255, 255]);
    expect(world.redraws).toBe(1);
  });

  it("builds only the granted capabilities; ungranted ones are absent (not erroring)", () => {
    const host = createHost(manifest, createWorld());
    expect(host.bitmap).toBeDefined();
    expect(host.canvas).toBeDefined();
    expect(host.layers).toBeUndefined();
    expect(host.color).toBeUndefined();
    expect(host.assets).toBeUndefined();
  });

  it("round-trips UI params through the host", () => {
    const world = createWorld({ params: { strength: 0.5, name: "hi", on: true, ink: "#204080" } });
    const host = createHost({ ...manifest, capabilities: ["params"] }, world);
    expect(host.params!.number("strength")).toBe(0.5);
    expect(host.params!.string("name")).toBe("hi");
    expect(host.params!.bool("on")).toBe(true);
    expect(host.params!.color("ink")).toEqual({ r: 0x20, g: 0x40, b: 0x80, a: 255 });
  });

  it("supports opt-in 16-bit bitmaps (read/write/alloc preserve depth and >255 values)", () => {
    const world = createWorld({ width: 1, height: 1 });
    world.layers[0].bitmap = { data: new Uint16Array([1000, 2, 3, 4]), width: 1, height: 1, depth: 16 };
    const host = createHost(manifest, world);
    const ref = { id: world.layers[0].id };

    const bmp = host.bitmap!.read(ref);
    expect(bmp.depth).toBe(16);
    expect(bmp.data instanceof Uint16Array).toBe(true);
    expect(bmp.data[0]).toBe(1000);

    (bmp.data as Uint16Array)[0] = 40000; // > 255 — only representable at 16-bit
    host.bitmap!.write(ref, bmp);
    expect((world.layers[0].bitmap.data as Uint16Array)[0]).toBe(40000);

    const alloc16 = host.bitmap!.alloc(2, 2, 16);
    expect(alloc16.depth).toBe(16);
    expect(alloc16.data instanceof Uint16Array).toBe(true);
    expect(alloc16.data.length).toBe(2 * 2 * 4);

    // 8-bit alloc is unchanged: no depth field, Uint8ClampedArray.
    const alloc8 = host.bitmap!.alloc(1, 1);
    expect(alloc8.depth).toBeUndefined();
    expect(alloc8.data instanceof Uint8ClampedArray).toBe(true);
  });

  it("rejects a bitmap whose declared depth disagrees with its data type", () => {
    const world = createWorld({ width: 1, height: 1 });
    const host = createHost(manifest, world);
    const bad = { data: new Uint8ClampedArray(4), width: 1, height: 1, depth: 16 as const };
    expect(() => host.bitmap!.write({ id: world.layers[0].id }, bad)).toThrow(/depth/);
  });

  it("open() rejects bytes that fail verification", () => {
    expect(() => open(new Uint8Array([1, 2, 3, 4]))).toThrow(AzpError);
  });

  it("open() verifies and parses a real .azp", () => {
    const { azp } = writeAzp({
      manifest: {
        azphalt: "0.1",
        id: "com.hereliesaz.y",
        name: "Y",
        version: "1.0.0",
        kind: "asset",
        license: "MIT",
        compat: ">=0.1",
      },
      payload: { "assets/a.bin": new Uint8Array([1, 2, 3]) },
      license: "MIT\n",
    });
    const loaded = open(azp);
    expect(loaded.manifest.id).toBe("com.hereliesaz.y");
    expect(Object.keys(loaded.payload)).toContain("assets/a.bin");
  });
});

describe("temporal + audio + transitions", () => {
  const base = { azphalt: "0.1", id: "com.hereliesaz.tav", name: "TAV", version: "1.0.0", kind: "code", license: "MIT", compat: ">=0.1", entry: "code/main.js", runtime: "js", files: {} } as const;

  it("exposes the playback clock via the `time` capability (currentMs / fps / frameIndex)", async () => {
    const stampTime = defineFilter((ctx) => {
      const bmp = ctx.bitmap.read(ctx.target);
      bmp.data[0] = ctx.time.frameIndex();
      bmp.data[1] = ctx.time.fps();
      bmp.data[2] = Math.round(ctx.time.currentMs() / 100);
      ctx.bitmap.write(ctx.target, bmp);
    });
    const m: Manifest = { ...base, capabilities: ["bitmap", "time"], contributes: { filters: [{ id: "f", name: "F", entry: "f" }] } };
    const world = createWorld({ width: 1, height: 1, time: { currentMs: 500, fps: 30 } }); // 0.5s @30fps → frame 15
    await runFilter(m, { f: stampTime }, world);
    expect(Array.from(world.layers[0].bitmap.data)).toEqual([15, 30, 5, 0]);
  });

  it("gates `time`: ctx.time is absent without the capability", () => {
    const host = createHost({ ...base, capabilities: ["bitmap"] } as Manifest, createWorld());
    expect(host.time).toBeUndefined();
  });

  it("reads and writes a PCM block via the `audio` capability", async () => {
    const gain = defineFilter((ctx) => {
      const a = ctx.audio.read();
      const out = a.samples.map((s) => s * 0.5);
      ctx.audio.write({ samples: out, sampleRate: a.sampleRate, channels: a.channels });
    });
    const m: Manifest = { ...base, capabilities: ["audio"], contributes: { filters: [{ id: "f", name: "F", entry: "f" }] } };
    // Values exactly representable in float32 so halving stays exact.
    const world = createWorld({ audio: { samples: new Float32Array([1, -1, 0.5, -0.5]), sampleRate: 48000, channels: 2 } });
    await runFilter(m, { f: gain }, world);
    expect(Array.from(world.audio!.samples)).toEqual([0.5, -0.5, 0.25, -0.25]);
    expect(world.audio!.sampleRate).toBe(48000);
    expect(world.audio!.channels).toBe(2);
  });

  it("dispatches a transition: two input frames blended by progress", async () => {
    const crossfade = defineTransition((ctx) => {
      const a = ctx.from.data, b = ctx.to.data, p = ctx.progress;
      const out = ctx.bitmap.alloc(ctx.from.width, ctx.from.height);
      for (let i = 0; i < out.data.length; i++) out.data[i] = Math.round(a[i] * (1 - p) + b[i] * p);
      ctx.bitmap.write(ctx.target, out);
    });
    const m: Manifest = { ...base, capabilities: ["bitmap"], contributes: { transitions: [{ id: "x", name: "X", entry: "x" }] } };
    const world = createWorld({ width: 1, height: 1 });
    const from = { data: new Uint8ClampedArray([0, 0, 0, 255]), width: 1, height: 1 };
    const to = { data: new Uint8ClampedArray([100, 200, 40, 255]), width: 1, height: 1 };
    await runTransition(m, { x: crossfade }, world, { from, to, progress: 0.25 });
    expect(Array.from(world.layers[0].bitmap.data)).toEqual([25, 50, 10, 255]);
  });

  it("rejects a filter export dispatched as a transition (brand mismatch)", async () => {
    const notT = defineFilter(() => {});
    const m: Manifest = { ...base, capabilities: ["bitmap"], contributes: { transitions: [{ id: "x", name: "X", entry: "x" }] } };
    await expect(
      runTransition(m, { x: notT }, createWorld({ width: 1, height: 1 }), { from: { data: new Uint8ClampedArray(4), width: 1, height: 1 }, to: { data: new Uint8ClampedArray(4), width: 1, height: 1 }, progress: 0 }),
    ).rejects.toThrow(/not a transition/);
  });
});
