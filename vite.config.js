import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import articlesPlugin from './scripts/vite-plugin-articles.js'
import { buildArticles } from './scripts/build-articles.js'

// Build articles synchronously at config-time so we know which generated
// HTML files exist and can register them as Rollup inputs for the
// production build. (Dev mode picks them up automatically once they exist
// on disk; the plugin keeps regenerating them on .md changes.)
const generatedArticles = buildArticles()
const articleInputs = Object.fromEntries(
  generatedArticles.map(a => [`article-${a.slug}`, resolve(__dirname, `articles/${a.slug}.html`)])
)

export default defineConfig({
  plugins: [tailwindcss(), articlesPlugin()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        clinics: resolve(__dirname, 'clinics.html'),
        products: resolve(__dirname, 'products.html'),
        regulars: resolve(__dirname, 'regulars.html'),
        corner: resolve(__dirname, 'corner.html'),
        visit: resolve(__dirname, 'visit.html'),
        ...articleInputs,
      },
    },
  },
})
