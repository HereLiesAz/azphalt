// Procedural preview animations that mimic what each plugin does — ported from the Compose storefront's
// PreviewArt to HTML Canvas 2D. A single conductor drives one card's `phase` at a time (see App.tsx).
import type { PackageSummary } from "./api";

const TAU = Math.PI * 2;

type Style = "halftone" | "dither" | "colorgrade" | "brush" | "pattern" | "neural" | "wave";

export function styleFor(pkg: PackageSummary): Style {
  const n = `${pkg.name} ${pkg.id}`.toLowerCase();
  if (n.includes("halftone")) return "halftone";
  if (n.includes("dither")) return "dither";
  if (/lut|grade|cine|film|color/.test(n)) return "colorgrade";
  if (/brush|ink|sumi/.test(n)) return "brush";
  if (/pattern|geo|tile/.test(n)) return "pattern";
  if (
    pkg.kind === "asset" &&
    /model|net|onnx|depth|vosk|whisper|gemma|yamnet|spleeter|segmentation|face|vlm|effect|embed|rfb/.test(n)
  )
    return "neural";
  return "wave";
}

// container / on-container color pairs (the M3 Expressive palette), rotated by a stable id hash.
const PALETTE: Array<[string, string]> = [
  ["#4a2db5", "#e9deff"],
  ["#8e2a54", "#ffd9e2"],
  ["#6e5200", "#ffdf9e"],
  ["#25232d", "#e7e1ee"],
];

export function paletteFor(id: string): [string, string] {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return PALETTE[((h % PALETTE.length) + PALETTE.length) % PALETTE.length];
}

function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export function drawPreview(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  phase: number,
  tint: string,
  pkg: PackageSummary,
): void {
  ctx.clearRect(0, 0, w, h);
  const pulse = 0.5 + 0.5 * Math.sin(phase * TAU);
  switch (styleFor(pkg)) {
    case "halftone":
      return halftone(ctx, w, h, phase, tint);
    case "dither":
      return dither(ctx, w, h, phase, tint);
    case "colorgrade":
      return colorgrade(ctx, w, h, phase);
    case "brush":
      return brush(ctx, w, h, phase, tint);
    case "pattern":
      return pattern(ctx, w, h, phase, tint);
    case "neural":
      return neural(ctx, w, h, phase, pulse, tint);
    case "wave":
      return wave(ctx, w, h, phase, tint);
  }
}

function halftone(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number, tint: string) {
  const cols = 8;
  const rows = 4;
  const cw = w / cols;
  const ch = h / rows;
  const maxR = Math.min(cw, ch) / 2;
  ctx.fillStyle = rgba(tint, 0.85);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const wave = Math.sin((c + r) * 0.7 + phase * TAU);
      const radius = maxR * (0.2 + 0.7 * ((wave + 1) / 2));
      ctx.beginPath();
      ctx.arc(cw * (c + 0.5), ch * (r + 0.5), radius, 0, TAU);
      ctx.fill();
    }
}

function dither(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number, tint: string) {
  const n = 10;
  const cw = w / n;
  const ch = h / n;
  const shift = Math.floor(phase * n);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const v = ((x * 3 + y * 7 + shift) % 6) / 6;
      if (v > 0.35) {
        ctx.fillStyle = rgba(tint, v * 0.85);
        ctx.fillRect(x * cw, y * ch, cw * 0.9, ch * 0.9);
      }
    }
}

function colorgrade(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number) {
  const bands = 7;
  const bw = w / bands;
  for (let i = 0; i < bands; i++) {
    const hue = (((i / bands) + phase) % 1) * 360;
    ctx.fillStyle = `hsl(${hue} 68% 60%)`;
    ctx.fillRect(i * bw, 0, bw + 1, h);
  }
}

function brush(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number, tint: string) {
  const steps = 44;
  const drawn = Math.min(steps, Math.floor(phase * (steps + 12)));
  ctx.strokeStyle = rgba(tint, 0.9);
  ctx.lineWidth = h * 0.11;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i <= drawn; i++) {
    const t = i / steps;
    const x = w * (0.08 + 0.84 * t);
    const y = h * (0.5 + 0.34 * Math.sin(t * 3 * Math.PI));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function pattern(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number, tint: string) {
  const n = 5;
  const cell = w / n;
  const off = phase * cell;
  let row = 0;
  for (let y = -cell; y < h + cell; y += cell) {
    for (let x0 = -cell + (row % 2 === 0 ? off : -off); x0 < w + cell; x0 += cell) {
      ctx.fillStyle = rgba(tint, 0.14 + 0.14 * ((row + Math.floor(x0 / cell)) % 2));
      ctx.beginPath();
      ctx.moveTo(x0 + cell / 2, y);
      ctx.lineTo(x0 + cell, y + cell / 2);
      ctx.lineTo(x0 + cell / 2, y + cell);
      ctx.lineTo(x0, y + cell / 2);
      ctx.closePath();
      ctx.fill();
    }
    row++;
  }
}

function neural(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number, pulse: number, tint: string) {
  const cx = w / 2;
  const cy = h / 2;
  const nodes = 6;
  const rr = Math.min(w, h) * 0.34;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < nodes; i++) {
    const a = (i / nodes) * TAU + phase * TAU;
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  ctx.strokeStyle = rgba(tint, 0.16);
  ctx.lineWidth = 1.5;
  for (let i = 0; i < pts.length; i++)
    for (let j = i + 1; j < pts.length; j++) {
      ctx.beginPath();
      ctx.moveTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[j][0], pts[j][1]);
      ctx.stroke();
    }
  ctx.fillStyle = rgba(tint, 0.22);
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.11 * (0.8 + 0.5 * pulse), 0, TAU);
  ctx.fill();
  ctx.fillStyle = rgba(tint, 0.92);
  for (const [x, y] of pts) {
    ctx.beginPath();
    ctx.arc(x, y, Math.min(w, h) * 0.03, 0, TAU);
    ctx.fill();
  }
}

function wave(ctx: CanvasRenderingContext2D, w: number, h: number, phase: number, tint: string) {
  const lines = 3;
  const steps = 40;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (let l = 0; l < lines; l++) {
    const amp = h * 0.12;
    const yBase = h * (0.32 + 0.18 * l);
    ctx.strokeStyle = rgba(tint, 0.5 - l * 0.12);
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = t * w;
      const y = yBase + amp * Math.sin(t * 4 * Math.PI + phase * TAU + l);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}
