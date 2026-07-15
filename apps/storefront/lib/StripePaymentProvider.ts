import Stripe from 'stripe';
import { PaymentProvider, CheckoutSession, PriceBreakdown, RegistryError } from '@azphalt/registry';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-06-24.dahlia', // using a recent stable API version
});

export class StripePaymentProvider implements PaymentProvider {
  async createCheckout(input: import('@azphalt/registry').CheckoutInput): Promise<CheckoutSession> {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("Using StripePaymentProvider without STRIPE_SECRET_KEY. This will fail if not mocked.");
    }

    const { packageId, buyerId, amount, sellerId } = input;
    const priceCents = amount.amountCents;
    const currency = amount.currency;

    // A real platform would calculate platform fees here. We'll take a flat 10% fee.
    const platformFee = Math.floor(priceCents * 0.10);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Azphalt Package: ${packageId}`,
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pkg/${packageId}`,
      metadata: {
        packageId,
        buyerId,
        sellerId
      },
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: sellerId,
        },
      },
    });

    if (!stripeSession.url) {
      throw new RegistryError("Failed to create Stripe checkout session URL.");
    }

    return {
      id: stripeSession.id,
      url: stripeSession.url,
      status: "pending",
      amount: { amountCents: priceCents, currency: currency }
    };
  }

  async getSession(sessionId: string): Promise<CheckoutSession> {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      id: session.id,
      url: session.url || "",
      status: session.payment_status === 'paid' ? 'completed' : 'pending',
      amount: {
        amountCents: session.amount_total || 0,
        currency: session.currency?.toUpperCase() || 'USD'
      }
    };
  }
}
