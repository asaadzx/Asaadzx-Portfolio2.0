import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";

export async function GET() {
	const result = await db.execute("SELECT slug, views, likes FROM posts");

	const stats: Record<string, { views: number; likes: number }> = {};
	for (const row of result.rows) {
		stats[row.slug as string] = {
			views: Number(row.views),
			likes: Number(row.likes),
		};
	}

	return json(stats);
}
