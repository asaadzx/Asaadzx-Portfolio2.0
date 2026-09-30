import { json } from "@sveltejs/kit";

/**
 * GitHub exposes no REST endpoint for profile achievements - both
 * `/user/achievements` and `/users/{login}/achievements` return 404. The only
 * machine-readable source is the profile page HTML, where earned badges appear
 * as `<img data-hovercard-type="achievement">` tags carrying the badge image
 * plus its name.
 *
 * That markup is rendered twice (desktop sidebar + responsive variant), so
 * results are deduped by slug.
 *
 * Trade-offs, deliberately accepted:
 * - GitHub's ToS discourages scraping. This reads one public, read-only page
 *   and backs off to an hourly cache rather than polling.
 * - The parser is coupled to GitHub's current HTML. If a redesign breaks it we
 *   fall back to the last good cache instead of surfacing an error.
 */

const LOGIN = "asaadzx";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h
const BROWSER_UA =
	"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

type Achievement = {
	slug: string;
	name: string;
	imageUrl: string;
	tier: string | null;
};

let cache: { achievements: Achievement[]; fetchedAt: number } | null = null;
let inFlight: Promise<Achievement[]> | null = null;

const IMAGE_TAG = /<img\b[^>]*data-hovercard-type="achievement"[^>]*>/g;
const SRC = /\ssrc="([^"]+)"/;
const ALT = /\salt="Achievement:\s*([^"]+)"/;
const SLUG = /\/achievements\/([a-z0-9-]+)/;
const TIER = /-(default|bronze|silver|gold)-[0-9a-f]+\.png$/;

function parse(html: string): Achievement[] {
	const bySlug = new Map<string, Achievement>();

	for (const match of html.matchAll(IMAGE_TAG)) {
		const tag = match[0];
		const imageUrl = SRC.exec(tag)?.[1];
		const name = ALT.exec(tag)?.[1];
		if (!imageUrl || !name) continue;

		const slug = SLUG.exec(tag)?.[1] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
		if (bySlug.has(slug)) continue;

		bySlug.set(slug, {
			slug,
			name,
			imageUrl,
			tier: TIER.exec(imageUrl)?.[1] ?? null,
		});
	}

	return [...bySlug.values()];
}

async function fetchAchievements(): Promise<Achievement[]> {
	const res = await fetch(`https://github.com/${LOGIN}`, {
		headers: { "user-agent": BROWSER_UA, accept: "text/html" },
	});
	if (!res.ok) throw new Error(`github responded ${res.status}`);
	return parse(await res.text());
}

async function load(): Promise<Achievement[]> {
	// Collapse concurrent cold-start requests into a single upstream fetch.
	if (!inFlight) {
		inFlight = fetchAchievements()
			.then((achievements) => {
				cache = { achievements, fetchedAt: Date.now() };
				return achievements;
			})
			.finally(() => {
				inFlight = null;
			});
	}
	return inFlight;
}

export async function GET() {
	if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
		// Destructure inside the guard so TS narrows `cache` to non-null.
		const { achievements } = cache;
		return json(
			{ login: LOGIN, achievements, cached: true },
			{ headers: { "cache-control": "public, max-age=3600" } },
		);
	}

	try {
		const achievements = await load();
		return json(
			{ login: LOGIN, achievements, cached: false },
			{ headers: { "cache-control": "public, max-age=3600" } },
		);
	} catch (err) {
		// Stale data beats a broken profile section: GitHub redesigns or rate
		// limits should never make achievements disappear from the site.
		if (cache) {
			console.warn("[achievements] refresh failed, serving stale cache", err);
			return json(
				{ login: LOGIN, achievements: cache.achievements, cached: true, stale: true },
				{ headers: { "cache-control": "public, max-age=600" } },
			);
		}

		console.error("[achievements] refresh failed and no cache available", err);
		// Empty list, not an error: the app renders achievements as optional.
		return json({ login: LOGIN, achievements: [], cached: false, unavailable: true });
	}
}
