<script lang="ts">
    import { animate, stagger } from "animejs";
    import { resolve } from "$app/paths";
    import { onMount } from "svelte";
    import { Eye } from "@lucide/svelte";

    let { data } = $props();

    let postRows = $state<HTMLElement[]>([]);
    let stats = $state<Record<string, { views: number; likes: number }>>({});

    onMount(async () => {
        animate(postRows, {
            opacity: [0, 1],
            translateX: [-12, 0],
            delay: stagger(60),
            duration: 400,
            easing: "easeOutQuad",
        });

        try {
            const res = await fetch("/api/posts");
            if (res.ok) stats = await res.json();
        } catch { /* ignore */ }
    });
</script>

<section class="w-full max-w-4xl mx-auto mt-32 mb-20 px-6 font-body text-text">
    <div
        class="mb-10 border-b border-text/10 pb-4 flex justify-between items-end text-xs opacity-50"
    >
        <div>
            <p class="font-bold text-primary">
                [ CMD: query_archive_logs --all ]
            </p>
            <p class="text-[11px] mt-1">
                FOUND: {data.posts.length} INDEX_NODES IN DIRECTORY
            </p>
        </div>
        <span class="text-[10px] hidden sm:block">SYS_STATUS: READY</span>
    </div>

    <div class="space-y-1">
        {#each data.posts as post, index (post.slug)}
            {@const postStats = stats[post.slug]}
            <div
                bind:this={postRows[index]}
                class="opacity-0 will-change-transform"
            >
                <a
                    href={resolve(`/blog/${post.slug}/`)}
                    class="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-transparent hover:border-text/10 hover:bg-card-bg transition-all duration-150 relative overflow-hidden"
                >
                    <div class="flex items-start sm:items-center gap-4 z-10">
                        <span
                            class="text-[11px] font-mono opacity-30 mt-0.5 sm:mt-0"
                        >
                            #{String(data.posts.length - index).padStart(
                                2,
                                "0",
                            )}
                        </span>
                        <div class="space-y-1">
                            <h2
                                class="text-sm font-bold tracking-tight text-text group-hover:text-primary transition-colors"
                            >
                                {post.meta.title}
                            </h2>
                            <p
                                class="text-xs text-text/50 line-clamp-1 max-w-xl"
                            >
                                {post.meta.excerpt}
                            </p>
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-4 mt-3 sm:mt-0 pl-7 sm:pl-0 z-10 text-xs"
                    >
                        <div class="hidden md:flex gap-1.5">
                            {#each post.meta.tags.slice(0, 2) as tag (tag)}
                                <span
                                    class="bg-text/10 px-2 py-0.5 rounded text-[10px] opacity-60"
                                >
                                    {tag}
                                </span>
                            {/each}
                        </div>

                        {#if postStats}
                            <span class="flex items-center gap-1 opacity-40" title="Views">
                                <Eye class="size-3" />
                                {postStats.views}
                            </span>
                        {/if}

                        <span
                            class="font-mono text-[11px] opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all"
                        >
                            [{post.meta.date}]
                        </span>

                        <span
                            class="text-primary -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                        >
                            &rarr;
                        </span>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</section>
