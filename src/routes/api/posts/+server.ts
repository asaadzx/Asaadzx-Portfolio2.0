import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";

export async function GET() {
	const result = await db.execute("SELECT slug, views, likes FROM posts");

	const stats: Record<string, { views: number; likes: number }> = {};
	for (const row of result.rows) {
		const slug = String(row.slug ?? "").trim();

		// A missing front-matter slug reaches the database as the literal text
		// "undefined", because JS stringifies undefined rather than skipping it.
		// That row has a real view count but no post behind it, so serving it
		// makes clients render a ghost entry. The app filters these too; both
		// layers exist so neither is a single point of failure.
		if (!slug || slug === "undefined" || slug === "null" || slug === "NaN") {
			continue;
		}

		stats[slug] = {
			views: Number(row.views),
			likes: Number(row.likes),
		};
	}

	return json(stats);
}
