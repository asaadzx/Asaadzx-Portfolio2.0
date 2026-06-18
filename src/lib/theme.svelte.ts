import { browser } from '$app/environment';

class ThemeManager {
	current = $state(browser ? localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark') : 'dark');

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';

		if (browser) {
			document.documentElement.setAttribute('data-theme', this.current);
			localStorage.setItem('theme', this.current);
		}
	}
}

export const theme = new ThemeManager();
