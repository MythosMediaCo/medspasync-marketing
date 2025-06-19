#!/bin/sh
set -e
BASE_URL="https://rsms.me/inter/font-files"
DEST="$(dirname "$0")/../public/fonts"
mkdir -p "$DEST"
for weight in 400 500 600 700 800; do
  file="inter-v19-latin-${weight}.woff2"
  url="$BASE_URL/Inter-${weight}.woff2"
  curl -fL "$url" -o "$DEST/$file"
  echo "$file downloaded"
 done
sha256sum "$DEST"/*.woff2

