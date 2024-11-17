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
    if (building) {
        console.log("Skipping reroute during build");
        return;
    }

    console.log("Full URL:", url.toString());
    console.log("Pathname:", url.pathname);
    console.log("Host:", url.host);

    // Skip Vercel internal requests
    if (url.pathname.startsWith('/.well-known/vercel')) {
        console.log("Skipping Vercel internal request");
        return;
    }

    const root = url.hostname.split(".")[0];
    console.log("Root:", root);
    console.log("Is in domains?:", domains.includes(root));

    // Handle root path
    if (url.pathname === '/') {
        console.log("Root path detected");
        if (domains.includes(root)) {
            console.log("Rerouting root to:", `/${root}`);
            return `/${root}`;
        }
    }

    // Don't reroute if we're already on the correct path
    if (url.pathname.startsWith(`/${root}`)) {
        console.log("Already on correct path");
        return;
    }

    if (domains.includes(root)) {
        console.log("Rerouting to:", `/${root}`);
        return `/${root}`;
    }
    
    console.log("No reroute needed");
    return;
};
