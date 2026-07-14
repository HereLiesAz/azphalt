// Your extension's code. Each contribution in manifest.json ("contributes")
// names an export here, branded with the matching define* helper.
//
// The `ctx` a contribution receives is the host — but ONLY the sub-APIs for the
// capabilities you declared in the manifest. Anything you didn't declare is
// absent (deny-by-default). There is no way to reach the camera, sensors, the
// filesystem, the network, or the host's engine — by design.
import { defineFilter, defineTransition } from "@azphalt/azdk";

/** A filter: brighten the active layer by the `amount` slider (−1..1). */
export const brightness = defineFilter((ctx) => {
  const bmp = ctx.bitmap.read(ctx.target);
  const add = Math.round(ctx.params.number("amount") * 255); // reads ui/panel.json's `amount`
  const d = bmp.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = clamp(d[i] + add); // R
    d[i + 1] = clamp(d[i + 1] + add); // G
    d[i + 2] = clamp(d[i + 2] + add); // B
    // d[i + 3] is alpha — left untouched.
  }
  ctx.bitmap.write(ctx.target, bmp);
  ctx.canvas.requestRedraw();
});

/** A transition: blend the `from` frame into the `to` frame by `progress` (0→1). */
export const crossfade = defineTransition((ctx) => {
  const a = ctx.from.data;
  const b = ctx.to.data;
  const p = ctx.progress;
  const out = ctx.bitmap.alloc(ctx.from.width, ctx.from.height);
  for (let i = 0; i < out.data.length; i++) {
    out.data[i] = Math.round(a[i] * (1 - p) + b[i] * p);
  }
  ctx.bitmap.write(ctx.target, out);
});

function clamp(v) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}
