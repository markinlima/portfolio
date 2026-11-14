import { createFileRoute } from "@tanstack/react-router";

import { TimeLinePage } from "@/modules/landing-pages/pages/time-line/components/time-line-page";

export const Route = createFileRoute("/_landing-pages/time-line/")({
	head: () => ({
		meta: [
			{ title: "Marcos | Linha do tempo" },
			{
				name: "description",
				content: "Explore os marcos significativos da minha jornada, desde a educação até as conquistas profissionais.",
			},
			{ property: "og:title", content: "Marcos | Linha do tempo" },
			{
				property: "og:description",
				content: "Explore os marcos significativos da minha jornada, desde a educação até as conquistas profissionais.",
			},
		],
	}),
	component: TimeLinePage,
});
