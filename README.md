# asaadzx.github.io

Portfolio site built with [Svelte 5](https://svelte.dev), [SvelteKit](https://kit.svelte.dev), and [Tailwind CSS v4](https://tailwindcss.com).

## Project Structure

```
src/
├── lib/
│   ├── assets/
│   │   └── favicon.svg            # Legacy favicon (unused)
│   ├── components/
│   │   ├── NavBar.svelte          # Fixed top navigation bar
│   │   ├── HeroSection.svelte     # Hero: fluid canvas sim, avatar, socials
│   │   ├── ScrollSection.svelte   # Blur/fade scroll wrapper
│   │   ├── WorkSection.svelte     # Homepage work showcase
│   │   ├── GallerySection.svelte  # 2×4 image lightbox
│   │   ├── ContactSection.svelte  # Formspree contact form
│   │   ├── FooterSection.svelte   # Mega footer
│   │   ├── ThemeToggle.svelte     # Dark/light toggle knob
│   │   └── SEO.svelte             # Meta tags (OG, Twitter, etc.)
│   └── theme.svelte.ts            # Theme state manager
├── routes/
│   ├── layout.css                 # Tailwind v4 theme + globals
│   ├── layout.ts                  # Prerender config
│   ├── +layout.svelte             # Root layout shell
│   ├── +page.svelte               # Homepage
│   ├── +error.svelte              # Terminal-style 404 page
│   ├── about/
│   │   └── +page.svelte           # Bio panel + timeline
│   ├── work/
│   │   └── +page.svelte           # Bento grid project showcase
│   └── blog/
│       ├── +page.ts               # Blog post loader
│       ├── +page.svelte           # Blog archive page
│       └── [slug]/
│           ├── +page.ts           # Post detail loader
│           └── +page.svelte       # Post detail renderer
└── posts/
    ├── ai-workspace-guide.md        # Blog post
    ├── epyac-enhanced.md          # Project case study
    └── epyac-v1.md                # Project case study

static/
├── favicon.png                    # GitHub avatar favicon
├── manifest.json                  # PWA manifest
├── robots.txt
├── sitemap.xml
├── CNAME                          # Custom domain (GitHub Pages)
├── Images/
│   ├── p2.jpg                     # Gallery render 1
│   ├── p3.jpg                     # Gallery render 2
│   ├── p4.jpg                     # Gallery render 3
│   ├── p5.jpg                     # Gallery render 4
│   ├── p6.jpg                     # Gallery render 5
│   ├── p7.jpg                     # Gallery render 6
│   └── p8.webp                    # Gallery render 7
└── assets/
    └── Asaad Zein Sayed Resume.pdf

.github/workflows/
└── deploy.yml                     # GitHub Actions → GitHub Pages

src/routes/rss.xml/
└── +server.ts                     # RSS feed (auto-discovered)
```

Output goes to `build/`. Deploy the contents of that folder to any static host.

## Libraries & Technologies

- Svelte 5
- SvelteKit
- Tailwind CSS v4
- TypeScript
- mdsvex
- animejs v4
- highlight.js
- @iconify/svelte
- @lucide/svelte
- Formspree
- Google Fonts
- ESLint
- Vite

## Production Checklist

- [x] Prerendered static site (`adapter-static`, fallback 404)
- [x] Custom 404 page with route suggestions
- [x] SEO meta tags per page (OG, Twitter, canonical)
- [x] Sitemap (`/sitemap.xml`)
- [x] RSS feed (`/rss.xml`)
- [x] Robots.txt
- [x] PWA manifest (`/manifest.json`)
- [x] Favicon (avatar PNG)
- [x] Dark/light theme with `theme-color` meta
- [x] GitHub Actions deploy workflow
- [x] CNAME for custom domain
- [x] Precompress (gzip + brotli)
- [x] Replace gallery placeholder images with real assets
- [x] Add analytics (e.g., Plausible, Umami)
- [x] Accessibility audit (aria, focus, screen reader)
- [x] Performance audit (Lighthouse)
- [x] Add to google search console
- [ ] Configure Vercel Blob storage for media uploads and Neon Serverless Postgres for the database
- [x] Make the Loading images fast with low latency
- [ ] Add Status Section in about me page
- [ ] Make a flutter app to control the website status 
- [ ] Figure a way to upload the blogs markdown files in a DB and fetch them dynamically
- [ ] Figure a way to upload the website content blogs dynamically with the flutter app
- [ ] Make everything ready for the next 3 years and beyond and make changing files easier and more efficient
