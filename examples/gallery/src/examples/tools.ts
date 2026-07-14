import { example, utf8, type Example } from "../shared.js";

const FILL_JS = `import { defineTool } from "@azphalt/sdk";
export const fill = defineTool((ctx) => {
  const c = ctx.color.active();
  const bmp = ctx.bitmap.read(ctx.target);
  for (let i = 0; i < bmp.data.length; i += 4) {
    bmp.data[i] = c.r;
    bmp.data[i + 1] = c.g;
    bmp.data[i + 2] = c.b;
    bmp.data[i + 3] = c.a;
  }
  ctx.bitmap.write(ctx.target, bmp);
  ctx.canvas.requestRedraw();
});
`;

const MEASURE_JS = `import { defineTool } from "@azphalt/sdk";
export const measure = defineTool((ctx) => {
  const { width, height } = ctx.canvas.size();
  const bmp = ctx.bitmap.read(ctx.target);
  bmp.data[0] = width;
  bmp.data[1] = height;
  ctx.bitmap.write(ctx.target, bmp);
});
`;

/** `tool` — `code` extensions that contribute an interactive tool the host drives from a `ctx`. */
export const tools: Example[] = [
  example({
    slug: "tool-fill",
    summary: "A tool contribution that fills the target with the active color and redraws.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.fill",
      name: "Fill",
      version: "1.0.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description: "Read the active color and paint it over every pixel of the target layer.",
      author: "azphalt examples",
      runtime: "js",
      entry: "code/main.js",
      capabilities: ["bitmap", "color", "canvas"],
      contributes: { tools: [{ id: "fill", name: "Fill", entry: "fill" }] },
    },
    payload: { "code/main.js": utf8(FILL_JS) },
    run: {
      world: {
        params: {},
        bitmap: { data: [0, 0, 0, 255], width: 1, height: 1 },
        color: { active: { r: 240, g: 130, b: 20, a: 255 } },
      },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([240, 130, 20, 255])) throw new Error(`fill: ${r.bitmap.data}`);
        if (r.redraws !== 1) throw new Error(`fill redraws: ${r.redraws}`);
      },
    },
  }),
  example({
    slug: "tool-measure",
    summary: "A tool contribution that reads the canvas size and stamps it into the first pixel.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.measure",
      name: "Measure",
      version: "1.0.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description: "Read the canvas dimensions and write width/height into the target's first pixel.",
      author: "azphalt examples",
      runtime: "js",
      entry: "code/main.js",
      capabilities: ["bitmap", "canvas"],
      contributes: { tools: [{ id: "measure", name: "Measure", entry: "measure" }] },
    },
    payload: { "code/main.js": utf8(MEASURE_JS) },
    run: {
      world: {
        params: {},
        bitmap: { data: [0, 0, 0, 0], width: 1, height: 1 },
        canvas: { width: 8, height: 5 },
      },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([8, 5, 0, 0])) throw new Error(`measure: ${r.bitmap.data}`);
      },
    },
  }),
];
