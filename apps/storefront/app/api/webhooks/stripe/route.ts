import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { issueEntitlement } from '@azphalt/registry';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-06-24.dahlia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !endpointSecret) {
    console.error("Webhook secret not configured, or missing signature.");
    return NextResponse.json({ error: 'Webhook Error: Missing signature or secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // We get the packageId and buyerId from the metadata we passed in during checkout creation
    const packageId = session.metadata?.packageId;
    const buyerId = session.metadata?.buyerId;

    if (packageId && buyerId) {
      const signingKey = process.env.AZPHALT_SIGNING_KEY?.trim();
      if (signingKey) {
        try {
          const token = await issueEntitlement(signingKey, {
            packageId,
            subject: buyerId,
            kind: 'perpetual',
            issuedAt: new Date().toISOString(),
          });
          console.log(`Successfully issued entitlement token for ${packageId} to ${buyerId}`);
          // In a real database, we would store `token` against the user's account here.
        } catch (e) {
          console.error("Failed to issue entitlement:", e);
        }
      } else {
        console.warn("AZPHALT_SIGNING_KEY not set, cannot issue real entitlements.");
      }
    }
  }

  return NextResponse.json({ received: true });
}
