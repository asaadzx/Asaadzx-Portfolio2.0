interface MarkdownModule {
	metadata: {
		title: string;
		date: string;
		excerpt: string;
		tags: string[];
		type?: string;
		published?: boolean;
	};
	default: unknown;
}

export const prerender = true;

export const GET = async () => {
	const modules = import.meta.glob('/src/posts/*.md');
	const postPromises = Object.entries(modules).map(async ([path, resolver]) => {
		const markdown = (await resolver()) as MarkdownModule;
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		return { slug, meta: markdown.metadata };
	});

	const allPosts = await Promise.all(postPromises);
	const publishedPosts = allPosts
		.filter((post) => post.meta.published !== false)
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

	const items = publishedPosts
		.map(
			(post) => `
		<item>
			<title><![CDATA[${post.meta.title}]]></title>
			<link>https://asaadzx.is-a.dev/blog/${post.slug}/</link>
			<description><![CDATA[${post.meta.excerpt}]]></description>
			<pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
			<guid>https://asaadzx.is-a.dev/blog/${post.slug}/</guid>
		</item>`,
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Asaad Zein</title>
		<link>https://asaadzx.is-a.dev/</link>
		<description>Full-stack developer and 3D artist — local LLMs, embedded systems, web infrastructure.</description>
		<language>en</language>
		<atom:link href="https://asaadzx.is-a.dev/rss.xml" rel="self" type="application/rss+xml"/>
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	});
};
