import { defineConfig } from 'vite'
import path from 'path'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** GitHub Actions 中设置 VITE_BASE_URL=/<仓库名>/ ；本地与相对路径预览用 ./ */
const base = process.env.VITE_BASE_URL ?? './'

function nojekyllPlugin() {
  return {
    name: 'emit-nojekyll',
    closeBundle() {
      writeFileSync(path.resolve(__dirname, 'dist/.nojekyll'), '')
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    nojekyllPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
