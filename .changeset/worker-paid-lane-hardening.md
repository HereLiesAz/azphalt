---
"@azphalt/storefront-worker": minor
---

Harden the paid lane and admin surface:

- **Payout takeover closed.** `POST /api/connect/onboard` now requires the operator's `ADMIN_TOKEN` (it was open, so anyone could bind their own Stripe account to a public `sellerId`), and checkout prefers the reviewed `stripeAccountId` in `listings.json` over a stored mapping. `GET /api/connect/status` no longer returns the Stripe account id or lets an anonymous caller trigger a Stripe refresh.
- **No entitlement for unpaid sessions.** A completed checkout session is fulfilled only when `payment_status` is `paid` / `no_payment_required` (a delayed bank debit is `complete` but `unpaid`); `checkout.session.async_payment_succeeded` fulfils it when funds settle.
- **Failed yank no longer marks a report resolved.** The revocation is written before the report is resolved, so a 409 leaves the report open.
- **Admin token** is compared in constant time and the admin surface goes through the write limiter.
- **Publish**: the uploaded `.azp` is bounded when inflated (entry count, per-entry and total size) so a small archive can't exhaust the isolate before signature checks; path checks match `@azphalt/azp` (backslash, drive letter, NUL, `.`/empty segments).
- **Security headers** (`nosniff`, `X-Frame-Options`, `frame-ancestors 'none'`, `Referrer-Policy`, HSTS) on every response.
- First test coverage for the webhook, onboarding auth, headers and the zip cap.
