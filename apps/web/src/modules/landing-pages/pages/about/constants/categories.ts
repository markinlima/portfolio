import { CogIcon, ContainerIcon, GlobeIcon, type LucideIcon } from "lucide-react";

export const categories = ["all", "frontend", "backend", "devops"] as const;
export type Categories = (typeof categories)[number];

export const categoriesInfo = {
	all: {
		displayName: "Todas",
	},
	frontend: {
		displayName: "Front-end",
	},
	backend: {
		displayName: "Back-end",
	},
	devops: {
		displayName: "DevOps",
	},
};

export interface Areas {
	name: string;
	description: string;
	icon: LucideIcon;
}

export const areas: Areas[] = [
	{
		name: "Front-End",
		description: "Desenvolvo interfaces de usuário modernas e dinâmicas usando React, focando na melhor experiência e usabilidade.",
		icon: GlobeIcon,
	},
	{
		name: "Back-End",
		description: "Crio APIs robustas e eficientes que garantem a segurança e a escalabilidade da aplicação.",
		icon: CogIcon,
	},
	{
		name: "DevOps",
		description:
			"Otimizo fluxos de trabalho e garanto a consistência entre ambientes, agilizando a entrega e o deploy de novas funcionalidades.",
		icon: ContainerIcon,
	},
];
