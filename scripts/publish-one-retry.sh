#!/usr/bin/env bash
# Publish a SINGLE workspace package to npm via pnpm — idempotently, with backoff
# on npm's new-package rate limit (E429), a configurable cool-down between calls,
# and an optional dist-tag (for staged releases).
#
# The initial release published 26/27 packages fine and then tripped npm's rate
# limit on the last new-package name; blindly re-running the whole release just
# re-attempts it immediately and re-trips the limit. This publishes one package,
# skipping it if its current version is already live, and backs off on E429.
#
# Everything goes through pnpm (`pnpm publish` / `pnpm view`) — the workspace's
# package manager — so no bare npm CLI is invoked. NOTE: npm's rate limit is
# enforced by the *registry/account*, not the CLI, so pnpm and yarn publish to the
# same registry.npmjs.org and hit the same limit. The cool-downs here (not a CLI
# swap) are what actually keep a burst of publishes under the limit.
#
# Usage:  scripts/publish-one-retry.sh @azphalt/sdk
# Env:    NODE_AUTH_TOKEN   must be set (setup-node wires it into .npmrc).
#         PUBLISH_COOLDOWN  seconds (default 0) — a floor on the wait before each
#                           attempt, so back-to-back calls stay spaced.
#         PUBLISH_TAG       npm dist-tag to publish under (default "latest"); set
#                           to e.g. "staging" for a staged release, then promote.
set -uo pipefail

PKG="${1:?usage: publish-one-retry.sh <package-name>}"
COOLDOWN="${PUBLISH_COOLDOWN:-0}"
TAG="${PUBLISH_TAG:-latest}"

# The local (to-be-published) version, read from the package's own package.json.
LOCAL_VERSION=$(pnpm --filter "$PKG" exec node -p "require('./package.json').version" 2>/dev/null | tail -n1)

# `live` = this exact version is already on the registry (idempotency across version
# bumps). Cached in CURRENT_VERSION so callers avoid a second `pnpm view`.
CURRENT_VERSION=""
live() {
  if [ -n "$LOCAL_VERSION" ]; then
    CURRENT_VERSION=$(pnpm view "$PKG@$LOCAL_VERSION" version 2>/dev/null | tail -n1)
  else
    CURRENT_VERSION=$(pnpm view "$PKG" version 2>/dev/null | tail -n1)
  fi
  [ -n "$CURRENT_VERSION" ]
}

if live; then
  echo "✓ $PKG@${LOCAL_VERSION:-?} is already published; nothing to do."
  exit 0
fi

# Seconds to wait before each attempt. PUBLISH_COOLDOWN is a floor (so even the
# first attempt is spaced from a prior call when asked); the E429 backoff grows on
# top. ~36 min total backoff budget before giving up.
delays=(0 60 180 420 600 900)
attempt=0
for d in "${delays[@]}"; do
  wait="$d"
  [ "$COOLDOWN" -gt "$wait" ] && wait="$COOLDOWN"
  if [ "$wait" -gt 0 ]; then
    echo "::group::Cooling down ${wait}s before publishing $PKG (attempt $((attempt + 1)))"
    sleep "$wait"
    echo "::endgroup::"
    # A parallel/previous run may have landed it while we waited.
    if live; then echo "✓ $PKG@$CURRENT_VERSION became live during the wait."; exit 0; fi
  fi
  attempt=$((attempt + 1))
  echo "=== attempt ${attempt}: pnpm publish ${PKG} (tag: ${TAG}) ==="
  if pnpm --filter "$PKG" publish --no-git-checks --access public --tag "$TAG"; then
    echo "✓ published $PKG@${LOCAL_VERSION:-?} under '$TAG'"
    exit 0
  fi
  echo "attempt ${attempt} failed (likely E429 rate limit); will back off and retry."
done

if live; then echo "✓ $PKG is live after all."; exit 0; fi
echo "::error::$PKG still not published after ${attempt} attempts. npm's new-package rate limit is persisting — wait a few hours (or until tomorrow) and run this again."
exit 1
