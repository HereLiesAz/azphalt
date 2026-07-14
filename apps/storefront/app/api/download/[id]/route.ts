/**
 * GET /api/download/[id] — serve a package's `.azp` container bytes.
 *
 * The free lane is open: no auth, no fee. A package consigned for sale is **not** — its bytes are
 * gated on a Bearer entitlement, modelled on `spec/repository-api.md` § Download Package and sharing
 * the reference server's authorizer (`@azphalt/registry`'s `DownloadAuthorizer`), so the two surfaces
 * can't drift apart:
 * - no/unrecognized token → `401`
 * - a real identity holding no license for *this* package → `402`
 *
 * Get a token from `POST /api/checkout` then `POST /api/checkout/complete` (dev only — see
 * `lib/catalog.ts`), and send it as `Authorization: Bearer <token>`.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { authorizer, getCatalog, priceStatus } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

/** The credential from an `Authorization: Bearer <token>` header, if it is well-formed. */
function bearer(header: string | null): string | undefined {
  if (!header) return undefined;
  const m = /^Bearer[ ]+(.+)$/i.exec(header.trim());
  return m ? m[1].trim() : undefined;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = decodeURIComponent((await params).id);
  const { registry } = await getCatalog();

  try {
    // Resolve first: an unknown package is a 404 whatever it costs. Gating first would ask
    // `priceStatus` about a package that doesn't exist, get "free" (it has no listing), and fall
    // through to a stranger error than the plain not-found the caller deserves.
    const latest = await registry.latest(id);
    if (!latest) return NextResponse.json({ error: `not found: ${id}` }, { status: 404 });

    if ((await priceStatus(id)) === "paid") {
      const decision = await authorizer.authorize({
        token: bearer(req.headers.get("authorization")),
        packageId: id,
        version: latest.version,
      });
      // Gate BEFORE `registry.serve`, which counts a download: a denied request must not move the
      // tally. Otherwise the count is wrong, and the counter itself leaks what was attempted.
      if (!decision.authenticated) {
        return NextResponse.json({ error: "authentication required to download a paid package" }, { status: 401 });
      }
      if (!decision.licensed) {
        return NextResponse.json({ error: "payment required: no license for this package" }, { status: 402 });
      }
    }

    const { version, bytes } = await registry.serve(id);
    // Copy into a fresh ArrayBuffer so the Response body is a standalone, correctly sized buffer.
    const body = bytes.slice().buffer;
    return new NextResponse(body, {
      status: 200,
      headers: {
        "content-type": "application/zip",
        "content-length": String(bytes.length),
        "content-disposition": `attachment; filename="${id}-${version.version}.azp"`,
        "cache-control": "no-store",
      },
    });
  } catch (e) {
    if (e instanceof RegistryError) {
      return NextResponse.json({ error: e.message }, { status: 404 });
    }
    throw e;
  }
}
