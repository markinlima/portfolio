import type { Project } from "@/schemas/project";

export const projects: Project[] = [
	{
		id: "1",
		title: "Comedyhub",
		description: "uma rede social de memes, onde os usuarios pode postar, comentar, salvar e curtir varios memes.",
		techs: ["Elysia", "TypeScript", "Postgres", "Docker", "Nginx", "TanStack Libs"],
		platforms: ["mobile", "desktop", "web"],
		images: ["/projects/comedyhub.webp", "/projects/comedyhub1.webp", "/projects/comedyhub2.webp"],
		links: [
			{
				name: "The ComedyHub",
				type: "external",
				href: "https://thecomedyhub.com.br/",
			},
		],
		categories: ["personal", "work"],
		featured: true,
		metrics: [
			{ label: "Likes", value: "1.7M" },
			{ label: "Chubs", value: "93.8K" },
			{ label: "Usuários", value: "10.6K" },
			{ label: "Comentários", value: "196.8K" },
		],
	},
	{
		id: "2",
		title: "Mimaeu",
		description:
			"Site para compartilhamento de presentes, onde os usuarios podem criar listas de presentes para eventos como aniversários, casamentos, etc.",
		techs: ["n8n", "Elysia", "Postgres", "TypeScript", "TanStack Libs"],
		platforms: ["web"],
		images: ["/projects/mimaeu.webp", "/projects/mimaeu2.webp"],
		links: [
			{
				name: "Mimaeu",
				type: "external",
				href: "https://mimaeu.com",
			},
		],
		categories: ["personal"],
		featured: false,
	},
	{
		id: "3",
		title: "Portfólio",
		description: "Portfólio pessoal e painel de administração para gerenciar e exibir meus projetos dinamicamente.",
		techs: ["Elysia", "TypeScript", "Postgres", "Docker"],
		platforms: ["web"],
		images: ["/projects/portfolio.webp", "/projects/portfolio1.webp", "/projects/portfolio2.webp", "/projects/portfolio3.webp"],
		links: [
			{
				name: "Site",
				type: "external",
				href: "https://markinlima.com/",
			},
			{
				name: "GitHub",
				type: "github",
				href: "https://github.com/MarcosLima-1/portfolio",
			},
		],
		categories: ["demo"],
		featured: false,
	},
];

export const featuredProjects = projects.filter((project) => project.featured);
