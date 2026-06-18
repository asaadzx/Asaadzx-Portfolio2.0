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

export const load = async () => {
	const modules = import.meta.glob('/src/posts/*.md');
	const postPromises = Object.entries(modules).map(async ([path, resolver]) => {
		const markdown = (await resolver()) as MarkdownModule;
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		return { slug, meta: markdown.metadata };
	});

	const allPosts = await Promise.all(postPromises);
	const publishedPosts = allPosts
		.filter((post) => post.meta.published !== false && post.meta.type !== 'project')
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

	return { posts: publishedPosts };
};
