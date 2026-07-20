# Marketplace integrity

*Status: **Normative**. Covers four interlocking subsystems that keep the open registry safe for
**users** and fair to **developers** without breaking the open, self-hostable standard: a **security
sweep** at publish/update, **reporting & moderation**, **private / proprietary hosting**, and
**anti-clone / provenance**. Each builds on azphalt's existing trust primitives rather than inventing
new cryptography. All three implementation phases are on `main` (`@azphalt/registry`'s `scanPackage`,
the `visibility` field + ACL download gate, and the clone/provenance signals). The **shapes and wiring**
here are normative; **enforcement policy** (exact thresholds, block-vs-flag staffing) is a deployment
choice — the sign-off decisions below record the **flagship's** defaults, which a self-hosted registry
overrides.*

## Principles

1. **The sandbox is the primary user-safety mechanism, not source review.** A `code` extension is
   deny-by-default and powerless (`capability-model.md`): no network, no filesystem, no host engine.
   The sweep is *defense-in-depth* and a *labelling* layer — it never becomes the thing that makes an
   extension safe. This is why azphalt can carry **closed-source** extensions safely.
2. **Neutral standard, opinionated flagship.** The standard fixes *shapes and wiring* (report format,
   scan-report format, visibility field, revocation feed). Enforcement **policy** (block vs flag,
   thresholds, moderation staffing) lives in a registry deployment — our flagship is strict; a
   self-hosted registry sets its own.
3. **Build on what exists.** Publisher identity is already an **Ed25519 key** with publisher-continuity
   (`package-format.md § Signing`); the registry can **counter-sign** (vouch); hosts poll a
   **revocation feed** (`repository-api.md § Revocations`); downloads already gate on **entitlement
   tokens** (`repository-api.md § Download`); discovery already filters by **app-scoping**. Integrity
   reuses all of these.

## Foundations reused

| Existing primitive | Integrity use |
|---|---|
| Ed25519 **publisher signature** + continuity | Stable developer identity → provenance / anti-clone ownership |
| Registry **counter-signature** | "The registry vouches for this version" → elevates trust, gates auto-actions |
| **Revocation feed** (`/revocations`, `yank`) | The *outcome channel* for a report or a re-scan denylist hit |
| **Entitlement tokens** + `401/402` download gate | The access-control substrate for **private** packages |
| **App-scoping** (`targetApps`) discovery filter | The pattern **visibility** filtering follows |
| **Capability model** (deny-by-default) | What the sweep audits declarations against |

---

## 1. Security sweep (publish- and update-time)

Every `publish` and every new version runs an automated battery; each check yields a verdict —
**pass**, **flag** (index with a warning a host surfaces), or **block** (refuse to index).

- **Container & signature** — the existing `verifyAzp` + `verifyTrust` (integrity, safe paths,
  signature, publisher continuity). Failure ⇒ **block** (already the behavior).
- **Capability least-privilege audit** — cross-check declared `capabilities` against the
  `contributes` a package actually registers; a package that declares far more than it contributes is
  **flagged** ("requests `layers`,`audio` but contributes one `filter`"). A declaration touching the
  never-list is **blocked**.
- **Secret scan** — generalize the `kind:"mcp"` credential-keyed rule (`validateMcpManifest`) to every
  kind: a credential-shaped value anywhere in the manifest (or a high-entropy blob in a text asset)
  that isn't an `${input:…}` reference is a leaked secret ⇒ **block**.
- **Payload static analysis** — for `code`, confirm the module's host-function imports are a **subset**
  of the granted capabilities (the runtime already fails instantiation otherwise; the sweep surfaces
  the mismatch *before* install and **flags** an import of an undeclared capability). Obfuscation /
  packing heuristics are **advisory flags** only.
- **Denylist** — known-bad container digests and **revoked publisher keys** (fed by moderation
  outcomes, § 2) ⇒ **block**, and a re-scan of already-indexed versions on denylist update ⇒
  revocation.

**Output.** A **scan report** `{ verdict, checks[], scannedAt }` the registry **counter-signs** and
attaches to the version. Hosts read it like the revocation feed: `block` never reaches them; `flag`
carries a badge a host shows before install. The sweep is a `@azphalt/registry` module (server-side,
run in `publish`) plus a reference CI action authors can run pre-submit.

*Decision:* the per-check **block vs flag** lines above are normative. Obfuscation / packing
heuristics are **advisory flags only** — the flagship does **not** auto-block on them (a legitimate
minifier or packer would be caught); a human reviews a flagged packing signal.

---

## 2. Reporting & moderation

- **`POST /reports`** — anyone reports `{ packageId, version?, reason, detail? }`. `reason` ∈
  `malware · clone · deceptive · secret-leak · broken · other`. Rate-limited by IP + optional reporter
  identity (a signed report from a **counter-signed host** or a verified account counts as *trusted*).
- **Queue & triage.** Reports accumulate on a version. **Auto-quarantine** (yank pending review) fires
  on either (a) a security-sweep **denylist** hit, or (b) a threshold of **trusted** reports; everything
  else waits for **human review**. Quarantine ≠ deletion — the version stays resolvable by exact id so
  an appeal can restore it.
- **Outcome → revocation.** A confirmed report `yank`s the version with its `reason` onto the existing
  `/revocations` feed; installed hosts learn on their next poll. A malicious **publisher key** can be
  added to the sweep denylist, revoking *all* their versions.
- **Appeal.** The publisher (proven by their signing key) can contest a quarantine; the standard fixes
  the report/appeal shape, the deployment runs the process.
- **API.** `POST /reports` (public, rate-limited) + `GET /reports` (moderation, authenticated). The open
  registry stays neutral: a self-hosted registry may auto-approve, human-moderate, or ignore — the
  standard only pins the report object and the revocation wiring.

*Decision:* reports do **not** require an identity — anyone may `POST /reports` (rate-limited by IP).
A report is **trusted** when it is signed by a **counter-signed host** or a **verified account**; only
trusted reports count toward auto-quarantine. The **threshold** is deployment-configured; the flagship
default is **3 trusted reports** on a version (or a single security-sweep denylist hit) → auto-quarantine
pending human review. Untrusted reports never trip the threshold — they queue for a human.

---

## 3. Private & proprietary hosting

- **Visibility** — a new manifest/registry field `visibility ∈ public | unlisted | private` (default
  `public`). `unlisted` = resolvable by exact id, hidden from browse (like an app-scoped package);
  `private` = access-gated. The registry filters browse/search by it exactly as it does `targetApps`.
- **Proprietary is already first-class.** MIT permits closed/sold extensions, and the safety guarantee
  is the **sandbox**, not disclosure — so azphalt **never requires source**. This RFC makes that
  explicit: the sweep and clone-checks operate on the *container* and *behavior*, never source; a
  closed-source, paid, private extension is a fully-supported citizen.
- **Private download** — `GET …/download` already gates on a Bearer/entitlement token; extend the gate
  with a **visibility/ACL check** so a `private` package requires an access grant (buyer entitlement or
  org/user membership), returning `401/402` otherwise — the same envelope as paid downloads.
- **Privately-hosted source & registries** — the standard is already self-hostable
  (`repository-server`). Guidance: run a private registry (with `auth`) to serve private/proprietary
  packages to your org; the consignment overlay handles *paid* closed-source. No source ever leaves the
  publisher.

*Decision:* v1 is **per-user access grants** (buyer-style entitlements) only — the download gate
already understands them, so `private` reuses that check with no new primitive. **Org/team membership
is deferred**: a deployment that needs it maps its own team model onto the same per-user grant at the
gate, so nothing here forecloses it. A first-class team object may be added later without changing the
`visibility` field or the gate's shape.

---

## 4. Anti-clone & provenance

Goes beyond today's exact-version duplicate check (a re-publish of the same `id@version` is refused).

- **Provenance = the publisher key.** The *first* signer of a body of content holds the provenance
  claim; publisher-continuity already stops a hijacked *update*. This section extends it **across
  packages**.
- **Clone signals at publish** (each a **flag**, never an auto-block — legitimate forks, CC-shared
  assets, and templates create false positives):
  - **Asset-content hashing** — a new package whose asset bytes largely match an existing package
    under a **different** publisher key.
  - **Code near-duplicate** — a normalized fingerprint (shingled hashes of the WASM/JS) whose
    similarity to another publisher's package exceeds a threshold.
  - **Name / id squatting** — a fuzzy match of `name`/`id` to an established package by a different key.
- **Developer protection.** A clone flag carries the **provenance evidence** (which earlier package,
  which publisher key, similarity score) to moderation. If the *original* is **registry-counter-signed**
  or from a **verified** publisher, a strong match **auto-quarantines** the clone; otherwise it's
  human-reviewed. Legitimate forks clear review; a verbatim re-upload under a new id does not.
- **User protection.** A surviving flag also surfaces to users — a host shows "possible clone of `X` by
  `Y`" so buyers aren't deceived.

*Decision:* a strong match against a **verified / counter-signed** original **auto-quarantines** the
clone (never auto-*blocks* — a verbatim re-upload is restored on a successful appeal, a legitimate
fork clears review). Everything weaker is human-reviewed. The similarity **thresholds** and
false-positive tolerance are **deployment-tuned**: the standard fixes the *signals* (asset-content hash
match, normalized code fingerprint, name/id fuzzy match) and the *evidence* a flag carries (which
earlier package, which publisher key, the similarity score), never the numbers.

---

## Phasing

1. **Sweep + reporting** — extend `@azphalt/azp`/`@azphalt/registry` with the sweep battery + scan
   report; add `POST /reports` and wire outcomes to the existing revocation feed. (Highest user-safety
   value, smallest new surface.)
2. **Visibility + private download** — the `visibility` field + the ACL download gate.
3. **Clone / provenance** — asset/code fingerprinting + the provenance-evidence moderation flow.

All three phases are implemented and on `main`.

## Resolved

- **Code-fingerprint algorithm** — the *signal* is normative (a normalized shingled fingerprint whose
  similarity score rides in the clone flag's evidence); the exact shingling window / hash / threshold
  and their publish-time cost are a **deployment choice**, not fixed by the standard.
- **Reporter anti-abuse** — only **trusted** reports (counter-signed host / verified account) count
  toward auto-quarantine, so mass-reporting by anonymous accounts can't trip it; untrusted reports
  queue for a human, rate-limited by IP + reporter identity (§ 2).
- **Scan report** — **folded into** the repository-API version object and **registry counter-signed**,
  not a separate artifact; hosts read it like the revocation feed (§ 1).
- **Verified publisher** — "verified" is conferred by a **registry counter-signature** (the registry
  vouches for the key). A deployment MAY layer an additional out-of-band identity check to elevate
  further, but the counter-signature is the standard's baseline for the auto-actions above.
