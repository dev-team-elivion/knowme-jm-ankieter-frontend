#!/bin/bash
# Guard: pilnuje, ze klient w src/api/generated/ odpowiada kontraktowi z api-generator/openapi.yaml.
#
# Dziala przez regeneracje i porownanie z tym, co jest w repozytorium. Wyjscie generatora jest
# deterministyczne, wiec czysty diff = klient aktualny. Lapie przypadek "zmienilem kontrakt,
# zapomnialem przegenerowac", ktory inaczej wychodzi dopiero jako blad typow w losowym miejscu.
#
# Regeneracja zostaje na dysku takze wtedy, gdy guard zapala sie na czerwono - wtedy `git diff`
# pokazuje dokladnie, czego brakowalo, i wystarczy to zacommitowac.
set -euo pipefail

ROOT_DIR="$( cd "$(dirname "$0")/.." >/dev/null 2>&1 && pwd )"
GENERATED_PATH="src/api/generated"

cd "$ROOT_DIR"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Guard wymaga repozytorium git - porownuje wynik generatora ze stanem w repo." >&2
  exit 2
fi

if ! git diff --quiet -- "$GENERATED_PATH"; then
  echo "W $GENERATED_PATH sa niezacommitowane zmiany - zacommituj je albo cofnij przed sprawdzeniem." >&2
  exit 2
fi

./api-generator/generate-api.sh main >/dev/null

if git diff --quiet -- "$GENERATED_PATH"; then
  echo "Klient API jest aktualny wzgledem kontraktu."
  exit 0
fi

echo "" >&2
echo "Klient API NIE odpowiada kontraktowi - regeneracja dala inny wynik:" >&2
git diff --stat -- "$GENERATED_PATH" >&2
echo "" >&2
echo "Regeneracja jest juz na dysku. Sprawdz 'git diff $GENERATED_PATH' i zacommituj." >&2
exit 1
