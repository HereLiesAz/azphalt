import { example, utf8, type Example } from "../shared.js";

/**
 * A two-second bounce: a blue dot whose position is keyframed down and back up over 60 frames at
 * 30fps. A minimal but complete Lottie body — `v`/`fr`/`ip`/`op`/`w`/`h` plus one shape layer.
 */
const BOUNCE_LOTTIE = {
  v: "5.7.0",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Bounce",
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Ball",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100, 50] },
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [100, 160] },
            { t: 60, s: [100, 50] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [40, 40] }, nm: "Dot" },
        { ty: "fl", c: { a: 0, k: [0.2, 0.6, 1, 1] }, o: { a: 0, k: 100 }, nm: "Fill" },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

/**
 * A one-second spinner: a magenta bar rotated a full 360 degrees over 30 frames at 30fps, looping.
 * Same minimal Lottie envelope as the bounce, animating `r` (rotation) instead of position.
 */
const SPINNER_LOTTIE = {
  v: "5.7.0",
  fr: 30,
  ip: 0,
  op: 30,
  w: 200,
  h: 200,
  nm: "Spinner",
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Blade",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0, s: [0] },
            { t: 30, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, -30, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        { ty: "rc", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [16, 60] }, r: { a: 0, k: 8 }, nm: "Bar" },
        { ty: "fl", c: { a: 0, k: [0.9, 0.1, 0.6, 1] }, o: { a: 0, k: 100 }, nm: "Fill" },
      ],
      ip: 0,
      op: 30,
      st: 0,
    },
  ],
};

/** `motion` — Lottie JSON animations a host plays through its motion pipeline. */
export const motions: Example[] = [
  example({
    slug: "motion-bounce",
    summary: "A looping bounce animation as Lottie JSON.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.motion-bounce",
      name: "Bounce",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A blue dot bouncing on a 60-frame loop at 30fps, defined in Lottie.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "motion", path: "assets/motion-bounce.json", tags: ["lottie", "loop"] }],
    },
    payload: { "assets/motion-bounce.json": utf8(JSON.stringify(BOUNCE_LOTTIE, null, 2)) },
  }),
  example({
    slug: "motion-spinner",
    summary: "A rotating loading spinner as Lottie JSON.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.motion-spinner",
      name: "Spinner",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A magenta bar spinning a full turn each second — a minimal Lottie loader.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "motion", path: "assets/motion-spinner.json", tags: ["lottie", "spinner"] }],
    },
    payload: { "assets/motion-spinner.json": utf8(JSON.stringify(SPINNER_LOTTIE, null, 2)) },
  }),
];
