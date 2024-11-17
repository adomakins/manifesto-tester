import { Client } from '@notionhq/client'
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { NOTION_INTEGRATION_TOKEN } from '$env/static/private'

export async function getAllBlocks(pageID: string): Promise<ListBlockChildrenResponse['results']> {
    const notion = new Client({ auth: NOTION_INTEGRATION_TOKEN });
    
    let blocks: ListBlockChildrenResponse['results'] = [];
    let cursor: string | undefined;

    while (true) {
        const response: ListBlockChildrenResponse = await notion.blocks.children.list({
                block_id: pageID,
                start_cursor: cursor,
            });
            
            blocks = [...blocks, ...response.results];
            
            if (!response.has_more) break;
        cursor = response.next_cursor || undefined;
    }
    
    return blocks;
}