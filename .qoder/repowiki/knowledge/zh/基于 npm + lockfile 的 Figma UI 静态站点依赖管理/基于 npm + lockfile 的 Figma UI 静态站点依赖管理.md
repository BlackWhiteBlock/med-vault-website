---
kind: dependency_management
name: 基于 npm + lockfile 的 Figma UI 静态站点依赖管理
category: dependency_management
scope:
    - '**'
source_files:
    - figma-ui/package.json
    - figma-ui/package-lock.json
    - .gitignore
    - figma-ui/vite.config.ts
    - .github/workflows/deploy-figma-ui-pages.yml
---

## 1. 使用的系统/方法

- **包管理器**：npm（通过 `package-lock.json` 锁定版本），同时仓库中存在 `pnpm.overrides` 字段，表明团队也兼容 pnpm。
- **构建工具**：Vite 6.3.5（`vite.config.ts` 中声明），配合 `@vitejs/plugin-react` 与 `@tailwindcss/vite` 插件。
- **Node 版本约束**：`package.json` 中 `engines.node = "20"`，GitHub Actions 的 `setup-node` 步骤也固定为 `node-version: "20"`，确保本地与 CI 一致。
- **部署流水线**：`.github/workflows/deploy-figma-ui-pages.yml` 在 GitHub Actions 中执行 `npm install && npm run build`，将 `figma-ui/dist` 作为 artifact 上传并部署到 GitHub Pages（当前默认仅手动触发 `workflow_dispatch`）。

## 2. 关键文件

| 文件 | 作用 |
|---|---|
| `figma-ui/package.json` | 声明所有运行时依赖、开发依赖、peerDependencies 及 pnpm overrides |
| `figma-ui/package-lock.json` | npm v3 lockfile，锁定完整依赖树与 sha512 integrity |
| `.gitignore` | 忽略 `node_modules/`、`dist/`、各类缓存与日志 |
| `figma-ui/vite.config.ts` | 构建配置，含 `base`（由 `VITE_BASE_URL` 环境变量控制）与 `@` 路径别名 |
| `.github/workflows/deploy-figma-ui-pages.yml` | 构建 & 部署工作流 |

## 3. 架构与约定

- **单工程结构**：依赖声明集中在 `figma-ui/package.json`，无 monorepo 或 workspace 结构。
- **依赖分类**：
  - 运行时依赖：React 生态（`react`、`react-dom`）、MUI / Radix UI 组件库、Tailwind CSS、Recharts、motion、date-fns 等。
  - 开发依赖：`vite`、`@vitejs/plugin-react`、`tailwindcss`、`@tailwindcss/vite`。
  - peerDependencies：`react`、`react-dom` 标记为可选（`peerDependenciesMeta.optional`），因为该子项目是 Figma Make 导出的应用，宿主环境自带 React。
- **版本策略**：生产依赖大多使用精确版本号（如 `"@mui/material": "7.3.5"`），少数第三方库使用 `^` 前缀（如 `react`、`html-to-image`、`slick-carousel`）。lockfile 已提交，保证可重现安装。
- **依赖覆盖**：`pnpm.overrides.vite = "6.3.5"` 用于强制统一 vite 版本，避免下游包引入冲突版本。
- **私有源/代理**：未发现 `.npmrc`、`.yarnrc`、`pnpm-workspace.yaml` 或 `overrides.registry` 等私有注册表配置；依赖全部从官方 npm registry 解析。
- **构建产物与依赖隔离**：`node_modules/` 和 `dist/` 均被 `.gitignore` 排除，CI 每次构建时重新 `npm install`。

## 4. 约定与约束

- **Node 版本必须为 20**：由 `package.json#engines` 与工作流 `setup-node@v4` 共同约束。
- **禁止提交依赖与构建产物**：`.gitignore` 显式忽略 `node_modules/`、`dist/`、`build/`、`out/`、各类 `.log` 与缓存目录。
- **构建入口固定**：`npm run build` → `vite build`，输出目录为 `figma-ui/dist`（工作流硬编码此路径）。
- **部署基路由由环境变量控制**：`VITE_BASE_URL` 决定 Vite 的 `base`，工作流根据仓库名自动计算（用户主页仓库用 `/`，普通仓库用 `/<repo>/`）。
- **工作流默认不自动触发**：注释说明已切换至阿里云 ESA Pages，GitHub Actions 仅保留手动触发的回退方案。
- **未使用 vendoring**：无 `vendor/` 或类似目录，依赖通过 npm 网络安装。