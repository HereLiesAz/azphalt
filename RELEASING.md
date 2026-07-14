# Releasing

The `@azphalt/*` packages are versioned and published with [Changesets](https://github.com/changesets/changesets). Versions move together loosely: each package is independent, but internal `workspace:*` deps are rewritten to real versions at publish time.

## Day to day: add a changeset with your PR

When a change should ship in a release, record it:

~~~sh
pnpm changeset
~~~

Pick the affected packages, choose the bump (`patch` / `minor` / `major`), and write a one-line summary. This creates a markdown file under `.changeset/` — commit it with your PR. A PR with no user-facing package change needs no changeset.

## The release flow (automated)

`.github/workflows/release.yml` runs on every push to `main`:

1. **Accumulate.** While unreleased changesets exist, the workflow opens (and keeps updating) a **"Version Packages"** PR that applies the bumps and writes each package's `CHANGELOG.md`.
2. **Publish.** When you merge that PR, the same workflow builds, tests, and runs `changeset publish`, pushing every bumped package to npm and tagging the release.

Nothing publishes off a normal feature-branch merge — only the Version Packages PR triggers a publish.

## First-time setup (the human steps)

Publishing needs an npm account and a scope this repo can't (and must not) create for you. Do these once:

1. **Create the `@azphalt` org on npmjs.com** so the scoped names are yours. On npmjs.com: your avatar → **Add Organization** → name it `azphalt` → the **Free** plan (unlimited *public* packages). This reserves `@azphalt/*`. Without the org, the first `@azphalt/x` publish fails with "scope not found". *(A package itself is not created on the website — it is created the first time it's published.)* `create-azphalt` is unscoped and published under your user, no org needed.
2. **Add the `NPM_AUTH_TOKEN` repo secret** — an npm **automation** access token (npmjs.com → **Access Tokens** → Generate New Token → *Automation*; or a Granular token with read+write on the `@azphalt` scope and "create new packages") for an account that's a member of the `azphalt` org. Automation tokens bypass 2FA, which CI needs. The workflow maps it to `NODE_AUTH_TOKEN` at publish time.

Until both exist, the versioning half still works (the Version Packages PR opens normally); only the final `changeset publish` can't authenticate. All scoped packages carry `publishConfig.access: "public"` (and `.changeset/config.json` sets `access: "public"`), so they publish public without an extra flag.

Once both are in place, publish by merging the Version Packages PR, or run the **Release** workflow manually (Actions → Release → **Run workflow**) — it's `workflow_dispatch`-enabled so the first publish and any retry are one click, no dummy commit needed.

## Manual release (fallback)

With npm authenticated in the environment (`npm login`, or `NODE_AUTH_TOKEN` set):

~~~sh
pnpm run version   # apply pending changesets → bump versions + changelogs + refresh the lockfile
pnpm run release   # build + test + changeset publish
~~~

Use `pnpm run version` (not bare `pnpm version`, which is pnpm's own version command). The `version` script also runs `pnpm install --lockfile-only` after bumping, so `pnpm-lock.yaml` stays in sync and CI's `--frozen-lockfile` install doesn't fail.

Private packages (the `apps/*`, e.g. `@azphalt/storefront`) are never published — Changesets skips any package marked `private` automatically.
