<script lang="ts">
    import { animate, stagger } from "animejs";

    let activeCard = $state<number | null>(null);
    let section: HTMLElement;
    let animated = $state(false);

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
        >
            <div class="flex flex-col justify-between h-full relative z-10">
                <div>
                    <span
                        class="text-xs text-primary font-bold uppercase tracking-widest font-body"
                        >AI & Core Systems</span
                    >
                    <h3
                        class="font-heading font-bold text-2xl mt-1 text-text transition-transform duration-300"
                        style:transform={activeCard === 1
                            ? "translateY(-4px)"
                            : "translateY(0)"}
                    >
                        Epyac AI
                    </h3>
                </div>
                <p class="text-sm text-text/60 leading-relaxed">
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

        <!-- Card 2: Ordex App (spans 1 row, 2 columns) -->
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
        >
            <div class="flex justify-between items-center h-full relative z-10">
                <div class="max-w-[60%]">
                    <span
                        class="text-xs text-secondary font-bold uppercase tracking-widest font-body"
                        >Mobile Development</span
                    >
                    <h3
                        class="font-heading font-bold text-2xl text-text transition-transform duration-300"
                        style:transform={activeCard === 2
                            ? "translateY(-4px)"
                            : "translateY(0)"}
                    >
                        Ordex App
                    </h3>
                    <p class="text-sm text-background/80 mt-2">
                        A clean, functional food logistics portal featuring
                        Material 3 UI design parameters.
                    </p>
                </div>
                <div
                    class="w-24 h-24 bg-background/20 transition-transform duration-300 {activeCard ===
                    2
                        ? 'rotate-6'
                        : ''}"
                ></div>
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
        >
            <div class="flex flex-col justify-between h-full relative z-10">
                <div>
                    <span
                        class="text-xs text-accent font-bold uppercase tracking-widest font-body"
                        >Environmental Tech</span
                    >
                    <h3
                        class="font-heading font-bold text-2xl text-text transition-transform duration-300"
                        style:transform={activeCard === 3
                            ? "translateY(-4px)"
                            : "translateY(0)"}
                    >
                        Space Apps Platform
                    </h3>
                </div>
                <p class="text-sm text-text/70">
                    A real-time environmental analytical backend mapping complex
                    data sets across regional vector maps.
                </p>
            </div>
        </div>
    </div>
</section>
