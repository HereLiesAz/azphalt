/**
 * GET /api/download/[id] — the free registry lane's serve endpoint.
 *
 * Resolves the latest version, counts a download (via `registry.serve`), and streams the `.azp`
 * container bytes back as a ZIP attachment. No auth and no fee: this is the open distribution lane.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { getCatalog } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = decodeURIComponent((await params).id);
  const { registry } = await getCatalog();

  try {
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
