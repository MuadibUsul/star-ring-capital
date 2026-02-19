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

if docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
else
  echo "[deploy] docker compose is required (docker compose plugin or docker-compose)"
  exit 1
fi

echo "[deploy] Starting deployment in $PROJECT_DIR"
$COMPOSE_CMD -f docker-compose.prod.yml up -d --build --remove-orphans

echo "[deploy] Services status"
$COMPOSE_CMD -f docker-compose.prod.yml ps

echo "[deploy] Done"
