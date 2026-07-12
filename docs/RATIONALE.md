# azphalt — Rationale & Research

*The evidence base behind azphalt's design: why an open, portable extension standard, why these formats, why MIT. Directional, drawn from public sources; treat download/revenue figures as order-of-magnitude. Sources at the end.*

---

## Part 1 — Extension & marketplace ecosystems

### 1.1 There are two economies, not one

"Extension marketplace" in the paint/photo world splits cleanly, and the two halves have had opposite fortunes:

| | **Assets** (brushes, materials, LUTs, stamps, 3D) | **Code plugins** (filters, effects, tools) |
|---|---|---|
| Nature | Data files | Executable code |
| Portability | Runs anywhere (it's data) | Native/host-bound |
| Market health | Thriving, mobile-inclusive, monetized | Fragmented, desktop-bound, siloed |
| Exemplar | Clip Studio Assets | Photoshop `.8bf` / Adobe Exchange |

The upshot: the asset half is where the creators, catalogs, and money already are, and it's the half an adopting app can plug into cheaply. The code half is where the genuinely novel opportunity sits, but it has to be built, not adopted. azphalt does both — import the assets, build the portable code layer.

### 1.2 The asset economy — the model to copy

- **Clip Studio Assets (CELSYS)** is almost exactly the target: Clip Studio Paint runs on Windows, macOS, iPad, iPhone, and Android, and its marketplace lets creators publish and sell brushes, pens, stamps, patterns, and 3D models, paid in an in-app currency (CLIPPY / GOLD) with payouts to a wallet, plus a tiered contributor/MVP community. A large secondary market resells the same assets on Etsy, ArtStation, and Gumroad. The closest existing proof that a mobile-inclusive paint app can sustain a monetized creator marketplace.
- **Procreate** deliberately has no code-plugin system, yet its `.brush` / `.brushset` format anchors a huge brush economy on Creative Market, Gumroad, and Etsy.
- **Formats are siloed per app.** Procreate ≠ Clip Studio ≠ Photoshop. A real marketplace review captures the cost: a buyer bought Clip Studio brushes "by mistake" wanting Procreate ones. Creators re-make and re-sell the same brush across formats; buyers get burned. **This fragmentation is the unmet need a portable format addresses** — and the reason azphalt exists.

### 1.3 Adoptable formats — consume the portable half now

Asset files are data, so they're cross-platform-safe to read. The importers normalize each into `.azp`:

| Source format | Consume? | What transfers | What's lost | Where files come from |
|---|---|---|---|---|
| `.abr` — Photoshop brushes | **Yes (priority)** | Tip shape, grain/texture, many params | Exact stroke dynamics (engine-specific) | Creative Market, Gumroad, Envato, Adobe — the universal format |
| `.brushset` / `.brush` — Procreate | **Yes (with catch)** | Shape + grain PNGs, PLIST settings | Pressure/tilt/scatter dynamics (proprietary; no 1:1) | Creative Market, Gumroad, Etsy — unlocks Android buyers |
| `.kpp` / `.bundle` — Krita | **Yes (clean)** | Full brush preset (open format) | Little (open spec) | share.krita.org (free) |
| `.gbr` / `.gih` — GIMP | **Yes (clean)** | Brush bitmap / pipe (open) | Little | GIMP repositories (free) |
| `.cube` — LUTs | **Yes (faithful)** | Full color transform (1:1) | Nothing — the data is exact | Large free + paid LUT libraries |
| G'MIC filters | **Yes (embed engine)** | The whole filter library runs on the embedded engine | — (validate the mobile embed) | G'MIC community filter repo |
| `.8bf` — Photoshop code filters | **No** | — | — | native / desktop / proprietary / insecure |
| Canva · Figma · Clip Studio · VS Code extensions | **No** | — | — | host-bound to each app's runtime |

**The caveat that governs all brush import:** you consume the portable half — shape, grain, mappable parameters — not the stroke engine. A clean 1:1 is impossible because the rendering math differs per app; imported brushes land on the target engine as a faithful-shape approximation, not a pixel-match. Framed as "import your Photoshop and Procreate brushes," that's a feature; pretended perfect, it's a bug report.

**The Android wedge:** `.brushset` files are useless outside an iPad — Android buyers are left with data their OS can't open. Importing `.brushset` unlocks brushes they already own, and nobody else serves them.

### 1.4 The code-plugin economy — mostly a cautionary tale

- **Photoshop `.8bf` is a dead end for mobile**, and it's worth being explicit about why:
  - Native compiled binaries (Windows x86/x64 DLLs, some Mac). An x86 `.8bf` crashes on ARM; it will not run on Android.
  - The API is **proprietary**; Adobe restricted the SDK license after Photoshop 6.0 (2002) specifically to stop third-party hosts from using newer APIs.
  - Building a compliant host means reimplementing dozens of Photoshop "suite" callbacks — "an enormous, ongoing compatibility maintenance burden. No open-source project has succeeded" (GIMP's own writeup). The shims that exist (PSPI, 8bf2Script) are partial or defunct.
  - **Security disaster:** PSPI runs unsigned native code — documented heap overflows, and "a maliciously crafted `.8bf` can execute arbitrary shell commands," plus older plugins exfiltrating EXIF/GPS. The antithesis of an offline / no-tracking product.
  - Despite this, `.8bf` is supported across dozens of desktop hosts, so the *library* is huge — just unreachable from Android.
- **G'MIC** is the one genuinely adoptable idea from this world: a portable, open-source **effect engine** (500+ filters) that plugs into GIMP, Krita, Paint.NET, and Photoshop through thin host adapters — one filter library, many hosts. C++ (CeCILL, GPL-family), so a mobile port is conceivable. The model to note: *bring an engine, not a binary.*
- **GIMP / Krita / Paint.NET** all have open plugin systems (Python / C / .NET DLL) — desktop-only and app-specific. Good prior art for how a host exposes extension points, not for a shared format.

Every code extension is bound to a host runtime and runs only inside it. The closed marketplaces (Clip Studio Assets, Canva) have no third-party API and license-lock assets to their own platform: shut technically and legally. That closure is the whole opening.

### 1.5 Registry & monetization blueprints (from outside paint apps)

- **Figma Community** — JS plugins, freemium as the growth default. The monetization reality is the lesson: Figma's built-in seller program is capacity-limited / not approving new sellers, so in practice creators sell via Gumroad / LemonSqueezy / a Merchant of Record, generate license keys, and validate them inside the plugin. **Takeaway: don't build a walled payment garden — keep discovery free and let creators bring their own payment + license keys.**
- **Open VSX (Eclipse Foundation)** — the blueprint for the code side. It exists because community extensions under open licenses shouldn't be locked to one vendor's restrictive marketplace terms, so Eclipse built a **vendor-neutral, open-source, self-hostable** registry that hosts the *same extension format as VS Code* — so extensions work across editors (VSCodium, Theia, Cursor) without changes. Self-hosting also fits an offline stance. This is the literal template for azphalt: MIT the API and let other apps run the same extensions.
- **Canva — external-payment baseline** *(verified on Canva's own docs)*. Canva Apps are JS apps run inside Canva's host via the Apps SDK; per Canva's docs the SDK **does not support in-app purchases** — the baseline is external payment links (the Figma model). The usage-based, Canva-handles-billing model is the **Premium Apps Program**, a *selective* program you apply into, plus **development grants** for building free apps. Canva Creators (assets/templates) pays a **usage-driven royalty pool**; Canva does **not** publish exact rates, and the circulating per-use/split figures are third-party estimates, treated here as unverified. Takeaways: external payment is the real baseline in both Figma and Canva; and Canva seeds its ecosystem by *paying developers* — a capital luxury a solo project can't match, which is why adopting open standards, not a checkbook, is the model.

### 1.6 The white space, and the plan

**White space:** no mobile paint/photo app has an open, portable, monetizable *code*-extension marketplace. Clip Studio proves the mobile *asset* marketplace; Procreate refuses code; the code worlds are all desktop and siloed. The portable mobile extension marketplace is genuinely unbuilt — that's what azphalt is.

**Plan:**
1. **Import existing asset formats now** — `.abr`, `.brushset`, `.cube`. A day-one catalog from libraries the whole internet already made, at the cost of an importer rather than an ecosystem.
2. **For the code API, copy Open VSX, not `.8bf`** — a portable JS/WASM sandbox (cross-platform + safe), and a vendor-neutral, self-hostable registry so the format can travel. Optionally integrate G'MIC as a ready-made portable effect engine.
3. **Monetization: the Figma de-facto model** — free discovery, creators bring external payment + license keys (MIT permits closed, sold extensions), or a Clip-Studio-style in-app currency later.

**Reality check:** Clip Studio Assets works because CSP had millions of users first; a marketplace with no audience attracts no creators. The code-extension marketplace is a Phase-2+ effort that follows adoption. Asset-format import is the cheap early win that helps even a tiny user base — which is why azphalt ships importers before it ships a store.

---

## Part 2 — Licensing rationale

azphalt is **MIT**. The reasoning, and how it sits against a host that isn't:

### 2.1 Why MIT for an extension standard

Every real plugin ecosystem uses permissive/weak-copyleft for its **API**, because strong copyleft there forbids proprietary and cross-app extensions. VS Code's source and extension API are MIT, and that permissiveness is *why* the ecosystem exploded and why other editors run the same extensions.

- **MIT (chosen):** anyone builds extensions, keeps them closed, sells them; any app can adopt the API and run them. Maximum ecosystem, zero friction, de-facto-standard potential. The VS Code model.
- **EPL-2.0:** also allows proprietary plugins and cross-app use, but adds file-level copyleft on the SDK itself. Choose only if guarding the framework from private forks matters more than frictionless adoption. For a young ecosystem, MIT wins.
- **AGPL was considered and rejected for anything an ecosystem builds against.** Anything built against an AGPL API inherits AGPL, which forbids proprietary/sold extensions and infects any host that runs them. It kills both ecosystem goals. (It remains the standard vehicle for *open-core dual-licensing* of an application — which is a host's concern, not the standard's.)

### 2.2 The boundary that keeps an open standard from leaking a host's moat

azphalt being MIT and open is only safe because of one rule: **the extension API exposes only *editor* extension points — operations on layers, bitmaps, the canvas — and never a host's proprietary engine.** Plugins extend the editor, not the tracking core. That is precisely *why* the API can be open (there's no secret in it) and why a host's engine can stay under whatever license it likes behind it.

Concretely, for the first host: GraffitiXR's relocalization / teleological engine stays in GraffitiXR under **PolyForm Noncommercial**; GraffitiXR adopts azphalt's MIT API across a repo boundary. A separate MIT repo *cannot reference* that engine — the boundary is structural, not a discipline. Note that the engine leaks across module lines inside a host (significant algorithm code lives beyond any single native module), which is exactly why the API is its own module with its own MIT boundary: the license line is a real code boundary, not a comment.

### 2.3 Mechanics worth carrying

- **Licensing is per-file, not per-repo.** Precedence, most-specific first: per-file SPDX header > module `LICENSE` > root `LICENSE`. Mark the open layer explicitly:

~~~
// SPDX-License-Identifier: MIT      (every file in azphalt)
~~~

- **Contributions / CLA.** Outside contributions are owned by their authors; if you may ever dual-license or commercialize a part, take a CLA (or don't accept outside contributions to that part).
- **Third-party dependencies keep their own licenses** and can't be relicensed — track them per-package.
- **"Source-available" ≠ "open source."** azphalt itself *is* OSI-open (MIT). A host that embeds a non-commercial engine is not — describe such a host accurately (*source-available; core PolyForm Noncommercial, extension layer MIT*), and keep azphalt's own MIT framing clean and separate.

---

## Sources

**Extensions / marketplace**
- Clip Studio Assets & Paint (cross-platform, marketplace, currency): assets.clip-studio.com, clipstudio.net, CLIP STUDIO ASK forum; secondary market on Etsy / ArtStation.
- Photoshop `.8bf` (format, proprietary SDK restriction, host list, incompatibility, security): Wikipedia "Photoshop plugin"; GIMP FAQ; PSFilterPdn and PhotoDemon 8bf discussions; thepluginsite.com.
- G'MIC (portable effect engine, host list): GIMP references; project docs.
- Figma Community monetization (seller-program limits, external payment + license keys, MoR): Figma Forum; Figma Help Center; payment-provider guides.
- Open VSX (vendor-neutral, open-source, self-hostable, same VS Code format): Eclipse Foundation newsroom; XDA writeup.
- Canva Apps / Creators (external-payment baseline, Premium Apps Program, royalty pool): Canva's own developer and creator docs.

**Licensing**
- MIT / EPL comparison and VS Code precedent: general licensing references; Open VSX / Eclipse.
- AGPL (dual-licensing precedent, network clause, why it's wrong for an API): gnu.org / OSI / choosealicense; FSF.
- PolyForm Noncommercial 1.0.0 (the host-side license it sits against): polyformproject.org; SPDX.

*Revenue and download figures are third-party estimates — order-of-magnitude, not audited.*

***Standing rule:** treat any per-use rate or revenue-split figure as unverified unless it comes from the platform's own documentation.*
