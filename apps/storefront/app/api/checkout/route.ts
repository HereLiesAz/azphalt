/**
 * POST /api/checkout — begin a consignment purchase (the paid lane).
 *
 * Body: `{ packageId: string, buyerId: string }`. Resolves the active listing, computes the money
 * split, and opens a checkout session with the marketplace's payment provider, returning the session
 * and the {@link PriceBreakdown}.
 *
 * Local development and tests may use the bundled StubPaymentProvider. Production fails closed unless
 * the complete paid path is configured: Stripe checkout + signed webhook fulfilment + durable runtime
 * state. A public store must never report a simulated checkout as a purchase, and it must never charge
 * a buyer when it cannot durably issue the entitlement afterward.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { paymentsMode, startCheckout } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

interface CheckoutBody {
  packageId?: unknown;
  buyerId?: unknown;
}

const BUYER_ID = /^[A-Za-z0-9._:-]{3,128}$/;

/** Runtime pieces required before a production request is allowed to create a charge. */
function missingProductionCheckoutConfig(): string[] {
  if (process.env.NODE_ENV !== "production") return [];

  const required: Array<[string, string | undefined]> = [
    ["AZPHALT_STRIPE_SECRET_KEY", process.env.AZPHALT_STRIPE_SECRET_KEY],
    ["AZPHALT_STRIPE_WEBHOOK_SECRET", process.env.AZPHALT_STRIPE_WEBHOOK_SECRET],
    ["AZPHALT_SIGNING_KEY", process.env.AZPHALT_SIGNING_KEY],
    ["DATABASE_URL", process.env.DATABASE_URL],
    ["BLOB_READ_WRITE_TOKEN", process.env.BLOB_READ_WRITE_TOKEN],
  ];

  const missing = required.filter(([, value]) => !value).map(([name]) => name);
  if (paymentsMode !== "stripe" && !missing.includes("AZPHALT_STRIPE_SECRET_KEY")) {
    missing.push("real Stripe payment provider");
  }
  return missing;
}

export async function POST(req: Request) {
  const missing = missingProductionCheckoutConfig();
  if (missing.length > 0) {
    console.error(`Checkout disabled: incomplete production configuration (${missing.join(", ")})`);
    return NextResponse.json(
      { stub: false, error: "Checkout is temporarily unavailable." },
      { status: 503 },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ stub: paymentsMode === "stub", error: "invalid JSON body" }, { status: 400 });
  }

  const packageId = typeof body.packageId === "string" ? body.packageId.trim() : "";
  const buyerId = typeof body.buyerId === "string" ? body.buyerId.trim() : "";
  const stub = paymentsMode === "stub";

  if (!packageId) {
    return NextResponse.json({ stub, error: "packageId is required" }, { status: 400 });
  }
  if (!BUYER_ID.test(buyerId)) {
    return NextResponse.json(
      { stub, error: "buyerId is required and must be 3–128 URL-safe characters" },
      { status: 400 },
    );
  }

  try {
    // Via startCheckout (not market.checkout) so the provider records the session against its package
    // and buyer — fulfilment mints the entitlement from that stored input, never from its caller.
    const { session, breakdown, listing } = await startCheckout(packageId, buyerId);
    return NextResponse.json(
      {
        stub,
        message: stub
          ? "Development checkout only — no money moved."
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
    console.error("Checkout failed:", e);
    return NextResponse.json({ stub, error: "checkout failed" }, { status: 500 });
  }
}
