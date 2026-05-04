/* Vite plugin that substitutes <!-- @include name --> markers in HTML files
   with the contents of scripts/partials/<name>.html. Keeps the shared head,
   nav, and footer in a single source of truth across all 8 pages + articles.

   Runs at order: 'pre' so the resulting HTML still flows through Vite's
   normal index.html processing (script tag rewriting, asset hashing, etc.).
   Watches the partials directory and triggers a full reload when one
   changes during dev. */

import { readFileSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PARTIALS_DIR = resolve(__dirname, 'partials')

const INCLUDE_RE = /<!--\s*@include\s+([\w-]+)\s*-->/g

function loadPartials() {
  const map = {}
  for (const file of readdirSync(PARTIALS_DIR)) {
    if (!file.endsWith('.html')) continue
    const name = basename(file, '.html')
    map[name] = readFileSync(resolve(PARTIALS_DIR, file), 'utf-8').trim()
  }
  return map
}

export default function partialsPlugin() {
  let partials = loadPartials()

  return {
    name: 'little-path:partials',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(INCLUDE_RE, (_, name) => {
          if (!(name in partials)) {
            throw new Error(`[partials] unknown partial: "${name}". Looked in ${PARTIALS_DIR}`)
          }
          return partials[name]
        })
      },
    },

    configureServer(server) {
      server.watcher.add(`${PARTIALS_DIR}/**/*.html`)
      const reload = (file) => {
        if (file.startsWith(PARTIALS_DIR)) {
          partials = loadPartials()
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('change', reload)
      server.watcher.on('add', reload)
    },
  }
}
