import { cn } from "tailwind-variants";

import { Image } from "@web/ui/image";

import type { Project } from "@/modules/landing-pages/schemas/project";

interface ProjectCardProps extends React.ComponentProps<"div"> {
	project: Project;
}

/** The card of a project in the projects list. */
export function ProjectCard({ project, className, ...props }: ProjectCardProps) {
	return (
		<div
			className={cn(
				"group/project-card motion-preset-blink-fade motion-scale-out-102 hover:bg-accent/30 w-87.5 cursor-pointer space-y-4 rounded-md",
				className,
			)}
			{...props}
		>
			<div className="relative aspect-video overflow-hidden rounded-md">
				<Image alt={project.title} priority height={100} width={100} src={project.images[0]} className="size-full object-cover" />
				<div className="absolute z-10 hidden size-full items-center justify-center rounded-md bg-black/40 font-bold text-white group-hover/project-card:flex">
					Ver Mais
				</div>
			</div>
			<div className="flex flex-col gap-4 p-2">
				<h3 className="text-primary text-lg font-bold max-md:text-sm">{project.title}</h3>
				<p className="text-muted-foreground line-clamp-3 w-full text-xs wrap-break-word text-ellipsis whitespace-pre-line">
					{project.description}
				</p>
				<div className="text-muted-foreground flex flex-wrap gap-1 text-xs">
					{project.platforms.map((plataform) => {
						return (
							<div key={plataform} className="bg-accent rounded-full p-1">
								#{plataform}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
