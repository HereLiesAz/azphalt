---
"@azphalt/storefront-react": minor
"@azphalt/storefront-worker": minor
"@azphalt/docs": patch
---

The Cloudflare storefront reaches parity with the Next.js deployment ahead of the domain cutover: the Worker serves azphalt.org's docs by hostname, takes ratings (one per browser, buyers only for paid packages) and reports (untrusted, moderated behind `ADMIN_TOKEN`), and deploys through the shared Cloudflare workflow with a post-deploy check. The React storefront gains rating, reporting, moderation and per-app pages, static privacy and terms pages, a version footer, and a network-first service worker. The docs keep their bundles in `docs-assets/`.
