# Adopting azphalt as a companion-app host

*How an app becomes a conforming host for **companion-app** packages (`kind: "app"`) — Android apps and
PWAs a host launches to perform a function and hand a result back. [`ADOPTION.md`](ADOPTION.md) covers a
code host (runs sandboxed extensions); [`ADOPTION_ASSET_HOST.md`](ADOPTION_ASSET_HOST.md) covers an asset
host (consumes data). This profile is different again: the host runs **none** of the companion's code —
it hands off to a separate OS-level app and ingests a validated result. The normative contract is in
[`spec/companion-app.md`](specs/companion-app.md); this is the implementer's how-to.*

## Why this profile exists

A `code` extension is powerless by design — no camera, no sensors, no network (the *moat*). But some
functions want a **full app**: an AR-capture tool that returns a stencil to GraffitiXR, an audio-mastering
PWA that returns a track to Guillotine. Those are whole OS-level applications with their own permissions —
the opposite of a sandbox. A `kind: "app"` package doesn't put them *in* the sandbox; it standardizes the
**handoff** so any host invokes any companion the same way, and **the moat still holds**:

- azphalt grants the companion **nothing** — the OS governs its permissions, granted by the user to *that
  app*. Nothing crosses into the host.
- The host **never runs the companion's code**; it hands off a declared input over an OS transport and
  gets back a declared output it **validates** before use.
- The user gives **OS-style consent** before each handoff.

## What a companion host does

1. **Open and verify the `.azp`.** It's a normal signed package (`manifest.json` + `LICENSE`, no `/code`).
   Run `verifyAzp`; where provenance matters, check the signer against a trust store with `verifyTrust`.
   Reject anything that fails. Read `manifest.app` — `platforms` + `handoffs`.
2. **Match the platform + decide you can honor the handoff.** Read the `platforms` entry for your OS
   (`android` or `pwa`). For each `handoff` you want to surface, confirm you can *produce* its `input`
   assets and *ingest* its `output` assets/params. If the target app isn't installed, deep-link to
   `platforms.*.install` (Android) or prompt to install the PWA.
3. **Surface the handoff under its `action`.** `capture` → a "Capture from…" entry, `edit-image` → an
   "Edit in…" affordance, etc. (open vocabulary; see `spec/companion-app.md` § Blessed actions).
4. **Consent, then launch via the transport.** Show an OS-style prompt naming the app and exactly what
   input leaves the host, then invoke it (below).
5. **Validate the return, then ingest.** Treat the returned assets/params as **untrusted input**: verify
   each asset's declared wire format + a size cap, validate params against the declared shape, then apply.
   Never execute a returned asset.

## Transports

### Android
1. Build an `Intent` for `transport.android.intentAction`; attach input assets as content URIs and input
   params as typed extras; **set `Intent.FLAG_GRANT_READ_URI_PERMISSION`** (or the companion can't read
   them); launch **for result** (Activity Result API).
2. The companion returns via `setResult(RESULT_OK, …)` — output assets as content URIs (MIME types in
   `resultMimeTypes`), params as result extras — likewise setting `FLAG_GRANT_READ_URI_PERMISSION`.
3. Read the result, verify each asset against `output`, ingest. `RESULT_CANCELED`/timeout is a clean no-op.

### PWA
1. Open the companion as a **popup you hold a handle to** and `POST` the input to
   `transport.pwa.shareTargetUrl` (declared in the manifest, so you never fetch its `.webmanifest`
   cross-origin) as `multipart/form-data`.
2. The companion returns via **`window.opener.postMessage`** with structured clone (transfers
   `Blob`/`ArrayBuffer` by value — a companion-origin `blob:` URL would be unreadable to you under the
   Same-Origin Policy).
3. Accept the message **only** from the popup you opened, **only** with the `nonce` you issued, **only**
   from the companion's expected `event.origin`; then validate against `output` and ingest.

## Conformance checklist (companion host)

- [ ] Opens the `.azp`, runs `verifyAzp` (and `verifyTrust` where provenance matters), and refuses failures.
- [ ] Reads `manifest.app`; only surfaces a handoff whose `input`/`output` it can honor on its platform.
- [ ] Shows **OS-style consent** — the app being opened and exactly what input leaves the host — before launch.
- [ ] Sends **only** the handoff's declared `input` (no ambient data channel).
- [ ] Grants the OS-level read permission the transport needs (Android URI flags; PWA nonce+origin binding).
- [ ] **Validates the return** — each output asset's wire format + size cap, params against the declared
      shape — and refuses/ignores anything that doesn't match, before ingesting.
- [ ] Runs **no** code from the package and never executes a returned asset.

`@azphalt/conformance` certifies these lines for you: `runCompanionConformance(host)` drives a fixture
handoff against your host and asserts each — it verifies the header, refuses a non-`kind:"app"` package
(you run no code), surfaces the handoff on a platform you support, shows consent, sends only the declared
input, and validates the return against `output`. It reports `{ ok, checks }`, and a conforming host
declares a `"companion"` profile so a registry can match package↔host.

~~~ts
import { runCompanionConformance } from "@azphalt/conformance";

const report = await runCompanionConformance(myHost);
report.ok; // true ⇒ conforming
~~~

Meet these and any conforming `kind: "app"` package plugs a full external tool into your editor — safely,
uniformly, and with the moat intact.
