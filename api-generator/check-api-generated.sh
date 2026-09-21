#!/bin/bash
# Guard: checks that src/api/generated/ matches the contract in api-generator/openapi.yaml.
#
# Regenerates the client and compares it with what is committed. The generator's output is
# deterministic, so a clean diff means the client is up to date. When the guard fails, the
# regeneration is left on disk - `git diff` then shows exactly what was missing.
set -euo pipefail

ROOT_DIR="$( cd "$(dirname "$0")/.." >/dev/null 2>&1 && pwd )"
GENERATED_PATH="src/api/generated"

cd "$ROOT_DIR"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This guard needs a git repository: it compares the generator output with the committed state." >&2
  exit 2
fi

if ! git diff --quiet -- "$GENERATED_PATH"; then
  echo "$GENERATED_PATH has uncommitted changes - commit or revert them before checking." >&2
  exit 2
fi

./api-generator/generate-api.sh main >/dev/null

if git diff --quiet -- "$GENERATED_PATH"; then
  echo "The API client is up to date with the contract."
  exit 0
fi

echo "" >&2
echo "The API client does NOT match the contract - regenerating produced a different result:" >&2
git diff --stat -- "$GENERATED_PATH" >&2
echo "" >&2
echo "The regeneration is already on disk. Review 'git diff $GENERATED_PATH' and commit it." >&2
exit 1
