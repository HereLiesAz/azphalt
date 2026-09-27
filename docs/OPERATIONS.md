# Production storefront operations

This page describes the operational contract for the flagship `azphalt.store` deployment. It is not
part of the vendor-neutral Azphalt package/runtime standard.

## Production shape

The production storefront is:

- `apps/storefront-react` — static marketplace UI and exported catalog;
- `apps/storefront-worker` — Cloudflare Worker serving the storefront and Repository API at
  `azphalt.store`, and the docs (`docs/`) at `azphalt.org`;
- `apps/storefront/registry/` — git-backed canonical catalog source.

The Next.js storefront is retired; `apps/storefront` now holds only the catalog.

### Cutover status

`azphalt.store`, `www.azphalt.store`, `azphalt.org` and `www.azphalt.org` are Custom Domains of the
`azphalt` Worker, which deploys on every relevant push to `main`. Left: the Worker's secrets, the Stripe
webhook, and deleting the Vercel project — see
[`apps/storefront-worker/README.md` § Domains](https://github.com/HereLiesAz/azphalt/blob/main/apps/storefront-worker/README.md#domains).
Remove this section when those are done.

## Catalog source of truth

The production catalog is derived from the committed registry. The build exports the registry into
`apps/storefront-react/dist/catalog.json`, which is bundled with the Worker/static deployment.

A successful source merge is not, by itself, proof that production is serving the new catalog.
Deployment freshness is part of correctness.

### Rebuilding and signing the catalog

`.github/workflows/registry-sync.yml` rebuilds `registry/packages/` and opens a PR when anything moved.
It runs on a merged `sources.json` or `submissions/` change, nightly, on an extension repo's
`extension-updated` dispatch, or by hand (`pinned` or `latest`). It is bound to a repository-scoped
executor in `HereLiesAz/workflows`, which runs in that repo's `azphalt` environment. That environment
needs `AZPHALT_PACKAGE_SIGNING_KEY` (and optionally `AZPHALT_PACKAGE_SIGNING_KEY_ID`). Without the key
the build still verifies for integrity, but it reuses the committed signed bytes only for packages
whose content did not change, and a changed package ships unsigned, which breaks publisher continuity
for hosts that pinned its key. Never commit an unsigned rebuild of a signed package by hand.

## Centralized deployment verification

The deployment workflow is owned by `HereLiesAz/workflows` (the shared `cloudflare-worker-deploy.yml`,
bound to this repository's `.github/workflows/deploy-storefront.yml`). Before Cloudflare deployment it
builds and tests the Worker and verifies that the generated catalog contains known app-scoped workflow
and role packages. After deployment it runs `apps/storefront-worker/scripts/verify-deployment.mjs`
against the new version's own deployment URL, polling until the storefront shell, the privacy page, the
docs bundle and those packages (through an app-scoped request) are all being served.

The current Aive probes verify:

- `com.hereliesaz.haive.feature-delivery` as `kind:"workflow"`; and
- `com.hereliesaz.haive.role.ux-researcher` as `kind:"role"`;

through:

`GET <deployment URL>/packages?app=com.hereliesaz.aive&...`

The deployment URL is the version's `workers.dev` address, so the check proves the new version is
serving whether or not the public domain points at it yet.

If the live API never exposes those packages, the deployment is failed rather than treating an empty
Aive store as success.

These are canary packages, not special protocol cases. They prove that:

1. the git-backed source was exported;
2. app-scoped metadata survived export;
3. workflow/role package kinds survived export;
4. Cloudflare is serving the new bundle; and
5. Repository API filtering is working in production.

## App-scoped discovery

`targetApps` is the normal Repository API discovery mechanism. A package with an empty
`targetApps` list is global. A package with one or more host IDs is visible in an app-scoped search
only when the request's `app` matches one of those IDs.

A host may implement defensive recovery if a repository returns an unexpectedly empty scoped page,
but that does not relax the server contract. The production Azphalt deployment is still expected to
serve correct scoped results.

The Aive currently recognizes its current host identity `com.hereliesaz.aive` and the historical
`com.hereliesaz.haive` identity for package compatibility. That compatibility rule belongs to Aive;
the Repository API itself performs literal host-ID matching.

## Diagnosing an empty host store

When a host unexpectedly shows zero packages:

1. query `/packages` without `app` and confirm the packages exist at all;
2. inspect each package summary's `targetApps`;
3. repeat the query with the host's exact `app` ID;
4. verify the deployed `catalog.json` contains the expected summaries;
5. inspect the centralized Cloudflare deployment verification; and
6. distinguish an HTTP/deployment failure from a legitimate empty compatible catalog.

Do not paper over a stale production deployment by changing the normative scoping rules.
