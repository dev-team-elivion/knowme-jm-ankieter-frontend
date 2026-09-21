#!/bin/bash
# Generuje klienta TS z kontraktu skopiowanego z backendu.
# Uzycie: ./api-generator/generate-api.sh main
set -euo pipefail

GENERATOR_KEY=${1:-main}
ROOT_DIR="$( cd "$(dirname "$0")/.." >/dev/null 2>&1 && pwd )"
API_GENERATOR_PATH="api-generator"
API_NAME="openapi"
API_YAML_PATH="$API_GENERATOR_PATH/$API_NAME.yaml"
TMP_API_PATH="$API_GENERATOR_PATH/tmp"
TMP_API_YAML_PATH="$TMP_API_PATH/$API_NAME.yaml"
DESTINATION_PATH="./src/api/generated"

cd "$ROOT_DIR"

rm -rf "$TMP_API_PATH"
mkdir -p "$TMP_API_PATH"
cp "$API_YAML_PATH" "$TMP_API_PATH"
# Generator TS nie obsluguje niektorych wzorcow z kontraktu - wycinamy je na kopii roboczej.
sed -i '' "s/.*pattern:.*/#open-api-mocker-unsupported#pattern:/" "$TMP_API_YAML_PATH" 2>/dev/null \
  || sed -i "s/.*pattern:.*/#open-api-mocker-unsupported#pattern:/" "$TMP_API_YAML_PATH"

./node_modules/.bin/openapi-generator-cli generate --generator-key "$GENERATOR_KEY"

rm -rf "$DESTINATION_PATH"/apis "$DESTINATION_PATH"/models
mkdir -p "$DESTINATION_PATH"
cp -r "$TMP_API_PATH/apis" "$DESTINATION_PATH"
cp -r "$TMP_API_PATH/models" "$DESTINATION_PATH"
cp "$TMP_API_PATH/api.ts" "$DESTINATION_PATH"
cp "$TMP_API_PATH/base.ts" "$DESTINATION_PATH"
cp "$TMP_API_PATH/common.ts" "$DESTINATION_PATH"
cp "$TMP_API_PATH/configuration.ts" "$DESTINATION_PATH"
cp "$TMP_API_PATH/index.ts" "$DESTINATION_PATH"
rm -rf "$TMP_API_PATH"

echo -e "\033[1;32m Apis and models have been copied to $DESTINATION_PATH.\033[0m"
