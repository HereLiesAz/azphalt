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
import { paymentsMode, startCheckout } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

interface CheckoutBody {
  packageId?: unknown;
  buyerId?: unknown;
}

export async function POST(req: Request) {
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

  const stub = paymentsMode === "stub";
  try {
    // Via startCheckout (not market.checkout) so the provider records the session against its package
    // and buyer — fulfilment mints the entitlement from that stored input, never from its caller.
    const { session, breakdown, listing } = await startCheckout(packageId, buyerId);
    return NextResponse.json(
      {
        stub,
        // On the real path the client redirects to `session.url` (Stripe hosted checkout), returning to
        // /checkout/success?session_id=… where the entitlement is retrieved. On the stub path no money
        // moves; fulfilment is the dev-only /api/checkout/complete route.
        message: stub
          ? "Stubbed checkout — the dev payment provider moves no real money. Fulfilment is the dev-only /api/checkout/complete route."
          : "Redirect the buyer to session.url to complete payment; they return to /checkout/success.",
        session,
        breakdown,
        listing,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof RegistryError) {
      return NextResponse.json({ stub, error: e.message }, { status: 400 });
    }
    return NextResponse.json({ stub, error: (e as Error).message }, { status: 400 });
  }
}
