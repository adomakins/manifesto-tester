<script lang="ts">
    const { primaryColor, gradientStart, gradientEnd, articleHeading, articleTitle, articleSubtitle, contentBlocks } = $props();

    function renderRichText(richText: any[]) {
        return richText.map((text) => {
            const { annotations, plain_text, href } = text;
            const style = `
            font-weight: ${annotations.bold ? 'bold' : 'normal'};
            font-style: ${annotations.italic ? 'italic' : 'normal'};
                text-decoration: ${annotations.strikethrough ? 'line-through' : annotations.underline ? 'underline' : 'none'};
            `;
            
            return {
                href,
                style,
                text: plain_text
            };
        });
    }

    function groupBulletedListItems(blocks: any[]) {
        const groupedBlocks = [];
        let currentList: any = null;

        for (const block of blocks) {
            if (block.type === 'bulleted_list_item') {
                if (!currentList) {
                    currentList = {
                        type: 'bulleted_list',
                        bulleted_list: {
                            items: []
                        }
                    };
                    groupedBlocks.push(currentList);
                }
                currentList.bulleted_list.items.push({
                    rich_text: block.bulleted_list_item.rich_text
                });
            } else {
                currentList = null;
                groupedBlocks.push(block);
            }
        }
        return groupedBlocks;
    }

    const processedContentBlocks = groupBulletedListItems(contentBlocks);
</script>

<div id="manifesto" class="bg-white px-6 py-16 lg:px-8 flex items-center justify-center">
    <div class="-m-2 w-fit rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 relative z-10">
        <div class="rounded-[2rem] p-2 shadow-md shadow-black/5">
            <div class="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                <div class="mx-auto max-w-3xl text-base/7 text-gray-700 py-8">
                    <p style:color={primaryColor} class="text-base/7 font-semibold">{articleHeading}</p>
                    <h1 class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{articleTitle}</h1>
                    <p class="mt-6 text-xl/8">{articleSubtitle}</p>
                    <div class="mt-10 max-w-2xl">
                        {#each processedContentBlocks as block}
                            {#if block.type === 'paragraph'}
                                <p>
                                    {#each renderRichText(block.paragraph.rich_text) as content}
                                        {#if content.href}
                                            <a href={content.href} style={content.style} class="text-blue-500 hover:underline">
                                                {content.text}
                                            </a>
                                        {:else}
                                            <span style={content.style}>
                                                {content.text}
                                            </span>
                                        {/if}
                                    {/each}
                                </p>
                            {:else if block.type === 'heading_1'}
                                <h1 class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {#each renderRichText(block.heading_1.rich_text) as content}
                                        <span style={content.style}>{content.text}</span>
                                    {/each}
                                </h1>
                            {:else if block.type === 'heading_2'}
                                <h2 class="mt-16 text-pretty text-3xl font-semibold tracking-tight text-gray-900">
                                    {#each renderRichText(block.heading_2.rich_text) as content}
                                        <span style={content.style}>{content.text}</span>
                                    {/each}
                                </h2>
                            {:else if block.type === 'bulleted_list'}
                                <ul role="list" class="mt-8 max-w-xl space-y-8 text-gray-600">
                                    {#each block.bulleted_list.items as item}
                                        <li class="flex gap-x-3">
                                            <svg style:color={primaryColor} class="mt-1 size-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                                            </svg>
                                            <span>
                                                {#each renderRichText(item.rich_text) as content}
                                                    {#if content.href}
                                                        <a href={content.href} style={content.style} class="text-blue-500 hover:underline">
                                                            {content.text}
                                                        </a>
                                                    {:else}
                                                        <span style={content.style}>{content.text}</span>
                                                    {/if}
                                                {/each}
                                            </span>
                                        </li>
                                    {/each}
                                </ul>
                            {:else if block.type === 'image'}
                                {@const value = block.image}
                                {@const src = value.type === 'external' ? value.external.url : value.file.url}
                                {@const caption = value.caption?.[0]?.plain_text}
                                <figure class="mt-16">
                                    <img class="aspect-video rounded-xl bg-gray-50 object-cover" {src} alt={caption || ''} />
                                    {#if caption}
                                        <figcaption class="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
                                            <svg class="mt-0.5 size-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
                                            </svg>
                                            {caption}
                                        </figcaption>
                                    {/if}
                                </figure>
                            {:else}
                                <p>Unsupported block type: {block.type}</p>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
