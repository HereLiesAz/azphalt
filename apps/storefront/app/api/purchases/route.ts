/**
 * GET /api/purchases — the current browser's issued licenses ("my purchases" recovery).
 *
 * The browser authenticates with the storefront's signed, HttpOnly buyer-session cookie. The cookie
 * can carry several opaque buyer subjects so a browser can recover purchases that originated in a
 * desktop client and later returned through Stripe. Caller-supplied subject ids are deliberately not
 * accepted: an opaque database key is not authentication.
 */
import { NextResponse } from "next/server";
import { listPurchases, type Purchase } from "../../../lib/catalog";
import { buyerSubjects } from "../../../lib/buyer-session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const subjects = buyerSubjects(req);
  if (subjects.length === 0) {
    return NextResponse.json({ error: "purchase session required" }, { status: 401 });
  }

  try {
    const lists = await Promise.all(subjects.map((subject) => listPurchases(subject)));
    const bySession = new Map<string, Purchase>();
    for (const purchase of lists.flat()) bySession.set(purchase.sessionId, purchase);
    const purchases = [...bySession.values()].sort((a, b) =>
      a.issuedAt < b.issuedAt ? 1 : a.issuedAt > b.issuedAt ? -1 : 0,
    );
    return NextResponse.json({ purchases }, { status: 200 });
  } catch (e) {
    // Log the detail server-side; return a generic message so an unexpected error can't leak internals.
    console.error("Failed to list purchases:", e);
    return NextResponse.json({ error: "internal error listing purchases" }, { status: 500 });
  }
}
