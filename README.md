# Little Path · 小徑藥局

A concept piece — a warm, editorial marketing site for a fictional neighborhood pharmacy in 新莊, 新北市.

**Design direction:** quiet luxury, editorial magazine layout, Fraunces × Klee One typography, paper-grain texture, restrained motion. Earthy palette of cream, moss, honey, and ink.

**Tech:** vanilla HTML + Tailwind CSS v4 + Vite. No framework. Multi-page static site (8 pages) with a custom Vite plugin that compiles Markdown articles into editorial blog pages at build time.

---

## Run it

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production bundle in ./dist
npm run preview  # serve the built bundle locally
```

Deploy the `dist/` folder to Vercel, Netlify, GitHub Pages, or any static host.

---

## Pages

| Path | Page | Notes |
|------|------|-------|
| `/` | Homepage | Full hero + 6 path cards + featured testimonial |
| `/about.html` | 關於藥師 | Pharmacist bio, philosophy, by-the-numbers, credentials |
| `/services.html` | 服務項目 | 5 detailed services + prescription flow + FAQ accordion |
| `/clinics.html` | 合作診所 | Partner clinics for vaccine administration (regulatory) |
| `/products.html` | 店內品項 | 6 OTC categories with brand examples |
| `/regulars.html` | 老朋友專區 | Member perks + sample LINE reminders |
| `/corner.html` | 健康小角落 | Article index + newsletter signup |
| `/visit.html` | 來訪路徑 | Address, hours, transit, accessibility |
| `/articles/<slug>.html` | Blog post | Auto-generated from `articles/<slug>.md` |

---

## Structure

```
little-path/
├── index.html              # homepage
├── about.html              # subpages — one HTML file per nav tab
├── services.html
├── clinics.html
├── products.html
├── regulars.html
├── corner.html
├── visit.html
│
├── articles/               # blog content
│   ├── timing.md           # ← write here, in Markdown
│   ├── baby-fever.md
│   └── *.html              # auto-generated, gitignored
│
├── scripts/                # build tooling
│   ├── build-articles.js       # MD → HTML
│   ├── article-template.js     # page template (nav + hero + footer)
│   └── vite-plugin-articles.js # hooks the build into Vite + HMR
│
├── src/
│   ├── main.css            # @theme tokens, .article-body typography
│   └── main.js             # IntersectionObserver reveal + mobile menu
│
├── images/                 # hero, pharmacist, article images
├── public/favicon.svg
├── vite.config.js          # multi-page rollup input + articles plugin
└── package.json
```

---

## Writing articles

Drop a Markdown file in `articles/` with YAML frontmatter — that's it. The Vite plugin watches the folder, regenerates the HTML page, and triggers a browser reload.

```markdown
---
title:    飯前吃？飯後吃？那到底什麼時候吃？
category: 用藥安全
readTime: 3                 # minutes — used in the byline
date:     2026-04-15        # ISO date — newest first
slug:     timing            # URL slug, optional (defaults to filename)
excerpt:  one-line summary, used in <meta description> and related cards
author:   林佳穎藥師        # defaults to this if omitted
---

Body text in Markdown. Headings (`##`), lists, **bold**, *italic*,
> blockquotes,
tables, links — all styled by `.article-body` in `main.css`.
```

Save the file, refresh the browser, you're done. To add a new article:

1. Create `articles/your-slug.md` with the frontmatter above
2. Reachable at `/articles/your-slug.html` immediately in dev
3. Add a card to `corner.html` linking to it (the homepage grid is hand-curated)

The article template (nav, hero, byline, related-articles footer) lives in `scripts/article-template.js` — edit there to change the layout for every article at once.

---

## Notes on design decisions

- **Tailwind v4, CSS-first config.** Theme lives in `@theme { ... }` in `main.css`. No `tailwind.config.js`, no PostCSS config.
- **Explicit `@source` paths.** `@source "../*.html"` and `@source "../articles/*.html"` in `main.css` — without these, Vite's module graph only surfaces `index.html` and Tailwind purges classes used by subpages.
- **Fraunces × Klee One.** Fraunces handles Latin (display + body), Klee One handles CJK. Klee One is a soft schoolbook handwriting style that pairs warmly with Fraunces — both have a slightly hand-drawn quality that fits the "neighborhood pharmacist" voice.
- **`font-feature-settings: "palt"`.** Proportional metrics for CJK — tightens kerning so Latin and Chinese read at the same rhythm.
- **`cubic-bezier(0.22, 1, 0.36, 1)`.** A single easing curve used everywhere. Fast out, gentle settle.
- **IntersectionObserver over scroll listeners.** Much cheaper, more accurate, degrades gracefully.
- **`prefers-reduced-motion`.** Respected — all animation disabled when set.
- **`scroll-padding-top: 5rem`.** Fixed nav is 80px tall; anchor jumps would otherwise scroll content underneath it.
- **Multi-page over SPA.** Each route is a static HTML file Vite hashes and serves — best Lighthouse scores, no JS routing needed, content-first.

---

## Images

The placeholder JPGs in `images/` are solid-color brand swatches so the build has something real to bundle. Replace with proper photography before deploying.

---

*Concept piece · 2026*
