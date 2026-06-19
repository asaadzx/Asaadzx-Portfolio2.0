import adapter from '@sveltejs/adapter-static';
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
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true,
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
				'/about/',
				'/rss.xml/',
			],
			handleMissingId: 'ignore',
		},
	},
};

export default config;
