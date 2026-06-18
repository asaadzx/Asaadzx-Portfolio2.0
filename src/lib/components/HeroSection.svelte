<script lang="ts">
    import { animate, stagger, splitText } from "animejs";
    import { Avatar } from "bits-ui";
    import Icon from "@iconify/svelte";

    let heading: HTMLHeadingElement;
    let dot: HTMLSpanElement;
    let handle: HTMLParagraphElement;
    let role: HTMLParagraphElement;
    let avatarElement: HTMLElement;
    let canvas: HTMLCanvasElement;

    let rotationDeg = $state(0);
    let isDraggingText = $state(false);
    let avatarFloatY = $state(0);
    let avatarRockDeg = $state(0);
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;

    const GRID_COLS = 90;
    const GRID_ROWS = 84;
    const DAMPING = 0.98;
    let waveCurrent = new Float64Array(GRID_COLS * GRID_ROWS);
    let wavePrevious = new Float64Array(GRID_COLS * GRID_ROWS);
    let mouseGridX = -1;
    let mouseGridY = -1;

    function simulateWaves() {
        for (let x = 1; x < GRID_COLS - 1; x++) {
            for (let y = 1; y < GRID_ROWS - 1; y++) {
                const i = x + y * GRID_COLS;
                const sum =
                    waveCurrent[i - 1] +
                    waveCurrent[i + 1] +
                    waveCurrent[i - GRID_COLS] +
                    waveCurrent[i + GRID_COLS];
                wavePrevious[i] = (sum * 0.5 - wavePrevious[i]) * DAMPING;
            }
        }
        [waveCurrent, wavePrevious] = [wavePrevious, waveCurrent];
    }

    let floatTargetY = 0;
    let rockTargetDeg = 0;

    function sampleAvatarWave() {
        if (!avatarElement || !canvas) return;
        const avRect = avatarElement.getBoundingClientRect();
        const cvRect = canvas.getBoundingClientRect();
        const cx =
            ((avRect.left + avRect.right) / 2 - cvRect.left) / cvRect.width;
        const cy =
            ((avRect.top + avRect.bottom) / 2 - cvRect.top) / cvRect.height;
        const gx = Math.round(cx * (GRID_COLS - 1));
        const gy = Math.round(cy * (GRID_ROWS - 1));
        if (gx < 1 || gx >= GRID_COLS - 1 || gy < 1 || gy >= GRID_ROWS - 1)
            return;
        const i = gx + gy * GRID_COLS;
        const h = waveCurrent[i];
        floatTargetY = h * 8;
        rockTargetDeg = (waveCurrent[i + 1] - waveCurrent[i - 1]) * 3;
    }

    function updateAvatarTransform() {
        if (!avatarElement) return;
        avatarElement.style.transform = `translateY(${avatarFloatY}px) rotate(${rotationDeg}deg)`;
    }

    function injectFluidImpulse(e: PointerEvent) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const gx = Math.floor(
            ((e.clientX - rect.left) / rect.width) * GRID_COLS,
        );
        const gy = Math.floor(
            ((e.clientY - rect.top) / rect.height) * GRID_ROWS,
        );
        if (gx >= 0 && gx < GRID_COLS && gy >= 0 && gy < GRID_ROWS) {
            mouseGridX = gx;
            mouseGridY = gy;
            waveCurrent[gx + gy * GRID_COLS] += 4;
        }
    }

    $effect(() => {
        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        const offscreen = document.createElement("canvas");
        offscreen.width = GRID_COLS;
        offscreen.height = GRID_ROWS;
        const offCtx = offscreen.getContext("2d")!;
        if (!offCtx) return;

        let running = true;
        let prevFloatY = 0;

        function frame() {
            if (!running) return;
            simulateWaves();
            if (mouseGridX >= 0 && mouseGridY >= 0) {
                mouseGridX = -1;
                mouseGridY = -1;
            }
            sampleAvatarWave();
            prevFloatY += (floatTargetY - prevFloatY) * 0.1;
            avatarFloatY = prevFloatY;
            avatarRockDeg += (rockTargetDeg - avatarRockDeg) * 0.1;
            updateAvatarTransform();

            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const imgData = offCtx.createImageData(GRID_COLS, GRID_ROWS);
            const data = imgData.data;
            for (let i = 0; i < waveCurrent.length; i++) {
                const h = waveCurrent[i];
                const absH = Math.abs(h);
                if (absH > 0.005) {
                    const a = Math.min(absH * 0.4, 0.12);
                    const p = i * 4;
                    if (h > 0) {
                        data[p] = 230;
                        data[p + 1] = 94;
                        data[p + 2] = 25;
                    } else {
                        data[p] = 37;
                        data[p + 1] = 85;
                        data[p + 2] = 126;
                    }
                    data[p + 3] = Math.round(a * 255);
                }
            }
            offCtx.putImageData(imgData, 0, 0);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
                offscreen,
                0,
                0,
                GRID_COLS,
                GRID_ROWS,
                0,
                0,
                canvas.width,
                canvas.height,
            );
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        return () => {
            running = false;
        };
    });

    function initiateTextDrag(e: PointerEvent) {
        isDraggingText = true;
        lastX = e.clientX;
        lastTime = performance.now();
        velocity = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }

    function executeTextDrag(e: PointerEvent) {
        if (!isDraggingText) return;
        const dx = e.clientX - lastX;
        const now = performance.now();
        const dt = Math.max(now - lastTime, 1);
        velocity = (dx / dt) * 16.67;
        rotationDeg += dx * 1.5;
        lastX = e.clientX;
        lastTime = now;
        updateAvatarTransform();
    }

    function terminateTextDrag(e: PointerEvent) {
        if (!isDraggingText) return;
        isDraggingText = false;
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        const startDeg = rotationDeg;
        const targetDeg = rotationDeg + velocity * 12;
        const startTime = performance.now();
        const duration = 4000;

        function decayFrame() {
            const t = Math.min((performance.now() - startTime) / duration, 1);
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            rotationDeg = startDeg + (targetDeg - startDeg) * eased;
            updateAvatarTransform();
            if (t < 1) requestAnimationFrame(decayFrame);
        }
        requestAnimationFrame(decayFrame);
    }

    const socials = [
        {
            href: "https://github.com/asaadzx",
            label: "GitHub",
            icon: "simple-icons:github",
        },
        {
            href: "https://linkedin.com/in/asaad-zx",
            label: "LinkedIn",
            icon: "simple-icons:linkedin",
        },
        {
            href: "https://x.com/Asaad123TY",
            label: "Twitter",
            icon: "simple-icons:x",
        },
        {
            href: "https://buymeacoffee.com/asaadzx",
            label: "Buy Me a Coffee",
            icon: "simple-icons:buymeacoffee",
        },
    ] as const;

    $effect(() => {
        const { chars } = splitText(heading, { chars: true });

        animate(chars, {
            opacity: [0, 1],
            translateY: [100, 0],
            duration: 200,
            delay: stagger(50),
            easing: "inOutElastic",
        });

        animate(dot, {
            scale: [0, 1],
            x: [10, -10],
            duration: 300,
            delay: 500,
            easing: "inOutElastic",
        });

        animate([handle, role], {
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 400,
            delay: stagger(100, { start: 600 }),
            easing: "easeOutQuad",
        });
    });
</script>

<div class="relative w-full bg-background overflow-hidden pb-40" id="about">
    <canvas
        bind:this={canvas}
        class="absolute inset-0 w-full h-full pointer-events-none z-0"
    ></canvas>

    <div
        role="presentation"
        class="relative z-10"
        onpointermove={injectFluidImpulse}
    >
        <div class="flex flex-col items-center gap-10 mt-30 mb-15">
            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div class="perspective-[1000px] preserve-3d shrink-0">
                    <div
                        bind:this={avatarElement}
                        class="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-2 border-[--border-alpha] overflow-hidden shadow-xl"
                    >
                        <Avatar.Root
                            delayMs={200}
                            class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground h-full w-full rounded-full border text-normal sm:text-base font-normal uppercase data-[status=loading]:border-transparent"
                        >
                            <div
                                class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
                            >
                                <Avatar.Image
                                    src="https://github.com/asaadzx.png"
                                    alt="@Asaadzx"
                                    width="112"
                                    height="112"
                                />
                                <Avatar.Fallback class="border-muted border"
                                    >@Asaadzx</Avatar.Fallback
                                >
                            </div>
                        </Avatar.Root>
                    </div>
                </div>
                <div class="flex flex-col items-center sm:items-start">
                    <div class="flex items-center">
                        <h1
                            bind:this={heading}
                            class="text-3xl sm:text-7xl font-heading text-center inline cursor-grab select-none active:cursor-grabbing"
                            onpointerdown={initiateTextDrag}
                            onpointermove={executeTextDrag}
                            onpointerup={terminateTextDrag}
                        >
                            ASAAD ZEIN
                        </h1>
                        <span
                            bind:this={dot}
                            class="text-3xl sm:text-7xl font-heading text-primary inline-block ml-1"
                            >.</span
                        >
                    </div>
                    <p
                        bind:this={handle}
                        class="text-text/60 font-body text-xs sm:text-base"
                    >
                        @asaadzx
                    </p>
                    <p
                        bind:this={role}
                        class="text-text/50 font-body text-[10px] sm:text-sm"
                    >
                        Software Developer and Artist
                    </p>
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
                {#each socials as { href, label, icon } (label)}
                    <a
                        {href}
                        target="_blank"
                        rel="noopener noreferrer external"
                        class="group flex items-center justify-center border border-[--border-alpha] w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ease-out hover:bg-secondary"
                        aria-label={label}
                    >
                        <Icon
                            {icon}
                            class="w-5 h-5 sm:w-6 sm:h-6 text-text transition-all duration-200 ease-out group-hover:scale-110"
                        />
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>
