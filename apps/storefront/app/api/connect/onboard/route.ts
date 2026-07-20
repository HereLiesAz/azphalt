/**
 * POST /api/connect/onboard — start (or resume) a seller's Stripe Connect onboarding.
 *
 * Body: `{ sellerId: string, email?: string, country?: string }`. Creates the seller's Express
 * connected account the first time (persisting the mapping), then returns a Stripe-hosted onboarding
 * `url` the client redirects the seller to. On return, `/connect/onboard` re-checks their status.
 *
 * Requires Stripe to be configured (`AZPHALT_STRIPE_SECRET_KEY`); otherwise `404`, mirroring the
 * dev-only fulfilment route — there is nothing to onboard against without it.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { onboardSeller, onboardingEnabled } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

interface OnboardBody {
  sellerId?: unknown;
  email?: unknown;
  country?: unknown;
}

export async function POST(req: Request) {
  if (!onboardingEnabled) {
    return NextResponse.json({ error: "Stripe Connect onboarding is not configured" }, { status: 404 });
  }

  let body: OnboardBody;
  try {
    body = (await req.json()) as OnboardBody;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const sellerId = typeof body.sellerId === "string" ? body.sellerId.trim() : "";
  if (!sellerId) return NextResponse.json({ error: "sellerId is required" }, { status: 400 });
  const email = typeof body.email === "string" ? body.email : undefined;
  const country = typeof body.country === "string" ? body.country : undefined;

  // Return the seller to the onboarding page for their id, which re-checks status; reuse it as the
  // refresh target too (Stripe follows refresh_url if the link expires before it is opened).
  const origin = new URL(req.url).origin;
  const back = `${origin}/connect/onboard?sellerId=${encodeURIComponent(sellerId)}`;

  try {
    const { url, accountId } = await onboardSeller(sellerId, { returnUrl: back, refreshUrl: back, email, country });
    return NextResponse.json({ url, accountId }, { status: 200 });
  } catch (e) {
    const status = e instanceof RegistryError ? 400 : 500;
    return NextResponse.json({ error: (e as Error).message }, { status });
  }
}
