import { tv } from "tailwind-variants";

/** Sizes of a page title: `default` for sections, `lg` for the main title of a page. */
export const pageTitleVariants = tv({
	base: "text-4xl font-bold",
	variants: { size: { default: "text-2xl", sm: "text-xl", lg: "text-4xl" } },
	defaultVariants: { size: "default" },
});
