<script lang="ts">
    import { animate, stagger } from "animejs";
    import Icon from "@iconify/svelte";

    let selectedIndex = $state<number | null>(null);
    let section: HTMLElement;
    let animated = $state(false);
    let imageRef = $state<HTMLElement>();
    let backdropRef = $state<HTMLElement>();
    let justOpened = $state(false);

    const galleryItems = [
        {
            id: 1,
            src: "/Images/p2.jpg",
            title: "pink garden Flowers!",
            type: "Flowers",
        },
        {
            id: 2,
            src: "/Images/p3.jpg",
            title: "Masala In Tahrir Square",
            type: "Monument",
        },
        {
            id: 3,
            src: "/Images/p4.jpg",
            title: "Pet Store Birds !",
            type: "Birds",
        },
        {
            id: 4,
            src: "/Images/p5.jpg",
            title: "streets of tahrir square",
            type: "tahrir",
        },
        {
            id: 5,
            src: "/Images/p6.jpg",
            title: "Sayeda Khadeja mousqe in Oboar City",
            type: "Oboar City",
        },
        {
            id: 6,
            src: "/Images/p7.jpg",
            title: "Pretty garden",
            type: "Downtown",
        },
        {
            id: 7,
            src: "/Images/p8.webp",
            title: "Cool Figures skating",
            type: "Legos",
        },
    ];

    function openLightbox(index: number) {
        selectedIndex = index;
        justOpened = true;
    }

    function closeLightbox() {
        selectedIndex = null;
    }

    function next() {
        if (selectedIndex === null) return;
        selectedIndex = (selectedIndex + 1) % galleryItems.length;
        if (imageRef)
            animate(imageRef, {
                x: [80, 0],
                opacity: [0, 1],
                duration: 400,
                easing: "easeOutCubic",
            });
    }

    function prev() {
        if (selectedIndex === null) return;
        selectedIndex =
            (selectedIndex - 1 + galleryItems.length) % galleryItems.length;
        if (imageRef)
            animate(imageRef, {
                x: [-80, 0],
                opacity: [0, 1],
                duration: 400,
                easing: "easeOutCubic",
            });
    }

    $effect(() => {
        if (selectedIndex === null) return;

        if (justOpened && backdropRef) {
            animate(backdropRef, {
                opacity: [0, 1],
                duration: 250,
                easing: "inOutSine",
            });
        }
        if (justOpened && imageRef) {
            animate(imageRef, {
                scale: [0.95, 1],
                duration: 350,
                easing: "inOutSine",
            });
        }

        justOpened = false;
    });

    $effect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    const thumbs =
                        section.querySelectorAll<HTMLElement>("[data-thumb]");
                    animate(thumbs, {
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 500,
                        delay: stagger(100, { start: 200 }),
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

<section bind:this={section} class="w-full px-4 sm:px-12 py-20" id="gallery">
    <div class="mb-8">
        <span
            class="text-accent font-body text-sm font-bold tracking-widest uppercase"
            >Visual Workspace</span
        >
        <h2 class="font-heading font-bold text-3xl text-text mt-1">
            3D Art & Renders
        </h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each galleryItems as item, i (item.id)}
            <button
                type="button"
                data-thumb={i}
                class="aspect-square overflow-hidden bg-background relative group cursor-pointer border border-text/5 w-full text-left opacity-0"
                onclick={() => openLightbox(i)}
            >
                <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    class="w-full h-full object-cover grayscale opacity-60 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div
                    class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/80 backdrop-blur-sm p-2 text-[10px] font-body text-text/90"
                >
                    {item.title}
                </div>
            </button>
        {/each}
    </div>

    {#if selectedIndex !== null}
        {@const item = galleryItems[selectedIndex]}
        <div
            bind:this={backdropRef}
            role="presentation"
            class="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none"
            onclick={closeLightbox}
        >
            <div
                role="presentation"
                class="relative max-w-full max-h-[80vh] flex flex-col items-center"
                onclick={(e) => e.stopPropagation()}
            >
                <img
                    bind:this={imageRef}
                    src={item.src}
                    alt={item.title}
                    class="max-w-full max-h-[70vh] object-contain border border-text/10 shadow-2xl"
                />

                <div class="flex items-center justify-between w-full mt-4 px-2">
                    <div>
                        <span class="font-body text-xs text-accent"
                            >[ {(selectedIndex + 1).toString().padStart(2, "0")} /
                            {galleryItems.length.toString().padStart(2, "0")} ]</span
                        >
                        <h3
                            class="font-heading font-bold text-xl text-text mt-1"
                        >
                            {item.title}
                        </h3>
                        <p class="font-body text-xs text-text/60">
                            {item.type}
                        </p>
                    </div>
                </div>
            </div>

            <button
                onclick={(e) => {
                    e.stopPropagation();
                    prev();
                }}
                class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 border border-text/10 bg-card-bg/60 text-text flex items-center justify-center hover:bg-primary hover:border-primary hover:text-background transition-all duration-200 active:scale-95"
                aria-label="Previous"
            >
                <Icon icon="ph:caret-left-bold" class="w-5 h-5" />
            </button>

            <button
                onclick={(e) => {
                    e.stopPropagation();
                    next();
                }}
                class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 border border-text/10 bg-card-bg/60 text-text flex items-center justify-center hover:bg-primary hover:border-primary hover:text-background transition-all duration-200 active:scale-95"
                aria-label="Next"
            >
                <Icon icon="ph:caret-right-bold" class="w-5 h-5" />
            </button>

            <button
                onclick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                }}
                class="absolute top-4 md:top-6 right-4 md:right-6 w-10 md:w-12 h-10 md:h-12 border border-text/10 bg-card-bg/60 text-text flex items-center justify-center hover:text-primary hover:border-primary hover:bg-background transition-all duration-200 active:scale-95"
                aria-label="Close"
            >
                <Icon icon="ph:x-bold" class="w-5 h-5" />
            </button>
        </div>
    {/if}
</section>

<svelte:window
    onkeydown={(e) => {
        if (selectedIndex === null) return;
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "Escape") closeLightbox();
    }}
/>
