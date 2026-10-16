---
"@azphalt/storefront-react": minor
---

Storefront and demo-client fixes: prices render in the listing's own currency (not a hardcoded `$`); install counts now show (the Worker supplies `installs`, the UI only read `downloads`); package-supplied `terms` and licence URLs are `https:`-only and an invalid `baseUrl` no longer blanks the page; the Sell page takes the operator's invite code. In the demo marketplace, a slow reply for a previously selected package can no longer overwrite the current one, and a package without `types` no longer throws.
