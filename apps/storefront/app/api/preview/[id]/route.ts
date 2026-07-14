/**
 * GET /api/preview/[id] — the package's static store-card image.
 *
 * Streams the bytes of the package's declared `manifest.preview.image` (an in-package path), so a
 * browse grid can show a swatch/still **without downloading or executing** the package. The path comes
 * from the manifest, not the request, so there is no traversal; reading is via `store.getBytes`, which
 * does not count a download. 404 when the package declares no in-package preview.
 */
import { NextResponse } from "next/server";
import { getPreviewImage } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = decodeURIComponent((await params).id);
  const preview = await getPreviewImage(id);
  if (!preview) return NextResponse.json({ error: "no preview" }, { status: 404 });

  // Hand back a standalone ArrayBuffer. (A bare Uint8Array is a valid BodyInit at runtime, but TS's
  // generic `Uint8Array<ArrayBufferLike>` doesn't satisfy the DOM `BodyInit` type; the copy is trivial
  // for a small preview image.)
  return new NextResponse(preview.bytes.slice().buffer, {
    status: 200,
    headers: {
      "content-type": preview.contentType,
      "content-length": String(preview.bytes.length),
      // Immutable-ish: previews change only when the package version does.
      "cache-control": "public, max-age=3600",
    },
  });
}
