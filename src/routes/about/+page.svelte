<script lang="ts">
    import { createTimeline, stagger } from "animejs";
    import { onMount } from "svelte";
    import SEO from "$lib/components/SEO.svelte";

    let bioPanel = $state<HTMLElement | null>(null);
    let timelineNodes = $state<HTMLElement[]>([]);

    const milestones = [
        {
            year: "2026",
            title: "Core AI Developer // Epyac System",
            context: "ISEF Competition",
            details:
                "Engineered and quantized a highly efficient local Large Language Model optimized to run natively on low-spec student hardware for offline research environments.",
        },
        {
            year: "2025",
            title: "Team Leader & Backend Developer",
            context: "NASA Space Apps Challenge",
            details:
                "Led a 5-member development unit to compile an air quality monitoring framework built natively on top of high-throughput FastAPI pipelines and Pandas data matrices.",
        },
        {
            year: "2025",
            title: "Full-Stack Software Engineer & 3D Artist",
            context: "Independent Practice",
            details:
                "Spent 4+ years designing high-fidelity full-stack applications and optimization pipelines, bridging structural web codebases with advanced Blender shader workflows.",
        },
        {
            year: "2025",
            title: "Cybersecurity Competitor",
            context: "Digitopia Competition",
            details:
                "Collaborated in a high-intensity 5-member team structure tracking threat matrix simulations, network vulnerabilities, and defensive infrastructure patterns.",
        },
    ];

    onMount(() => {
        const tl = createTimeline();
        if (bioPanel) {
            tl.add(bioPanel, {
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 450,
                easing: "easeOutQuad",
            });
        }
        tl.add(
            timelineNodes,
            {
                opacity: [0, 1],
                translateX: [-10, 0],
                delay: stagger(70),
                duration: 400,
                easing: "easeOutQuad",
            },
            "-=200",
        );
    });
</script>

<section class="w-full max-w-4xl mx-auto mt-16 px-6 font-body text-text mb-24">
<SEO
    title="About | Asaad Zein"
    description="Self-taught software engineer and 3D artist specializing in local LLM optimization, custom embedded systems, and fast web infrastructure. Core AI Developer behind the Epyac System."
    url="https://asaadzein.me/about/"
/>
    <div bind:this={bioPanel} class="opacity-0 space-y-6">
        <div class="border-b border-text/10 pb-4 text-xs opacity-60 font-mono">
            <span class="text-primary font-bold"
                >[ USER_PROFILE: query_biography_core ]</span
            >
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div
                class="md:col-span-2 space-y-4 text-sm leading-relaxed opacity-80"
            >
                <p>
                    I am a self-taught full-stack software engineer and 3D
                    artist specializing in compiling hyper-optimized digital
                    experiences. Over the past four years, I have anchored my
                    development methodology within open-source distributions,
                    terminal-driven workflows, and resource-conscious software
                    frameworks.
                </p>
                <p>
                    My technical core focuses on local hardware intelligence
                    optimization, custom circuit layout designs, and fast web
                    infrastructure builds. By fusing hardware telemetry with
                    procedural art matrices, I engineer systems that are
                    structurally sound and aesthetically industrial.
                </p>
            </div>

            <div
                class="bg-card-bg border border-text/10 p-4 rounded-xl font-mono text-[11px] space-y-3"
            >
                <div
                    class="text-primary font-bold border-b border-text/10 pb-1"
                >
                    // CORE_STACK_SPECS
                </div>
                <div>
                    <span class="opacity-40">LANG:</span> TypeScript, Python, HTML/CSS
                </div>
                <div>
                    <span class="opacity-40">ENV:</span> Linux Arch/NixOS, NeoVim
                </div>
                <div>
                    <span class="opacity-40">STACK:</span> SvelteKit, FastAPI, Tailwind
                </div>
                <div>
                    <span class="opacity-40">3D_SUITE:</span> Blender, KiCad Workbench
                </div>

                <a
                    href="/assets/cv.pdf"
                    download
                    rel="external"
                    class="block text-center border border-primary text-primary hover:bg-primary hover:text-background font-bold transition-all duration-200 py-1.5 rounded mt-4"
                >
                    &darr; DOWNLOAD_CV.RAW
                </a>
            </div>
        </div>
    </div>

    <div class="mt-20 space-y-8">
        <div class="border-b border-text/10 pb-4 text-xs opacity-60 font-mono">
            <span class="text-primary font-bold"
                >// RECORDED_HISTORICAL_LOGS</span
            >
        </div>

        <div class="relative border-l-2 border-text/10 ml-4 pl-6 space-y-10">
            {#each milestones as item, index (item.title)}
                <div
                    bind:this={timelineNodes[index]}
                    class="relative opacity-0 will-change-transform"
                >
                    <span
                        class="absolute -left-7.25 top-1 bg-card-bg border-2 border-primary w-3 h-3 rounded-full transition-transform duration-300 hover:scale-125"
                    ></span>

                    <div class="group space-y-2">
                        <div
                            class="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                        >
                            <span
                                class="font-mono text-xs font-bold text-accent"
                                >[{item.year}]</span
                            >
                            <h3
                                class="text-sm font-bold text-text group-hover:text-primary transition-colors duration-150"
                            >
                                {item.title}
                            </h3>
                            <span
                                class="text-[11px] font-mono opacity-40 italic"
                                >@ {item.context}</span
                            >
                        </div>

                        <p
                            class="text-xs text-text/60 leading-relaxed max-w-2xl"
                        >
                            {item.details}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
