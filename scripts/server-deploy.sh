#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"
COMPOSE_FILE="docker-compose.prod.yml"

# Slow ECS + docker-compose v1 often hits API read timeout.
export DOCKER_CLIENT_TIMEOUT="${DOCKER_CLIENT_TIMEOUT:-600}"
export COMPOSE_HTTP_TIMEOUT="${COMPOSE_HTTP_TIMEOUT:-600}"

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
echo "[deploy] Pulling web image"
for i in 1 2 3; do
  if $COMPOSE_CMD -f "$COMPOSE_FILE" pull web; then
    break
  fi

  if [[ "$i" -eq 3 ]]; then
    echo "[deploy] failed to pull web image after $i attempts"
    exit 1
  fi

  echo "[deploy] pull failed, retrying in 15s (attempt $((i + 1))/3)..."
  sleep 15
done

echo "[deploy] Pulling postgres image (best effort)"
$COMPOSE_CMD -f "$COMPOSE_FILE" pull postgres || true

echo "[deploy] Starting services"
for i in 1 2 3; do
  if $COMPOSE_CMD -f "$COMPOSE_FILE" up -d --remove-orphans; then
    break
  fi

  if [[ "$i" -eq 3 ]]; then
    echo "[deploy] compose up failed after $i attempts"
    exit 1
  fi

  echo "[deploy] compose up failed, retrying in 15s (attempt $((i + 1))/3)..."
  sleep 15
done

echo "[deploy] Services status"
$COMPOSE_CMD -f "$COMPOSE_FILE" ps

echo "[deploy] Done"
