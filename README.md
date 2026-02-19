# Star Ring Capital (星环资本)

高端金融品牌官网 + 可视化后台 + 实时预览，技术栈：Next.js 16 + React 19 + TypeScript + TailwindCSS + shadcn/ui + Payload CMS v3 + PostgreSQL。

## 1. 核心能力

- 品牌定位：Private Capital Structure Office（私域资本结构办公室）
- 前台：黑金极简风、可扩展机构化信息架构
- 后台：Payload Admin 登录鉴权、Blocks 拖拽编辑、Live Preview 实时预览
- 主题系统：`Theme Settings (Global)` 可直接改配色/字体/按钮/Logo/环形光轨参数
- 数据模型：
  - `Pages`（含 slug、SEO、Blocks）
  - `TrajectoryData`（3Y/1Y/YTD 曲线 + 指标 + 合规提示）
  - `EngagementCases`（战略战役叙事）
  - `Research`（未来扩展）
  - `Users`、`Media`
  - `Site Settings`、`Theme Settings`（Globals）

## 2. 已实现页面

- Home (`/`)
- Philosophy (`/philosophy`)
- Capital Domains (`/capital-domains`)
- Capital Trajectory (`/capital-trajectory`)
- Risk Architecture (`/risk-architecture`)
- Strategic Engagement (`/strategic-engagement`)
- Founder (`/founder`)
- Contact (`/contact`)

可在后台调整导航顺序与显隐（`Pages.navigation.navOrder / showInNav`）。

## 3. 本地一键启动（Docker Compose）

1. 复制环境变量：

```bash
cp .env.example .env
```

2. 启动：

```bash
docker compose up
```

3. 访问：

- 前台：`http://localhost:3000`
- 后台：admin：`http://localhost:3000/admin`
- API：`http://localhost:3000/api`

默认 seed 管理员：

- Email：`admin@starringcapital.com`
- Password：`ChangeMe123!`

## 4. 非 Docker 本地启动

```bash
npm install
npm run payload:migrate
npm run generate:importmap
npm run generate:types
npm run seed
npm run dev
```

## 5. 生产部署（手动）

环境变量清单：

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `PREVIEW_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `SERVER_URL`
- `SEED_ADMIN_EMAIL`（可选）
- `SEED_ADMIN_PASSWORD`（可选）

构建与启动：

```bash
npm ci
npm run generate:importmap
npm run generate:types
npm run build
npm run payload:migrate
npm run start
```

## 6. GitHub Push 自动部署（已内置）

目标链路：

`本地改代码 -> push 到 GitHub(main) -> GitHub Actions SSH 到服务器 -> 服务器 git 同步 + docker compose 重启 -> 前后端自动更新`

仓库内置：

- 工作流：`.github/workflows/deploy.yml`
- 服务器脚本：`scripts/server-deploy.sh`
- 生产编排：`docker-compose.prod.yml`

### 6.1 服务器一次性准备

1. 安装 `git`、`docker`、`docker compose plugin`
2. 创建目录：

```bash
sudo mkdir -p /opt/star-ring-capital
sudo chown -R $USER:$USER /opt/star-ring-capital
```

3. 在服务器生成用于拉取 GitHub 的 Deploy Key：

```bash
ssh-keygen -t ed25519 -C "src-server-deploy" -f ~/.ssh/src_deploy_key -N ""
cat ~/.ssh/src_deploy_key.pub
```

把公钥添加到 GitHub 仓库：

- `Repo -> Settings -> Deploy keys -> Add deploy key`
- 只读即可（无需写权限）

4. 配置服务器 SSH：

```bash
cat >> ~/.ssh/config << 'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/src_deploy_key
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
```

5. 创建服务器环境变量文件 `/opt/star-ring-capital/.env`：

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/star_ring_capital
PAYLOAD_SECRET=replace_with_long_random_secret
PREVIEW_SECRET=replace_with_another_long_random_secret
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
SERVER_URL=https://your-domain.com
SEED_ADMIN_EMAIL=admin@starringcapital.com
SEED_ADMIN_PASSWORD=ChangeMe123!
```

### 6.2 GitHub Actions Secrets

在 `Settings -> Secrets and variables -> Actions` 配置：

- `SSH_HOST`
- `SSH_PORT`（默认 22）
- `SSH_USER`
- `SSH_PRIVATE_KEY`（GitHub Actions 登录服务器的私钥）
- `APP_DIR`（可选，默认 `/opt/star-ring-capital`）

说明：

- `SSH_PRIVATE_KEY` 是「GitHub Actions -> 服务器」使用
- Deploy Key 是「服务器 -> GitHub」使用
- 两者不是同一把 key

### 6.3 首次部署

1. 推送到 `main`
2. 查看 GitHub Actions 的 `Deploy To Server` 是否成功
3. 成功后服务器自动执行：
   - 同步仓库到目标目录
   - 执行 `bash scripts/server-deploy.sh`
   - `docker compose -f docker-compose.prod.yml up -d --build --remove-orphans`
4. 首次上线建议执行一次种子（创建默认管理员与页面内容）：

```bash
cd /opt/star-ring-capital
docker compose -f docker-compose.prod.yml run --rm web npm run seed
```

### 6.4 后续迭代

每次迭代只需：

```bash
git add .
git commit -m "feat: xxx"
git push origin main
```

### 6.5 `ssh: handshake failed: EOF` 一键替代方案（推荐大陆网络）

如果 GitHub Actions 的 `Deploy via SSH` 偶发失败（常见于安全组/网络链路），可改为服务器主动拉取，不再依赖 GitHub 入站 SSH：

1. 服务器执行一次安装（root）：

```bash
cd /opt/star-ring-capital
bash scripts/install-auto-pull.sh
```

2. 查看定时器状态：

```bash
systemctl status src-auto-pull-deploy.timer --no-pager
```

3. 查看最近执行日志：

```bash
journalctl -u src-auto-pull-deploy.service -n 100 --no-pager
```

说明：

- 定时器默认每 `2` 分钟检查一次 `origin/main`。
- 有新提交就自动执行 `bash scripts/server-deploy.sh`。
- 如需改频率：`INTERVAL_MINUTES=1 bash scripts/install-auto-pull.sh`。

## 7. 合规约束

- 不提供投资建议功能
- 不展示交易明细
- 叙事重点：结构能力 + 风控能力 + 稳定增长
- 默认轨迹页含合规提示：
  - `Historical performance does not guarantee future results.`
  - `All trajectories reflect historical structural execution and do not constitute investment solicitation.`
