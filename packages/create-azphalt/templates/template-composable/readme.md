# My Composable

An azphalt **composable-set** package (`kind: "composable"`) — a signed header describing one or
more UI elements for a host's own already-compiled renderer to build. It carries **no code and no
new template ids**: every `templateId` in this package must come from a template library your host
app links at build time (e.g. a Gradle `implementation("group:artifact:x.y.z")`). A host that never
linked that library simply fails to resolve the id — a missing-dependency error, not a security
question. See the [composable spec](https://azphalt.org/specs/composable).

## What's here

- **`manifest.json`** — the only real content. Edit the `composable` block:
  - `library` — the `group`/`artifact`/`version` of the template library your `templateId` values
    come from. Purely descriptive — azphalt never fetches or resolves it.
  - `elements[]` — one or more UI elements. Each declares:
    - `templateId` — an id the named library provides.
    - `hue` / `surface` / `scale` — your host's own design-token values (color role, shape,
      type-scale step). Open vocabulary — use whatever your host's token system calls them.
    - `act` — what the element does (e.g. `create`, `delete`, `send`).
    - `jobs` — a plain-language, checkable list of what the element is actually *for*. This is the
      accountability line: write down the job(s) so a reviewer (or you, later) can check the
      element against its own claim.
- **`build.js`** — packages the header into a `.azp` (no code, no assets — just the manifest +
  LICENSE).
- **`LICENSE`** — SPDX-identified license text.

## Build

~~~sh
npm install
npm run build        # → my-composable-1.0.0.azp
~~~

Then sign it (see `SIGNING.md`) and upload it to a repository — or drop it on the storefront's
**Publish** page.
