import type { Categories } from "@/modules/landing-pages/pages/about/constants/categories";

interface skills {
	icon: string;
	name: string;
	category: Categories[];
	status: "learned" | "learning";
}

export const skills: skills[] = [
	{
		icon: "typescript_icon",
		name: "TypeScript",
		category: ["frontend", "backend"],
		status: "learned",
	},
	{
		icon: "kubernetes_icon",
		name: "Kubernetes",
		category: ["devops"],
		status: "learning",
	},
	{
		icon: "react_icon",
		name: "React",
		category: ["frontend"],
		status: "learned",
	},
	{
		icon: "tanstack_icon",
		name: "TanStack Libs",
		category: ["frontend"],
		status: "learned",
	},
	{
		icon: "nextjs_icon",
		name: "Nextjs",
		category: ["frontend"],
		status: "learned",
	},
	{
		icon: "elysia_icon",
		name: "Elysia",
		category: ["backend"],
		status: "learned",
	},
	{
		icon: "bun_icon",
		name: "Bun",
		category: ["backend"],
		status: "learned",
	},
	{
		icon: "node_icon",
		name: "Node.js",
		category: ["backend"],
		status: "learned",
	},
	{
		icon: "postgres_icon",
		name: "PostgreSQL",
		category: ["backend"],
		status: "learned",
	},
	{
		icon: "redis_icon",
		name: "Redis",
		category: ["backend"],
		status: "learned",
	},
	{
		icon: "docker_icon",
		name: "Docker",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "nginx_icon",
		name: "Nginx",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "jenkins_icon",
		name: "Jenkins",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "github_actions_icon",
		name: "GitHub Actions",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "grafana_icon",
		name: "Grafana",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "prometheus_icon",
		name: "Prometheus",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "loki_icon",
		name: "Loki",
		category: ["devops"],
		status: "learned",
	},
	{
		icon: "vitest_icon",
		name: "Vitest",
		category: ["frontend", "backend"],
		status: "learned",
	},
	{
		icon: "zustand_icon",
		name: "Zustand",
		category: ["frontend"],
		status: "learned",
	},
	{
		icon: "tailwind_icon",
		name: "Tailwind CSS",
		category: ["frontend"],
		status: "learned",
	},
	{
		icon: "signoz_icon",
		name: "SigNoz",
		category: ["devops"],
		status: "learning",
	},
	{
		icon: "posthog_icon",
		name: "Posthog",
		category: ["backend"],
		status: "learning",
	},
];

export const learningSkills: skills[] = skills.filter((skill) => skill.status === "learning");
export const learnedSkills: skills[] = skills.filter((skill) => skill.status === "learned");
