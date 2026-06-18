<script lang="ts">
    import { theme } from '$lib/theme.svelte';
    import { animate } from 'animejs';

    let toggleBtn = $state<HTMLButtonElement | null>(null);
    let waveEl = $state<HTMLDivElement | null>(null);
    let knob = $state<HTMLDivElement | null>(null);

    $effect(() => {
        if (!knob) return;
        animate(knob, {
            x: theme.current === 'light' ? 24 : 0,
            duration: 200,
            easing: 'easeOutQuad',
        });
    });

    function triggerWaveTransition() {
        if (!toggleBtn || !waveEl) {
            theme.toggle();
            return;
        }

        const rect = toggleBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        waveEl.style.left = `${x}px`;
        waveEl.style.top = `${y}px`;
        waveEl.style.backgroundColor =
            theme.current === 'dark' ? '#e65e19' : '#25557e';
        waveEl.style.opacity = '1';
        waveEl.style.scale = '0';

        const w = waveEl;

        theme.toggle();

        animate(w, {
            scale: [0, 4.5],
            duration: 650,
            easing: 'easeInQuad',
        }).then(() => {
            animate(w, {
                opacity: [1, 0],
                duration: 350,
                easing: 'easeOutLinear',
            }).then(() => {
                w.style.scale = '0';
            });
        });
    }
</script>

<div
    bind:this={waveEl}
    class="fixed w-[50vmax] h-[50vmax] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 scale-0 will-change-transform mix-blend-difference"
></div>

<div class="flex items-center gap-3 font-body text-xs text-text select-none">
    <span class="text-text/60">[ SYS_DARK ]</span>
    <button
        bind:this={toggleBtn}
        type="button"
        onclick={triggerWaveTransition}
        class="w-14 h-7 rounded-full bg-card-bg border border-text/10 p-0.5 relative flex items-center cursor-pointer transition-colors duration-300"
        aria-label="Toggle theme"
    >
        <div
            bind:this={knob}
            class="w-5 h-5 rounded-full bg-primary shadow-md flex items-center justify-center"
        >
            <span class="w-1.5 h-1.5 rounded-full bg-background"></span>
        </div>
    </button>
    <span class="text-text/60">[ SYS_LIGHT ]</span>
</div>
