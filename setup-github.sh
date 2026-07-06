#!/usr/bin/env bash
# First-time GitHub push helper.
# Run from inside the project after creating an empty repo on github.com.
#
# Usage:
#   bash setup-github.sh BSinghOP/portfolio
#
# Replace BSinghOP/portfolio with your actual repo path.

set -e

if [ -z "$1" ]; then
  echo "Usage: bash setup-github.sh <user>/<repo>"
  echo "Example: bash setup-github.sh BSinghOP/portfolio"
  exit 1
fi

REPO="$1"

if [ -d .git ]; then
  echo "Already a git repo. Skipping init."
else
  git init -b main
fi

git add .
git commit -m "initial commit" || echo "Nothing to commit."

git remote remove origin 2>/dev/null || true
git remote add origin "git@github.com:$REPO.git"

echo ""
echo "Remote set to: git@github.com:$REPO.git"
echo "Now run: git push -u origin main"
