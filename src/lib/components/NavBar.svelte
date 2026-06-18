<script lang="ts">
    import { animate, stagger } from "animejs";
    import { resolve } from "$app/paths";
    import ThemeToggle from "./ThemeToggle.svelte";

    let navEl: HTMLElement;

    $effect(() => {
        const links = navEl.querySelectorAll("a");

        animate(links, {
            opacity: [0, 1],
            y: [-10, 0],
            duration: 400,
            delay: stagger(100, { start: 200 }),
            easing: "easeOutQuad",
        });
    });
</script>

<nav
    bind:this={navEl}
    class="fixed top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 py-5 z-50 bg-background/40 backdrop-blur-sm"
>
    <ul class="flex items-center gap-8">
        <li>
            <a href={resolve("/")} class="block shrink-0">
                <img
                    src="https://github.com/asaadzx.png"
                    alt="Home"
                    width="32"
                    height="32"
                    class="h-8 w-8 rounded-full border border-text/10 hover:border-primary transition-colors duration-200"
                />
            </a>
        </li>
        <li>
            <a
                href={resolve("/about")}
                class="group relative flex items-center gap-3 overflow-hidden"
            >
                <span
                    class="transition-all duration-200 ease-out font-body text-sm sm:text-base"
                    >About</span
                >
                <span
                    class="absolute bottom-0 left-0 h-px bg-primary w-full scale-x-0 transition-transform duration-200 ease-out origin-left group-hover:scale-x-100"
                ></span>
            </a>
        </li>
        <li>
            <a
                href={resolve("/work")}
                class="group relative flex items-center gap-3 overflow-hidden"
            >
                <span
                    class="transition-all duration-200 ease-out font-body text-sm sm:text-base"
                    >Work</span
                >
                <span
                    class="absolute bottom-0 left-0 h-px bg-primary w-full scale-x-0 transition-transform duration-200 ease-out origin-left group-hover:scale-x-100"
                ></span>
            </a>
        </li>
    </ul>

    <ul class="flex items-center gap-6">
        <li class="hidden sm:block">
            <ThemeToggle />
        </li>
        <li>
            <a
                href={resolve("/#contact")}
                class="group relative flex items-center gap-3 overflow-hidden"
            >
                <span
                    class="transition-all duration-200 ease-out font-body text-sm sm:text-base"
                    >Contact --></span
                >
                <span
                    class="absolute bottom-0 left-0 h-px bg-primary w-full scale-x-0 transition-transform duration-200 ease-out origin-left group-hover:scale-x-100"
                ></span>
            </a>
        </li>
    </ul>
</nav>
