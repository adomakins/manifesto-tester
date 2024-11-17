import type { Reroute } from '@sveltejs/kit';
import { building } from '$app/environment';

const domains = [
    'cloudmechanics',
    'streamlined',
    'highlevelappkit',
    'reachstorm',
    'jetpost',
]

export const reroute: Reroute = ({ url }) => {
    // Skip rerouting during build time
    if (building) return;

    // Skip Vercel internal requests
    if (url.pathname.startsWith('/.well-known/vercel')) {
        return;
    }

    const root = url.hostname.split(".")[0];
    
    // Don't reroute if we're already on the correct path
    if (url.pathname.startsWith(`/${root}`)) {
        return;
    }

    if (domains.includes(root)) {
        return `/${root}`;
    }
    
    return;
};
