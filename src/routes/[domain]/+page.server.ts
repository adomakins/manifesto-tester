import notionQuery from '$lib/server/query';
import { redirect } from '@sveltejs/kit';
import { getAllBlocks } from '$lib/server/content';
import { building } from '$app/environment';

export const prerender = true;

export function entries() {
	// Add all site domains here to enable pre-rendering
	return [
		{ domain: 'highlevelappkit' },
	];
}

export interface PageData {

	// Site
    name: string;
	domain: string;
	actionLink: string;

	// Content
	contentBlocks: any[];
	articleHeading: string;
	articleTitle: string;
	articleSubtitle: string;

	// Header
	heading: string;
	description: string;

	// CTA
	ctaHeading: string;
	ctaDescription: string;
	ctaText: string;

	// Colors
	primaryColor: string;
	gradientStart: string;
	gradientEnd: string;
}

export async function load(event): Promise<PageData> {

	let testDomain: string | undefined;

	try {
        testDomain = (await import('$env/static/public')).PUBLIC_TEST_DATABASE_DOMAIN;
    } catch {
        testDomain = undefined;
    }

	// Pull out the root domain from the request (subdomain or not)
    const root = building 
        ? event.params.domain 
        : (testDomain || event.url.host.split(".")[0]);
    // console.log("Root:", root);

	// Query the ideas database to find the site data
	const data = await notionQuery('ideas', {
		property: 'Domain',
		rich_text: {
			contains: root
		}
	});

	if (data.length === 0) {
		throw new Error('No data found');
	}

	console.log("Data:", data);

	const blocks = await getAllBlocks(data[0].id);

	if (blocks.length === 0) {
		throw new Error('No blocks found');
	}

	console.log("Blocks:", JSON.stringify(blocks, null, 2));

	return {
		name: data[0].name,
		domain: data[0].domain,
		actionLink: data[0]['action link'],
		heading: data[0]['hero heading'],
		description: data[0]['hero description'],
		ctaHeading: data[0]['cta heading'],
		ctaDescription: data[0]['cta description'],
		primaryColor: data[0]['primary color'],
		gradientStart: data[0]['gradient start'],
		gradientEnd: data[0]['gradient end'],
		ctaText: data[0]['call to action'],
		articleHeading: data[0]['article heading'],
		articleTitle: data[0]['article title'],
		articleSubtitle: data[0]['article subtitle'],
		contentBlocks: blocks,
	}
}