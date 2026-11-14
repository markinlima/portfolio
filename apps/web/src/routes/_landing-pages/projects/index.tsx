import { createFileRoute } from "@tanstack/react-router";

import { ProjectsPage } from "@/modules/landing-pages/pages/projects/components/projects-page";

export const Route = createFileRoute("/_landing-pages/projects/")({
	head: () => ({
		meta: [
			{ title: "Marcos | Projetos" },
			{
				name: "description",
				content: "Explore meus projetos de desenvolvimento de software. Veja os detalhes, tecnologias usadas e resultados alcançados.",
			},
			{ property: "og:title", content: "Marcos | Projetos" },
			{
				property: "og:description",
				content: "Explore meus projetos de desenvolvimento de software. Veja os detalhes, tecnologias usadas e resultados alcançados.",
			},
		],
	}),
	component: ProjectsPage,
});
