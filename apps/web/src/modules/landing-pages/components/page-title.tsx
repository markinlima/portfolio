import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";
import { cn } from "tailwind-variants";

import { pageTitleVariants } from "@/modules/landing-pages/constants/page-title-variants";

export interface PageTitleProps extends ComponentProps<"h2">, VariantProps<typeof pageTitleVariants> {
	isH1?: boolean;
	showDecoration?: boolean;
}

/** The title of a page or a section, with the optional gradient bar under it. */
export function PageTitle({ className, children, isH1, showDecoration, size, ...props }: PageTitleProps) {
	const TitleElement = isH1 ? "h1" : "h2";

	return (
		<div className="w-fit">
			<TitleElement className={cn(pageTitleVariants({ size }), className)} {...props}>
				{children}
			</TitleElement>
			{!!showDecoration && <div className="from-primary to-secondary mt-4 h-1 w-[70%] rounded-md bg-linear-to-tr" />}
		</div>
	);
}
