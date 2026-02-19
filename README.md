# Star Ring Capital (星环资本)

高端金融品牌官网 + 可视化后台 + 实时预览，技术栈：Next.js 16 + React 19 + TypeScript + TailwindCSS + shadcn/ui + Payload CMS v3 + PostgreSQL。

## 1. 核心能力

- 品牌定位：Private Capital Structure Office（私域资本结构办公室）
- 前台：黑金极简风、可扩展机构化信息架构
- 后台：Payload Admin 登录鉴权、Blocks 拖拽编辑、Live Preview 实时预览
- 主题系统：`Theme Settings (Global)` 可直接改配色/字体/按钮/Logo/环形光轨参数
- 语言切换：前台 Header 支持 `EN / 中文` 一键切换（基于 Cookie 持久化）
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

中英双语内容录入约定（无需改 schema）：

- 在文本字段中按 `中文 || English` 格式输入时，前台会按当前语言自动拆分展示。
- 未按该格式录入时，前台仍展示原字段内容；部分导航与系统文案有内置中文兜底翻译。

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

## 6. GitHub Push 自动部署（推荐链路）

目标链路：

`本地改代码 -> push 到 GitHub(main) -> GitHub Actions 构建并发布 GHCR 镜像 ->（可选）Actions 立即 SSH 触发服务器部署 -> timer 兜底自动追平`

仓库内置：

- 工作流：`.github/workflows/deploy.yml`（构建/发布镜像 + 可选立即触发服务器部署）
- 服务器脚本：`scripts/server-deploy.sh`（Compose v2-only，默认只滚动更新 `web`，失败自动回滚）
- 定时拉取脚本：`scripts/install-auto-pull.sh`、`scripts/auto-pull-deploy.sh`
- 生产编排：`docker-compose.prod.yml`

### 6.1 GitHub Actions 需要的权限

- 使用内置 `GITHUB_TOKEN` 推送镜像到 `ghcr.io`
- 若希望“每次 push 后立即部署到服务器”，需配置以下仓库 Secrets：
  - `SSH_HOST`
  - `SSH_USER`
  - `SSH_PRIVATE_KEY`
  - `SSH_PORT`（可选）

说明：

- 配置了上述 Secrets：镜像发布成功后，Actions 会立即 SSH 到服务器执行 `scripts/server-deploy.sh`。
- 未配置 Secrets：仍使用服务器 timer 模式（每 2 分钟轮询一次）。

首次使用建议到仓库 `Settings -> Actions -> General` 确认：

- Workflow permissions: `Read and write permissions`

### 6.2 服务器一次性准备

1. 安装 `git`、`docker`、`docker compose`（Compose v2，必须）。  
   Ubuntu 22.04（Docker 官方源）：

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
docker compose version
```
2. 克隆仓库到 `/opt/star-ring-capital`（服务器需要 deploy key 读取 GitHub）。
3. 准备 `/opt/star-ring-capital/.env`：

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/star_ring_capital
PAYLOAD_SECRET=replace_with_long_random_secret
PREVIEW_SECRET=replace_with_another_long_random_secret
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
SERVER_URL=https://your-domain.com
SEED_ADMIN_EMAIL=admin@starringcapital.com
SEED_ADMIN_PASSWORD=ChangeMe123!
SRC_WEB_IMAGE=ghcr.io/muadibusul/star-ring-capital:latest
```

4. 如果 GHCR 镜像是私有包，服务器执行一次登录（PAT 需 `read:packages`）：

```bash
echo "<YOUR_GITHUB_PAT>" | docker login ghcr.io -u MuadibUsul --password-stdin
```

5. 安装自动拉取定时任务：

```bash
cd /opt/star-ring-capital
bash scripts/install-auto-pull.sh
```

说明：默认 `ALWAYS_PULL_IMAGE=0`，即“只有 git 有新提交才部署”。

### 6.3 首次部署

```bash
cd /opt/star-ring-capital
bash scripts/server-deploy.sh
docker compose -f docker-compose.prod.yml run --rm web npm run seed
```

### 6.4 后续迭代

```bash
git add .
git commit -m "feat: xxx"
git push origin main
```

说明：

- GitHub 会构建并推送新镜像到 GHCR。
- 若配置了 SSH Secrets，镜像发布后会立即触发一次服务器部署。
- 服务器每 2 分钟检查一次主分支；仅有新提交时才执行部署（默认行为）。
- 部署仅滚动更新 `web`，不会每次重建 `postgres`。
- 如需改频率：`INTERVAL_MINUTES=1 bash scripts/install-auto-pull.sh`。
- 如需无 git 变化也强制部署：`ALWAYS_PULL_IMAGE=1 bash scripts/install-auto-pull.sh`。

## 7. 合规约束

- 不提供投资建议功能
- 不展示交易明细
- 叙事重点：结构能力 + 风控能力 + 稳定增长
- 默认轨迹页含合规提示：
  - `Historical performance does not guarantee future results.`
  - `All trajectories reflect historical structural execution and do not constitute investment solicitation.`
