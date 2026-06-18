<script lang="ts">
    import "./layout.css";
    import NavBar from "$lib/components/NavBar.svelte";
    import SEO from "$lib/components/SEO.svelte";
    import { theme } from "$lib/theme.svelte";

    let { children } = $props();

    let themeColor = $derived(theme.current === "dark" ? "#161412" : "#edebe9");

    $effect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme.current);
        }
    });
</script>

<svelte:head>
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/favicon.png" />
    <link
        rel="alternate"
        type="application/rss+xml"
        title="Asaad Zein"
        href="/rss.xml"
    />
    <meta name="theme-color" content={themeColor} />
    <meta name="apple-mobile-web-app-title" content="Asaad Zein" />
</svelte:head>
<SEO />
<NavBar />
<main>
    {@render children()}
</main>
