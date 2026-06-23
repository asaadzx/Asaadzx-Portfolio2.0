import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";

export async function POST({ params }) {
	await db.execute({
		sql: `INSERT INTO posts (slug, views, likes) VALUES (?, 1, 0)
					ON CONFLICT(slug) DO UPDATE SET views = views + 1`,
		args: [params.slug],
	});

	const result = await db.execute({
		sql: "SELECT views FROM posts WHERE slug = ?",
		args: [params.slug],
	});

	return json({ views: Number(result.rows[0].views) });
}
