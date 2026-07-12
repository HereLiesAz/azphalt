import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  filename: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text stored as the package's `LICENSE`. */
  licenseText?: string;
}

/**
 * Packages a vector graphic (.svg) into an .azp asset package. The source must
 * actually contain an `<svg` tag (not merely be well-formed XML); the root tag's
 * `viewBox` / `width` / `height` are lifted into the asset params when present.
 */
export function importVector(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  // Only the head matters for locating the root <svg> tag; keep it bounded.
  const head = new TextDecoder().decode(bytes.slice(0, 4096));
  if (!/<svg/i.test(head)) {
    throw new Error("not an SVG");
  }

  const params: Record<string, unknown> = { format: "svg" };
  const svgTag = head.match(/<svg\b[^>]*>/i);
  if (svgTag) {
    const tag = svgTag[0];
    const viewBox = tag.match(/\bviewBox\s*=\s*["']([^"']*)["']/i);
    const width = tag.match(/\swidth\s*=\s*["']([^"']*)["']/i);
    const height = tag.match(/\sheight\s*=\s*["']([^"']*)["']/i);
    if (viewBox) params.viewBox = viewBox[1];
    if (width) params.width = width[1];
    if (height) params.height = height[1];
  }

  const payload: Record<string, Uint8Array> = {
    "assets/vector.svg": bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Vector Asset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "vector",
        path: "assets/vector.svg",
        params
      }
    ]
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`
  });
  return azp;
}
