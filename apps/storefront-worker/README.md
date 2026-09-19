# Azphalt storefront Worker

Production backend for the static React storefront. It replaces the former Vercel/Neon runtime path
with Cloudflare Workers + SQLite Durable Objects.

## Zero-fixed-cost design

- Static storefront assets are served by the Worker.
- Repository metadata is exported at build time from the reviewed git catalog.
- Checkout/session/entitlement/seller/subscription state lives in one SQLite Durable Object.
- The Worker self-generates and persists its buyer-session HMAC secret and Ed25519 entitlement
  signing keypair on first use.
- Free package downloads redirect to the reviewed git-backed catalog.
- Paid package bytes are stored only in protected Durable Object chunks and are returned only after a
  valid signed entitlement is presented.

Cloudflare free-tier exhaustion should stop serving rather than silently create a hosting bill. Stripe
still charges its normal per-transaction processing fee when a purchase succeeds.

## Required Cloudflare secrets

Set these once on the deployed Worker:

```sh
wrangler secret put STRIPE_SECRET_KEY --config apps/storefront-worker/wrangler.jsonc
wrangler secret put STRIPE_WEBHOOK_SECRET --config apps/storefront-worker/wrangler.jsonc
wrangler secret put ADMIN_TOKEN --config apps/storefront-worker/wrangler.jsonc
```

`STRIPE_WEBHOOK_SECRET` is required for subscriptions and renewal/cancellation events. One-time
purchases can still fulfil from the Stripe Checkout session on the success page if the webhook is
delayed. `ADMIN_TOKEN` protects paid-package uploads.

## Listings

The public storefront overlay is `apps/storefront-react/public/listings.json`:

```json
[
  {
    "packageId": "com.example.package",
    "sellerId": "seller_example",
    "amountCents": 500,
    "currency": "USD",
    "status": "active"
  }
]
```

For a subscription, add `"interval": "month"` or `"year"`. Subscription checkout is refused until a
Stripe webhook secret is configured.

A seller connects their Stripe Express account at `/connect/onboard`; the Worker persists the
seller-to-account mapping and refreshes capability flags from Stripe.

## Uploading paid package bytes

Paid bytes must never be committed to the public registry. Upload the exact `.azp` version to the
protected Worker endpoint:

```sh
curl -X PUT \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/vnd.azphalt.package" \
  --data-binary @package.azp \
  "https://azphalt.store/api/admin/packages/com.example.package/1.0.0"
```

Checkout is refused until the listed package/version exists in protected storage.

## Local validation

```sh
pnpm install --frozen-lockfile
pnpm --filter "@azphalt/azp..." build
pnpm --filter @azphalt/storefront-react build
npx --yes wrangler@4 deploy --dry-run --config apps/storefront-worker/wrangler.jsonc
```

The centralized deploy workflow runs the same build/dry-run on pull requests and only deploys on
`main`.
