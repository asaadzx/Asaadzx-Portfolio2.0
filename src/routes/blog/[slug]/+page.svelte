<script lang="ts">
    import { page } from "$app/stores";
    import { resolve } from "$app/paths";
    import { onMount } from "svelte";
    import SEO from "$lib/components/SEO.svelte";
    import { Eye, Heart } from "@lucide/svelte";

    let { data } = $props();

    let Content = $derived(data.content);
    let meta = $derived(data.meta);

    let views = $state(0);
    let likes = $state(0);
    let liked = $state(false);
    let loading = $state(true);

    const storageKey = `liked:${$page.params.slug}`;

    onMount(async () => {
        try {
            const res = await fetch(`/api/posts/${$page.params.slug}`);
            if (res.ok) {
                const stats = await res.json();
                views = stats.views;
                likes = stats.likes;
            }
        } catch { /* ignore */ }

        liked = localStorage.getItem(storageKey) === "true";

        try {
            await fetch(`/api/posts/${$page.params.slug}/view`, { method: "POST" });
            views++;
        } catch { /* ignore */ }

        loading = false;
    });

    async function toggleLike() {
        if (liked) {
            const res = await fetch(`/api/posts/${$page.params.slug}/like`, { method: "DELETE" });
            if (res.ok) {
                const data = await res.json();
                likes = data.likes;
                liked = false;
                localStorage.removeItem(storageKey);
            }
        } else {
            const res = await fetch(`/api/posts/${$page.params.slug}/like`, { method: "POST" });
            if (res.ok) {
                const data = await res.json();
                likes = data.likes;
                liked = true;
                localStorage.setItem(storageKey, "true");
            }
        }
    }
</script>

<SEO
    title="{meta.title} | Asaad's Logs"
    description={meta.excerpt}
    url={`https://asaadzx.is-a.dev/blog/${$page.params.slug}`}
    type="article"
    published={meta.date}
    author="Asaad Zein"
/>

<article class="w-full max-w-3xl mx-auto mt-16 sm:mt-32 mb-32 px-4 sm:px-6 font-body text-text">
    <header class="border-b border-text/10 pb-6 mb-8">
        <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-bold tracking-widest text-primary mb-2"
        >
            <span>[ LOG_DATE: {meta.date} ]</span>
            <div class="flex flex-wrap gap-2">
                {#each meta.tags as tag (tag)}
                    <span class="bg-card-bg px-2 py-0.5 text-text/60"
                        >#{tag}</span
                    >
                {/each}
            </div>
        </div>
        <h1
            class="font-heading font-bold text-3xl md:text-4xl text-text tracking-tight"
        >
            {meta.title}
        </h1>
        <p class="mt-3 text-sm text-text/60 italic leading-relaxed">
            {meta.excerpt}
        </p>
        <div class="flex items-center gap-4 mt-4 text-xs text-text/50">
            <span class="flex items-center gap-1.5">
                <Eye class="size-3.5" />
                {views} view{views !== 1 ? "s" : ""}
            </span>
            <button
                onclick={toggleLike}
                disabled={loading}
                class="flex items-center gap-1.5 transition-colors {liked ? 'text-red-400' : ' hover:text-text/80'}"
            >
                <Heart
                    class="size-3.5 transition-all {liked ? 'fill-red-400 scale-110' : ''}"
                />
                {likes}
            </button>
        </div>
    </header>

    <div
        class="prose max-w-none font-body text-sm leading-relaxed space-y-6
		prose-headings:font-heading prose-headings:font-bold prose-headings:text-text
		prose-headings:tracking-tight
		prose-h1:text-2xl prose-h2:text-xl prose-p:text-text/80
		prose-a:text-primary prose-a:no-underline hover:prose-a:underline
		prose-strong:text-text
		prose-code:text-accent prose-code:bg-card-bg prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
		prose-li:text-text/80
		prose-pre:bg-card-bg prose-pre:border prose-pre:border-text/10"
    >
        <Content />
    </div>

    <div
        class="mt-16 pt-6 border-t border-text/10 flex justify-between text-xs mb-10"
    >
        <a href={resolve("/")} class="text-primary hover:underline"
            >&lt;-- RETURN_TO_ARCHIVE</a
        >
        <span class="text-text/30">END_OF_TRANSMISSION</span>
    </div>
</article>

<style>
    :global(.prose table) {
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        font-size: 0.8125rem;
    }

    :global(.prose th) {
        border: 1px solid var(--border-alpha);
        padding: 0.5rem 0.5rem;
        text-align: left;
        font-size: 0.625rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-primary);
        background-color: var(--color-card-bg);
        white-space: nowrap;
    }

    :global(.prose td) {
        border: 1px solid var(--border-alpha);
        padding: 0.5rem 0.5rem;
        font-size: 0.75rem;
        color: var(--color-text);
        opacity: 0.8;
    }

    :global(.prose pre) {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        white-space: pre;
        word-wrap: normal;
    }

    :global(.prose code) {
        word-break: break-word;
    }
</style>
