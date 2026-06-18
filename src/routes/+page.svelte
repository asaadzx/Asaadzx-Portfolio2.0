<script lang="ts">
    import HeroSection from "$lib/components/HeroSection.svelte";
    import WorkSection from "$lib/components/WorkSection.svelte";
    import GallerySection from "$lib/components/GallerySection.svelte";
    import ContactSection from "$lib/components/ContactSection.svelte";
    import FooterSection from "$lib/components/FooterSection.svelte";
    import ScrollSection from "$lib/components/ScrollSection.svelte";
</script>

<div class="h-full w-full bg-background text-text">
    <ScrollSection>
        <HeroSection />
        <WorkSection />
    </ScrollSection>
    <GallerySection />
    <ContactSection />
    <FooterSection />
</div>
