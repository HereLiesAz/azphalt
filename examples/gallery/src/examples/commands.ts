import { example, utf8, type Example } from "../shared.js";

const CLEAR_JS = `import { defineCommand } from "@azphalt/azdk";
export const clear = defineCommand((ctx) => {
  const bmp = ctx.bitmap.read(ctx.target);
  for (let i = 0; i < bmp.data.length; i++) bmp.data[i] = 0;
  ctx.bitmap.write(ctx.target, bmp);
});
`;

const SET_COLOR_JS = `import { defineCommand } from "@azphalt/azdk";
export const setColor = defineCommand((ctx) => {
  ctx.color.setActive({ r: 16, g: 32, b: 48, a: 255 });
});
`;

/** `command` — `code` extensions that contribute a one-shot command the host invokes with a `ctx`. */
export const commands: Example[] = [
  example({
    slug: "command-clear",
    summary: "A command contribution that zeroes every channel of the target layer.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.clear",
      name: "Clear",
      version: "1.0.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description: "Overwrite the target layer with fully transparent black.",
      author: "azphalt examples",
      runtime: "js",
      entry: "code/main.js",
      capabilities: ["bitmap"],
      contributes: { commands: [{ id: "clear", name: "Clear", entry: "clear" }] },
    },
    payload: { "code/main.js": utf8(CLEAR_JS) },
    run: {
      world: { params: {}, bitmap: { data: [12, 34, 56, 255], width: 1, height: 1 } },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([0, 0, 0, 0])) throw new Error(`clear: ${r.bitmap.data}`);
      },
    },
  }),
  example({
    slug: "command-set-color",
    summary: "A command contribution that sets the host's active color.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.set-color",
      name: "Set Color",
      version: "1.0.0",
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
      description: "Set the active color to a fixed RGBA value the host will paint with next.",
      author: "azphalt examples",
      runtime: "js",
      entry: "code/main.js",
      capabilities: ["color"],
      contributes: { commands: [{ id: "set-color", name: "Set Color", entry: "setColor" }] },
    },
    payload: { "code/main.js": utf8(SET_COLOR_JS) },
    run: {
      world: {
        params: {},
        bitmap: { data: [0, 0, 0, 255], width: 1, height: 1 },
        color: { active: { r: 255, g: 255, b: 255, a: 255 } },
      },
      assert: (r) => {
        if (JSON.stringify(r.color.active) !== JSON.stringify({ r: 16, g: 32, b: 48, a: 255 })) throw new Error(`set-color: ${JSON.stringify(r.color.active)}`);
      },
    },
  }),
];
