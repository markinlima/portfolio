import { useState } from "react";

import { Button } from "@web/ui/button";
import { Dialog } from "@web/ui/dialog";
import { Landing } from "@web/ui/landing";

import { PageTitle } from "@/modules/landing-pages/components/page-title";
import { pageLayoutClassName } from "@/modules/landing-pages/constants/page-layout";
import { ProjectCard } from "@/modules/landing-pages/pages/projects/components/project-card";
import { ProjectDialog } from "@/modules/landing-pages/pages/projects/components/project-dialog";
import { projects } from "@/modules/landing-pages/pages/projects/constants/projects";
import { type ProjectCategory, projectCategories, projectCategoriesInfo } from "@/modules/landing-pages/schemas/project";

/** The projects, filtered by category. */
export function ProjectsPage() {
	const [currentProject, setCurrentProject] = useState<ProjectCategory>("all");
	const filteredProjects = currentProject === "all" ? projects : projects.filter((project) => project.categories.includes(currentProject));

	return (
		<Landing className={pageLayoutClassName}>
			<PageTitle showDecoration size="lg">
				Projetos
			</PageTitle>
			<div className="space-y-6">
				<div className="flex w-fit max-w-full gap-2 overflow-x-auto rounded-md border p-2">
					{projectCategories.options.map((category) => {
						const displayName = projectCategoriesInfo[category].displayName;
						const isActive = currentProject === category;

						return (
							<Button onClick={() => setCurrentProject(category)} key={category} variant={isActive ? "primary" : "ghost"}>
								{displayName}
							</Button>
						);
					})}
				</div>

				<div className="grid grid-cols-[repeat(auto-fit,350px)] gap-8 overflow-hidden">
					{filteredProjects.map((project) => {
						return (
							<Dialog key={project.id}>
								<Dialog.trigger className="text-left" onClick={() => window.umami?.track("view_project", { projectName: project.title })}>
									<ProjectCard project={project} />
								</Dialog.trigger>
								<ProjectDialog project={project} />
							</Dialog>
						);
					})}
				</div>
			</div>
		</Landing>
	);
}
