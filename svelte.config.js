import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: true,
			rehypePlugins: [rehypeHighlight],
		}),
		{
			name: 'svelte5-module-script',
			markup: ({ content, filename }) => {
				if (filename?.endsWith('.md')) {
					return {
						code: content.replace(/<script context="module">/g, '<script module>'),
					};
				}
			},
		},
	],
	compilerOptions: {
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
	},
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x',
			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/webp'],
			},
		}),
		alias: {
			$posts: 'src/posts',
		},
		prerender: {
			entries: [
				'/',
				'/blog/',
				'/blog/ai-workspace-guide/',
				'/blog/music-while-studying/',
				'/work/',
				'/blog/epyac-enhanced/',
				'/blog/epyac-v1/',
				'/blog/baklava-shell/',
				'/blog/nasa-space-apps/',
				'/blog/embedded-systems-dna/',
				'/blog/portfolio-template/',
				'/about/',
				'/rss.xml/',
			],
			handleMissingId: 'ignore',
		},
	},
};

export default config;
