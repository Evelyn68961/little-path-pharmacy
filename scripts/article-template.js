/* Renders a single article into the full HTML page string.
   Called by build-articles.js for each .md file in /articles/.
   Nav, footer, and shared head come from scripts/partials/ via the
   <!-- @include ... --> markers, substituted by vite-plugin-partials. */

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
<title>${title} · 健康小角落 · 小徑藥局</title>
<meta name="description" content="${excerpt}" />
<meta property="og:title" content="${title} · 小徑藥局" />
<meta property="og:type" content="article" />
<!-- @include head -->
</head>

<body class="grain">

<!-- @include nav -->

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

<!-- @include footer -->

</body>
</html>
`
}
