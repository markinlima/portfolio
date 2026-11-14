import z from "zod/v4";

export const linkSchema = z.object({
	name: z.string(),
	type: z.enum(["github", "demo", "external"]),
	href: z.string(),
});

export const plataforms = z.enum(["desktop", "mobile", "web"]);
export const projectCategories = z.enum(["all", "work", "personal", "demo"]);

export const projectCategoriesInfo = {
	all: {
		displayName: "Todos",
	},
	work: {
		displayName: "Trabalho",
	},
	demo: {
		displayName: "Demo",
	},
	personal: {
		displayName: "Pessoal",
	},
};

export const projectSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	techs: z.array(z.string()),
	platforms: z.array(plataforms),
	images: z.array(z.string()),
	links: z.array(linkSchema),
	categories: z.array(projectCategories),
});

export type Project = z.infer<typeof projectSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Plataform = z.infer<typeof plataforms>;
export type ProjectCategory = z.infer<typeof projectCategories>;
