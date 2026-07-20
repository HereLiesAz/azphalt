import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Host-based routing so **one deployment serves two sites**:
 * - **azphalt.store** — the storefront + the normative Repository API (untouched here).
 * - **azphalt.org** — the DOCS, built into `public/_docs` by `scripts/embed-docs.mjs`.
 *
 * Both domains already point at this same Vercel deployment, so no separate hosting or DNS change is
 * needed: on the `azphalt.org` host we rewrite every path onto `/_docs/*` (and `/` → the docs index).
 * A `next.config` `beforeFiles` rewrite can't do this — `source: "/"` doesn't fire for the bare root —
 * but middleware runs on every request, including `/`.
 *
 * VitePress is built with `AZPHALT_DOCS_EMBED` (cleanUrls off), so its links are `.html` and map 1:1 to
 * the static files under `/_docs`.
 */
export function middleware(req: NextRequest): NextResponse {
  const host = req.headers.get("host") ?? "";
  // Match azphalt.org and www.azphalt.org (host may include a port in dev).
  if (!/(^|\.)azphalt\.org(:\d+)?$/i.test(host)) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_docs/")) return NextResponse.next(); // already mapped — don't double-prefix

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/_docs/index.html" : `/_docs${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on everything except Next's own build assets (the docs don't use them; this avoids rewriting
  // `/_next/*` onto a non-existent `/_docs/_next/*` on the org host).
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
