# Little Path · 小徑藥局

A concept piece — a warm, editorial marketing site for a fictional neighborhood pharmacy in 文山, Taipei.

**Design direction:** quiet luxury, editorial magazine layout, Fraunces × Noto Serif TC typography, paper-grain texture, restrained motion. Earthy palette of cream, moss, honey, and ink.

**Tech:** vanilla HTML + Tailwind CSS v4 + Vite. No framework — the page is static, and a bundler produces a single ~15 KB CSS file (vs. ~300 KB if Tailwind ran from a CDN in the browser). One small JS file handles the hamburger toggle and scroll-reveal.

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

## Structure

```
little-path/
├── index.html          # the whole page — single file by choice
├── src/
│   ├── main.css        # design tokens (@theme), reveals, animations
│   └── main.js         # IntersectionObserver reveal + mobile menu
├── images/             # hero, pharmacist, article images
├── public/
│   └── favicon.svg
├── vite.config.js
└── package.json
```

---

## Notes on design decisions

- **Tailwind v4, CSS-first config.** Theme lives inside `@theme { ... }` in `main.css`. No `tailwind.config.js`, no PostCSS config.
- **Fraunces for display.** Variable font, optical sizing — lends editorial gravity at large sizes without feeling stuffy at body.
- **`font-feature-settings: "palt"`.** Proportional metrics for CJK — tightens kerning in Chinese so Latin and Chinese read at the same rhythm.
- **`cubic-bezier(0.22, 1, 0.36, 1)`.** A single easing curve used everywhere for consistency. Fast out, gentle settle.
- **IntersectionObserver over scroll listeners.** Much cheaper, more accurate, degrades gracefully.
- **`prefers-reduced-motion`.** Respected — all animation disabled when the user has that preference set.
- **`scroll-padding-top: 5rem`.** Fixed nav is 80 px tall; anchor jumps would otherwise scroll content underneath it.

---

## Images

The placeholder JPGs in `images/` are solid-color brand swatches so the build has something real to bundle. Replace with proper photography before deploying.

---

*Concept piece · 2026*
