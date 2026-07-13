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

## The one human step: the npm token

Publishing needs credentials this repo does not (and must not) contain. A maintainer sets one repository secret once:

- **`NPM_TOKEN`** — an npm *automation* access token for an account with publish rights to the `@azphalt` scope.

Until it is set, the versioning half still works (the Version Packages PR opens normally); only the final `changeset publish` cannot authenticate. All scoped packages carry `publishConfig.access: "public"` (and `.changeset/config.json` sets `access: "public"`), so they publish public without an extra flag.

## Manual release (fallback)

With a valid `NPM_TOKEN`/npm login in the environment:

~~~sh
pnpm run version   # apply pending changesets → bump versions + changelogs + refresh the lockfile
pnpm run release   # build + test + changeset publish
~~~

Use `pnpm run version` (not bare `pnpm version`, which is pnpm's own version command). The `version` script also runs `pnpm install --lockfile-only` after bumping, so `pnpm-lock.yaml` stays in sync and CI's `--frozen-lockfile` install doesn't fail.

Private packages (the `apps/*`, e.g. `@azphalt/storefront`) are never published — Changesets skips any package marked `private` automatically.
