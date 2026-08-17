---
kind: external_dependency
name: GitHub Pages（已切换至阿里云 ESA Pages）
slug: github-pages
category: external_dependency
category_hints:
    - migration_status
scope:
    - '**'
---

figma-ui 子项目通过 GitHub Actions workflow 构建并部署到 GitHub Pages，但 workflow 注释说明已切换至阿里云 ESA Pages，默认不再随 push 自动部署；如需回退可手动 Run workflow 并在仓库 Settings → Pages 重新启用。构建产物输出到 figma-ui/dist，由 actions/deploy-pages@v4 发布。