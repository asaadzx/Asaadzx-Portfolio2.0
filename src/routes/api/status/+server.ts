import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { GITHUB_TOKEN } from "$env/static/private";

export async function GET() {
	const result = await db.execute("SELECT key, value, updated_at FROM status");
	const status: Record<string, { value: string; updatedAt: string }> = {};
	for (const row of result.rows) {
		status[row.key as string] = {
			value: row.value as string,
			updatedAt: row.updated_at as string,
		};
	}
	return json(status);
}

export async function POST({ request }) {
	if (GITHUB_TOKEN) {
		const auth = request.headers.get("authorization");
		if (!auth || auth !== `Bearer ${GITHUB_TOKEN}`) {
			return json({ error: "Unauthorized" }, { status: 401 });
		}
	}

	const body = await request.json();
	if (!body.key || body.value === undefined) {
		return json({ error: "key and value required" }, { status: 400 });
	}

	await db.execute({
		sql: `INSERT INTO status (key, value, updated_at) VALUES (?, ?, datetime('now'))
					ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
		args: [body.key, String(body.value)],
	});

	return json({ ok: true });
}
