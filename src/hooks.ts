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

export const reroute: Reroute = ({ url }) => {
    // Skip rerouting during prerendering
    if (building) return;

    const root = building 
        ? url.host.split(".")[0]
        : (PUBLIC_TEST_DATABASE_DOMAIN || url.host.split(".")[0]);

    if (domains.includes(root)) {
        return `/${root}`;
    }
};
