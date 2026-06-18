<script lang="ts">
    let {
        title = "Asaad Zein a Developer & Artist",
        description = "Self-taught software engineer and 3D artist specializing in local LLM optimization, custom embedded systems, and fast web infrastructure.",
        url = "https://asaadzx.is-a.dev/",
        image = "https://github.com/asaadzx.png",
        type = "website",
        published,
        author = "Asaad Zein",
    }: {
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        type?: string;
        published?: string;
        author?: string;
    } = $props();
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta
        name="keywords"
        content="full-stack developer, 3D artist, LLM optimization, embedded systems, SvelteKit, Blender, portfolio"
    />
    <meta name="author" content={author} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={url} />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="460" />
    <meta property="og:image:height" content="460" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Asaad Zein" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    {#if published}
        <meta property="article:published_time" content={published} />
    {/if}
</svelte:head>
