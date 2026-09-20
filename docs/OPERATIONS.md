# Production storefront operations

This page describes the operational contract for the flagship `azphalt.store` deployment. It is not
part of the vendor-neutral Azphalt package/runtime standard.

## Production shape

The production storefront is:

- `apps/storefront-react` — static marketplace UI and exported catalog;
- `apps/storefront-worker` — Cloudflare Worker serving the storefront and Repository API;
- `apps/storefront/registry/` — git-backed canonical catalog source.

The legacy Next.js storefront remains a reference implementation, not the production deployment
target.

## Catalog source of truth

The production catalog is derived from the committed registry. The build exports the registry into
`apps/storefront-react/dist/catalog.json`, which is bundled with the Worker/static deployment.

A successful source merge is not, by itself, proof that production is serving the new catalog.
Deployment freshness is part of correctness.

## Centralized deployment verification

The deployment workflow is owned by `HereLiesAz/workflows`. Before Cloudflare deployment it verifies
that the generated catalog contains known app-scoped workflow and role packages. After deployment it
polls the live Repository API until those packages are visible through an app-scoped request.

The current Aive probes verify:

- `com.hereliesaz.haive.feature-delivery` as `kind:"workflow"`; and
- `com.hereliesaz.haive.role.ux-researcher` as `kind:"role"`;

through:

`GET https://azphalt.store/packages?app=com.hereliesaz.aive&...`

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
