/**
 * GET /api/checkout/session/[id] — the buyer's fulfilment retrieval.
 *
 * Returns the Bearer entitlement token issued for a settled checkout session, so the return page can
 * turn a completed payment into a working download credential. It only ever hands back a token that
 * fulfilment ALREADY minted — the real Stripe path mints only from a signature-verified webhook, the
 * stub path only behind the dev opt-in — so this route mints nothing and opens no hole. Until the
 * (possibly async) webhook has fulfilled, it answers `202` so the client can poll.
 */
import { NextResponse } from "next/server";
import { issuedToken } from "../../../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = decodeURIComponent((await params).id);
  const token = await issuedToken(id);
  if (!token) {
    return NextResponse.json({ status: "pending" }, { status: 202 });
  }
  return NextResponse.json({ status: "ready", token }, { status: 200 });
}
