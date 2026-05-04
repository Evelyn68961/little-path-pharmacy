import './main.css'

/* ============================================================
   Active nav link — mark the link matching the current URL so the
   gold underline shows. Article pages count as "健康小角落".
   ============================================================ */
const currentPath = window.location.pathname
const isArticle = currentPath.startsWith('/articles/')
document.querySelectorAll('#nav a[href]').forEach((a) => {
  const href = a.getAttribute('href')
  const matches = href === currentPath || (isArticle && href === '/corner.html')
  if (matches && a.classList.contains('link-u')) {
    a.classList.add('nav-active')
    a.setAttribute('aria-current', 'page')
  }
})

/* ============================================================
   Mobile menu hamburger toggle
   ============================================================ */
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open')
    const expanded = mobileMenu.classList.contains('open')
    hamburger.setAttribute('aria-expanded', String(expanded))
  })

  // Close menu when a nav link inside it is tapped
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      hamburger.setAttribute('aria-expanded', 'false')
    })
  })
}

/* ============================================================
   Scroll-reveal — add .in to .reveal elements as they enter viewport.
   IntersectionObserver is ~O(1) per element and MUCH cheaper than
   scroll-event listeners. Unobserve after firing so it only runs once.
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal')

if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  )
  revealEls.forEach((el) => io.observe(el))
} else {
  // Fallback for very old browsers — just show everything
  revealEls.forEach((el) => el.classList.add('in'))
}
