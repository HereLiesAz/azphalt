/**
 * Sample azphalt extension — an **invert** filter.
 *
 * Written against `@azphalt/sdk` like any extension: it declares a `strength` param, reads the
 * target layer's pixels, blends toward their inverse, and asks for a redraw. It touches only the
 * `bitmap`, `params`, and `canvas` capabilities its manifest declares. Doubles as the
 * host-contract fixture exercised by `@azphalt/runtime-reference`.
 */
import { defineFilter } from "@azphalt/sdk";

/** `invert` filter. Export name matches `contributes.filters[].entry` in `manifest.json`. */
export const invert = defineFilter((ctx) => {
  // `strength` is the slider from ui/panel.json: 0 = no-op, 1 = full inverse.
  const s = Math.max(0, Math.min(1, ctx.params.number("strength")));

  const bmp = ctx.bitmap.read(ctx.target); // RGBA8, straight alpha, stride = width * 4
  const d = bmp.data;
  for (let i = 0; i < d.length; i += 4) {
    // lerp(v, 255 - v, s) = v + (255 - 2v)·s; Uint8ClampedArray rounds/clamps. Alpha untouched.
    d[i] = d[i] + (255 - 2 * d[i]) * s;
    d[i + 1] = d[i + 1] + (255 - 2 * d[i + 1]) * s;
    d[i + 2] = d[i + 2] + (255 - 2 * d[i + 2]) * s;
  }
  ctx.bitmap.write(ctx.target, bmp);
  ctx.canvas.requestRedraw();
});
