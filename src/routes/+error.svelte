<script lang="ts">
	import { createTimeline, stagger } from 'animejs';
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let terminalLines = $state<HTMLElement[]>([]);
	let fallbackBtn = $state<HTMLElement | null>(null);
	let pathname = $state('');
	let status = $state(0);
	let suggestions = $state<{ slug: string; title: string }[]>([]);

	const knownBlogs = [
		{ slug: 'fine-tuning-llms', title: 'Fine-Tuning Local LLMs' },
		{ slug: 'epyac-enhanced', title: 'Epyac Enhanced' },
		{ slug: 'epyac-v1', title: 'Epyac v1' },
	];

	onMount(() => {
		const p = get(page);
		pathname = p.url.pathname;
		status = p.status;

		const isBlog = pathname.startsWith('/blog/');
		const typed = pathname.replace('/blog/', '');
		suggestions = isBlog
			? knownBlogs.filter((b) => b.slug !== typed)
			: knownBlogs;

		const tl = createTimeline();
		tl.add(terminalLines, {
			opacity: [0, 1],
			translateX: [-8, 0],
			delay: stagger(40),
			duration: 300,
			easing: 'easeOutQuad',
		});
		if (fallbackBtn) {
			tl.add(
				fallbackBtn,
				{ opacity: [0, 1], translateY: [10, 0], duration: 250, easing: 'easeOutQuad' },
				'-=100',
			);
		}
	});
</script>

<section class="w-full max-w-3xl mx-auto mt-24 px-6 font-mono text-text">
	<div class="border border-red-500/30 bg-red-500/5 rounded-xl p-6 mb-8 space-y-2">
		<div class="flex items-center gap-2 text-red-500 font-bold text-sm">
			<span class="animate-pulse">[!]</span>
			<span>[ FATAL_EXCEPTION: ROUTE_NODE_NOT_RESOLVED ]</span>
		</div>
		<p class="text-xs opacity-70 leading-relaxed">
			The server layer failed to resolve the requested packet segment address. The sector may be
			unallocated, restricted, or corrupted.
		</p>
	</div>

	<div class="space-y-1.5 text-xs opacity-60">
		<p bind:this={terminalLines[0]}>$ query --target-uri={pathname}</p>
		<p bind:this={terminalLines[1]} class="text-red-400">
			ERROR: Status {status} // Node Handshake Failed
		</p>
		<p bind:this={terminalLines[2]}>$ diagnostic --run-integrity-scan</p>
		<p bind:this={terminalLines[3]}>Checking core memory arrays... OK</p>
		<p bind:this={terminalLines[4]}>Checking active routing maps... FAILED</p>
		<p bind:this={terminalLines[5]} class="opacity-30">Loading trace logs... [0x7FFF82CA31B0]</p>
		<p bind:this={terminalLines[6]} class="opacity-30">Mapping virtual page nodes... NULL_PTR</p>
	</div>

	{#if suggestions.length > 0}
		<div class="mt-8 space-y-2 text-xs">
			<p class="text-accent font-bold">// DID_YOU_MEAN</p>
			<div class="flex flex-wrap gap-2">
				{#each suggestions as blog (blog.slug)}
					<a
						href={resolve(`/blog/${blog.slug}/`)}
						class="text-text/60 hover:text-primary transition-colors border border-text/10 px-3 py-1.5 rounded"
					>
						{blog.title} &rarr;
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<div
		bind:this={fallbackBtn}
		class="opacity-0 mt-10 pt-6 border-t border-text/10"
	>
		<a
			href={resolve("/")}
			class="text-xs text-text/40 hover:text-primary transition-colors"
		>
			&lt;-- RETURN TO BASE
		</a>
	</div>
</section>
