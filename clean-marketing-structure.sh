#!/bin/bash

echo "🧹 Cleaning up unused folders and files..."

# Remove legacy static folders
rm -rf about pricing support features demo contact privacy terms public

# Optional: merge tailwind.css into index.css if not already done
if grep -q "@tailwind base;" styles/tailwind.css 2>/dev/null; then
  echo "🪄 Merging tailwind.css into index.css..."
  cat styles/tailwind.css >> src/index.css
  rm -f styles/tailwind.css
fi

# Move codex helpers to a dedicated scripts folder
mkdir -p scripts
mv codex-* scripts/ 2>/dev/null

echo "✅ Cleanup complete. Your project structure is now optimized."
