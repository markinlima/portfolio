import { createFileRoute } from "@tanstack/react-router";

import { LinksPage } from "@/modules/landing-pages/pages/links/components/links-page";

export const Route = createFileRoute("/_landing-pages/links/")({
	head: () => ({ meta: [{ title: "Marcos | Links" }] }),
	component: LinksPage,
});
