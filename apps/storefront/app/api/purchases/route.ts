/**
 * GET /api/purchases?subject=<buyerId> — a buyer's issued licenses (their "my purchases" recovery).
 *
 * Returns `{ purchases: [{ packageId, sessionId, issuedAt, token }] }`, newest-first — each `token` is
 * the `Authorization: Bearer` credential for `GET /api/download/[id]`, so a buyer who lost the token
 * shown on `/checkout/success` can recover it and download again. Like the rest of this reference
 * storefront it has no buyer authentication; a production deployment gates this behind the buyer's
 * own session.
 */
import { NextResponse } from "next/server";
import { listPurchases } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const subject = (new URL(req.url).searchParams.get("subject") ?? "").trim();
  if (!subject) return NextResponse.json({ error: "subject is required" }, { status: 400 });

  try {
    const purchases = await listPurchases(subject);
    return NextResponse.json({ purchases }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
