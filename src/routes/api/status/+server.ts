import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { STATUS_API_TOKEN } from "$env/static/private";

/**
 * Writes are gated on STATUS_API_TOKEN, not on GITHUB_TOKEN.
 *
 * The Android app authenticates to this endpoint with a dedicated write token so
 * that its GitHub PAT - which is only ever scoped to `GET /user` and grants no
 * writes - is never sent here. Gating on GITHUB_TOKEN instead meant the request
 * was compared against the backend's own credential for calling
 * api.github.com, which no client could ever hold, so every write returned 401.
 *
 * Deployments that do not set STATUS_API_TOKEN keep the previous behaviour of
 * leaving writes ungated. That is only safe while the endpoint is unreachable
 * from the internet; set the variable to keep it closed.
 */
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
	if (STATUS_API_TOKEN) {
		const auth = request.headers.get("authorization");
		if (!auth || auth !== `Bearer ${STATUS_API_TOKEN}`) {
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
