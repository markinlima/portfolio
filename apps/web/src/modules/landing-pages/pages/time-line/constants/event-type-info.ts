import { AwardIcon, BriefcaseIcon, Calendar1Icon, GraduationCapIcon, type LucideIcon } from "lucide-react";

import type { EventType } from "@/modules/landing-pages/pages/time-line/types/timeline-event";

export interface EventTypeInfo {
	icon: LucideIcon;
	color: string;
	label: string;
	badgeColor: string;
}

export const eventTypes: Record<EventType | "default", EventTypeInfo> = {
	achievement: {
		icon: AwardIcon,
		color: "bg-yellow-500 border-yellow-600",
		label: "Conquista",
		badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
	},
	education: {
		icon: GraduationCapIcon,
		color: "bg-blue-500 border-blue-600",
		label: "Educação",
		badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
	},
	workExperience: {
		icon: BriefcaseIcon,
		color: "bg-green-500 border-green-600",
		label: "Experiência",
		badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
	},
	default: {
		icon: Calendar1Icon,
		color: "bg-gray-500 border-gray-600",
		label: "Evento",
		badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
	},
};
