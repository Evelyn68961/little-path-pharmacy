/* Reads every articles/*.md, parses YAML frontmatter, compiles the body
   to HTML with `marked`, then writes articles/<slug>.html using the
   shared article template. Returns the article list (sorted newest first)
   so vite.config.js can register them as build inputs. */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { resolve, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { marked } from 'marked'
import { renderArticle } from './article-template.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const ARTICLES_DIR = resolve(ROOT, 'articles')

marked.setOptions({
  breaks: false,
  gfm: true,
})

export function loadArticles() {
  if (!existsSync(ARTICLES_DIR)) return []

  const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'))
  const articles = []

  for (const file of files) {
    const filepath = resolve(ARTICLES_DIR, file)
    const raw = readFileSync(filepath, 'utf-8')
    const { data: frontmatter, content } = matter(raw)
    const html = marked.parse(content)
    const slug = frontmatter.slug || basename(file, '.md')
    articles.push({ frontmatter, html, slug })
  }

  // Newest first
  articles.sort((a, b) => {
    const da = new Date(a.frontmatter.date || 0).getTime()
    const db = new Date(b.frontmatter.date || 0).getTime()
    return db - da
  })

  return articles
}

export function buildArticles() {
  const articles = loadArticles()
  if (!articles.length) return []

  for (const article of articles) {
    const pageHtml = renderArticle({ ...article, allArticles: articles })
    const outPath = resolve(ARTICLES_DIR, `${article.slug}.html`)
    writeFileSync(outPath, pageHtml, 'utf-8')
  }

  return articles
}

// Allow running this script directly via `node scripts/build-articles.js`
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  const built = buildArticles()
  console.log(`Built ${built.length} article${built.length === 1 ? '' : 's'}.`)
}
