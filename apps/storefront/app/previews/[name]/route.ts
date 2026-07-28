/**
 * `GET /previews/<package-id>.png` — the generated store-card artwork.
 *
 * ## Why this is a route and not a static file
 *
 * These used to sit in `public/previews/`, which looks like the obvious home for a static PNG. It is
 * not: `public/` is the output directory of the Kotlin/Wasm distribution, and a Gradle distribution
 * task **clears its output directory** before writing. Every deploy therefore deleted all 40
 * committed previews, and the SPA fallback rewrite dressed the resulting 404 up as a `200` serving
 * the app shell — so the images were "present" in git, "reachable" by status code, and completely
 * absent in practice.
 *
 * Serving them from `registry/previews/` puts them out of that blast radius and alongside
 * `previews.json`, which is where generated registry data belongs anyway. `registry/packages/*.azp`
 * is served the same way for the same reason.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { NextResponse } from "next/server";

/**
 * Locate `registry/previews` across the layouts this runs under — `next dev` from `apps/storefront`,
 * a build from the repo root, and the `output: "standalone"` server, which chdirs to its own bundle
 * root. Probing beats hard-coding one and having previews silently vanish in whichever layout was
 * not the one tested (the same reason `lib/baked.ts` probes for `registry/`).
 */
function previewsDir(): string | undefined {
  const candidates = [
    join(process.cwd(), "registry", "previews"),
    join(process.cwd(), "apps", "storefront", "registry", "previews"),
    resolve(process.cwd(), "..", "..", "apps", "storefront", "registry", "previews"),
  ];
  return candidates.find((dir) => existsSync(dir));
}

export async function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;

  // `name` arrives from the URL, and this reads from disk. A package id is a plain reverse-DNS name,
  // so anything outside that shape — a separator, a `..`, a percent-escape that decoded into one —
  // is rejected outright rather than normalised. Path traversal here would read arbitrary files off
  // the server.
  if (!/^[A-Za-z0-9._@-]+\.png$/.test(name) || name.includes("..")) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const dir = previewsDir();
  if (!dir) return NextResponse.json({ error: "not found" }, { status: 404 });

  const path = join(dir, name);
  if (!existsSync(path)) return NextResponse.json({ error: "not found" }, { status: 404 });

  const bytes = await readFile(path);
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "content-type": "image/png",
      // Immutable in practice: a preview only changes when its package is rebuilt, and a rebuilt
      // package is a new deployment. Long-lived caching keeps a browse grid from refetching dozens
      // of small images on every visit.
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
