import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
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
      },
    },
  },
})
