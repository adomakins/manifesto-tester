import type { Reroute } from '@sveltejs/kit';
import { PUBLIC_TEST_DATABASE_DOMAIN } from '$env/static/public';

const domains = [
    'cloudmechanics',
    'streamlined',
    'highlevelappkit',
    'reachstorm',
    'jetpost',
]

export const reroute: Reroute = ({ url }) => {
    let root;
    if (PUBLIC_TEST_DATABASE_DOMAIN) {
        root = PUBLIC_TEST_DATABASE_DOMAIN;
    } else {
        root = url.host.split(".")[0];
    }

    //console.log("Root:", root);
    //console.log("Full path:", `${url.host}/${root}`);
    
	if (domains.includes(root)) {
		return `/${root}`;
	}
};
