<script lang="ts">
    import { animate, stagger } from "animejs";
    import { resolve } from "$app/paths";
    import { onMount } from "svelte";
    import { Eye } from "@lucide/svelte";
    import Icon from "@iconify/svelte";
    import SEO from "$lib/components/SEO.svelte";

    let { data } = $props();

    let gridCards = $state<HTMLElement[]>([]);
    let stats = $state<Record<string, { views: number; likes: number }>>({});

    onMount(async () => {
        animate(gridCards, {
            opacity: [0, 1],
            scale: [0.95, 1],
            delay: stagger(80),
            duration: 500,
            easing: "easeOutQuint",
        });

        try {
            const res = await fetch("/api/posts");
            if (res.ok) stats = await res.json();
        } catch {
            /* ignore */
        }
    });
</script>

<section class="w-full max-w-6xl mx-auto mt-20 mb-20 px-6 font-body text-text">
    <SEO
        title="Blog | Asaad's Logs"
        description="Technical writing on embedded systems, local AI, software engineering, and open-source projects."
        url="https://asaadzx.is-a.dev/blog/"
    />
    <div class="mb-12 border-b border-text/10 pb-4 text-xs opacity-60">
        <h1 class="text-base font-bold text-text/80 font-heading uppercase">
            // INDEXED_LOG_ARCHIVE
        </h1>
        <p class="mt-1 font-mono">
            FOUND: {data.posts.length} PUBLISHED_NODES IN DIRECTORY
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        {#each data.posts as post, index (post.slug)}
            {@const postStats = stats[post.slug]}
            <div
                bind:this={gridCards[index]}
                class="opacity-0 will-change-transform transition-all duration-300 hover:-translate-y-1"
            >
                <a
                    href={resolve(`/blog/${post.slug}/`)}
                    class="group w-full h-full p-6 rounded-xl border border-text/10 bg-card-bg flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                >
                    <div class="flex items-start gap-2 text-xs font-mono">
                        <span class="text-primary font-bold shrink-0"
                            >[{post.meta.date.split("-")[0]}]</span
                        >
                        <div class="flex gap-1.5 min-w-0 flex-1 flex-wrap">
                            {#each post.meta.tags.slice(0, 2) as tag (tag)}
                                <span
                                    class="text-[10px] border border-text/10 px-1.5 py-0.5 rounded opacity-75 group-hover:opacity-100 transition-opacity truncate max-w-30"
                                    >#{tag}</span
                                >
                            {/each}
                        </div>
                        <span
                            class="shrink-0 opacity-20 group-hover:opacity-50 group-hover:text-primary transition-all text-[10px]"
                        >
                            [LOG_{String(index).padStart(2, "0")}]
                        </span>
                    </div>

                    <div class="space-y-2 flex-1">
                        <h2
                            class="font-heading font-bold text-xl md:text-2xl tracking-tight text-text group-hover:text-primary transition-colors duration-150 line-clamp-2"
                        >
                            {post.meta.title}
                        </h2>
                        <p
                            class="text-xs text-text/75 group-hover:text-text/90 leading-relaxed line-clamp-2 transition-opacity"
                        >
                            {post.meta.excerpt}
                        </p>
                    </div>

                    <div
                        class="flex justify-between items-center text-xs pt-3 border-t border-text/10"
                    >
                        <span
                            class="font-mono text-[10px] tracking-wider opacity-50 group-hover:opacity-100 group-hover:text-accent"
                        >
                            READ_TRANSMISSION.EXE
                        </span>
                        <div
                            class="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity"
                        >
                            {#if postStats}
                                <span
                                    class="flex items-center gap-1 text-[10px] shrink-0"
                                >
                                    <Eye class="size-3" />
                                    {postStats.views}
                                </span>
                            {/if}
                            <span
                                class="text-primary -translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
                            >
                                &rarr;
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        {/each}
    </div>

    <div class="mt-16 pt-6 border-t border-text/10 flex justify-center">
        <a
            href={resolve("/rss.xml")}
            class="group flex items-center gap-2.5 text-xs font-mono opacity-60 hover:opacity-100 hover:text-orange-500 transition-all duration-200 px-4 py-2 rounded-full border border-dashed border-text/20 hover:border-orange-500/40 hover:bg-orange-500/5"
        >
            <Icon
                icon="simple-icons:rss"
                class="size-4 group-hover:scale-110 transition-transform"
            />
            <span class="tracking-wider uppercase">Subscribe via RSS</span>
        </a>
    </div>
</section>
