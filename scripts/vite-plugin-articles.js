/* Vite plugin that runs the article build before Vite starts and
   re-runs it whenever any articles/*.md file changes during dev,
   then triggers a full page reload so the browser sees the new HTML. */

import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { buildArticles } from './build-articles.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ARTICLES_GLOB = resolve(__dirname, '../articles')

export default function articlesPlugin() {
  return {
    name: 'little-path:articles',

    buildStart() {
      buildArticles()
    },

    configureServer(server) {
      server.watcher.add(`${ARTICLES_GLOB}/**/*.md`)
      server.watcher.on('change', (file) => {
        if (file.endsWith('.md')) {
          buildArticles()
          server.ws.send({ type: 'full-reload' })
        }
      })
      server.watcher.on('add', (file) => {
        if (file.endsWith('.md')) {
          buildArticles()
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}
