<script lang="ts">
    import { animate, stagger } from "animejs";
    import { resolve } from "$app/paths";
    import { onMount } from "svelte";
    import SEO from "$lib/components/SEO.svelte";

    let { data } = $props();

    let gridCards = $state<HTMLElement[]>([]);

    onMount(() => {
        animate(gridCards, {
            opacity: [0, 1],
            scale: [0.95, 1],
            delay: stagger(80),
            duration: 500,
            easing: "easeOutQuint",
        });
    });
</script>

<section class="w-full max-w-6xl mx-auto mt-20 mb-20 px-6 font-body text-text">
    <SEO
        title="Work | Asaad Zein"
        description="Showcase of deployed systems — local LLMs, embedded firmware, and web infrastructure. Case studies from the Epyac project and beyond."
        url="https://asaadzx.is-a.dev/work/"
    />
    <div class="mb-12 border-b border-text/10 pb-4 text-xs opacity-60">
        <h1 class="text-base font-bold text-text/80 font-heading uppercase">
            // DEPLOYED_SYSTEMS_MATRIX
        </h1>
        <p class="mt-1 font-mono">
            COMPILED: {data.projects.length} OPERATIONAL NODES RESOLVED
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[240px]">
        {#each data.projects as project, index (project.slug)}
            <div
                bind:this={gridCards[index]}
                class="opacity-0 will-change-transform transition-all duration-300 hover:-translate-y-1 {project
                    .meta.featuredSize === 'large'
                    ? 'md:col-span-2'
                    : 'col-span-1'}"
            >
                <a
                    href={resolve(`/blog/${project.slug}/`)}
                    class="group w-full h-full p-6 rounded-xl border border-text/10 bg-card-bg flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                >
                    <div
                        class="flex items-center justify-between text-xs font-mono"
                    >
                        <div class="flex items-center gap-3">
                            <span class="text-primary font-bold"
                                >[{project.meta.date.split("-")[0]}]</span
                            >
                            <div class="flex gap-1.5">
                                {#each project.meta.tags.slice(0, 2) as tag (tag)}
                                    <span
                                        class="text-[10px] border border-text/10 px-1.5 py-0.5 rounded opacity-75 group-hover:opacity-100 transition-opacity"
                                        >#{tag}</span
                                    >
                                {/each}
                            </div>
                        </div>
                        <span
                            class="opacity-20 group-hover:opacity-50 group-hover:text-primary transition-all text-[10px]"
                        >
                            [NODE_{String(index).padStart(2, "0")}]
                        </span>
                    </div>

                    <div class="space-y-2">
                        <h2
                            class="font-heading font-bold text-xl md:text-2xl tracking-tight text-text group-hover:text-primary transition-colors duration-150"
                        >
                            {project.meta.title}
                        </h2>
                        <p
                            class="text-xs text-text/75 group-hover:text-text/90 leading-relaxed line-clamp-2 max-w-xl transition-opacity"
                        >
                            {project.meta.excerpt}
                        </p>
                    </div>

                    <div
                        class="mt-4 pt-3 border-t border-text/10 flex justify-between items-center text-xs opacity-50 group-hover:opacity-100 transition-all duration-200"
                    >
                        <span
                            class="font-mono text-[10px] tracking-wider group-hover:text-accent"
                            >READ_CASE_STUDY.EXE</span
                        >
                        <span
                            class="text-primary -translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
                        >
                            &rarr;
                        </span>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</section>
