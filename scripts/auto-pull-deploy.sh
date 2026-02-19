#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/star-ring-capital}"
BRANCH="${BRANCH:-main}"

if ! command -v git >/dev/null 2>&1; then
  echo "[auto-pull] git is required"
  exit 1
fi

if [[ ! -d "$PROJECT_DIR/.git" ]]; then
  echo "[auto-pull] $PROJECT_DIR is not a git repository"
  exit 1
fi

cd "$PROJECT_DIR"

if [[ ! -f ".env" ]]; then
  echo "[auto-pull] Missing .env in $PROJECT_DIR"
  exit 1
fi

echo "[auto-pull] Fetching origin/$BRANCH"
git fetch origin "$BRANCH"

LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git rev-parse "origin/$BRANCH")"

if [[ "$LOCAL_SHA" == "$REMOTE_SHA" ]]; then
  echo "[auto-pull] No updates, skip."
  exit 0
fi

echo "[auto-pull] Updating $LOCAL_SHA -> $REMOTE_SHA"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "[auto-pull] Running deployment script"
bash scripts/server-deploy.sh

echo "[auto-pull] Deployment completed"
