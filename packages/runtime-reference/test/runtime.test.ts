import { describe, it, expect } from "vitest";
import { defineFilter } from "@azphalt/sdk";
import type { Manifest } from "@azphalt/sdk";
import { writeAzp } from "@azphalt/azp";
import { AzpError, createHost, createWorld, open, runFilter } from "../src/index";

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
