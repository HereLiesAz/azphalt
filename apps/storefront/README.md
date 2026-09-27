# @azphalt/storefront — the catalog

This package is **azphalt.store's catalog**: the git-pinned registry under [`registry/`](registry) and the
scripts that build and verify it. It has no server of its own. The store that serves the catalog is
[`apps/storefront-react`](../storefront-react) (the UI) and [`apps/storefront-worker`](../storefront-worker)
(the Cloudflare Worker: Repository API, purchases, publishing, docs).

> **History.** This directory used to be a Next.js storefront, the flagship deployment on Vercel. It was
> retired once the Cloudflare Worker reached parity (ratings, reports, moderation, per-app pages, legal
> pages, publishing). What remains is the part everything else is built from: the catalog.

| Path | What it is |
|---|---|
| [`registry/sources.json`](registry/sources.json) | The lockfile: every extension, pinned to one commit, with the integrity of its unsigned `.azp`. |
| [`registry/local/`](registry/local) | First-party header packages (packs, host listings, MCP headers) authored in this repo. |
| [`registry/packages/`](registry/packages) | The built `.azp` bytes, committed. Free downloads redirect here. |
| [`registry/catalog.json`](registry/catalog.json) | The index of what was built. |
| [`registry/previews/`](registry/previews) + `previews.json` | Rendered preview images (`build-previews`). |
| [`registry/publishers.json`](registry/publishers.json) | Publisher keys pinned by `POST /packages` (`apps/storefront-worker/src/publish.ts`). |
| [`scripts/build-catalog.ts`](scripts/build-catalog.ts) | Builds and verifies the catalog from `sources.json`, `registry/local/` and `submissions/`. |
| [`scripts/build-previews.ts`](scripts/build-previews.ts) | Renders package previews with the reference runtime. |

## The catalog comes from git, not a database

The store serves the `.azp` packages committed under [`registry/packages/`](registry), built from the
commit-pinned sources in [`registry/sources.json`](registry/sources.json). The store's build exports them into a static
`catalog.json` (`apps/storefront-react/scripts/export-catalog.mjs`) that the Worker serves.

~~~sh
pnpm --filter @azphalt/storefront build-catalog                     # build + verify against the lockfile
pnpm --filter @azphalt/storefront build-catalog --update            # build at the pinned shas, re-pin integrity
pnpm --filter @azphalt/storefront build-catalog --update --latest   # also move every ref to its default-branch head
pnpm --filter @azphalt/storefront build-catalog --update --only <id>  # one source, leaving its siblings in place
~~~

**The registry needs no durable storage, because nothing is written at runtime.** Publishing used to
happen over a runtime `POST /api/publish` in the retired Next.js storefront — one HTTP request, landing
in one serverless instance's memory, and lost when it recycled.

Publishing at **build time** removes the requirement rather than satisfying it. There is no write to
lose and nothing for instances to disagree about, and durability comes from git — a stronger guarantee
than a database offers, because the store's contents are a reviewable diff, reproducible from source,
and cannot change without a commit.

`integrity` in the lockfile is the sha256 of the **unsigned** `.azp` (a signature is a detached
addition, so it does not perturb the digest). `build-catalog` fails on mismatch, and
`deploy-storefront` re-derives the committed bytes from their pinned commits before shipping, refusing
a catalog that differs from the one that was reviewed.

### Changing what the store serves is a merged PR

The `registry-sync` workflow rebuilds the packages and opens a PR when anything moved. **Merging that
PR is the publish step**; `deploy-storefront` then takes it live. The gate on a plugin update is a
GitHub review, not an API call. Neither workflow is committed in this repository: both are maintained
centrally in `HereLiesAz/workflows` (see [`RELEASING.md`](../../RELEASING.md)).

It runs in one of two modes, because adding an extension and following an existing one upstream are
different operations:

| Mode | Flags | What moves |
| --- | --- | --- |
| `pinned` | `--update` | Builds every source at the sha the lockfile **already pins**. No ref changes. |
| `latest` | `--update --latest` | Re-resolves every source to its default-branch head first, then builds. |

`pinned` is what publishes a **newly added** extension. Adding one is a lockfile edit — the PR appends
an entry to `sources.json` — so its bytes do not exist under `registry/packages/` until a sync builds
them. A `pinned` run adds exactly the missing packages and leaves all the existing pins (154 entries in `sources.json` at the time of writing) alone, which
keeps the reviewable diff about the thing that changed.

`latest` is how upstream extension updates get noticed, and necessarily touches every pin.

Which trigger picks which is fixed in the workflow, not passed in — each trigger has one right answer,
so no dispatch payload can talk a run out of the guarantee its trigger exists to provide:

| Trigger | Mode | Why |
| --- | --- | --- |
| Push to `main` touching `sources.json` | `pinned` | The lockfile just changed deliberately; publish exactly what it now says. |
| `repository_dispatch` (`extension-updated`) | `latest` | An extension repo is reporting that it moved. |
| Daily schedule | `latest` | The catch-all sweep for repos that never wired the dispatch. |
| Manual **Run workflow** | your choice, default `pinned` | |

The push trigger means **adding an extension publishes itself**: merge the PR that appends to
`sources.json` and the sync runs on its own. It cannot recurse — a `pinned` run's PR touches only
`packages/` and `catalog.json`, so merging it does not match the path filter, and a `latest` run's PR
does re-pin `sources.json` but the `pinned` run that follows finds the catalog already matching and
exits without opening anything.

## Test

~~~sh
pnpm --filter @azphalt/storefront test        # build-catalog's fetch/retry behaviour
pnpm --filter @azphalt/storefront typecheck
~~~

## License

Apache-2.0, as the rest of the repository. The packages in the catalog carry their own licences.
