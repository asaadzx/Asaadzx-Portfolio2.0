import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";

export async function GET({ params }) {
	const result = await db.execute({
		sql: "SELECT views, likes FROM posts WHERE slug = ?",
		args: [params.slug],
	});

	if (result.rows.length === 0) {
		return json({ views: 0, likes: 0 });
	}

	const row = result.rows[0];
	return json({
		views: Number(row.views),
		likes: Number(row.likes),
	});
}
