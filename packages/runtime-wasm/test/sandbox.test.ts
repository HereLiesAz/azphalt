import { describe, it, expect } from "vitest";
import { runFilterSandboxed, evalInSandbox } from "../src/index";

describe("runtime-wasm sandbox", () => {
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
});
