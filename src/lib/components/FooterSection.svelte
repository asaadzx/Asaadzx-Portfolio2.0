<script lang="ts">
    import { animate } from "animejs";
    import { resolve } from "$app/paths";

    function nudge(e: MouseEvent) {
        const el = e.currentTarget as HTMLElement;
        animate(el, {
            translateX: [0, 4],
            duration: 200,
            easing: "easeOutQuad",
        });
    }

    function resetNudge(e: MouseEvent) {
        const el = e.currentTarget as HTMLElement;
        animate(el, {
            translateX: [4, 0],
            duration: 200,
            easing: "inOutBack",
        });
    }
</script>

<footer
    class="w-full px-4 sm:px-12 py-20 pb-8 font-body text-sm text-text/60 select-none"
    id="footer"
>
    <div class="w-full max-w-6xl mx-auto border-t border-text/10 pt-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div class="flex flex-col space-y-3">
                <span
                    class="text-xs font-bold tracking-widest text-text/80 uppercase"
                >
                    // NETWORKS
                </span>
                <a
                    href="https://github.com/asaadzx"
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    GitHub
                </a>
                <a
                    href="https://linkedin.com/in/asaad-zx"
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    LinkedIn
                </a>
                <a
                    href="https://x.com/Asaad123TY"
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    X / Twitter
                </a>
                <a
                    href="https://buymeacoffee.com/asaadzx"
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    Buy Me a Coffee
                </a>
            </div>

            <div class="flex flex-col space-y-3">
                <span
                    class="text-xs font-bold tracking-widest text-accent uppercase"
                >
                    // INBOUND_BLOGS
                </span>
                <a
                    href={resolve("/blog/ai-workspace-guide/")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    <span class="text-text"
                        >The Modern Developer's AI Workspace</span
                    >
                </a>
                <a
                    href={resolve("/blog/music-while-studying/")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    <span class="text-text">School Subjects Playlists</span>
                </a>
                <a
                    href={resolve("/blog/embedded-systems-dna/")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    <span class="text-text">The DNA of Embedded Systems</span>
                </a>
                <a
                    href={resolve("/blog/portfolio-template/")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    <span class="text-text">SvelteKit Portfolio Template</span>
                </a>
                <a
                    href={resolve("/blog/epyac-enhanced/")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    <span class="text-text">EPYAC: Technical Architecture</span>
                </a>
            </div>

            <div class="flex flex-col space-y-3">
                <span
                    class="text-xs font-bold tracking-widest text-text/60 uppercase"
                >
                    // EXPLORE
                </span>
                <a
                    href={resolve("/about")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    About Me
                </a>
                <a
                    href={resolve("/work")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    Case Studies
                </a>
                <a
                    href={resolve("/#contact")}
                    class="hover:text-text text-text/65 transition-colors"
                    onmouseenter={nudge}
                    onmouseleave={resetNudge}
                >
                    Contact
                </a>
            </div>

            <div class="flex flex-col space-y-2 text-xs text-text/60">
                <span
                    class="text-xs font-bold tracking-widest text-text/60 uppercase"
                >
                    // CORE_DIAGNOSTICS
                </span>
                <p>LOC: Egypt, Cairo</p>
                <p>SYS: SVELTE_5</p>
                <p class="flex items-center gap-1">
                    STATUS: Open For Projects <span
                        class="text-primary text-lg leading-none">.</span
                    >
                </p>
            </div>
        </div>

        <div
            class="w-full text-center overflow-hidden border-b border-text/5 mb-8"
        >
            <a
                href={resolve("/")}
                class="font-heading font-bold text-[13vw] leading-[0.85] text-text tracking-tighter select-none group transition-all duration-700 ease-out hover:tracking-normal hover:text-primary"
            >
                <h1
                    class="whitespace-nowrap leading-[0.85] font-heading font-bold text-normal text-text tracking-tighter group-hover:tracking-tight group-hover:text-primary transition-all duration-200 ease-out"
                >
                    ASAAD ZEIN<span class="text-primary">.</span>
                </h1>
            </a>
        </div>

        <div
            class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text/50 pt-2"
        >
            <span>&copy; {new Date().getFullYear()} Asaad Zein</span>
        </div>
    </div>
</footer>
