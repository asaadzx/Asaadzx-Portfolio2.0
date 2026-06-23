import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";

export async function POST({ params }) {
	await db.execute({
		sql: `INSERT INTO posts (slug, views, likes) VALUES (?, 0, 1)
					ON CONFLICT(slug) DO UPDATE SET likes = likes + 1`,
		args: [params.slug],
	});

	const result = await db.execute({
		sql: "SELECT likes FROM posts WHERE slug = ?",
		args: [params.slug],
	});

	return json({ likes: Number(result.rows[0].likes) });
}

export async function DELETE({ params }) {
	await db.execute({
		sql: `UPDATE posts SET likes = MAX(0, likes - 1) WHERE slug = ?`,
		args: [params.slug],
	});

	const result = await db.execute({
		sql: "SELECT likes FROM posts WHERE slug = ?",
		args: [params.slug],
	});

	return json({ likes: Number(result.rows[0]?.likes ?? 0) });
}
