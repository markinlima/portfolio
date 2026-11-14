import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/modules/landing-pages/pages/contact/components/contact-page";

export const Route = createFileRoute("/_landing-pages/contact/")({
	head: () => ({
		meta: [
			{ title: "Marcos | Contatos" },
			{
				name: "description",
				content:
					"Entre em contato comigo através do formulário ou pelas minhas redes sociais. Estou sempre aberto a novas conexões e oportunidades!",
			},
			{ property: "og:title", content: "Marcos | Contatos" },
			{
				property: "og:description",
				content:
					"Entre em contato comigo através do formulário ou pelas minhas redes sociais. Estou sempre aberto a novas conexões e oportunidades!",
			},
		],
	}),
	component: ContactPage,
});
