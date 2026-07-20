/**
 * POST /api/webhooks/stripe — the real fulfilment trigger.
 *
 * On a signature-verified `checkout.session.completed`, mint (idempotently) and **persist** a buy-once
 * entitlement for the buyer, keyed by the checkout session, so the buyer's return page can exchange
 * `session_id` for the token. Before this, the webhook minted a token and dropped it on the floor —
 * the buyer paid and received nothing.
 *
 * The Stripe SDK is used ONLY to verify the webhook signature (an HMAC over the raw body); checkout
 * sessions are created by `@azphalt/registry`'s `StripePaymentProvider`.
 */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfil, refreshSellerAccount } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

const secretKey = process.env.AZPHALT_STRIPE_SECRET_KEY;
const endpointSecret = process.env.AZPHALT_STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(secretKey || "sk_test_unset");

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !endpointSecret) {
    return NextResponse.json(
      { error: "Webhook not configured (missing signature or AZPHALT_STRIPE_WEBHOOK_SECRET)" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const packageId = session.metadata?.packageId;
    const buyerId = session.metadata?.buyerId;

    if (!packageId || !buyerId) {
      // A completed checkout with no azphalt metadata isn't ours to fulfil — ack so Stripe stops retrying.
      return NextResponse.json({ received: true, fulfilled: false });
    }

    // Fulfil against the session id: mint once, persist, and let the buyer's return page read it back.
    const token = await fulfil(session.id, packageId, buyerId);
    if (!token) {
      // Signing is off (AZPHALT_SIGNING_KEY unset). 500 so Stripe retries once it's configured.
      return NextResponse.json(
        { error: "cannot issue entitlement — AZPHALT_SIGNING_KEY is not set" },
        { status: 500 },
      );
    }
    return NextResponse.json({ received: true, fulfilled: true });
  }

  if (event.type === "account.updated") {
    // A seller's Connect account changed (finished onboarding, capability enabled/disabled). Refresh
    // its stored capability flags so checkout's payout gate reflects Stripe's current view.
    const account = event.data.object as Stripe.Account;
    if (account.id) await refreshSellerAccount(account.id);
    return NextResponse.json({ received: true, refreshed: true });
  }

  return NextResponse.json({ received: true });
}
