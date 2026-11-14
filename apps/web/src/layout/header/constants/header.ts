import { ClockIcon, Code2Icon, type LucideIcon, MailIcon, User2Icon } from "lucide-react";

import type { FileRouteTypes } from "@/types/routeTree.generated";

export interface HeaderLinksProps {
	href: FileRouteTypes["to"];
	label: string;
	icon: LucideIcon;
}

export const headerLinks: HeaderLinksProps[] = [
	{
		href: "/",
		label: "Sobre",
		icon: User2Icon,
	},
	{
		href: "/projects",
		label: "Projetos",
		icon: Code2Icon,
	},
	{
		href: "/time-line",
		label: "Linha do tempo",
		icon: ClockIcon,
	},
	{
		href: "/contact",
		label: "Contatos",
		icon: MailIcon,
	},
];
