# asaadzx.github.io

Portfolio site built with [Svelte 5](https://svelte.dev), [SvelteKit](https://kit.svelte.dev), [Tailwind CSS v4](https://tailwindcss.com), and [Turso](https://turso.tech) for edge-hosted persistent data.

## Project Structure

```
src/
├── lib/
│   ├── assets/
│   ├── components/
│   │   ├── NavBar.svelte           # Fixed top navigation bar
│   │   ├── HeroSection.svelte      # Hero: fluid canvas sim, avatar, socials
│   │   ├── ScrollSection.svelte    # Blur/fade scroll wrapper
│   │   ├── WorkSection.svelte      # Homepage work showcase
│   │   ├── GallerySection.svelte   # 2×4 image lightbox
│   │   ├── ContactSection.svelte   # Formspree contact form
│   │   ├── FooterSection.svelte    # Mega footer
│   │   ├── ThemeToggle.svelte      # Dark/light toggle knob
│   │   └── SEO.svelte              # Meta tags (OG, Twitter, etc.)
│   ├── server/
│   │   └── db.ts                   # Turso database client
│   └── theme.svelte.ts             # Theme state manager
├── routes/
│   ├── layout.css                  # Tailwind v4 theme + globals
│   ├── layout.ts                   # Prerender config, Vercel analytics
│   ├── +layout.svelte              # Root layout shell
│   ├── +page.svelte                # Homepage
│   ├── +error.svelte               # Terminal-style 404 page
│   ├── about/
│   │   └── +page.svelte            # Bio panel + timeline
│   ├── work/
│   │   └── +page.svelte            # Bento grid project showcase
│   ├── blog/
│   │   ├── +page.ts                # Blog post loader
│   │   ├── +page.svelte            # Blog archive page (views + likes)
│   │   └── [slug]/
│   │       ├── +page.ts            # Post detail loader
│   │       └── +page.svelte        # Post detail renderer (views + likes)
│   └── api/
│       └── posts/
│           ├── +server.ts          # GET all posts stats
│           └── [slug]/
│               ├── +server.ts      # GET single post stats
│               ├── view/+server.ts # POST increment view
│               └── like/+server.ts # POST/DELETE toggle like
├── posts/
│   ├── ai-workspace-guide.md
│   ├── music-while-studying.md
│   ├── epyac-enhanced.md
│   ├── epyac-v1.md
│   ├── baklava-shell.md
│   ├── nasa-space-apps.md
│   └── embedded-systems-dna.md
└── rss.xml/
    └── +server.ts                  # RSS feed (auto-discovered)

static/
├── favicon.png
├── manifest.json
├── robots.txt
├── sitemap.xml
├── CNAME
├── Images/
│   ├── p2.jpg
│   ├── p3.jpg
│   ├── p4.jpg
│   ├── p5.jpg
│   ├── p6.jpg
│   ├── p7.jpg
│   └── p8.webp
└── assets/
    └── Asaad Zein Sayed Resume.pdf

.github/workflows/
└── ci.yml                          # CI: check, lint, build (env vars from secrets)
```

Deployed on **Vercel** with serverless API routes for views/likes. Pages are prerendered where possible.

## Libraries & Technologies

- Svelte 5
- SvelteKit (adapter-vercel)
- Tailwind CSS v4
- TypeScript
- mdsvex
- animejs v4
- highlight.js
- @iconify/svelte
- @lucide/svelte
- @libsql/client (Turso)
- Formspree
- Google Fonts
- ESLint
- Vite
- Vitest
- Playwright

## Production Checklist

- [x] Hybrid static + serverless (adapter-vercel, prerendered pages)
- [x] Custom 404 page with route suggestions
- [x] SEO meta tags per page (OG, Twitter, canonical)
- [x] Sitemap (`/sitemap.xml`)
- [x] RSS feed (`/rss.xml`)
- [x] Robots.txt
- [x] PWA manifest (`/manifest.json`)
- [x] Favicon (avatar PNG)
- [x] Dark/light theme with `theme-color` meta
- [x] GitHub Actions CI workflow
- [x] CNAME for custom domain
- [x] Analytics (Vercel Analytics + Speed Insights)
- [x] Accessibility audit (aria, focus, screen reader)
- [x] Performance audit (Lighthouse)
- [x] Google Search Console
- [x] Edge-hosted database (Turso) for views & likes
- [x] Blog posts with view counters and like buttons
- [ ] Add Status Section in about me page
- [ ] Make a Flutter app to control the website status
- [ ] Figure a way to upload the blogs markdown files in a DB and fetch them dynamically
- [ ] Figure a way to upload the website content blogs dynamically with the Flutter app
- [ ] Make everything ready for the next 3 years and beyond and make changing files easier and more efficient
- [ ] Store blog content in Turso DB (replace markdown files) with full-text search
- [ ] Vercel Blob for blog cover images and media uploads
- [ ] Flutter app to manage blog content (create/edit/delete posts) and control website status
