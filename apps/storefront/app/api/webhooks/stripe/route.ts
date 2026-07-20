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
import { cancelSubscription, fulfil, recordSubscription, refreshSellerAccount, renewSubscription } from "../../../../lib/catalog";

/** Coerce Stripe's `string | expandable-object | null` reference into a plain id, if present. */
function idOf(ref: string | { id?: string } | null | undefined): string | undefined {
  if (!ref) return undefined;
  return typeof ref === "string" ? ref : ref.id;
}

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
    const interval = session.metadata?.interval === "month" || session.metadata?.interval === "year"
      ? session.metadata.interval
      : undefined;

    if (!packageId || !buyerId) {
      // A completed checkout with no azphalt metadata isn't ours to fulfil — ack so Stripe stops retrying.
      return NextResponse.json({ received: true, fulfilled: false });
    }

    // Fulfil against the session id: mint once, persist, and let the buyer's return page read it back.
    const token = await fulfil(session.id, packageId, buyerId, interval);
    if (!token) {
      // Signing is off (AZPHALT_SIGNING_KEY unset). 500 so Stripe retries once it's configured.
      return NextResponse.json(
        { error: "cannot issue entitlement — AZPHALT_SIGNING_KEY is not set" },
        { status: 500 },
      );
    }
    // For a subscription, remember it so `invoice.paid` can renew access each period.
    const subscriptionId = idOf(session.subscription);
    if (interval && subscriptionId) {
      await recordSubscription({ subscriptionId, packageId, subject: buyerId, interval });
    }
    return NextResponse.json({ received: true, fulfilled: true });
  }

  if (event.type === "invoice.paid") {
    // A subscription renewal (or the first invoice): issue a fresh period entitlement, idempotent on
    // the invoice id. Unknown/cancelled subscriptions and issuance-off are quiet no-ops.
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string | { id?: string } | null };
    const subscriptionId = idOf(invoice.subscription);
    if (subscriptionId && invoice.id) {
      const token = await renewSubscription(subscriptionId, invoice.id);
      return NextResponse.json({ received: true, renewed: token != null });
    }
    return NextResponse.json({ received: true });
  }

  if (event.type === "customer.subscription.deleted") {
    // The subscription ended — stop renewing; the buyer's last entitlement expires on its own.
    const sub = event.data.object as Stripe.Subscription;
    if (sub.id) await cancelSubscription(sub.id);
    return NextResponse.json({ received: true, cancelled: true });
  }

  if (event.type === "account.updated") {
    // A seller's Connect account changed (finished onboarding, capability enabled/disabled). Refresh
    // its stored capability flags so checkout's payout gate reflects Stripe's current view.
    const account = event.data.object as Stripe.Account;
    // Best-effort: a refresh failure (deleted account, Stripe hiccup) must not 500 the webhook and
    // trigger pointless Stripe retries — the stored flags simply stay as they were.
    try {
      if (account.id) await refreshSellerAccount(account.id);
    } catch {
      /* keep the last-known flags */
    }
    return NextResponse.json({ received: true, refreshed: true });
  }

  return NextResponse.json({ received: true });
}
