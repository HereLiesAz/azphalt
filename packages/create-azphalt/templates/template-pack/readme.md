# My Starter Pack

An azphalt **extension pack** (`kind: "pack"`) — a signed header that *references* other packages so a
host can install a curated set in one step: a **base set** for your app, or a **recommended** bundle.
A pack references packages by id — including ones **you didn't create** — and never re-bundles their
bytes; each member is resolved and free/paid-gated individually on install. See the
[pack spec](https://azphalt.org/specs/pack).

## What's here

- **`manifest.json`** — the only real content. Edit the `pack` block:
  - `entries[]` — the member packages. Each is `{ id, version?, required?, note? }`:
    - `id` — the member's reverse-DNS id (any author's package).
    - `version` — pin an exact version, or omit to track the member's **latest**.
    - `required` — `true` = part of the **base set** (installed with the pack); omit / `false` =
      **recommended** (offered for the user to opt into).
    - `note` — a short reason shown beside the member.
  - `targetApps` — scope the pack to your app's id so it shows as *your* base set (omit to make it global).
- **`build.js`** — packages the header into a `.azp` (no code, no assets — just the manifest + LICENSE).
- **`LICENSE`** — SPDX-identified license text.

## Build

~~~sh
npm install
npm run build        # → my-starter-pack-1.0.0.azp
~~~

Then upload it to a repository — or drop it on the storefront's **Publish** page. A host installs it via
`@azphalt/repository-client`'s `resolvePack(id)` → download each member.

> **Shipping the pack pre-installed?** Because an `.azp` is just a signed archive, you can also bundle
> the member packages' bytes in your app and load them at startup with `readAzp` — no network needed —
> using this pack manifest as the list of what to include. Pack = the "which extensions" list; your app
> chooses bundle-now vs. fetch-on-first-run.
