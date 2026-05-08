import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Landing } from "@/components/ui/landing";
import { ProjectCard } from "@/modules/portifolio/pages/projects/components/project-card";
import { ProjectDialog } from "@/modules/portifolio/pages/projects/components/project-dialog";
import { projects } from "@/modules/portifolio/pages/projects/constants/projects";
import { type ProjectCategory, projectCategories, projectCategoriesInfo } from "@/schemas/project";

export const Route = createFileRoute("/_portifolio/projects/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Marcos | Projetos" },
			{
				name: "description",
				content: "Explore meus projetos de desenvolvimento de software. Veja os detalhes, tecnologias usadas e resultados alcançados.",
			},
			{
				property: "og:title",
				content: "Marcos | Projetos",
			},
			{
				property: "og:description",
				content: "Explore meus projetos de desenvolvimento de software. Veja os detalhes, tecnologias usadas e resultados alcançados.",
			},
		],
	}),
});

function RouteComponent() {
	const [currentProject, setCurrentProject] = useState<ProjectCategory>("all");
	const filteredProjects = currentProject === "all" ? projects : projects.filter((project) => project.categories.includes(currentProject));

	return (
		<Landing.Page className="h-full space-y-16">
			<Landing.Title showDecoration size="lg">
				Projetos
			</Landing.Title>
			<div className="space-y-6">
				<div className="flex w-fit max-w-full gap-2 overflow-x-auto rounded-md border p-2">
					{projectCategories.options.map((categories) => {
						const displayName = projectCategoriesInfo[categories].displayName;
						const isActive = currentProject === categories;
						return (
							<Button onClick={() => setCurrentProject(categories)} key={categories} hideShadow variant={isActive ? "primary" : "ghost"}>
								{displayName}
							</Button>
						);
					})}
				</div>

				<div className="grid grid-cols-[repeat(auto-fit,350px)] gap-8 overflow-hidden">
					{filteredProjects.map((project) => {
						return (
							<Dialog.Root key={project.id}>
								<Dialog.Trigger
									className="text-left"
									onClick={() => window.umami?.track("view_project", { projectName: project.title })}
								>
									<ProjectCard project={project} />
								</Dialog.Trigger>
								<ProjectDialog project={project} />
							</Dialog.Root>
						);
					})}
				</div>
			</div>
		</Landing.Page>
	);
}
