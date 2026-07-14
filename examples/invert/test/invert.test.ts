import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { Manifest, Panel } from "@azphalt/sdk";
import { createHost, createWorld, runFilter } from "@azphalt/runtime-reference";
import * as ext from "../src/main";

const manifest = JSON.parse(
  readFileSync(new URL("../manifest.json", import.meta.url), "utf8"),
) as Manifest;
const panel = JSON.parse(readFileSync(new URL("../ui/panel.json", import.meta.url), "utf8")) as Panel;

describe("example: invert", () => {
  it("declares exactly the capabilities the filter uses", () => {
    expect(new Set(manifest.capabilities)).toEqual(new Set(["bitmap", "params", "canvas"]));
    expect(manifest.contributes?.filters?.[0].entry).toBe("invert");
  });

  it("ships the strength control the filter reads", () => {
    const c = panel.controls[0];
    expect(c.type).toBe("slider");
    expect(c.key).toBe("strength");
  });

  it("fully inverts at strength 1 and requests a redraw", async () => {
    const world = createWorld({ width: 2, height: 1, params: { strength: 1 } });
    world.layers[0].bitmap.data.set([10, 20, 30, 255, 200, 100, 50, 128]);
    await runFilter(manifest, ext, world);
    expect(Array.from(world.layers[0].bitmap.data)).toEqual([245, 235, 225, 255, 55, 155, 205, 128]);
    expect(world.redraws).toBe(1);
  });

  it("is a no-op at strength 0", async () => {
    const world = createWorld({ width: 1, height: 1, params: { strength: 0 } });
    world.layers[0].bitmap.data.set([10, 20, 30, 255]);
    await runFilter(manifest, ext, world);
    expect(Array.from(world.layers[0].bitmap.data)).toEqual([10, 20, 30, 255]);
  });

  it("never receives capabilities it did not request", () => {
    const host = createHost(manifest, createWorld());
    expect(host.layers).toBeUndefined();
    expect(host.selection).toBeUndefined();
    expect(host.color).toBeUndefined();
  });
});
