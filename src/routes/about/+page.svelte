<script lang="ts">
    import { animate, stagger } from "animejs";
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import SEO from "$lib/components/SEO.svelte";

    let sections = $state<HTMLElement[]>([]);

    const milestones = [
        {
            year: "2026",
            role: "Core AI Developer",
            organization: "Epyac AI Family",
            context: "ISEF Competition",
            details:
                "Engineered and quantized a highly efficient local Large Language Model optimized to run natively on low-spec student hardware for offline research environments.",
        },
        {
            year: "2025",
            role: "Team Leader & Backend Developer",
            organization: "NASA Space Apps Cairo",
            context: "Local Challenge",
            details:
                "Led a 5-member development unit to compile an air quality monitoring framework built natively on top of high-throughput FastAPI pipelines and Pandas data matrices.",
        },
        {
            year: "2025",
            role: "Full-Stack Developer & 3D Artist",
            organization: "Independent Practice",
            context: "4+ Years Active",
            details:
                "Spent years designing high-fidelity web applications and optimization pipelines, bridging structural web codebases with advanced Blender shader workflows.",
        },
        {
            year: "2025",
            role: "Cybersecurity Competitor",
            organization: "Digitopia Team",
            context: "National Event",
            details:
                "Collaborated in a high-intensity 5-member team structure tracking threat matrix simulations, network vulnerabilities, and defensive infrastructure patterns.",
        },
    ];

    onMount(() => {
        animate(sections, {
            opacity: [0, 1],
            translateY: [16, 0],
            delay: stagger(100),
            duration: 500,
            easing: "easeOutQuart",
        });
    });
</script>

<section
    class="w-full max-w-4xl mx-auto mt-26 mb-32 px-6 font-body text-text space-y-20"
>
    <SEO
        title="About | Asaad Zein"
        description="16-year-old self-taught software engineer and 3D artist studying at Anas ibn Malik School. Core AI Developer behind the Epyac System. Aiming for Egyptian Japanese Kosen."
        url="https://asaadzx.is-a.dev/about/"
    />

    <div bind:this={sections[0]} class="opacity-0 space-y-4">
        <div class="font-mono text-xs text-primary tracking-widest">
            [ USER_IDENTITY: ONLINE ]
        </div>
        <h1
            class="font-heading font-bold text-4xl sm:text-5xl tracking-tight text-text leading-tight"
        >
            Hi, I'm <span class="text-primary">Asaad</span>.<br />
            I engineer code structures and 3D assets.
        </h1>
    </div>

    <div
        bind:this={sections[1]}
        class="opacity-0 grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
    >
        <div class="md:col-span-2 space-y-4 text-sm leading-relaxed opacity-80">
            <p>
                I am a 16-year-old self-taught full-stack software engineer and
                3D artist studying at Anas ibn Malik School. My goal is to join
                the Egyptian Japanese Kosen — a specialized engineering track
                combining Japanese manufacturing disciplines with deep technical
                theory — then study abroad and work all around the world.
            </p>
            <p>
                Over the past four years, I have anchored my development
                methodology within open-source distributions, terminal-driven
                workflows, and resource-conscious software frameworks.
            </p>

            <div class="pt-4 flex flex-wrap gap-2">
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:typescript"
                        class="w-3.5 h-3.5 shrink-0"
                    /> TypeScript</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:python"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Python</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:svelte"
                        class="w-3.5 h-3.5 shrink-0"
                    /> SvelteKit</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:fastapi"
                        class="w-3.5 h-3.5 shrink-0"
                    /> FastAPI</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:archlinux"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Arch Linux</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:blender"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Blender 3D</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:kicad"
                        class="w-3.5 h-3.5 shrink-0"
                    /> KiCad</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:cplusplus"
                        class="w-3.5 h-3.5 shrink-0"
                    /> C++</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:go"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Go</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:pytorch"
                        class="w-3.5 h-3.5 shrink-0"
                    /> PyTorch</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:gnubash"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Bash</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:javascript"
                        class="w-3.5 h-3.5 shrink-0"
                    /> animejs</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:flutter"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Flutter</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:mongodb"
                        class="w-3.5 h-3.5 shrink-0"
                    /> MongoDB</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:sqlite"
                        class="w-3.5 h-3.5 shrink-0"
                    /> SQLite</span
                >
                <span
                    class="inline-flex items-center gap-1.5 bg-card-bg border border-text/10 px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:border-primary transition-colors cursor-default"
                    ><Icon
                        icon="simple-icons:docker"
                        class="w-3.5 h-3.5 shrink-0"
                    /> Docker</span
                >
            </div>
        </div>

        <div
            class="bg-card-bg border border-text/10 p-5 rounded-xl font-mono text-[11px] space-y-4"
        >
            <div class="text-primary font-bold border-b border-text/10 pb-1">
                // Tools I love ! and My CV
            </div>
            <div class="space-y-2">
                <div>
                    <span class="opacity-40">MAIN_ENV:</span> Zed Editor core
                </div>
                <div>
                    <span class="opacity-40">3D_SUITE:</span> Blender Shading Core
                </div>
                <div>
                    <span class="opacity-40">HW:</span> Custom ESP32 Boards
                </div>
            </div>
            <a
                href="/assets/Asaad%20Zein%20Sayed%20Resume.pdf"
                download
                rel="external"
                class="block text-center border border-primary text-primary hover:bg-primary hover:text-background font-bold transition-all duration-200 py-2 rounded-lg mt-2 text-xs"
            >
                &darr; DOWNLOAD_CV.RAW
            </a>
        </div>
    </div>

    <div bind:this={sections[2]} class="opacity-0 space-y-6">
        <div class="border-b border-text/10 pb-4 text-xs opacity-60 font-mono">
            <span class="text-primary font-bold"
                >// RECORDED_HISTORICAL_LOGS</span
            >
        </div>

        <div class="space-y-4">
            {#each milestones as item (item.role)}
                <div
                    class="p-5 rounded-xl border border-text/10 bg-card-bg hover:border-primary transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                    <div class="space-y-2">
                        <div
                            class="flex flex-wrap items-center gap-x-2.5 gap-y-1"
                        >
                            <h3 class="text-base font-bold text-text">
                                {item.role}
                            </h3>
                            <span
                                class="text-xs bg-text/10 px-2 py-0.5 rounded text-accent font-mono font-bold"
                                >{item.organization}</span
                            >
                        </div>
                        <p
                            class="text-xs text-text/60 leading-relaxed max-w-2xl"
                        >
                            {item.details}
                        </p>
                    </div>
                    <div class="text-right shrink-0 font-mono text-xs">
                        <span class="text-primary">[{item.year}]</span>
                        <div class="text-[10px] opacity-40 mt-0.5">
                            {item.context}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
