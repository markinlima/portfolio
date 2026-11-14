import { Link } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { Button } from "@web/ui/button";

import { headerLinks } from "@/layout/header/constants/header";
import { ThemeToggle } from "@/modules/theme/components/theme-toggle";

interface HeaderProps {
	className?: string;
}

/** The header with the navigation links and the theme toggle. */
export function Header({ className }: HeaderProps) {
	return (
		<header className={cn("fixed top-0 right-0 z-50 p-2 max-lg:left-0 lg:p-4", className)}>
			<div className={cn("scroll-hidden bg-card flex w-full items-center gap-2 rounded-md border p-2")}>
				{headerLinks.map(({ href, label, icon: Icon }) => {
					return (
						<Link key={label} className="[&.active]:text-primary max-lg:w-full" to={href}>
							<Button aria-label={label} className="gap-2" variant="ghost">
								<Icon />
								<span className="max-lg:hidden">{label}</span>
							</Button>
						</Link>
					);
				})}
				<ThemeToggle />
			</div>
		</header>
	);
}
