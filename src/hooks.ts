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

    // Add more detailed logging
    console.log("Full URL:", url.toString());
    console.log("Pathname:", url.pathname);
    console.log("Host:", url.host);
    
    const root = url.hostname.split(".")[0];  // Try hostname instead of host
    
    console.log("Root:", root);
    console.log("Is in domains?:", domains.includes(root));

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
