---
"@azphalt/storefront": major
---

Retire the Next.js storefront. `apps/storefront` is now only the catalog: the git-pinned registry (`registry/`) and the scripts that build and verify it. The storefront is `apps/storefront-react` served by `apps/storefront-worker`; Vercel keeps serving its last good deployment until the domains move to the Worker.
