<script lang="ts">
    const { heading, description, domain, actionLink, ctaText, primaryColor, gradientStart, gradientEnd } = $props();
</script>

<div class="bg-white">
  <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{heading}</h2>
      <p class="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">{description}</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          href={actionLink}
          style:background-color={primaryColor}
          target="_blank"
          class="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style:outline-color={primaryColor}
        >{ctaText}</a>
        <a href={`mailto:adam@${domain}`} target="_blank" class="text-sm/6 font-semibold text-gray-900">
          Ask a question <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
</div>