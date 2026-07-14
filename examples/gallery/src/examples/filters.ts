import { example, utf8, type Example } from "../shared.js";

const INVERT_JS = `import { defineFilter } from "@azphalt/sdk";
export const invert = defineFilter((ctx) => {
  const bmp = ctx.bitmap.read(ctx.target);
  for (let i = 0; i < bmp.data.length; i += 4) {
    bmp.data[i] = 255 - bmp.data[i];
    bmp.data[i + 1] = 255 - bmp.data[i + 1];
    bmp.data[i + 2] = 255 - bmp.data[i + 2];
  }
  ctx.bitmap.write(ctx.target, bmp);
  ctx.canvas.requestRedraw();
});
`;

const BRIGHTNESS_JS = `import { defineFilter } from "@azphalt/sdk";
export const brightness = defineFilter((ctx) => {
  const amount = ctx.params.number("amount"); // -255..255
  const bmp = ctx.bitmap.read(ctx.target);
  for (let i = 0; i < bmp.data.length; i += 4) {
    bmp.data[i] += amount;
    bmp.data[i + 1] += amount;
    bmp.data[i + 2] += amount;
  }
  ctx.bitmap.write(ctx.target, bmp);
});
`;

const BRIGHTNESS_UI = JSON.stringify(
  { controls: [{ type: "slider", key: "amount", label: "Brightness", min: -255, max: 255, step: 1, default: 0 }] },
  null,
  2,
);

/** `filter` — a `code` extension that reads and writes the target layer's pixels. */
export const filters: Example[] = [
  example({
    slug: "filter-invert",
    summary: "A filter contribution that inverts RGB and requests a redraw.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.invert",
      name: "Invert",
      version: "1.0.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description: "The canonical filter: invert every pixel's RGB.",
      author: "azphalt examples",
      runtime: "js",
      entry: "code/main.js",
      capabilities: ["bitmap", "canvas"],
      contributes: { filters: [{ id: "invert", name: "Invert", entry: "invert" }] },
    },
    payload: { "code/main.js": utf8(INVERT_JS) },
    run: {
      world: { params: {}, bitmap: { data: [10, 20, 30, 255], width: 1, height: 1 } },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([245, 235, 225, 255])) throw new Error(`invert: ${r.bitmap.data}`);
        if (r.redraws !== 1) throw new Error(`invert redraws: ${r.redraws}`);
      },
    },
  }),
  example({
    slug: "filter-brightness",
    summary: "A parameterized filter with a slider UI (reads `params`).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.brightness",
      name: "Brightness",
      version: "1.0.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description: "Add a signed amount to each channel; the amount comes from a slider.",
      author: "azphalt examples",
      runtime: "js",
      entry: "code/main.js",
      capabilities: ["bitmap", "params"],
      contributes: { filters: [{ id: "brightness", name: "Brightness", entry: "brightness", ui: "ui/panel.json" }] },
    },
    payload: { "code/main.js": utf8(BRIGHTNESS_JS), "ui/panel.json": utf8(BRIGHTNESS_UI) },
    run: {
      world: { params: { amount: 20 }, bitmap: { data: [10, 20, 30, 255], width: 1, height: 1 } },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([30, 40, 50, 255])) throw new Error(`brightness: ${r.bitmap.data}`);
      },
    },
  }),
];
