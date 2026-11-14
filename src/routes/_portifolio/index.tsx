import { createFileRoute } from "@tanstack/react-router";
import { RoundedIcon } from "@/components/misc/rounded-icon";
import { Card } from "@/components/ui/card";
import { Landing } from "@/components/ui/landing";
import { FeaturedExperiencesSection } from "@/modules/portifolio/pages/about/components/featured-experiences-section";
import { LearningSection } from "@/modules/portifolio/pages/about/components/learning-section";
import { SkillsSection } from "@/modules/portifolio/pages/about/components/skills-section";
import { areas } from "@/modules/portifolio/pages/about/constants/categories";
import { resume } from "@/modules/portifolio/pages/about/constants/resume";
import { FeaturedProjectsSection } from "@/modules/portifolio/pages/projects/components/featured-projects-section";

export const Route = createFileRoute("/_portifolio/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Marcos | Sobre Mim",
			},
			{
				name: "description",
				content: "Conheça mais sobre mim, minha experiência profissional, habilidades e áreas de atuação como Engenheiro de Software.",
			},
			{
				property: "og:title",
				content: "Marcos | Sobre Mim",
			},
			{
				property: "og:description",
				content: "Conheça mais sobre mim, minha experiência profissional, habilidades e áreas de atuação como Engenheiro de Software.",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<Landing.Page>
			<Landing.Title size="lg" showDecoration>
				Sobre Mim
			</Landing.Title>
			<p className="wrap-break-word w-full whitespace-pre-line font-medium text-lg text-muted-foreground">{resume}</p>
			<Landing.Section className="space-y-6">
				<h2 className="font-bold text-2xl max-lg:text-center">Áreas de Atuação</h2>
				<div className="flex flex-wrap gap-4 max-lg:justify-center">
					{areas.map(({ description, icon: Icon, name }) => {
						return (
							<Card.Root className="max-w-sm" key={name}>
								<Card.Header className="gap-4">
									<div className="flex items-center gap-2">
										<RoundedIcon>
											<Icon className="text-primary" />
										</RoundedIcon>
										<h3 className="font-bold">{name}</h3>
									</div>
								</Card.Header>
								<Card.Content>
									<Card.Description>{description}</Card.Description>
								</Card.Content>
							</Card.Root>
						);
					})}
				</div>
			</Landing.Section>
			<FeaturedExperiencesSection />
			<FeaturedProjectsSection />
			<SkillsSection />
			<LearningSection />
		</Landing.Page>
	);
}
