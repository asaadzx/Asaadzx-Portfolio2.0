<script lang="ts">
	import { animate, stagger } from 'animejs';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	let gridCards = $state<HTMLElement[]>([]);

	onMount(() => {
		animate(gridCards, {
			opacity: [0, 1],
			scale: [0.95, 1],
			delay: stagger(80),
			duration: 500,
			easing: 'easeOutQuint',
		});
	});
</script>

<section class="w-full max-w-6xl mx-auto mt-16 px-6 font-body text-text">
<SEO
    title="Work | Asaad Zein"
    description="Showcase of deployed systems — local LLMs, embedded firmware, and web infrastructure. Case studies from the Epyac project and beyond."
    url="https://asaadzein.me/work/"
/>
	<div class="mb-12 border-b border-text/10 pb-4 text-xs opacity-60">
		<h1 class="text-base font-bold text-primary font-heading uppercase">
			// DEPLOYED_SYSTEMS_MATRIX
		</h1>
		<p class="mt-1 font-mono">
			COMPILED: {data.projects.length} OPERATIONAL NODES RESOLVED
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
		{#each data.projects as project, index (project.slug)}
			<div
				bind:this={gridCards[index]}
				class="opacity-0 will-change-transform {project.meta.featuredSize === 'large'
					? 'md:col-span-2 md:row-span-2'
					: 'col-span-1'}"
			>
				<a
					href={resolve(`/blog/${project.slug}/`)}
					class="group w-full h-full p-6 rounded-xl border border-text/10 bg-card-bg flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg"
				>
					<div
						class="absolute right-4 top-4 font-mono text-[10px] opacity-10 group-hover:opacity-30 group-hover:text-primary transition-all"
					>
						[NODE_{String(index).padStart(2, '0')}]
					</div>

					<div class="flex items-center gap-3 text-xs text-primary font-mono">
						<span>[{project.meta.date.split('-')[0]}]</span>
						<div class="flex gap-1">
							{#each project.meta.tags.slice(0, 2) as tag (tag)}
								<span
									class="text-[10px] border border-text/10 px-1.5 py-0.5 rounded opacity-60"
									>#{tag}</span
								>
							{/each}
						</div>
					</div>

					<div class="space-y-2 mt-auto">
						<h2
							class="font-heading font-bold text-xl md:text-2xl tracking-tight text-text group-hover:text-primary transition-colors"
						>
							{project.meta.title}
						</h2>
						<p class="text-xs text-text/60 line-clamp-2 leading-relaxed max-w-xl">
							{project.meta.excerpt}
						</p>
					</div>

					<div
						class="mt-4 pt-3 border-t border-text/10 flex justify-between items-center text-xs opacity-40 group-hover:opacity-100 transition-opacity"
					>
						<span class="font-mono text-[10px]">READ_CASE_STUDY.EXE</span>
						<span
							class="text-primary -translate-x-1 group-hover:translate-x-0 transition-transform"
						>
							&rarr;
						</span>
					</div>
				</a>
			</div>
		{/each}
	</div>
</section>
