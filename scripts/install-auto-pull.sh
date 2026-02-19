#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/star-ring-capital}"
BRANCH="${BRANCH:-main}"
INTERVAL_MINUTES="${INTERVAL_MINUTES:-2}"
ALWAYS_PULL_IMAGE="${ALWAYS_PULL_IMAGE:-1}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "[install-auto-pull] please run as root"
  exit 1
fi

if [[ ! -f "$PROJECT_DIR/scripts/auto-pull-deploy.sh" ]]; then
  echo "[install-auto-pull] missing $PROJECT_DIR/scripts/auto-pull-deploy.sh"
  exit 1
fi

cat > /etc/systemd/system/src-auto-pull-deploy.service <<EOF
[Unit]
Description=Star Ring Capital Auto Pull Deploy
After=network-online.target docker.service
Wants=network-online.target

[Service]
Type=oneshot
WorkingDirectory=$PROJECT_DIR
Environment=PROJECT_DIR=$PROJECT_DIR
Environment=BRANCH=$BRANCH
Environment=ALWAYS_PULL_IMAGE=$ALWAYS_PULL_IMAGE
ExecStart=/usr/bin/env bash $PROJECT_DIR/scripts/auto-pull-deploy.sh
EOF

cat > /etc/systemd/system/src-auto-pull-deploy.timer <<EOF
[Unit]
Description=Run Star Ring Capital Auto Pull Deploy Every ${INTERVAL_MINUTES} Minutes

[Timer]
OnBootSec=90s
OnUnitActiveSec=${INTERVAL_MINUTES}min
Unit=src-auto-pull-deploy.service
Persistent=true

[Install]
WantedBy=timers.target
EOF

systemctl daemon-reload
systemctl enable --now src-auto-pull-deploy.timer
systemctl start src-auto-pull-deploy.service

echo "[install-auto-pull] Installed and started."
systemctl --no-pager status src-auto-pull-deploy.timer | sed -n '1,12p'
