---
kind: frontend_style
name: 基于 Tailwind CSS v4 + Radix UI 的 Figma 风格静态站点样式体系
category: frontend_style
scope:
    - '**'
source_files:
    - figma-ui/src/styles/index.css
    - figma-ui/src/styles/tailwind.css
    - figma-ui/src/styles/theme.css
    - figma-ui/src/styles/fonts.css
    - figma-ui/src/lib/utils.ts
    - figma-ui/src/app/components/ui/button.tsx
    - figma-ui/package.json
    - figma-ui/vite.config.ts
    - figma-ui/postcss.config.mjs
---

## 1. 系统与方法论

该仓库的 `figma-ui` 子目录是一个基于 **Vite + React** 构建的静态站点，样式体系以 **Tailwind CSS v4（通过 `@tailwindcss/vite`）** 为核心，配合 **Radix UI** 无样式原子组件、**class-variance-authority (CVA)** 与 **clsx/tailwind-merge** 实现可组合的组件样式。主题采用 **CSS 自定义属性（Design Tokens）** 集中管理，并通过 Tailwind 的 `@theme inline` 将 token 暴露为语义化 class（如 `bg-background`、`text-primary`）。

- 构建工具：`vite.config.ts` 中启用 `react()` 与 `tailwindcss()` 插件，使用 `@tailwindcss/vite` 而非传统 PostCSS 链；`postcss.config.mjs` 显式为空，注释说明 Tailwind v4 自动处理。
- 字体：`fonts.css` 通过 Google Fonts 引入 Inter 字重 300–800，并在 `theme.css` 的 `--font-sans` 中声明字体栈。
- 动画：引入 `tw-animate-css` 提供基础动画 utility。
- 图标：依赖 `lucide-react` 与 `@mui/icons-material`。
- 深色模式：通过 `.dark` 类覆盖 CSS 变量，并使用 `@custom-variant dark (&:is(.dark *));` 定义 Tailwind 的 `dark:` 变体。

## 2. 关键文件与包

| 路径 | 作用 |
|---|---|
| `figma-ui/src/styles/index.css` | 入口，按顺序 import fonts / tailwind / theme |
| `figma-ui/src/styles/tailwind.css` | Tailwind v4 入口，`@import 'tailwindcss' source(none)` + `@source '../**/*.{js,ts,jsx,tsx}'` 扫描源码生成 utility |
| `figma-ui/src/styles/theme.css` | Design Tokens 集中地：`:root` 定义亮色 token，`.dark` 覆盖暗色 token，`@theme inline` 映射到 Tailwind 语义 class |
| `figma-ui/src/styles/fonts.css` | Inter 字体加载 |
| `figma-ui/src/lib/utils.ts` | `cn(...inputs) = twMerge(clsx(inputs))` 统一 className 合并 |
| `figma-ui/src/app/components/ui/*.tsx` | 基于 Radix + CVA 的原子 UI 组件（Button、Dialog、Table、Tabs 等） |
| `figma-ui/package.json` | 依赖清单：Tailwind v4、Radix 各子包、CVA、clsx、tailwind-merge、motion、sonner、recharts 等 |
| `figma-ui/vite.config.ts` | Vite 配置，`@` 别名指向 `src`，支持 `VITE_BASE_URL` 环境变量控制部署 base |

## 3. 架构与设计约定

### 设计令牌（Design Tokens）
所有视觉变量集中在 `theme.css` 的 `:root` 中，包括背景/前景、主色/强调色、成功/警告/破坏态、边框、圆角、图表色板、侧边栏色板以及“科技风”渐变与霓虹色（`--gradient-from/via/to`、`--neon-blue/purple/pink`）。暗色主题通过 `.dark` 选择器用 `oklch()` 值覆盖同一组变量名，保证明暗切换一致性。

这些变量通过 `@theme inline { --color-*: var(--*) }` 暴露给 Tailwind，使组件可用 `bg-background`、`text-primary`、`border-border` 等语义 class，而非硬编码颜色。

### 组件样式策略
- 原子层：Tailwind utility class 负责布局、间距、排版、颜色。
- 组件层：每个 UI 组件使用 `cva()` 声明 `variants`（如 `variant`、`size`）与 `defaultVariants`，再通过 `cn(buttonVariants({ variant, size, className }))` 合并外部传入的 className。
- 状态样式：通过 `aria-invalid:`、`focus-visible:`、`disabled:`、`dark:` 等修饰符在 CVA 字符串内直接声明。
- 全局基础样式：`theme.css` 的 `@layer base` 中设置 `html`、`body`、`h1-h4`、`label`、`button`、`input` 的默认排版，并应用 `border-border outline-ring/50` 等全局边框/焦点环。

### 响应式与可访问性
- 响应式：未使用媒体查询断点，而是依赖 Tailwind 的响应式前缀（如 `sm:`、`md:`）与 fluid 单位；移动端导航由 `use-mobile.ts` hook 驱动。
- 可访问性：Radix 组件自带 ARIA；按钮等组件包含 `focus-visible:border-ring focus-visible:ring-[3px]` 等焦点可见样式。

### 主题切换
通过 `.dark` 类切换 CSS 变量，结合 `next-themes`（依赖已安装）或手动 toggle 实现明暗模式；`@custom-variant dark (&:is(.dark *));` 使 Tailwind 的 `dark:` 前缀生效。

## 4. 约定与约束

- **禁止手写 Tailwind 配置**：项目使用 Tailwind v4 的 CSS-first 配置方式，`tailwind.config.*` 不存在；所有主题、扩展均在 `theme.css` 中以 CSS 变量形式声明。
- **className 合并必须走 `cn()`**：`lib/utils.ts` 封装了 `twMerge(clsx(...))`，UI 组件统一通过此函数合并 className，避免冲突。
- **源码扫描范围固定**：`tailwind.css` 中 `@source '../**/*.{js,ts,jsx,tsx}'` 限定 Tailwind 扫描目录，新增样式需遵循该 glob 规则。
- **Token 命名规范**：亮/暗主题共用同一组变量名（如 `--background`、`--primary`），仅值不同；新增颜色应同时补充 `:root` 与 `.dark` 两套值。
- **Base 层优先于 Utility**：`@layer base` 中定义 HTML 元素默认样式，Utility class（如 `text-sm`）可覆盖，保持层级清晰。
- **构建产物与环境**：`vite.config.ts` 通过 `process.env.VITE_BASE_URL` 控制部署 base，GitHub Actions 工作流据此部署到 GitHub Pages 子路径或自定义域名。
- **字体来源**：Inter 字体通过 Google Fonts CDN 加载，注释明确“与官网视觉一致的无衬线字体栈；可离线回退到系统字体”。