#!/bin/bash
# MythosMediaCo – DevTools
# Generates Codex-safe diffs and other future tools

echo "📦 Generating Codex-safe diff..."
{
  echo "### 🧠 Codex-Safe Diff"
  echo "Assets added (not included):"
  echo "- favicon.ico"
  echo "- apple-touch-icon.png"
  echo "- assets/og-image.png"
  echo
  echo "HTML/CSS/JS diff:"
  git diff -- '*.html' '*.css' '*.js'
} > codex-diff.txt

echo "✅ Saved to codex-diff.txt"
