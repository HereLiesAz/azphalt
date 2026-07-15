# Storefront: gate paid downloads, issue entitlements on checkout

Date: 2026-07-14
Status: Approved, pending implementation
Affects: `packages/registry`, `apps/repository-server`, `apps/storefront`

## Problem

`apps/storefront`'s `GET /api/download/[id]` serves `.azp` bytes to anyone, for every package —
including the ones consigned for sale via `Marketplace.listForSale`. There is no `Authorization`
header read, no entitlement check, and no `401`/`402` path. Paid packages are free to download.

The reference server (`apps/repository-server`) already does this correctly (`handler.ts:236`):
a package with an active listing is `paid`, and a paid download requires a Bearer token, mapping
the authorizer's verdict to `401`/`402`. The storefront simply never got the same treatment.

### Scope note: this is not a spec violation

`spec/repository-api.md` § Download Package is normative for the **repository API**
(`GET /packages/{id}/versions/{version}/download`), which `apps/repository-server` implements and
gates correctly. The storefront is a different surface with different routes and no `.well-known`
index; that spec text does not bind it.

So this is a storefront design gap, not a conformance failure. The fix is to apply the *model* the
spec describes — and that the reference server already implements — to the storefront's own
download endpoint. The distinction matters: it is why `.well-known` publication is a non-goal
below, and why the storefront is free to keep its own route shape.

## Design

### 1. Extract the authorizer into `@azphalt/registry`

Move `apps/repository-server/src/authorize.ts` → `packages/registry/src/authorize.ts`, exporting
`DownloadAuthorizer`, `AuthDecision`, `AuthInput`, `InMemoryAuthorizer`, `EntitlementAuthorizer`,
and `denyAllAuthorizer` from the package index. Its `verifyEntitlement` import becomes local
(`./entitlement.js`); no cycle, since the module is already a registry consumer. The reference
server imports from `@azphalt/registry` and drops its copy.

Pure move — no behavior change. `AuthDecision` is `{authenticated, licensed}`, transport-agnostic
(the `401`/`402` mapping stays in each HTTP layer), so it sits naturally beside `entitlement.ts`.

Both surfaces must share one implementation. Copy-pasting the gate into the storefront would leave
two authorization code paths to keep in sync, which is how gates rot.

This is an additive change to `@azphalt/registry`'s public API; it needs a changeset.

### 2. Signing key from env

`AZPHALT_SIGNING_KEY` holds a PEM Ed25519 private key (`issueEntitlement` takes PEM and rejects
non-Ed25519 keys).

- **Absent** → `denyAllAuthorizer`, issuance disabled. Paid packages return `401`.
- **Present** → `EntitlementAuthorizer` trusting the public key derived from it; issuance enabled.

`next dev` and `vitest` therefore work with no secrets and no services, and the deployed behavior
is an explicit config choice rather than an accident. Generate with:
`openssl genpkey -algorithm ed25519`.

### 3. Gate `GET /api/download/[id]`

`priceStatus(id)`: an active listing ⇒ `"paid"`, otherwise `"free"` — the same rule as
`handler.ts:102`. For a paid package: read the Bearer token from `Authorization`, call
`authorize({token, packageId, version})`, then `!authenticated` ⇒ `401`, `!licensed` ⇒ `402`.
Free packages are served exactly as today.

The gate runs **before** `registry.serve()`. `serve()` increments the download tally, so gating
after it would count denied requests — wrong, and it leaks existence/among-us information through
the counter. The reference server orders it the same way.

### 4. Issue entitlements on checkout

Today `POST /api/checkout` creates a pending stub session and stops; nothing fulfils it, so no
token can exist. Add fulfilment: complete the session via `StubPaymentProvider.simulate(id,
"completed")`, then `issueEntitlement(key, {packageId, subject: buyerId, kind: "perpetual",
issuedAt})` and return the token base64-encoded, ready to present as a Bearer credential.

`simulate` is specific to `StubPaymentProvider`, not part of the `PaymentProvider` interface, so
the storefront holds a typed reference to the stub. That is acceptable precisely because this path
is dev-only (below).

**This endpoint mints signed licenses for payments that never happened.** Left reachable on a
public deploy it is a worse hole than the one being fixed: instead of leaking bytes, it mints
durable, offline-verifiable licenses. It therefore requires an explicit opt-in —
`AZPHALT_ALLOW_STUB_FULFILMENT=1` — and returns `404` otherwise. The gate in §3 is only as real as
this endpoint is hard to reach.

Be clear-eyed about what the deployed demo then shows: with the opt-in enabled, anyone can
self-issue a license. It demonstrates the *mechanism* — a signed, offline-verifiable buy-once
entitlement gating byte access — not commercial enforcement. Real enforcement needs a real payment
provider, which is a separate concern.

### 5. Tests

Extend `apps/storefront/test/storefront.test.ts`:

| case | expected |
| --- | --- |
| free package, no token | `200` |
| paid package, no token | `401` |
| paid package, malformed token | `401` |
| paid package, valid token for a *different* package | `402` |
| paid package, valid token for this package | `200` |
| paid package, denied request | download tally unchanged |

The `402` case is the one that proves `authenticated` and `licensed` are distinct verdicts rather
than one boolean. The tally case pins the ordering in §3, which is otherwise easy to regress.

Authorizer unit tests move to `packages/registry` with the code.

## Non-goals

- **The durable `RegistryStore`** (Neon Postgres + Vercel Blob). Separate spec. Note that this
  gate forces Blob to be **private** there: a public blob URL would bypass §3 entirely.
- **The Vercel deploy.** Config already verified; needs an account.
- **`.well-known` key publication.** Only a third-party host verifying offline needs the registry's
  public key; the storefront's own gate trusts its own key. Follow-up if the storefront ever grows
  a repository-API surface.
- **A real payment provider.** The stub moves no money and never will.

## Risks

- **Stub fulfilment reachable in production** — mitigated by the env opt-in and `404` default, but
  it is the sharp edge here. A deploy that sets `AZPHALT_ALLOW_STUB_FULFILMENT=1` is a demo, not a
  store.
- **Paid packages become undownloadable when `AZPHALT_SIGNING_KEY` is unset.** Intended (`401` is
  the safe default), but it is a visible behavior change for anyone running the storefront today.
- **Moving `authorize.ts`** changes `@azphalt/registry`'s public surface (additive) and the
  reference server's internals. The reference server's existing authorizer tests must still pass.
