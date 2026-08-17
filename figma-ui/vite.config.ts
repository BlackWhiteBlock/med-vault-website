import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** ESA Pages / 自定义域名用 / ；若仍部署 GitHub Pages 子路径可设 VITE_BASE_URL=/<仓库名>/ */
const base = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  base,
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // 本地开发时模拟 ESA 边缘函数（edge/index.js）的同源代理行为
      '/api': {
        target: 'https://api.med-vault.cloud',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
