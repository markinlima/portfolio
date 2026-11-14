import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "tailwind-variants";

import { Badge } from "@web/ui/badge";
import { Button } from "@web/ui/button";
import { Dialog } from "@web/ui/dialog";
import { Image } from "@web/ui/image";

import { getLinkIcon } from "@/modules/landing-pages/pages/projects/utils/get-link-icon";
import { getPlatformIcon } from "@/modules/landing-pages/pages/projects/utils/get-platform-icon";
import type { Project } from "@/modules/landing-pages/schemas/project";

interface ProjectDialogProps {
	project: Project;
}

/** The details of a project: gallery, technologies, platforms, categories and links. */
export function ProjectDialog({ project }: ProjectDialogProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const hasMoreThanOneImage = project.images.length > 1;

	function nextImage() {
		setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
	}

	function prevImage() {
		setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
	}

	return (
		<Dialog.content className="h-[90vh] w-full p-0 sm:max-w-6xl">
			<div className="flex overflow-hidden max-lg:flex-col">
				<div className="bg-muted/30 relative w-full lg:col-span-2">
					<div className="wf relative flex h-full min-h-50 items-center lg:min-h-150">
						<Image
							src={project.images[currentImageIndex] || "/placeholder.svg"}
							alt={`${project.title} - Imagem ${currentImageIndex + 1}`}
							className="size-full object-contain max-sm:object-cover"
							width={800}
							height={600}
						/>

						{!!hasMoreThanOneImage && (
							<div className="absolute top-0 left-0 z-40 flex size-full items-center">
								<button
									type="button"
									className="flex h-full flex-1 cursor-pointer items-center justify-start bg-linear-to-r from-black/10 to-transparent"
									onClick={prevImage}
								>
									<ChevronLeft className="size-8 text-white" />
								</button>
								<button
									type="button"
									className="flex h-full flex-1 cursor-pointer items-center justify-end bg-linear-to-r from-transparent to-black/10"
									onClick={nextImage}
								>
									<ChevronRight className="size-8 text-white" />
								</button>
							</div>
						)}
					</div>

					{!!hasMoreThanOneImage && (
						<div className="absolute right-4 bottom-4 left-4 z-50 max-md:hidden">
							<div className="flex justify-center gap-2 overflow-x-auto pb-2">
								{project.images.map((image, index) => (
									<button
										key={image}
										type="button"
										onClick={() => setCurrentImageIndex(index)}
										className={cn(
											"aspect-square size-16 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
											currentImageIndex === index ? "border-primary" : "hover:border-muted-foreground/50 border-transparent",
										)}
									>
										<Image
											src={image || "/placeholder.svg"}
											alt={`Miniatura ${index + 1}`}
											className="size-full object-cover"
											width={64}
											height={48}
										/>
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="h-full max-w-sm space-y-8 overflow-y-auto p-8">
					<div className="space-y-4">
						<h1 className="text-foreground text-3xl leading-tight font-bold">{project.title}</h1>
						<p className="text-muted-foreground text-base leading-relaxed">{project.description}</p>
					</div>

					<div className="space-y-3">
						<h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Tecnologias</h3>
						<div className="flex flex-wrap gap-2">
							{project.techs.map((tech) => (
								<Badge key={tech} className="text-xs font-medium">
									{tech}
								</Badge>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Plataformas</h3>
						<div className="flex flex-wrap gap-2">
							{project.platforms.map((platform) => (
								<Badge key={platform} className="text-xs font-medium capitalize">
									{getPlatformIcon(platform)}
									{platform}
								</Badge>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Categorias</h3>
						<div className="flex flex-wrap gap-2">
							{project.categories.map((category) => (
								<Badge key={category} className="text-xs font-medium capitalize">
									{category}
								</Badge>
							))}
						</div>
					</div>

					{project.links.length > 0 && (
						<div className="space-y-4">
							<h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Links</h3>
							<div className="flex flex-col gap-2">
								{project.links.map(({ href, name, type }) => (
									<a
										href={href}
										key={href}
										target="_blank"
										rel="noreferrer"
										onClick={() => window.umami?.track("project_link_click", { projectName: project.title, type })}
									>
										<Button raised variant="outline" className="h-12 w-full justify-start gap-3 bg-transparent">
											{getLinkIcon(type)}
											<span className="font-medium">{name}</span>
											<ExternalLink className="ml-auto h-3 w-3 opacity-50" />
										</Button>
									</a>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</Dialog.content>
	);
}
