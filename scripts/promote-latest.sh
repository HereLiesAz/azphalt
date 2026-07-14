#!/usr/bin/env bash
# Promote each publishable package's current version from a staging dist-tag to
# `latest` on npm — the second half of a staged release (after scripts/publish-staged.sh
# has published under the staging tag and you've verified the versions).
#
# Uses `npm dist-tag add` (pnpm has no dist-tag command); it retags an already-
# published version, so it does NOT create a new package and is not subject to the
# new-package rate limit. Cools down between calls anyway to be gentle on the registry.
#
# Env (all optional):
#   PUBLISH_COOLDOWN  seconds between calls   (default 15)
#   NODE_AUTH_TOKEN   npm auth (setup-node wires it into .npmrc)
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"
COOLDOWN="${PUBLISH_COOLDOWN:-15}"

mapfile -t ROWS < <(node "$SCRIPT_DIR/publishable.mjs" --versions)
[ "${#ROWS[@]}" -gt 0 ] || { echo "::error::no publishable packages found"; exit 1; }

echo "Promoting ${#ROWS[@]} package(s) to 'latest' (${COOLDOWN}s between calls)."
rc=0
first=1
for row in "${ROWS[@]}"; do
  [ "$first" -eq 0 ] && sleep "$COOLDOWN"
  first=0
  echo "=== npm dist-tag add ${row} latest ==="
  if ! npm dist-tag add "$row" latest --registry=https://registry.npmjs.org; then
    echo "::warning::failed to promote ${row}"
    rc=1
  fi
done

[ "$rc" -eq 0 ] && echo "✓ promoted all ${#ROWS[@]} package(s) to latest." || echo "::warning::some promotions failed; re-run to retry."
exit $rc
