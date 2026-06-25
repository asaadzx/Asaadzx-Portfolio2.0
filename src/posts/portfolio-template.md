---
title: "Building a SvelteKit Portfolio Template Anyone Can Use"
date: "2026-06-24"
excerpt: "I built a zero-dependency, animated SvelteKit 5 portfolio template so anyone — developer or not — can have a beautiful site in minutes."
author: "Asaad"
tags: ["Open Source", "SvelteKit", "Tailwind CSS", "Portfolio", "Web Development"]
---

## The Problem

Every time someone asks me how to make a portfolio, the same conversation happens:

1. They open a code editor
2. They stare at a blank page
3. They spend weeks chasing perfect animations instead of writing content

The barrier to entry is not complexity — it is *starting*. There are hundreds of portfolio templates out there, but most assume you are a JavaScript developer who knows how to configure a build toolchain. If you are a designer, photographer, writer, or artist, you should not need to understand Vite configs to publish your work online.

## What I Built

I took the animated, terminal-themed design language from my own portfolio and stripped it down to a **single-file configuration** template. No database, no API routes, no analytics service, no server runtime. Just static files.

Everything you see on the page is driven by one file: `src/lib/config.ts`.

```ts
export const siteConfig: SiteConfig = {
  name: "Your Name",
  title: "Your Tagline",
  skills: [
    { name: "Writing", icon: "mdi:file-document-edit" },
    { name: "Photography", icon: "mdi:camera" },
  ],
  projects: [
    {
      name: "Project One",
      description: "Short description.",
      tags: ["Design", "Branding"],
      image: "https://placehold.co/600x400/...",
    },
  ],
  // ... that is it
};
```

Change the name, swap the icons, add your projects, deploy.

## Design Decisions

### Zero External Dependencies

The template has no database, no API endpoints, and no analytics. You clone it, edit `config.ts`, run `bun run build`, and drop the `build/` folder on any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a plain web server. There is nothing to break over time because there are no moving parts.

### Profession-Agnostic

Most portfolio templates assume you are a software engineer. They use code-themed terminology, repo-style project cards, and technology badges. I deliberately avoided this. The template uses neutral language and generic section names — **Hero**, **About**, **Gallery**, **Contact** — so it works equally well for a photographer, a ceramicist, a writer, or a designer.

### Animated, Not Heavy

The template uses scroll-triggered blur-and-fade animations via `svelte-inview` and `svelte-motion`. These are hardware-accelerated CSS transitions, not JavaScript-driven frame loops. The result is smooth motion on mobile devices without draining the battery. The letter-by-letter hero title uses a lightweight pull-up effect, and the sparkle heading is purely CSS.

### Single Source of Truth

Editing a portfolio should not require hunting through five components to find the right text. Every piece of visible content — name, bio, skills, projects, social links, SEO metadata — lives in one file. Colors live in `src/app.css` as CSS custom properties. Fonts are declared in the Tailwind `@theme` block. The separation is deliberate: *data goes in config.ts, presentation goes in CSS, structure goes in Svelte components.*

### Smart Defaults

- **Dark mode** is the default on mobile (no toggle visible on small screens — it just works)
- **Light/dark toggle** appears on desktop, persists to localStorage, and respects `prefers-color-scheme` on first visit
- **Project detail pages** are optional — set `page: true` to automatically generate a linked detail page at `/projects/[slug]`
- **CV download** is optional — leave `cvUrl: ""` to hide the button entirely
- **Avatar** is optional — leave `avatarUrl: ""` to remove it

## The Experience So Far

The template is live on GitHub at [github.com/asaadzx/Portfolio-Template](https://github.com/asaadzx/Portfolio-Template). The README includes a full customization guide covering content, colors, fonts, icons, and deployment.

What surprised me is how useful this has been even for myself. When I need to spin up a quick landing page for a side project, I clone the template, edit `config.ts`, and deploy in under a minute. The time between idea and published page is nearly zero.

## What Is Next

The template is intentionally minimal. I plan to add:

- A **blog section** with markdown-based posts
- **Multiple gallery layouts** (grid, masonry, slideshow)
- **Internationalization** support for multi-language sites
- More **animation presets** that can be toggled from config

But the core philosophy stays the same: one config file, zero dependencies, instant deploy.

## Try It

Clone it, edit `config.ts`, and deploy:

```bash
git clone https://github.com/asaadzx/Portfolio-Template
bun install
bun run dev       # see it live at localhost:5173
```

Or skip the local setup entirely — fork the repo on GitHub and deploy to Vercel in one click. No server, no database, no subscriptions.

The source is at [github.com/asaadzx/Portfolio-Template](https://github.com/asaadzx/Portfolio-Template). Pull requests are welcome.
