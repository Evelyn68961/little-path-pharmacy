/* Renders a single article into the full HTML page string.
   Called by build-articles.js for each .md file in /articles/.
   Keeps nav + footer in sync with the rest of the site. */

const NAV_LINKS = [
  { href: '/about.html', label: '關於藥師' },
  { href: '/services.html', label: '服務項目' },
  { href: '/clinics.html', label: '合作診所' },
  { href: '/products.html', label: '店內品項' },
  { href: '/regulars.html', label: '老朋友專區' },
  { href: '/corner.html', label: '健康小角落', active: true },
  { href: '/visit.html', label: '來訪路徑' },
]

function renderNav() {
  return `
<nav id="nav" class="fixed top-0 left-0 right-0 z-50 nav-blur">
  <div class="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" class="text-honey-dark">
        <path d="M4 28 Q 12 22, 16 14 T 28 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <circle cx="28" cy="4" r="2.5" fill="#6B7454"/>
        <circle cx="4" cy="28" r="2.5" fill="currentColor"/>
      </svg>
      <span class="font-display text-xl md:text-2xl font-medium text-ink tracking-tight">小徑<span class="font-display italic text-moss text-lg ml-1">Little Path</span></span>
    </a>
    <div class="hidden lg:flex items-center gap-6 text-sm tracking-wide">
      ${NAV_LINKS.map(l => `<a href="${l.href}" class="link-u ${l.active ? 'nav-active ' : ''}text-stone hover:text-ink">${l.label}</a>`).join('\n      ')}
      <a href="#contact" class="btn-primary bg-ink text-cream px-5 py-2.5 rounded-full text-sm">LINE 諮詢</a>
    </div>
    <button id="hamburger" class="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Menu" aria-expanded="false" aria-controls="mobileMenu">
      <span class="w-6 h-px bg-ink transition-transform duration-300"></span>
      <span class="w-6 h-px bg-ink transition-opacity duration-300"></span>
      <span class="w-6 h-px bg-ink transition-transform duration-300"></span>
    </button>
  </div>
  <div id="mobileMenu" class="mobile-menu lg:hidden fixed top-20 left-0 right-0 bg-cream border-t border-ink/10 px-6 py-8">
    <div class="flex flex-col gap-6 text-lg">
      ${NAV_LINKS.map(l => `<a href="${l.href}" class="mobile-link text-stone">${l.label}</a>`).join('\n      ')}
      <a href="#contact" class="mobile-link btn-primary bg-ink text-cream px-6 py-3 rounded-full text-center text-base">LINE 諮詢</a>
    </div>
  </div>
</nav>`
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function renderRelated(current, all) {
  const others = all.filter(a => a.slug !== current.slug).slice(0, 3)
  if (!others.length) return ''
  return `
<section class="relative py-20 md:py-28 px-6 md:px-10 bg-paper">
  <div class="max-w-7xl mx-auto">
    <p class="reveal text-xs tracking-[0.3em] uppercase text-honey-dark mb-8">— 也許您也想讀 / Related Reading</p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      ${others.map((a, i) => `
      <a href="/articles/${a.slug}.html" class="article-card reveal${i ? ' reveal-d' + i : ''} block">
        <p class="text-xs tracking-widest uppercase text-honey-dark mb-3">${a.frontmatter.category} · ${a.frontmatter.readTime} min read</p>
        <h3 class="font-display text-xl md:text-2xl text-ink leading-snug mb-3">${a.frontmatter.title}</h3>
        <p class="text-stone leading-[1.9] text-sm">${a.frontmatter.excerpt || ''}</p>
      </a>`).join('')}
    </div>
  </div>
</section>`
}

export function renderArticle({ frontmatter, html, slug, allArticles }) {
  const { title, category, readTime, date, author = '林佳穎藥師', excerpt = '' } = frontmatter

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} · 健康小角落 · 小徑藥局</title>
<meta name="description" content="${excerpt}" />
<meta property="og:title" content="${title} · 小徑藥局" />
<meta property="og:type" content="article" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Klee+One:wght@400;600&family=Noto+Serif+TC:wght@400;500;600&display=swap" rel="stylesheet">
<script type="module" src="/src/main.js"></script>
</head>

<body class="grain">

${renderNav()}

<main>

<!-- ARTICLE HERO -->
<section class="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-10 bg-paper">
  <div class="max-w-4xl mx-auto">
    <a href="/corner.html" class="link-u text-xs tracking-widest uppercase text-honey-dark mb-8 inline-block">← 回健康小角落</a>
    <p class="text-xs tracking-[0.3em] uppercase text-honey-dark mb-6">${category} · ${readTime} min read</p>
    <h1 class="font-display font-light text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.15] mb-10">
      ${title}
    </h1>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone pt-6 border-t border-ink/10">
      <span><span class="text-ink">作者</span> · ${author}</span>
      ${date ? `<span><span class="text-ink">發表</span> · ${formatDate(date)}</span>` : ''}
    </div>
  </div>
</section>

<!-- ARTICLE BODY -->
<article class="relative py-16 md:py-24 px-6 md:px-10 bg-cream">
  <div class="article-body max-w-3xl mx-auto">
${html}
  </div>
</article>

${renderRelated({ slug }, allArticles)}

<!-- CONTACT -->
<section id="contact" class="relative py-24 md:py-32 px-6 md:px-10 bg-ink text-cream">
  <div class="max-w-4xl mx-auto text-center">
    <p class="text-xs tracking-[0.3em] uppercase text-honey mb-8">— 讀完還有疑問</p>
    <h2 class="font-display font-light text-4xl md:text-6xl text-cream mb-10">
      直接<span class="italic text-honey">問藥師</span>。
    </h2>
    <a href="#" class="btn-primary bg-honey text-ink px-10 py-4 rounded-full text-sm tracking-wide font-medium inline-flex items-center gap-2">加入 LINE · 立即詢問</a>
  </div>
</section>

</main>

<footer class="bg-ink text-cream/50 px-6 md:px-10 py-12 border-t border-cream/10">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wide">
    <p>© 2026 小徑藥局 · Little Path Pharmacy · 健保特約字號 5901234567</p>
    <p class="italic font-display">concept piece · design exploration</p>
  </div>
</footer>

</body>
</html>
`
}
