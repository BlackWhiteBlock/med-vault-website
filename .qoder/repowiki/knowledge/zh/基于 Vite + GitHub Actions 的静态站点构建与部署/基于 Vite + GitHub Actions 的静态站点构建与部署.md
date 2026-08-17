---
kind: build_system
name: 基于 Vite + GitHub Actions 的静态站点构建与部署
category: build_system
scope:
    - '**'
source_files:
    - .github/workflows/deploy-figma-ui-pages.yml
    - figma-ui/package.json
    - figma-ui/vite.config.ts
    - .gitignore
---

## 1. 构建系统与工具链

本项目是一个 React + Tailwind CSS 的静态站点，构建系统完全围绕 **Vite**（v6.3.5）组织：
- `figma-ui/package.json` 中定义脚本 `build: vite build`、`dev: vite`、`preview: vite preview`。
- `figma-ui/vite.config.ts` 启用 `@vitejs/plugin-react` 和 `@tailwindcss/vite` 插件，配置 `base` 由环境变量 `VITE_BASE_URL` 控制，并设置 `@` 指向 `src/` 的路径别名。
- 依赖锁定通过 `package-lock.json` 管理；`pnpm.overrides.vite` 强制使用指定版本。
- Node 版本通过 `engines.node = "20"` 约束，CI 中也显式安装 Node 20。

## 2. CI/CD 流水线

唯一的 CI 入口是 `.github/workflows/deploy-figma-ui-pages.yml`，其特点如下：
- 触发方式：**仅手动触发**（`workflow_dispatch`），注释说明已切换至阿里云 ESA Pages，GitHub Pages 作为临时回退方案。
- 环境：`ubuntu-latest`，Node 20。
- 构建步骤：在 `working-directory: figma-ui` 下执行 `npm install && npm run build`，产物目录为 `figma-ui/dist`。
- 部署步骤：通过 `actions/upload-pages-artifact@v3` 上传产物，再由 `actions/deploy-pages@v4` 发布到 GitHub Pages 环境 `github-pages`。
- 路径计算：根据仓库名是否为 `<owner>.github.io` 动态设置 `VITE_BASE_URL`（用户主页用 `/`，子仓库用 `/<repo>/`），确保路由前缀正确。
- 并发控制：`concurrency.group: pages` 且 `cancel-in-progress: true`，避免重复部署冲突。

## 3. 构建产物与忽略规则

根级 `.gitignore` 明确将以下内容排除出版本控制：
- 依赖目录：`node_modules/`
- 构建产物：`dist/`、`build/`、`out/`
- 缓存：`.vite/`、`.cache/`、`.turbo/`、`*.tsbuildinfo`
- 日志与覆盖率：`*.log`、`coverage/`
- 环境变量：`.env`、`.env.*`（保留 `.env.example`）

这意味着每次构建都是从零开始安装依赖并生成 `dist/`，符合纯静态站点的典型模式。

## 4. 架构约定与约束

- **单站点、单包**：所有前端代码位于 `figma-ui/` 子目录，无 monorepo 结构，构建命令直接在该目录下执行。
- **环境变量驱动部署路径**：通过 `VITE_BASE_URL` 区分 GitHub Pages 子路径与自定义域名/ESA Pages 场景，构建时注入而非硬编码。
- **资源导入限制**：`vite.config.ts` 的 `assetsInclude` 仅允许 `*.svg` 和 `*.csv` 被当作原始资源导入，其他类型需走常规模块加载。
- **插件不可移除**：配置注释强调即使不主动使用 Tailwind，`react()` 和 `tailwindcss()` 两个插件也必须保留（来自 Figma Make 模板约定）。
- **无本地构建脚本**：仓库中没有 Makefile、shell 脚本或 Dockerfile，所有构建均通过 npm scripts 和 GitHub Actions 完成。
- **生产构建即部署物**：`dist/` 即为最终静态站点，无需额外打包或压缩步骤。