/**
 * GET /api/connect/status?sellerId=…&refresh=1 — a seller's Stripe onboarding status.
 *
 * Returns `{ onboarded, chargesEnabled, payoutsEnabled, detailsSubmitted, accountId }`, or
 * `{ onboarded: false }` if the seller has no connected account yet. With `refresh=1` the flags are
 * re-read live from Stripe (and persisted) rather than served from the store — used by the return page
 * right after onboarding, before the `account.updated` webhook has necessarily arrived.
 */
import { NextResponse } from "next/server";
import { sellerStatus } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sellerId = (url.searchParams.get("sellerId") ?? "").trim();
  if (!sellerId) return NextResponse.json({ error: "sellerId is required" }, { status: 400 });
  const refresh = url.searchParams.get("refresh") === "1";

  try {
    const record = await sellerStatus(sellerId, refresh);
    if (!record) return NextResponse.json({ onboarded: false }, { status: 200 });

    return NextResponse.json(
      {
        onboarded: true,
        accountId: record.accountId,
        chargesEnabled: record.chargesEnabled,
        payoutsEnabled: record.payoutsEnabled,
        detailsSubmitted: record.detailsSubmitted,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
