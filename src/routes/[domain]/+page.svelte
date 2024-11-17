<svelte:head>
    <title>{data.name}</title>
    <meta name="description" content={data.description} />
    {#if data.gtagId}
        <script async src="https://www.googletagmanager.com/gtag/js?id={data.gtagId}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', {data.gtagId});
        </script>
    {/if}
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

