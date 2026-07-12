/**
 * POST /api/checkout — begin a consignment purchase (the paid lane).
 *
 * Body: `{ packageId: string, buyerId: string }`. Resolves the active listing, computes the money
 * split, and opens a checkout session with the marketplace's payment provider, returning the session
 * and the {@link PriceBreakdown}.
 *
 * IMPORTANT: this dev storefront wires the marketplace to the bundled StubPaymentProvider, which
 * records a session in memory and NEVER contacts a processor, holds funds, or moves money. The `stub`
 * flag in the response makes that explicit. A production deployment swaps in a marketplace-capable,
 * split-payout merchant-of-record; nothing here should be read as a real payment.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { getCatalog } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

interface CheckoutBody {
  packageId?: unknown;
  buyerId?: unknown;
}

export async function POST(req: Request) {
  const { market } = await getCatalog();

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ stub: true, error: "invalid JSON body" }, { status: 400 });
  }

  const packageId = typeof body.packageId === "string" ? body.packageId : "";
  const buyerId = typeof body.buyerId === "string" && body.buyerId ? body.buyerId : "buyer_demo";
  if (!packageId) {
    return NextResponse.json({ stub: true, error: "packageId is required" }, { status: 400 });
  }

  try {
    const { session, breakdown, listing } = await market.checkout(packageId, buyerId);
    return NextResponse.json(
      {
        stub: true,
        message:
          "Stubbed checkout — the dev payment provider moves no real money. Fulfilment happens when a " +
          "real provider confirms the session.",
        session,
        breakdown,
        listing,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof RegistryError) {
      return NextResponse.json({ stub: true, error: e.message }, { status: 400 });
    }
    return NextResponse.json({ stub: true, error: (e as Error).message }, { status: 400 });
  }
}
