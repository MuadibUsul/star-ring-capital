#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"
COMPOSE_FILE="docker-compose.prod.yml"
ROLLBACK_IMAGE_TAG="local/src-web:rollback"
WEB_HEALTH_TIMEOUT_SEC="${WEB_HEALTH_TIMEOUT_SEC:-180}"
POSTGRES_HEALTH_TIMEOUT_SEC="${POSTGRES_HEALTH_TIMEOUT_SEC:-120}"
HEALTH_POLL_INTERVAL_SEC=3

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

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "[deploy] Missing $COMPOSE_FILE in $PROJECT_DIR"
  exit 1
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD=(docker compose)
else
  echo "[deploy] docker compose v2 is required"
  echo "[deploy] Install: sudo apt-get install -y docker-compose-plugin"
  exit 1
fi

compose() {
  "${COMPOSE_CMD[@]}" -f "$COMPOSE_FILE" "$@"
}

wait_for_container_ready() {
  local cid="$1"
  local timeout_sec="$2"
  local name="$3"
  local elapsed=0

  while (( elapsed <= timeout_sec )); do
    local running
    local health

    running="$(docker inspect --format '{{.State.Running}}' "$cid" 2>/dev/null || echo false)"
    health="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$cid" 2>/dev/null || echo unknown)"

    if [[ "$running" == "true" && ( "$health" == "healthy" || "$health" == "none" ) ]]; then
      return 0
    fi

    if [[ "$health" == "unhealthy" || "$running" == "false" ]]; then
      echo "[deploy] $name state => running=$running health=$health"
      return 1
    fi

    sleep "$HEALTH_POLL_INTERVAL_SEC"
    elapsed=$((elapsed + HEALTH_POLL_INTERVAL_SEC))
  done

  return 1
}

echo "[deploy] Starting deployment in $PROJECT_DIR"
echo "[deploy] Compose command: docker compose (v2 plugin)"

PREV_WEB_CID="$(compose ps -q web || true)"
PREV_WEB_IMAGE_ID=""

if [[ -n "$PREV_WEB_CID" ]]; then
  PREV_WEB_IMAGE_ID="$(docker inspect --format '{{.Image}}' "$PREV_WEB_CID" 2>/dev/null || true)"
  if [[ -n "$PREV_WEB_IMAGE_ID" ]]; then
    docker image tag "$PREV_WEB_IMAGE_ID" "$ROLLBACK_IMAGE_TAG" >/dev/null 2>&1 || true
    echo "[deploy] Rollback snapshot saved: $ROLLBACK_IMAGE_TAG"
  fi
fi

echo "[deploy] Ensuring postgres is running"
compose up -d postgres

POSTGRES_CID="$(compose ps -q postgres || true)"
if [[ -z "$POSTGRES_CID" ]]; then
  echo "[deploy] postgres container not found"
  exit 1
fi

echo "[deploy] Waiting for postgres health (timeout: ${POSTGRES_HEALTH_TIMEOUT_SEC}s)"
if ! wait_for_container_ready "$POSTGRES_CID" "$POSTGRES_HEALTH_TIMEOUT_SEC" "postgres"; then
  echo "[deploy] postgres failed health check"
  compose logs --tail=120 postgres || true
  exit 1
fi

echo "[deploy] Pulling web image"
for i in 1 2 3; do
  if compose pull web; then
    break
  fi

  if [[ "$i" -eq 3 ]]; then
    echo "[deploy] failed to pull web image after $i attempts"
    exit 1
  fi
  echo "[deploy] pull failed, retrying in 15s (attempt $((i + 1))/3)..."
  sleep 15
done

echo "[deploy] Rolling web container"
for i in 1 2 3; do
  if compose up -d --no-deps web; then
    break
  fi

  if [[ "$i" -eq 3 ]]; then
    echo "[deploy] web up failed after $i attempts"
    exit 1
  fi

  echo "[deploy] web up failed, retrying in 15s (attempt $((i + 1))/3)..."
  sleep 15
done

WEB_CID="$(compose ps -q web || true)"

if [[ -z "$WEB_CID" ]]; then
  echo "[deploy] web container not found after up"
  exit 1
fi

echo "[deploy] Waiting for web health (timeout: ${WEB_HEALTH_TIMEOUT_SEC}s)"
if ! wait_for_container_ready "$WEB_CID" "$WEB_HEALTH_TIMEOUT_SEC" "web"; then
  echo "[deploy] web failed health check"
  compose logs --tail=120 web || true

  if [[ -n "$PREV_WEB_IMAGE_ID" ]]; then
    echo "[deploy] Rolling back web"
    SRC_WEB_IMAGE="$ROLLBACK_IMAGE_TAG" compose up -d --no-deps web || true
    compose ps
  else
    echo "[deploy] No rollback image available"
  fi

  exit 1
fi

echo "[deploy] Services status"
compose ps

echo "[deploy] Done"
