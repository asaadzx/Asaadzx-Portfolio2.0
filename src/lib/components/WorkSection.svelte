<script lang="ts">
    import { animate, stagger } from "animejs";
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";

    let activeCard = $state<number | null>(null);
    let section: HTMLElement;
    let animated = $state(false);

    function navigateTo(slug: string) {
        goto(resolve(`/blog/${slug}/`));
    }

    function handleKeydown(e: KeyboardEvent, slug: string) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigateTo(slug);
        }
    }

    $effect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    const cards =
                        section.querySelectorAll<HTMLElement>("[data-card]");
                    animate(cards, {
                        translateY: [60, 0],
                        duration: 500,
                        delay: stagger(120, { start: 300 }),
                        easing: "easeOutQuad",
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );
        observer.observe(section);
        return () => observer.disconnect();
    });
</script>

<section bind:this={section} class="w-full px-4 sm:px-12" id="work">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full auto-rows-[220px]">
        <!-- Card 1: Epyac AI (spans 2 rows, 1 column) -->
        <div
            data-card="1"
            role="button"
            tabindex="0"
            class="md:row-span-2 md:col-span-1 bg-card-bg border p-6 relative overflow-hidden cursor-pointer transition-all duration-100 {activeCard ===
            1
                ? 'scale-[1.02] border-primary'
                : 'border-text/10'}"
            onmouseenter={() => (activeCard = 1)}
            onmouseleave={() => (activeCard = null)}
            onfocus={() => (activeCard = 1)}
            onblur={() => (activeCard = null)}
            onclick={() => navigateTo('epyac-enhanced')}
            onkeydown={(e) => handleKeydown(e, 'epyac-enhanced')}
        >
            <div class="flex flex-col justify-between h-full relative z-10">
                <div>
                    <span
                        class="text-xs text-text/80 font-bold uppercase tracking-widest font-body"
                        >AI & Core Systems</span
                    >
                    <h2
                        class="font-heading font-bold text-2xl mt-1 text-text transition-transform duration-300"
                        style:transform={activeCard === 1
                            ? "translateY(-4px)"
                            : "translateY(0)"}
                    >
                        Epyac AI
                    </h2>
                </div>
                <p class="text-sm text-text/70 leading-relaxed">
                    Optimized local language architecture designed to execute
                    high-efficiency inference benchmarks directly on client-side
                    hardware.
                </p>
            </div>
            <div
                class="absolute inset-0 bg-linear-0-to-tr from-primary/10 to-transparent transition-opacity duration-500 {activeCard ===
                1
                    ? 'opacity-100'
                    : 'opacity-0'}"
            ></div>
        </div>

        <!-- Card 2: Baklava Shell (spans 1 row, 2 columns) -->
        <div
            data-card="2"
            role="button"
            tabindex="0"
            class="md:col-span-2 bg-primary border p-6 relative overflow-hidden cursor-pointer transition-all duration-100 {activeCard ===
            2
                ? 'scale-[1.02] border-accent'
                : 'border-text/10'}"
            onmouseenter={() => (activeCard = 2)}
            onmouseleave={() => (activeCard = null)}
            onfocus={() => (activeCard = 2)}
            onblur={() => (activeCard = null)}
            onclick={() => navigateTo('baklava-shell')}
            onkeydown={(e) => handleKeydown(e, 'baklava-shell')}
        >
            <div class="flex justify-between items-center h-full relative z-10">
                <div class="max-w-[60%]">
                    <span
                        class="text-xs text-black font-bold uppercase tracking-widest font-body"
                        >Systems Programming</span
                    >
                    <h2
                        class="font-heading font-bold text-2xl text-text transition-transform duration-300"
                        style:transform={activeCard === 2
                            ? "translateY(-4px)"
                            : "translateY(0)"}
                    >
                        Baklava Shell
                    </h2>
                    <p class="text-sm text-black/70 mt-2">
                        A blazing-fast, Lua-extensible shell in Go — fully
                        static, ~3MB binary, zero runtime dependencies.
                    </p>
                </div>
                <div
                    class="text-black/30 text-6xl font-heading font-bold transition-transform duration-300 {activeCard ===
                    2
                        ? 'rotate-6'
                        : ''}"
                >&gt;_</div>
            </div>
        </div>

        <!-- Card 3: NASA Space Apps (spans 1 row, 2 columns) -->
        <div
            data-card="3"
            role="button"
            tabindex="0"
            class="md:col-span-2 bg-secondary border p-6 relative overflow-hidden cursor-pointer transition-all duration-100 {activeCard ===
            3
                ? 'scale-[1.02] border-accent'
                : 'border-text/10'}"
            onmouseenter={() => (activeCard = 3)}
            onmouseleave={() => (activeCard = null)}
            onfocus={() => (activeCard = 3)}
            onblur={() => (activeCard = null)}
            onclick={() => navigateTo('nasa-space-apps')}
            onkeydown={(e) => handleKeydown(e, 'nasa-space-apps')}
        >
            <div class="flex flex-col justify-between h-full relative z-10">
                <div>
                    <span
                        class="text-xs text-text font-bold uppercase tracking-widest font-body"
                        >Environmental Tech</span
                    >
                    <h2
                        class="font-heading font-bold text-2xl text-text transition-transform duration-300"
                        style:transform={activeCard === 3
                            ? "translateY(-4px)"
                            : "translateY(0)"}
                    >
                        NASA Space Apps
                    </h2>
                </div>
                <p class="text-sm text-text/90">
                    Real-time air quality prediction system using NASA Harmony
                    API, FastAPI, and satellite data.
                </p>
            </div>
        </div>
    </div>
</section>
