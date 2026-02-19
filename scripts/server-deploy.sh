#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

if [[ ! -f ".env" ]]; then
  echo "[deploy] Missing .env in $PROJECT_DIR"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "[deploy] docker is required"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "[deploy] docker compose plugin is required"
  exit 1
fi

echo "[deploy] Starting deployment in $PROJECT_DIR"
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

echo "[deploy] Services status"
docker compose -f docker-compose.prod.yml ps

echo "[deploy] Done"
