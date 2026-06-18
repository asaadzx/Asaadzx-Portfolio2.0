interface MarkdownModule {
	metadata: {
		title: string;
		date: string;
		excerpt: string;
		tags: string[];
		type?: string;
		featuredSize?: string;
		published?: boolean;
	};
	default: unknown;
}

export const load = async () => {
	const modules = import.meta.glob('/src/posts/*.md');
	const projectPromises = Object.entries(modules).map(async ([path, resolver]) => {
		const markdown = (await resolver()) as MarkdownModule;
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		return { slug, meta: markdown.metadata };
	});

	const allItems = await Promise.all(projectPromises);
	const projectsOnly = allItems
		.filter((item) => item.meta.published !== false && item.meta.type === 'project')
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

	return { projects: projectsOnly };
};
