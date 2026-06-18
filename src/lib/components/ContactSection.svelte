<script lang="ts">
    import { animate, stagger } from "animejs";
    import { PUBLIC_FORMSPREE_ENDPOINT } from "$env/static/public";

    let selectedRoute = $state("general");
    let formStatus = $state<"idle" | "transmitting" | "success" | "error">(
        "idle",
    );
    let emailInput = $state("");
    let messageInput = $state("");
    let tickerState = $state({ value: 0 });
    let section: HTMLElement;
    let animated = $state(false);

    $effect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    const items =
                        section.querySelectorAll<HTMLElement>("[data-card]");
                    animate(items, {
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 200,
                        delay: stagger(120, { start: 200 }),
                        easing: "inOutBack",
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );
        observer.observe(section);
        return () => observer.disconnect();
    });

    async function handlePayloadTransmission(event: Event) {
        event.preventDefault();
        formStatus = "transmitting";
        tickerState.value = 0;

        const anim = animate(tickerState, {
            value: [0, 100],
            duration: 1400,
            easing: "easeOutQuad",
        });
        await anim;

        try {
            const response = await fetch(PUBLIC_FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailInput,
                    route: selectedRoute,
                    message: messageInput,
                }),
            });

            if (response.ok) {
                formStatus = "success";
                emailInput = "";
                messageInput = "";
            } else {
                formStatus = "error";
            }
        } catch {
            formStatus = "error";
        }
    }
</script>

<section bind:this={section} class="w-full px-4 sm:px-12 py-20" id="contact">
    <div class="w-full max-w-4xl mx-auto">
        <div class="mb-8 border-b border-text/10 pb-4">
            <span
                class="text-xs font-bold tracking-widest text-accent uppercase font-body"
                >[ COMMS_LINK_v1.09 ]</span
            >
            <h2 class="text-3xl font-heading font-bold text-text mt-1">
                Initiate Connection.
            </h2>
        </div>

        <form onsubmit={handlePayloadTransmission} class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                {#each [["sayhi", "Say Hi"], ["invite", "Invite Me"], ["feedback", "Feedback"]] as [id, label] (label)}
                    <button
                        type="button"
                        data-card="route"
                        onclick={() => (selectedRoute = id)}
                        class="p-4 border text-left text-xs font-bold tracking-wider transition-all duration-150 font-body opacity-0 {selectedRoute ===
                        id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-text/10 text-text/60 hover:border-text/30'}"
                    >
                        {label}
                    </button>
                {/each}
            </div>

            <div class="space-y-4">
                <div data-card="email" class="flex flex-col gap-2 opacity-0">
                    <label
                        for="email"
                        class="text-xs font-bold tracking-widest text-text/40 uppercase font-body"
                    >
                        Sender Core Address:
                    </label>
                    <input
                        id="email"
                        type="email"
                        bind:value={emailInput}
                        required
                        placeholder="your_node@domain.com"
                        class="w-full bg-background border border-text/10 p-4 font-body text-sm focus:outline-none focus:border-primary text-text transition-colors"
                    />
                </div>

                <div data-card="message" class="flex flex-col gap-2 opacity-0">
                    <label
                        for="message"
                        class="text-xs font-bold tracking-widest text-text/40 uppercase font-body"
                    >
                        Message Payload Data:
                    </label>
                    <textarea
                        id="message"
                        rows="5"
                        bind:value={messageInput}
                        required
                        placeholder="Write your structural message packet here..."
                        class="w-full bg-background border border-text/10 p-4 font-body text-sm focus:outline-none focus:border-primary text-text transition-colors resize-none"
                    ></textarea>
                </div>
            </div>

            <button
                type="submit"
                data-card="submit"
                disabled={formStatus !== "idle"}
                class="w-full py-4 font-heading font-bold uppercase tracking-wider text-sm transition-all duration-300 bg-background text-text border border-text/10 hover:border-primary hover:bg-primary active:scale-[0.99] disabled:bg-text/10 disabled:text-text/40 disabled:border-text/5 overflow-hidden relative opacity-0"
            >
                {#if formStatus === "idle"}
                    Execute Signal Transmission &rarr;
                {:else if formStatus === "transmitting"}
                    [ RC_DATA_LINK: {Math.round(tickerState.value)}% ]
                {:else if formStatus === "success"}
                    &check; Thanks for reaching out! I'll get back to you soon.
                {:else}
                    &#9888; Connection Interrupted. Retry Exec.
                {/if}
            </button>
        </form>
    </div>
</section>
