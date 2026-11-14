import type { ThemeKeys } from "@/modules/theme/constants/themes";
import { IsClientSide } from "@/utils/is-client-side";

const THEME_KEY = "theme";

export function saveThemeInStorage(theme: ThemeKeys) {
	if (!IsClientSide()) return;

	localStorage.setItem(THEME_KEY, theme);
}

export function getStorageTheme(): ThemeKeys {
	if (!IsClientSide()) return "dark";
	const storedTheme = localStorage.getItem(THEME_KEY) as ThemeKeys | undefined;

	if (storedTheme) {
		return storedTheme;
	}

	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
}

export function deleteStorageTheme() {
	if (!IsClientSide()) return;

	localStorage.removeItem(THEME_KEY);
}
