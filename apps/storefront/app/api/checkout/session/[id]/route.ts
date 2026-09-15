/**
 * GET /api/checkout/session/[id] — the buyer's fulfilment retrieval.
 *
 * Returns the Bearer entitlement token issued for a settled checkout session, so the return page can
 * turn a completed payment into a working download credential. It only ever hands back a token that
 * fulfilment ALREADY minted — the real Stripe path mints only from a signature-verified webhook, the
 * stub path only behind the dev opt-in — so this route mints nothing. Until the webhook has fulfilled,
 * it answers `202` so the client can poll.
 *
 * Once fulfilment exists, this route also binds the entitlement's opaque subject into the signed,
 * HttpOnly buyer-recovery cookie. That matters for desktop-originated purchases: Stripe returns in a
 * browser that never saw the desktop app's checkout response, so the successful session is the first
 * safe place to establish that browser's recovery identity.
 */
import { NextResponse } from "next/server";
import { entitlements, issuedToken } from "../../../../../lib/catalog";
import { buyerSessionCookie } from "../../../../../lib/buyer-session";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = decodeURIComponent((await params).id);
  const token = await issuedToken(id);
  if (!token) {
    return NextResponse.json({ status: "pending" }, { status: 202 });
  }

  const record = await entitlements.getBySession(id);
  const response = NextResponse.json({ status: "ready", token }, { status: 200 });
  if (record) {
    const cookie = buyerSessionCookie(req, record.subject);
    if (cookie) response.headers.append("Set-Cookie", cookie);
  }
  return response;
}
