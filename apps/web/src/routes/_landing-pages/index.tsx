import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/modules/landing-pages/pages/about/components/about-page";

export const Route = createFileRoute("/_landing-pages/")({
	head: () => ({
		meta: [
			{ title: "Marcos | Sobre Mim" },
			{
				name: "description",
				content: "Conheça mais sobre mim, minha experiência profissional, habilidades e áreas de atuação como Engenheiro de Software.",
			},
			{ property: "og:title", content: "Marcos | Sobre Mim" },
			{
				property: "og:description",
				content: "Conheça mais sobre mim, minha experiência profissional, habilidades e áreas de atuação como Engenheiro de Software.",
			},
		],
	}),
	component: AboutPage,
});
