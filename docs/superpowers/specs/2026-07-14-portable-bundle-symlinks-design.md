# Portable `dist-server` bundle: relativize absolute symlinks

Date: 2026-07-14
Status: Approved, pending implementation
Affects: `apps/storefront/scripts/bundle.mjs`

## Problem

`apps/storefront/scripts/bundle.mjs` produces `dist-server/`, intended to be uploaded to a host
and run with `node apps/storefront/server.js`. It is not portable: every symlink in the bundle
points at an absolute path inside the build machine's repo. Off that machine, module resolution
fails.

Commit `dd8328b` claimed to fix this. It did not, and reported success while not doing so.

## Evidence

Measured against the `dist-server/` produced by the current script on Windows
(Next 15.5.18, pnpm 9.15.0):

- 23 of 23 symlinks have absolute targets, all pointing into `<repoRoot>/node_modules/.pnpm/...`.
- 23 of 23 of those targets have a real counterpart *inside* the bundle. Spot-checked that the
  counterparts are real directories, not further symlinks (e.g.
  `node_modules/.pnpm/react@18.3.1/node_modules/react` is a real directory).
- The script printed `✓ Bundle ready: ... (0 symlink(s) made relative)` — success, having
  rewritten nothing.

The second point is what makes the fix viable: every absolute link has somewhere real to point
inside the bundle. The bundle root mirrors the workspace root, so the mapping is well defined.

## Root cause

The guard is:

```js
if (isAbsolute(target) && target.startsWith(standalone + "/")) {
```

Two independent defects, either of which alone makes the branch dead code:

1. **Wrong root.** The links point under the *workspace root*, not under
   `.next/standalone`. `startsWith(standalone + ...)` is never true.
2. **Wrong separator.** `standalone + "/"` hardcodes a forward slash, but on Windows
   `standalone` is `C:\...\.next\standalone`. Even a link genuinely inside the standalone tree
   would fail this test. Path containment must be decided with `path.relative`, never string
   prefixes.

Defect 2 matters beyond this bug: it is the reason a "works on Linux" fix could still be wrong
on Windows, and vice versa.

## Design

### 1. Single source of truth for the workspace root

`bundle.mjs` imports the tracing root from the Next config rather than recomputing it:

```js
import nextConfig from "../next.config.mjs";
const workspaceRoot = nextConfig.outputFileTracingRoot;
```

`next.config.mjs` pins `outputFileTracingRoot` to the workspace root (added in #93). That value
*is* the root Next traced from, and therefore the root the standalone tree mirrors. Reading it
directly means the bundle's mapping cannot drift from the build's layout — recomputing the same
path independently in two files would reintroduce exactly the class of silent mismatch that
caused this bug.

Importing the config executes it; it only reads `process.env.NEXT_BASE_PATH` and has no side
effects. If `outputFileTracingRoot` is absent, fail immediately with a clear message rather than
falling back to a guess.

### 2. Rewrite pass

For each symlink in the bundle with an absolute target `T`:

- Compute `rel = relative(workspaceRoot, T)`.
- If `rel` escapes the workspace root (`rel` starts with `..` or is absolute), leave it and
  record it as unresolved — the validation pass will fail on it.
- Otherwise the in-bundle destination is `join(out, rel)`. Replace the link with
  `relative(dirname(linkPath), destination)`.

Relative symlinks are left alone.

### 3. Explicit symlink type

`symlinkSync(target, path, type)` must pass an explicit `'dir'` or `'file'`, chosen by stat-ing
the destination. The argument is ignored on Linux but required on Windows. Node's autodetection
is not a safe default here: it resolves a *relative* target against the process cwd rather than
the link's directory, so it would misdetect and silently create file-type links where directory
links are needed.

### 4. Postcondition validation (the actual fix)

After the rewrite pass, walk the bundle and assert, for every symlink, that it resolves to a
real path *inside* the bundle. Any violation — an absolute survivor, an escape, or a dangling
link — prints the offending links and exits non-zero.

This is the part that prevents recurrence. The regression was silent because the script reported
what it *attempted* (`0 symlink(s) made relative`) instead of verifying what it *achieved*. A
count of zero was indistinguishable from a correct no-op. Asserting the postcondition makes
"zero" impossible to misread, and makes the property the bundle actually needs — no link escapes
the bundle — the thing that gates the build.

Success output should state the verified property, not a tally of edits.

## Verification

Extracting to a different path and booting proves nothing on the build machine: the absolute
links still resolve back to the real repo, so a broken bundle boots fine locally. The test must
target the property that "different machine" depends on.

1. Copy the bundle to a temp path.
2. `realpath` every symlink; assert none resolves outside the copy. This is the portability
   property, and it is decidable locally.
3. Boot from the temp path: `PORT=8080 node apps/storefront/server.js`; assert `/` and
   `/api/download/[id]` return 200.

CI guard: the script's own postcondition check (§4) runs on every bundle, so if the Linux
runner's symlink set differs from Windows', the build fails loudly instead of shipping a broken
bundle. The fix is platform-agnostic by construction (`path.relative`, no hardcoded separators),
so no Linux-specific code path is needed.

## Non-goals

- **Dereferencing symlinks** (`verbatimSymlinks: false`). Would eliminate symlinks entirely and
  sidestep Windows symlink privileges, but `react` is linked from 5 places so it would be copied
  5 times, and pnpm link graphs contain cycles that can make a dereferencing copy walk forever.
  The measurement above settles the open question from the bug report: the links are pnpm's
  resolution mechanism, the real files are present exactly once, so preserve and relativize.
- **Flattening `node_modules`** into an npm-style hoisted tree. Reimplementing a package
  manager's hoisting is not warranted.
- Any change to `next.config.mjs`. The tracing-root pin already landed in #93.

## Risks

- **Bundle root ≠ workspace root.** The mapping assumes the standalone tree mirrors the tracing
  root. Guaranteed by the #93 pin, and enforced by §4 — if the assumption breaks, validation
  fails rather than shipping.
- **Windows symlink privileges.** Creating symlinks on Windows needs Developer Mode or admin.
  This is pre-existing behavior (the current script already calls `symlinkSync`) and is
  unchanged by this work.
