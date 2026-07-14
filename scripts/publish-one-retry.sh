#!/usr/bin/env bash
# Publish a SINGLE workspace package to npm, with backoff on npm's new-package
# rate limit (E429). The initial release published 26/27 packages fine and then
# tripped npm's rate limit on the last new-package name; blindly re-running the
# whole release just re-attempts it immediately and re-trips the limit. This
# retries that one package with growing waits inside a single run, giving the
# limit time to clear.
#
# Usage:  scripts/publish-one-retry.sh @azphalt/sdk
# Env:    NODE_AUTH_TOKEN must be set (setup-node wires it into .npmrc).
set -uo pipefail

PKG="${1:?usage: publish-one-retry.sh <package-name>}"

live() { npm view "$PKG" version >/dev/null 2>&1; }

if live; then
  echo "✓ $PKG is already published ($(npm view "$PKG" version)); nothing to do."
  exit 0
fi

# Seconds to wait before each attempt (first is immediate). ~36 min total budget.
delays=(0 60 180 420 600 900)
attempt=0
for d in "${delays[@]}"; do
  if [ "$d" -gt 0 ]; then
    echo "::group::Waiting ${d}s for npm's rate limit to clear before retrying $PKG"
    sleep "$d"
    echo "::endgroup::"
    # A parallel/previous run may have landed it while we waited.
    if live; then echo "✓ $PKG became live during the wait ($(npm view "$PKG" version))."; exit 0; fi
  fi
  attempt=$((attempt + 1))
  echo "=== attempt ${attempt}: pnpm publish ${PKG} ==="
  if pnpm --filter "$PKG" publish --no-git-checks --access public; then
    echo "✓ published $PKG"
    exit 0
  fi
  echo "attempt ${attempt} failed (likely E429 rate limit); will back off and retry."
done

if live; then echo "✓ $PKG is live after all."; exit 0; fi
echo "::error::$PKG still not published after ${attempt} attempts. npm's new-package rate limit is persisting — wait a few hours (or until tomorrow) and run this workflow once more."
exit 1
