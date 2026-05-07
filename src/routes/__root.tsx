/// <reference types="vite/client" />

import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { queryClient } from "@/lib/tanstack-query/client";
import { ToastProvider } from "@/modules/notification/components/toast-provider";
import { ThemeProvider } from "@/modules/theme/context/theme-provider";
import type { RouteContext } from "@/types/tanstack-router";
import appCss from "../styles/global.css?url";

export const Route = createRootRouteWithContext<RouteContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "Marcos | Engenheiro de Software & Frontend Developer" },
			{
				name: "description",
				content:
					"Portfólio profissional de Marcos, Engenheiro de Software especializado em React, TypeScript e infraestrutura DevOps. Confira meus projetos e experiências.",
			},
			{
				name: "keywords",
				content: "Engenharia de Software, Frontend Developer, React, TypeScript, DevOps, Portfolio, Desenvolvedor Web",
			},
			{
				name: "author",
				content: "Marcos",
			},
			{
				property: "og:title",
				content: "Marcos | Software Engineer Portfolio",
			},
			{
				property: "og:description",
				content:
					"Desenvolvedor Frontend com experiência em React e gestão de infraestrutura. Veja como posso ajudar no seu próximo projeto.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:image",
				content: "/images/og.webp",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Marcos | Software Engineer Portfolio",
			},
			{
				name: "twitter:description",
				content: "Explore o portfólio de Marcos, focado em tecnologias modernas como React e ecossistema TanStack.",
			},
			{
				name: "robots",
				content: "index, follow",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/images/icon.svg" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<ToastProvider>
						<div className="w-full">
							<main className="flex w-full flex-col items-center">
								<Outlet />
							</main>
						</div>
					</ToastProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="pt">
			<head>
				<HeadContent />
				<script defer src="https://umami.kitokinha.com/script.js" data-website-id="e816cc05-051f-4925-b1fd-05ce8b3cc9c1" />
				<script
					defer
					src="https://umami.kitokinha.com/recorder.js"
					data-website-id="e816cc05-051f-4925-b1fd-05ce8b3cc9c1"
					data-sample-rate="0.15"
					data-mask-level="moderate"
					data-max-duration="300000"
				/>
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
