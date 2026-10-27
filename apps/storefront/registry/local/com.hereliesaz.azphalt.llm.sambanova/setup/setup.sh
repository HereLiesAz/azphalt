#!/usr/bin/env bash
# Setup for an azphalt kind:"llm" package (spec/llm.md § Setup).
#
# Runs only in the package's GitHub Actions sandbox, never on a device. Downloads every declared fetch
# (setup/fetches.txt: "<sha256> <name> <url>" per line), verifies each against its checksum and fails
# closed on a mismatch, then unpacks the inference runtime if there is one.
#
# Idempotent, and run before every model run: a restored Actions cache is untrusted storage
# (§ Sandbox, Weight caching), so a cached file is re-verified and replaced when it does not match.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="${AZPHALT_LLM_HOME:-$HOME/.azphalt-llm}"
fetched="$root/fetch"
runtime="$root/runtime"
mkdir -p "$fetched"

matches() { [ -f "$1" ] && [ "$(sha256sum "$1" | cut -d' ' -f1)" = "$2" ]; }

while read -r sum name url; do
  case "${sum:-#}" in \#*) continue ;; esac
  dest="$fetched/$name"
  if matches "$dest" "$sum"; then
    echo "verified $name (cached)"
    continue
  fi
  rm -f "$dest" "$dest.part"
  echo "fetching $name"
  curl -fsSL --retry 3 --retry-delay 5 --proto '=https' --proto-redir '=https' -o "$dest.part" "$url"
  if ! matches "$dest.part" "$sum"; then
    rm -f "$dest.part"
    echo "checksum mismatch for $name; refusing to continue" >&2
    exit 1
  fi
  mv "$dest.part" "$dest"
  echo "verified $name"
done < "$here/fetches.txt"

if [ -f "$fetched/runtime.tar.gz" ]; then
  rm -rf "$runtime"
  mkdir -p "$runtime"
  tar -xzf "$fetched/runtime.tar.gz" -C "$runtime" --strip-components=1
  echo "unpacked runtime"
fi
