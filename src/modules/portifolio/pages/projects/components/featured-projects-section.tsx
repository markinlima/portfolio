import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Landing } from "@/components/ui/landing";
import { ProjectCard } from "@/modules/portifolio/pages/projects/components/project-card";
import { ProjectDialog } from "@/modules/portifolio/pages/projects/components/project-dialog";
import { featuredProjects } from "@/modules/portifolio/pages/projects/constants/projects";

/** Home section with the projects marked as `featured`, linking to the full projects page. */
export function FeaturedProjectsSection() {
	if (featuredProjects.length === 0) return null;

	return (
		<Landing.Section className="space-y-6">
			<Landing.Title>Projetos em destaque</Landing.Title>
			<div className="grid grid-cols-[repeat(auto-fit,350px)] gap-8 overflow-hidden">
				{featuredProjects.map((project) => (
					<Dialog.Root key={project.id}>
						<Dialog.Trigger className="text-left" onClick={() => window.umami?.track("view_project", { projectName: project.title })}>
							<ProjectCard project={project} />
						</Dialog.Trigger>
						<ProjectDialog project={project} />
					</Dialog.Root>
				))}
			</div>
			<Link to="/projects">
				<Button variant="outline">Ver mais</Button>
			</Link>
		</Landing.Section>
	);
}
