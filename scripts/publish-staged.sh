#!/usr/bin/env bash
# Staged / phased publish of ALL publishable workspace packages to npm.
#
# Publishes in BATCHES (stages) under a staging dist-tag, with a cool-down between
# each call AND between each stage, so the burst of new-package publishes stays
# under npm's per-account new-package rate limit (the thing that stalled the
# initial 27-package release). Each package goes through scripts/publish-one-retry.sh,
# so the run is idempotent (already-live versions are skipped instantly) and every
# publish still gets E429 backoff. When the staged versions verify, promote them to
# `latest` with scripts/promote-latest.sh.
#
# Env (all optional):
#   STAGE_SIZE        packages per stage           (default 5)
#   STAGE_COOLDOWN    seconds between stages        (default 120)
#   PUBLISH_COOLDOWN  seconds between each call     (default 30)
#   PUBLISH_TAG       dist-tag to stage under       (default "staging")
#   NODE_AUTH_TOKEN   npm auth (setup-node wires it into .npmrc)
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

STAGE_SIZE="${STAGE_SIZE:-5}"
STAGE_COOLDOWN="${STAGE_COOLDOWN:-120}"
export PUBLISH_COOLDOWN="${PUBLISH_COOLDOWN:-30}"
export PUBLISH_TAG="${PUBLISH_TAG:-staging}"

mapfile -t PKGS < <(node "$SCRIPT_DIR/publishable.mjs")
[ "${#PKGS[@]}" -gt 0 ] || { echo "::error::no publishable packages found"; exit 1; }

echo "Staged publish → ${#PKGS[@]} packages · stage size ${STAGE_SIZE} · tag '${PUBLISH_TAG}' · ${PUBLISH_COOLDOWN}s/call · ${STAGE_COOLDOWN}s/stage."

rc=0
i=0
stage=1
for pkg in "${PKGS[@]}"; do
  # At each stage boundary (after the first stage), cool down before the next batch.
  if [ "$i" -gt 0 ] && [ $((i % STAGE_SIZE)) -eq 0 ]; then
    stage=$((stage + 1))
    echo "::group::Stage boundary — cooling down ${STAGE_COOLDOWN}s before stage ${stage}"
    sleep "$STAGE_COOLDOWN"
    echo "::endgroup::"
  fi
  echo "--- [$((i + 1))/${#PKGS[@]}] stage ${stage}: ${pkg} ---"
  bash "$SCRIPT_DIR/publish-one-retry.sh" "$pkg" || rc=1
  i=$((i + 1))
done

if [ "$rc" -eq 0 ]; then
  echo "✓ staged publish complete under '${PUBLISH_TAG}'. Verify, then promote to latest:  scripts/promote-latest.sh"
else
  echo "::warning::some packages failed to publish; the run is idempotent — re-run to resume."
fi
exit $rc
