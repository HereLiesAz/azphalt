# Store-side gaps behind the "not installed" buttons

Date: 2026-11-22
Status: Proposal. Nothing here is implemented; no version bump (owner instruction).
Affects: `apps/storefront-worker`, `apps/storefront-cmp`, `apps/storefront-react`, `apps/storefront/registry`, `submissions/`, `spec/`
Verified against: `main` @ `1dc2c95` (includes #363). #364 (open, draft) @ `e4d6459` is called out where it changes an item.

## Why this exists

#363 (sort options, merged) and #364 (a working button for every "not installed" state, in review) are
app-side. Wiring them up exposed problems that no app change can fix. Ten candidates came out of
independent reviews. Each was re-checked against `main`. Six hold as stated (4, 5, 7, 8, 9, 10). Four were wrong
in their proposed remedy or premise (1, 2, 3, 6) and are replaced by the real cause. Section 11 lists what changed.

Evidence is source reading plus data inspection of the committed catalogue. Nothing was run against live
Stripe or Play.

## Summary

Severity: **High** = a user pays and gets nothing, or pays twice. **Medium** = wrong or dead-end UI on a common
path. **Low** = clarity or polish.

| # | Item | Sev | User-visible effect | Status | Owner |
| --- | --- | --- | --- | --- | --- |
| 1 | Desktop checkout is cookie-less | High | Desktop owner can pay twice; the licence of a desktop purchase is never delivered to the app | Open on `main`; #364 adds `code` but it is unreachable here | storefront-cmp (desktop), worker (small) |
| 5 | Compose apps have no entitlement source | Medium | Ownership is a guess from host state, so "Buy" shows for things already bought. Root cause of 1 | Open | storefront-cmp (same change as 1) |
| 6 | Deployed catalogue carries no dates | Medium | "Recently updated" is a no-op on every client; "Newest" cannot exist | Re-scoped (field exists, is stripped) | `export-catalog.mjs`, registry pins |
| 3 | No host listed for a third of scoped packages | Medium | New fallback says "No host app is listed" for 76 of 232 scoped packages | Re-scoped (mechanism exists, data does not) | `submissions/` content |
| 4 | Standalone Android store cannot buy | Medium | Paid package shows a raw developer string on `main`; #364 opens the web store, whose deep link works but is silent on failure | `main` broken; #364 routes to web | storefront-react (small), cmp |
| 7 | Web "installed" is a local guess | Medium | "Installed first" and Not-installed UI drift after an uninstall | Open; mitigated by Forget | spec + web-handoff |
| 8 | `www.` vs apex origin | Low | One extra redirect; a host passing the apex repository is refused its entitlement | Open | cmp constants |
| 2 | Host behaviour for a held `downloaded` package is unspecified | Low | "Install" on a downloaded package may re-download and re-prompt | Re-scoped (no new message needed) | `spec/web-handoff.md` |
| 9 | Selected sort is not announced | Low | Screen reader hears "Sort: Popular, button" with no state | Open | storefront-cmp (app-side) |
| 10 | Billing failures end at "OK" with raw text | Low | Dead-end dialog | Action fixed in #364; text still raw | storefront-cmp (app-side) |

Items 9 and 10 are app-side. They are kept because the owner asked for them if they belong; see their sections.

## 1. Desktop checkout is cookie-less

**Evidence**

- `apps/storefront-cmp/src/desktopMain/kotlin/network/DesktopApi.kt:25-43`: `startCheckout` POSTs `{"packageId": ...}` with only `Content-Type`, using
  `HttpClient.newBuilder().build()` (`:31`). No `CookieHandler`, no account, no stored buyer value.
- Worker `index.ts:1720` `readBuyerSubjects` finds no cookie, so `ownsPackage` (`:1721`) is false and `:1725`
  `const buyerId = subjects[0] || newBuyerSubject()` mints a fresh buyer on **every** request.
- The Stripe idempotency key (`:1779`) includes `buyerId`, so a random buyer means a new Stripe session each
  click. The 409 `{"error":"you already own this package","code":"already_owned"}` (`:1723`) needs a buyer session.
- The response carries `Set-Cookie` (`:1851`) and a one-time `session.claim`. Desktop drops the cookie (no jar)
  and `CheckoutSessionDto` (`models/Checkout.kt:18-24`) has no `claim` field, so it is discarded too.
- `GET /api/checkout/session/{id}` (`sessionResult`, `:2536`) answers only the cookie holder or the claim holder;
  anyone else gets 404 (`:2549`, `:2553`). The system browser that Stripe returns to holds neither.

**Effect.** Two failures, same cause. (a) A desktop owner who clicks Buy again pays again: nothing links the two
purchases. (b) The first purchase succeeds at Stripe but its licence is retrievable only by an admin via
`GET /api/admin/entitlements/{sessionId}` (`apps/storefront-worker/README.md` § Recovering a purchase). The Android
host flow is not affected: Play refuses a second purchase (`Billing.kt:156`, `:228`) and `/entitlements/play`
is idempotent on the purchase token (`index.ts:1286`).

**Correction to the candidate fix.** A new ownership endpoint is not needed. `GET /api/purchases` (`:2629`) is
already the read-only, buyer-keyed lookup, and `already_owned` is already the idempotent guard. The clients never
hold a buyer session. Fix the clients first.

**Smallest fix**

1. Desktop: use one `HttpClient` with a `CookieManager` whose store persists `azphalt_buyer_session` to the app
   data directory. Add `claim` to `CheckoutSessionDto`; after `openExternal`, poll
   `GET /api/checkout/session/{id}` with `x-checkout-claim` and store the returned token.
2. On launch and after each checkout, call `GET /api/purchases` and treat its `packageId`s as owned (item 5).
3. Optional worker change: `GET /api/purchases?fields=ids` returning `[{packageId, revoked}]` only. Today the
   list returns every bearer token just to draw an "Owned" badge.

**Acceptance**

- Worker test: POST checkout, replay the returned cookie, complete the session, POST again. Expect 409 `already_owned`.
  Before completion, expect the same session URL (idempotency key stable once the buyer is stable).
- Desktop test (fake server): the cookie survives a new process; the token is stored after the claim poll.
- Manual: buy on desktop, quit, reopen, press Buy. Expect "You already own this", not a Stripe page.

**Owner.** `apps/storefront-cmp` desktop and common code; worker change optional.

## 5. The Compose apps have no entitlement source

**Evidence**

- `models/EntitlementPolicy.kt` is 26 lines: `STORE_ORIGIN`, `originOf`, `mayReceiveEntitlement`. It decides where a
  token may be **sent**, never whether one exists.
- Ownership on the detail screen is `LocalHostInventory.current[pkg.id]?.state` (`DetailScreen.kt:136`): what a host
  reported, or the local record of a handed-off link. A paid package that is bought but not installed is
  "not held", so Buy shows.
- The only Compose code that obtains an entitlement is the Android host flow (`Billing.kt` then `/entitlements/play`).
  Desktop and wasm have none; wasm works only because it shares the web origin's cookie.

**Effect.** Item 1's double pay, and "Buy" on a package the user owns.

**Fix.** Same change as item 1: an `OwnedPackages` source in `commonMain`, filled from `GET /api/purchases` where a
buyer session exists, merged into the inventory as owned-not-installed. Keep `EntitlementPolicy` as it is.

**Acceptance.** Unit test: with a purchases response containing `P` and an empty host inventory, `P` resolves to
"owned, not installed" and the action is Install, not Buy.

**Owner.** `apps/storefront-cmp`.

## 6. The deployed catalogue carries no dates

**Evidence.** The candidate said the catalogue has no first-published field. The type does:
`packages/registry/src/types.ts:120-121` documents `publishedAt` (first publish) and `updatedAt` (latest);
`registry.ts:353` fills `publishedAt` from `times[0]`. The deployed store never receives them:

- `apps/storefront-react/scripts/export-catalog.mjs:36-63` builds each entry from the manifest and writes no
  `publishedAt` or `updatedAt`. It also hard-codes `downloads: 0` (`:61`).
- The pinned input `apps/storefront/registry/catalog.json` has per-package keys `bytes, file, id, integrity, kind,
  name, ref, repo, version`. No dates.
- Measured on `main`: 0 of 307 entries in `public/catalog.json` and 0 of 5 in `public/listings.json` have `updatedAt`.
  Paid listings only allow an optional `package.updatedAt` (`index.ts:167`) and have no `publishedAt`.

**Effect.** Both clients sort "Recently updated" on `updatedAt` (`StoreSort.kt:36`, `sort.ts:47`). With every value
empty the order falls through to name. The React carousel subtitle says "Recently published and updated"
(`App.tsx:1035`). The comment at `StoreSort.kt:7` ("no first published field") is wrong about the type and right
about the deployment.

Install counts and ratings are **not** missing: `ratedCatalog` merges both into free and paid entries alike.

**Smallest fix.** Source dates where they exist. In `export-catalog.mjs`, take `publishedAt` and `updatedAt` from
the git history of each pinned package (first and last commit touching `registry/packages/<file>`), falling back to
omitted, never to "now". Add `publishedAt?: string` to both client DTOs (`PackageSummary.kt`, `api.ts`). Add
"Newest" only after the data is real. For paid listings, require `package.updatedAt` and add `publishedAt` in
`listings.json`.

**Acceptance.** A check in `export-catalog.mjs` (or its test) failing when more than N% of entries lack
`updatedAt`. Client test: "Recently updated" orders two entries by date, not name.

**Owner.** Exporter and registry pins; clients adopt the field.

## 3. No host is listed for a third of scoped packages

**Evidence.** The candidate said there is no host directory. There is one:

- `spec/web-handoff.md` § Host directory: a host lists itself as `kind:"app"` with `roles:["host"]` and `hostId`;
  a storefront reads `GET /packages?kind=app` and matches `hostId` to `targetApps`.
- `packages/registry/src/types.ts:93-99` puts the reduced `app` block on the summary so the directory is one
  request; `apps/repository-server/src/handler.ts:177`, `:205` serve it; both clients build it
  (`App.kt:212`, `App.tsx:1059`).

The gap is data. In `public/catalog.json` there are three `kind:"app"` entries, two with `roles:["host"]`:
`hostId` `com.hereliesaz.graffux` and `com.hereliesaz.guillotine`. Of 307 packages, 232 declare `targetApps`; 76 of
those name only `com.hereliesaz.aive` (75 also name `haive`). Neither has a host listing. `com.hereliesaz.azphalt.graffitixr`
has no `roles`, so it defaults to `companion` and is not a host.

**Effect.** For 76 of 232 scoped packages the #364 fallback reaches its "No host app is listed for this extension
yet" branch (`spec/web-handoff.md` lines added by #364). Honest, but a dead end for a third of the catalogue.

**Fix.** Content, not code: submit `kind:"app"` host listings for `aive` and `haive` through the normal submission
path (`submissions/README.md` § app). Where the host id is not publishable yet, say so in the fallback copy.

**Acceptance.** Conformance check (script or test) that every `targetApps` id in the catalogue resolves to a
`hostId`, or is on an explicit allow-list with a reason.

**Owner.** Whoever maintains the aive/haive listings; registry reviewers.

## 4. The standalone Android store cannot buy; the web deep link

**Evidence (`main`)**

- `MainActivity.kt:24`: `setContent { StorefrontApp() }`, no `onAcquire`.
- `DetailScreen.kt:379-387`: with no `onAcquire`, a paid package calls `startCheckout`, and any exception becomes
  `dialogText = e.message`.
- `AndroidApi.kt:289-296`: `startCheckout` throws `UnsupportedOperationException("paid packages on Android go through Play Billing, not the web checkout")`.
  The user sees that sentence.

**In #364.** `MainActivity` passes `inAppCheckout = false`, and a paid package opens `webStoreUrl(id)`
(`NotInstalled.kt:392`, `not-installed.ts:367`): `https://www.azphalt.store/?package=<id>`.

**Does the web store honour it?** Yes, on `main`. `apps/storefront-react/src/App.tsx:916-919`: after the catalogue
loads, `new URLSearchParams(location.search).get("package")` is matched by exact id and opens that detail. The worker's
`www` to apex redirect (`index.ts:4178-4180`) is a 301 that keeps `url.search`, so the parameter survives it.

**Gaps in the deep link**

1. An unknown, unlisted or paused id is **silently ignored** (none of them is in `/api/packages`): the user lands on the catalogue with no explanation.
2. It opens the detail; it does not start checkout. That is right, and should be written down.
3. The purchase completes in the browser's cookie. The standalone Android app never learns of it (items 1 and 5).

**Contract to document** (in `spec/web-handoff.md`, storefront obligations):

~~~text
GET /?package=<id>
  id in the catalogue    -> open that package's detail (no checkout started)
  id not in catalogue    -> open the catalogue with a notice: "That package isn't available."
  id malformed or absent -> ignored
~~~

**Fix.** In `App.tsx:917-919`, set a notice when `wanted` is present but `hit` is not. The catalogue served to clients holds only active listings (`marketplaceCatalog`, `index.ts:734`), so paused, unlisted and unknown ids are indistinguishable there and share one message. Keep #364's routing.

**Acceptance.** `not-installed-ui` style test: `?package=missing` shows the notice; `?package=<paid>` opens detail and
does not call checkout. Android standalone: Buy on a paid package opens the browser at the deep link.

**Owner.** `apps/storefront-react` for the notice; spec text; cmp needs nothing beyond #364.

## 7. Web "installed" is a local guess

**Evidence.** `packages/web-handoff/src/index.ts:62` stores `azphalt.inventory.v1` in `localStorage`;
`recordInstalled` (`:107`) writes `installed` when the page fires `azphalt://install`. The code says so:
"the store did not observe an install". Only `forgetInstall` (`:129`) corrects it. The React app records on
`onHandedOff` (`App.tsx:1065`). The signed-in `GET/POST /api/account/library` (`index.ts:522`) syncs the same
client-reported entries across devices; it does not verify them.

**Effect.** After an uninstall, "Installed first" (`sort.ts`) and the Not-installed buttons are wrong until the user
presses Forget. On Android the host-reported inventory supersedes the guess; on the web nothing does.

**Fix.** A web page cannot read the device, so the verified signal has to come from a host. That is a spec
addition, not an app fix. Smallest route: let a host that implements `state-reporting.md` § 3.2 also accept a one-shot
`azphalt://state?return=<url>` that opens `return` with an `inventory` fragment (the § 1 entry shape). The page treats
it as a hint, as § 3.1 already requires. Until a host does, label the web state "Installed on this
browser's record" and keep Forget prominent. Do not present it as device truth.

**Acceptance.** Spec text lands first. Then: given a fragment, the web inventory is replaced by it and entries it
omits become not-installed.

**Owner.** `spec/state-reporting.md`, `packages/web-handoff`; hosts opt in.

## 8. `www.` versus the apex origin

**Evidence**

| Place | Origin |
| --- | --- |
| Worker `PUBLIC_ORIGIN` (`wrangler.jsonc:47`), Desktop `API_BASE` (`DesktopApi.kt:12`), `SELL_URL` (`App.kt:451`), host guide (`docs/hosts/getting-started.md:23`) | `https://azphalt.store` |
| `STORE_ORIGIN` (`EntitlementPolicy.kt:4`), Android `DEFAULT_REPOSITORY` (`AndroidApi.kt:32`), #364 `webStoreUrl` | `https://www.azphalt.store` |

The worker treats the apex as canonical: page GETs on `www` get a 301 (`index.ts:4178-4180`), and a checkout POST from
`www` is refused `409 wrong_origin` (`:4182`). API calls without `Accept: text/html` are served on `www` directly, so
Android works today.

**Effect.** Low, but real: `mayReceiveEntitlement("https://azphalt.store")` is false (the test only accepts `www`),
so a host that follows the documented apex URL and passes it as the `repository` extra gets
"refusing to send a purchase entitlement to a repository other than the store" (`AndroidApi.kt:191-193`) on a paid
acquisition.

**Decision.** Pick the apex. It is canonical in the worker, the docs and the desktop app.

**Fix.** Change `STORE_ORIGIN`, `DEFAULT_REPOSITORY` and `webStoreUrl` to the apex. Keep `www` accepted in
`mayReceiveEntitlement` (compare both). Redirect policy stays as is: `www` page GET to apex, 301, query preserved.
Say so in `docs/OPERATIONS.md` (the paragraph listing the four Custom Domains).

**Acceptance.** `EntitlementPolicyTest`: both origins accepted; lookalikes still refused. A grep test that no
client source contains `www.azphalt.store` except the policy's allow-list.

**Owner.** `apps/storefront-cmp`, `packages/web-handoff`.

## 2. A held `downloaded` package: host behaviour is unspecified

**Evidence.** The candidate asked for a new "install request" message. `azphalt://install` already is one
(`spec/web-handoff.md` § Host obligations). What is missing is a sentence for the held case: steps 2 and 3 say to
download and verify, and `spec/state-reporting.md:43` defines `downloaded` as "verified bytes, not installed". In
#364 the `Downloaded` action ("Install") re-runs the same handoff link (`NotInstalled.kt:230`).

**Effect.** Low. A conforming host may fetch the bytes a second time and ask for consent again.

**Fix.** One sentence in `spec/web-handoff.md` § Host obligations, step 2: "If the host already holds verified bytes
for this `id` and `version` (state `downloaded`), it SHOULD install from them and skip the download." No new message,
no new field.

**Acceptance.** Spec change only; the conformance suite gains a case if it covers handoff.

**Owner.** Spec.

## 9. Compose capsules do not expose selection

**Evidence.** `components/Capsule.kt:93` gives the clickable only `role = Role.Button`; there is no `selected`
state. The live filter rows (`CapsuleFilters`, `App.kt:408-445`) show selection by colour and an end-cap only, at
`height = 44.dp` (`App.kt:429`). `StorefrontControls.kt` uses Material `FilterChip` (which does expose selection) but
has no caller. Labels are `Sort: <name>`, so the *choice* is announced, the *state* is not.

**Effect.** Low, app-side. A screen reader user cannot tell which sort is active.

**Fix.** Add `selected: Boolean? = null` to `Capsule`; when non-null use
`Modifier.selectable(selected = selected, role = Role.RadioButton, onClick = ...)` (single choice) and pass it from
`CapsuleFilters`. Raise the height to 48dp, Material's minimum, keeping the label at 11sp.

**Acceptance.** Compose UI test: the active sort node has `SemanticsProperties.Selected == true`; the others `false`.

**Owner.** `apps/storefront-cmp`, not the store backend.

## 10. Billing and Play errors end at "OK"

**Evidence.** `Billing.kt:93` (`"Play Billing unavailable: ${result.debugMessage}"`), `:118`, `:139`
(`"“$packageId” is not available for purchase on this account"`), `:146`, `:169`, `:183` surface through
`BrowseForResultActivity` into a "Couldn't finish" dialog whose only button on `main` is OK.

**Status.** #364 adds "Retry install" and "Close" to that dialog. Still open after #364: the text is raw
(`debugMessage` from Play, reverse-DNS ids), and "no activity for the purchase flow" is a developer string.

**Fix.** Map to user text at the `PurchaseOutcome.Failed` boundary: unavailable, not purchasable here, pending. Keep
the raw string in the log.

**Acceptance.** Unit test over the mapping; no message contains a package id or `debugMessage`.

**Owner.** `apps/storefront-cmp` (Android), not the store backend.

## 11. Dropped or re-scoped candidates

| Candidate | Result | Why |
| --- | --- | --- |
| 1: "propose an ownership lookup the apps can call" | Dropped the endpoint, kept the problem | `GET /api/purchases` and `already_owned` exist; the clients hold no session. Also found: the licence is never delivered (claim discarded) |
| 2: "no way to ask a host to install a downloaded package; add a message" | Re-scoped | `azphalt://install` is the request. Gap is a host SHOULD for held bytes |
| 3: "no host-directory page or endpoint; registry needs a listing/endpoint" | Dropped as stated | Spec section, `kind=app` filter, summary `app` block and both client implementations exist. Real gap is missing host listings (76 of 232 scoped packages) |
| 6: "no first-published field" | Dropped as stated | `publishedAt` exists (`types.ts:120`, `registry.ts:353`). Real gap: the exporter and pins carry no dates at all |
| 6: "no install-count/rating fields for some listings" | Dropped | `ratedCatalog` merges `installs` and ratings into free and paid entries; paid ones start at `downloads: 0` by design |
| 4: "verify the web store honours `?package=`" | Verified, partly | It does; failure cases are silent (section 4) |

Brain (`entire brain brief`) was not used: the `entire` CLI is not installed in this environment. Source and data
were inspected directly.
