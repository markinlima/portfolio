import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@web/ui/button";

import { useTheme } from "@/core/themes/app-theme";

/** Switches between the dark and the light theme. */
export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme.name === "dark";

	return (
		<Button
			aria-label="Alternar tema"
			variant="outline"
			size="icon"
			onClick={() => {
				setTheme(isDark ? "light" : "dark");
			}}
		>
			{isDark ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
}
