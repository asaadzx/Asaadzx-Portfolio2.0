<script lang="ts">
    let { children } = $props();
    let el: HTMLElement;

    $effect(() => {
        el.style.opacity = "0.75";
        el.style.filter = "blur(0.3px)";

        const observer = new IntersectionObserver(
            ([entry]) => {
                const r = entry.intersectionRatio;
                el.style.opacity = String(
                    Math.max(0.75, Math.min(1, r + 0.55)),
                );
                el.style.filter = `blur(${Math.max(0, (1 - r) * 0.2)}px)`;
            },
            { threshold: Array.from({ length: 20 }, (_, i) => (i + 1) * 0.05) },
        );
        observer.observe(el);
        return () => observer.disconnect();
    });
</script>

<div bind:this={el} class="will-change-[opacity,filter]">
    {@render children()}
</div>
