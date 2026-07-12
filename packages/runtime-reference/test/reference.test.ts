import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { runAzp } from "../src/index.js";
import type { Manifest } from "@azphalt/sdk";

const baseManifest: Omit<Manifest, "files"> = {
  azphalt: "0.1",
  id: "test.filter",
  name: "Test Filter",
  version: "1.0.0",
  kind: "code",
  license: "MIT",
  compat: ">=0.1",
  runtime: "js",
  entry: "code/main.js",
  capabilities: ["bitmap", "layers", "params"],
  contributes: {
    filters: [{ id: "test.filter", name: "Test", entry: "apply" }]
  }
};

describe("runtime-reference", () => {
  it("executes a filter and enforces capability gating", async () => {
    // A sample filter that mutates a bitmap and tries to access an ungranted capability
    const filterCode = `
      import { defineFilter } from "@azphalt/sdk";
      export const apply = defineFilter((ctx) => {
        // Bitmap and layers were granted
        const bmp = ctx.bitmap.read(ctx.target);
        bmp.data[0] = 255;
        ctx.bitmap.write(ctx.target, bmp);

        // Selection was NOT granted, should be undefined
        if (ctx.selection !== undefined) {
          throw new Error("Selection should be blocked by capability gate");
        }
      });
    `;

    const { azp } = writeAzp({
      manifest: baseManifest,
      payload: {
        "code/main.js": new TextEncoder().encode(filterCode)
      },
      license: "MIT"
    });

    const { host, scopedHost } = await runAzp(azp);

    // Verify capability gating
    expect(scopedHost.bitmap).toBeDefined();
    expect(scopedHost.layers).toBeDefined();
    expect(scopedHost.params).toBeDefined();
    expect(scopedHost.selection).toBeUndefined(); // blocked
    expect(scopedHost.color).toBeUndefined();     // blocked

    // Verify mutation occurred on the fake host
    const activeLayer = host.layers.active();
    const mutatedBmp = host.bitmap.read(activeLayer);
    expect(mutatedBmp.data[0]).toBe(255);
  });
});
