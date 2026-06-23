import { json } from "@sveltejs/kit";
import { GITHUB_TOKEN } from "$env/static/private";

export async function GET() {
	const headers: Record<string, string> = {
		accept: "application/vnd.github.v3+json",
		"user-agent": "asaadzx-portfolio",
	};
	if (GITHUB_TOKEN && GITHUB_TOKEN.length > 0) {
		headers.authorization = `Bearer ${GITHUB_TOKEN}`;
	}

	const [userRes, reposRes] = await Promise.all([
		fetch("https://api.github.com/users/asaadzx", { headers }),
		fetch(
			"https://api.github.com/users/asaadzx/repos?sort=updated&per_page=5&type=public",
			{ headers },
		),
	]);

	if (!userRes.ok || !reposRes.ok) {
		return json({ error: "GitHub API error" }, { status: 502 });
	}

	const user = await userRes.json();
	const repos = await reposRes.json();

	const recent = repos.map((r: Record<string, unknown>) => ({
		name: r.name,
		description: r.description,
		url: r.html_url,
		stars: r.stargazers_count,
		language: r.language,
		updatedAt: r.updated_at,
	}));

	return json({
		login: user.login,
		avatar: user.avatar_url,
		name: user.name,
		bio: user.bio,
		publicRepos: user.public_repos,
		followers: user.followers,
		following: user.following,
		url: user.html_url,
		repos: recent,
	});
}
