---
kind: configuration_system
name: 基于 Vite 环境变量与构建期配置的静态站点配置系统
category: configuration_system
scope:
    - '**'
source_files:
    - figma-ui/vite.config.ts
    - figma-ui/package.json
    - figma-ui/esa.jsonc
    - .github/workflows/deploy-figma-ui-pages.yml
---

## 1. 使用的系统与工具

该仓库是一个纯前端静态站点（Figma Make 生成的 React + Tailwind 项目），使用 **Vite** 作为构建工具，通过 **Vite 的 `import.meta.env` 环境变量机制** 注入运行时/构建时配置。部署层面同时支持两种平台：
- **阿里云 ESA Pages**：通过根目录下的 `figma-ui/esa.jsonc` 声明式配置安装、构建命令及 SPA 404 策略。
- **GitHub Pages**：通过 `.github/workflows/deploy-figma-ui-pages.yml` 工作流以 `workflow_dispatch` 手动触发，将 `figma-ui/dist` 上传为 artifact 并部署到 GitHub Pages。

没有发现传统后端意义上的配置文件（如 `application.properties`、`.env` 文件、YAML/TOML 应用配置）。所有“配置”集中在构建期环境变量和少量 JSONC 元数据中。

## 2. 关键文件

- `figma-ui/vite.config.ts`：定义 Vite 构建配置，读取 `VITE_BASE_URL` 环境变量决定 `base` 路径，并配置 `@` 别名指向 `src`。
- `figma-ui/package.json`：声明 Node 引擎版本（`engines.node: 20`）、脚本（`build` / `dev` / `preview`）以及依赖；pnpm overrides 锁定 vite 版本。
- `figma-ui/esa.jsonc`：阿里云 ESA Pages 的站点元数据，指定 `installCommand`、`buildCommand`、输出目录 `./dist` 以及 `notFoundStrategy: singlePageApplication`。
- `.github/workflows/deploy-figma-ui-pages.yml`：GitHub Actions 工作流，在 `figma-ui` 子目录下执行 `npm install && npm run build`，并通过 `VITE_BASE_URL` 根据仓库类型动态设置 base 路径（用户主页仓库用 `/`，普通仓库用 `/<仓库名>/`）。

## 3. 架构与约定

### 3.1 环境变量命名约定
- 仅使用 Vite 暴露的前缀变量 `VITE_*`。当前唯一使用的变量是 `VITE_BASE_URL`，用于控制构建产物的基础路径。
- 该变量由 GitHub Actions 在 CI 中根据 `github.event.repository.name` 和 `github.event.repository.owner.login` 自动计算，本地开发时默认回退为 `/`。

### 3.2 构建产物与部署约定
- 构建输出统一位于 `figma-ui/dist`，这是 Vite 默认输出目录，也是 ESA Pages 和 GitHub Pages 共同约定的产物位置。
- 对于 GitHub Pages 子路径部署，通过 `VITE_BASE_URL` 让 Vite 在编译阶段重写资源引用路径，确保 SPA 路由在子路径下正常工作。
- 对于 ESA Pages，`esa.jsonc` 显式声明 `notFoundStrategy: singlePageApplication`，使所有未知路径回退到单页入口。

### 3.3 模块与路径约定
- 使用 `@` 别名指向 `src` 目录（见 `vite.config.ts` 中的 `resolve.alias`），组件与页面通过绝对路径导入。
- 项目类型为 ES Module（`package.json` 中 `"type": "module"`），Vite 配置也遵循 ESM 语法。

### 3.4 环境隔离
- 不存在 `.env`、`.env.local` 等本地环境变量文件；所有环境差异通过 CI 注入的 `VITE_BASE_URL` 解决。
- 工作流注释明确说明已切换至阿里云 ESA Pages，GitHub Pages 工作流保留但默认不再随 push 自动部署，需手动 Run workflow 并重新启用仓库 Settings → Pages。

## 4. 约定与约束

- **Node 版本约束**：`package.json` 的 `engines.node = "20"` 强制要求构建环境使用 Node 20；CI 中也通过 `actions/setup-node@v4 with node-version: "20"` 显式锁定。
- **构建命令约束**：ESA Pages 和 GitHub Actions 均通过 `npm run build` 触发构建，该命令对应 `vite build`，不可随意替换。
- **Base URL 计算规则**：当仓库名为 `<owner>.github.io`（用户主页仓库）时，`VITE_BASE_URL` 设为 `/`；否则设为 `/<repository-name>/`。此规则硬编码在工作流中，新增部署目标时需同步更新。
- **SPA 路由支持**：两个部署平台都通过不同方式实现 SPA 回退——GitHub Pages 依赖 Vite 输出的 HTML 结构，ESA Pages 通过 `esa.jsonc` 的 `notFoundStrategy: singlePageApplication` 实现。
- **忽略规则**：根级 `.gitignore` 应忽略 `node_modules`、`dist` 等构建产物（具体忽略内容受限于仓库实际 `.gitignore` 内容，但从工作流推断这些目录不会被提交）。

## 5. 总结

该仓库的配置系统非常轻量：以 Vite 环境变量为核心，配合少量声明式 JSONC 元数据，支撑双平台（阿里云 ESA Pages 与 GitHub Pages）的静态站点构建与部署。配置项极少且集中，没有复杂的多环境分层或密钥管理逻辑，适合 Figma Make 导出的前端原型/官网类项目。