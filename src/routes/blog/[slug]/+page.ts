import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`$posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata,
		};
	} catch {
		throw error(404, `Log Packet [${params.slug}] Not Resolved In Database Array.`);
	}
};
