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

    const root = url.host.split(".")[0];

    console.log("Root:", root);
    console.log("Rerouting:", domains.includes(root));
    console.log("Heading to:", `${url.host}/${root}`);

    if (domains.includes(root)) {
        return `/${root}`;
    }
};
