---
kind: external_dependency
name: 阿里云 ESA Pages（当前实际部署目标）
slug: aliyun-esa-pages
category: external_dependency
category_hints:
    - client_constraint
scope:
    - '**'
---

workflow 注释明确说明已切换至阿里云 ESA Pages；routes.ts 注释注明“ESA Pages 已配置 SPA fallback”，因此应用使用 Hash Router（createHashRouter）而非 BrowserRouter，无需服务端路由重写即可在静态托管环境下正常工作。