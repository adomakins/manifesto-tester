<svelte:head>
    <title>{data.name}</title>
    <meta name="description" content={data.description} />
</svelte:head>

<script lang="ts">
    const { data } = $props();
    console.log("Props:", data);

    import Hero from '../../components/hero.svelte';
    import Content from '../../components/content.svelte';
    import CTA from '../../components/cta.svelte';
</script>



<Hero
    heading={data.heading}
    description={data.description}
    actionLink={data.actionLink}
    ctaText={data.ctaText}
    primaryColor={data.primaryColor}
    gradientStart={data.gradientStart}
    gradientEnd={data.gradientEnd}
/>

<Content
    primaryColor={data.primaryColor}
    gradientStart={data.gradientStart}
    gradientEnd={data.gradientEnd}
    articleHeading={data.articleHeading}
    articleTitle={data.articleTitle}
    articleSubtitle={data.articleSubtitle}
    contentBlocks={data.contentBlocks}
/>

<CTA
    heading={data.ctaHeading}
    description={data.ctaDescription}
    domain={data.domain}
    actionLink={data.actionLink}
    ctaText={data.ctaText}
    primaryColor={data.primaryColor}
    gradientStart={data.gradientStart}
    gradientEnd={data.gradientEnd}
/>

