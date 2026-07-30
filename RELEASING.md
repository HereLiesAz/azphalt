# Releasing

There are **two independent version schemes** in this repository, and they are not the same thing:

- **The apps** — the Android store app, the desktop builds, and the web store — share one version, `a.b.c.d`, held in [`version.properties`](version.properties). See § Versioning the apps below.
- **The npm packages** (`@azphalt/*`, `create-azphalt`) are versioned per-package by Changesets. Everything from § Day to day onwards is about those.

Nothing links the two. A package release does not move `version.properties`, and a build does not move a package version.

## Versioning the apps

`version.properties` at the repository root is the single source of truth. Format `a.b.c.d`:

| | Name | Who moves it | When |
|---|---|---|---|
| `a` | major | **The owner, by hand.** Nothing automated ever touches it. | A deliberate decision. |
| `b` | minor | An agent or a contributor, deliberately. Resets `c` to 0. | A feature or a function was added. |
| `c` | patch | Automatic. | Every compile. |
| `d` | build | Automatic. **Never resets.** | Every compile. |

Everything that reports a version reads it from that file: the Android `versionName`, the Android `versionCode` (which is `d` alone), the Gradle project version, the desktop installers, and the version shown in the web store's footer. Nothing hardcodes a version anywhere else — if you find one, it is a bug.

`d` is `versionCode` because Play requires that number to increase monotonically forever and accepts each value exactly once. `d` never resets and never decreases by construction; anything derived from `a.b.c` goes backwards the moment a component resets.

### The commands

`tools/version.mjs` is the only thing that writes the file. Do not hand-edit it.

~~~sh
node tools/version.mjs print          # 0.1.2.7
node tools/version.mjs print --code   # 7   (the Android versionCode)
node tools/version.mjs bump           # c + 1, d + 1        — what a compile does
node tools/version.mjs bump --minor   # b + 1, c = 0, d + 1 — a feature was added
node tools/version.mjs bump --major   # a + 1, b = 0, c = 0, d + 1 — owner only
node tools/version.mjs check          # validate the file
~~~

### When bumps happen

- **Locally**, any Gradle invocation that compiles bumps `c` and `d` before reading them, so the artifact carries the version that build produced. `./gradlew tasks`, `clean`, `--dry-run` and IDE syncs do not. The bump shells out to `tools/version.mjs`; if node is not on `PATH` it warns and builds at the committed version rather than failing.
- **In CI**, `AZPHALT_VERSION_FROZEN=1` disables that, and `.github/workflows/debug-apk.yml` bumps exactly once per run instead. A run invokes Gradle several times — the wasm bundle, the APK, the verifier tests — and per-invocation bumps would make one commit produce a store and an app claiming different versions. One bump per run means every artifact from it agrees.
- **After a feature lands**, run `bump --minor` in the same change that adds it. That is the only bump a human or an agent performs by hand.

### The debug APK

`.github/workflows/debug-apk.yml` runs on every push to `main`. It bumps the version, builds `assembleDebug`, commits `version.properties` back to `main`, tags `v<a.b.c.d>`, and publishes the APK as a **prerelease** named for its version.

Two things about that loop worth knowing:

- It pushes to the branch it triggers on. It does not recurse because pushes made with `GITHUB_TOKEN` do not trigger workflows; the `[skip ci]` in the commit message is a second belt. That also means CI does not run on the version commit, which is intended — it changes four digits.
- The commit lands **before** the tag, so `v0.1.2.7` always points at a tree that says `0.1.2.7`. A tag that disagreed with the file would make the file untrustworthy, which is the one thing it cannot be.

The APK is debug-signed with the automatically-generated debug key. It installs for testing and can never be updated to or from a Play build, because Android refuses an install whose signature differs from the installed app's.

## The npm packages

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
2. **Add the `NPM_AUTH_TOKEN` repo secret** — an npm **automation** access token for an account that's a member of the `azphalt` org. Simplest: npmjs.com → **Access Tokens** → Generate New Token → **Classic → Automation** — an account-wide token that covers **both** the scoped `@azphalt/*` packages **and** the unscoped `create-azphalt`. If you'd rather use a **Granular** token, it must grant read+write to **both** the `@azphalt` scope **and** the `create-azphalt` package (a scope-only grant won't publish the unscoped `create-azphalt`), plus permission to create new packages. Automation tokens bypass 2FA, which CI needs; the workflow maps it to `NODE_AUTH_TOKEN` at publish time.

Until both exist, the versioning half still works (the Version Packages PR opens normally); only the final `changeset publish` can't authenticate. All scoped packages carry `publishConfig.access: "public"` (and `.changeset/config.json` sets `access: "public"`), so they publish public without an extra flag.

Once both are in place, publish by merging the Version Packages PR, or run the **Release** workflow manually (Actions → Release → **Run workflow**) — it's `workflow_dispatch`-enabled so the first publish and any retry are one click, no dummy commit needed.

## Recovering a partial release (npm's new-package rate limit)

npm rate-limits the **creation of new package names** per account (an anti-spam measure). Publishing a whole scope for the first time — every `@azphalt/*` name plus `create-azphalt` — creates many new packages at once and can trip this limit partway through: most publish, then the next `PUT` starts returning

~~~
npm error code E429
429 Too Many Requests - Could not publish, as user undefined: rate limited exceeded
~~~

This is **not** an auth failure. The tarball packs, the token authenticates, the request reaches the registry — the registry is deferring the *new-name* creation. ("user undefined" is just npm's generic 429 wording.) The already-published packages are fine; only the not-yet-created names are blocked, and the cooldown window can be **hours**, not minutes.

Re-running the full **Release** workflow is the wrong fix: it re-attempts the blocked name immediately and re-trips the limit. Instead, publish the missing package **alone, with backoff**:

- **`.github/workflows/publish-package.yml`** ("Publish single package (retry)") publishes ONE package, short-circuiting if it's already live and otherwise retrying with growing waits (0 / 60 / 180 / 420 / 600 / 900 s) so the limit can clear inside a single run. It runs automatically on every push to `main` (defaulting to `@azphalt/azdk`, the keystone dependency) and is also `workflow_dispatch`-able for any package: **Actions → "Publish single package (retry)" → Run workflow**, set `package`.
- It's a **no-op once the target is live**, so it's safe as a standing self-heal guard: any later push to `main` re-attempts a still-missing package for free.

If a single backoff run still exhausts on E429, the window is on a longer (multi-hour) span — wait a few hours (or until the next day) and run it once more. The underlying script is **`scripts/publish-one-retry.sh`**.

## Manual release (fallback)

With npm authenticated in the environment (`npm login`, or `NODE_AUTH_TOKEN` set):

~~~sh
pnpm run version   # apply pending changesets → bump versions + changelogs + refresh the lockfile
pnpm run release   # build + test + changeset publish
~~~

Use `pnpm run version` (not bare `pnpm version`, which is pnpm's own version command). The `version` script also runs `pnpm install --lockfile-only` after bumping, so `pnpm-lock.yaml` stays in sync and CI's `--frozen-lockfile` install doesn't fail.

Private packages (the `apps/*`, e.g. `@azphalt/storefront`) are never published — Changesets skips any package marked `private` automatically.
