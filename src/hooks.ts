import type { Reroute } from '@sveltejs/kit';
import { building } from '$app/environment';
import { PUBLIC_TEST_DATABASE_DOMAIN } from '$env/static/public';

const domains = [
    'cloudmechanics',
    'streamlined',
    'highlevelappkit',
    'reachstorm',
    'jetpost',
]

// Get test domain value at module initialization
let TEST_DOMAIN: string | undefined;
try {
    // Using require-style import for synchronous access
    TEST_DOMAIN = process.env.PUBLIC_TEST_DATABASE_DOMAIN;
} catch {
    TEST_DOMAIN = undefined;
}

export const reroute: Reroute = ({ url }) => {
    if (building) return;
    
    const root = TEST_DOMAIN || url.host.split(".")[0];

    if (domains.includes(root)) {
        return `/${root}`;
    }
};
