import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

// Inject speed insights Vercel
injectSpeedInsights();

// Inject analytics Vercel
injectAnalytics({ mode: dev ? "development" : "production" });

export const prerender = true;
export const trailingSlash = "always";
