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
    ├── fine-tuning-llms.md        # Blog post
    ├── epyac-enhanced.md          # Project case study
    └── epyac-v1.md                # Project case study

static/
├── favicon.png                    # GitHub avatar favicon
├── manifest.json                  # PWA manifest
├── robots.txt
├── sitemap.xml
└── assets/cv.pdf                  # Resume download
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
