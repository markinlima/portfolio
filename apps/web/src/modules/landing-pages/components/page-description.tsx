import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

/** The short text under a page title. */
export function PageDescription({ className, children, ...props }: ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground mt-4 max-w-xl text-sm", className)} {...props}>
			{children}
		</p>
	);
}
