import { Card } from "@web/ui/card";
import { Landing } from "@web/ui/landing";
import { RoundedIcon } from "@web/ui/rounded-icon";

import { PageTitle } from "@/modules/landing-pages/components/page-title";
import { pageLayoutClassName, pageSectionClassName } from "@/modules/landing-pages/constants/page-layout";
import { LearningSection } from "@/modules/landing-pages/pages/about/components/learning-section";
import { SkillsSection } from "@/modules/landing-pages/pages/about/components/skills-section";
import { areas } from "@/modules/landing-pages/pages/about/constants/categories";
import { resume } from "@/modules/landing-pages/pages/about/constants/resume";

/** The home page: who I am, the areas I work in, and my skills. */
export function AboutPage() {
	return (
		<Landing className={pageLayoutClassName}>
			<PageTitle size="lg" showDecoration>
				Sobre Mim
			</PageTitle>
			<p className="text-muted-foreground w-full text-lg font-medium wrap-break-word whitespace-pre-line">{resume}</p>
			<Landing.section className={pageSectionClassName}>
				<h2 className="text-2xl font-bold max-lg:text-center">Áreas de Atuação</h2>
				<div className="flex flex-wrap gap-4 max-lg:justify-center">
					{areas.map(({ description, icon: Icon, name }) => {
						return (
							<Card className="max-w-sm" key={name}>
								<Card.header className="gap-4">
									<div className="flex items-center gap-2">
										<RoundedIcon>
											<Icon className="text-primary" />
										</RoundedIcon>
										<h3 className="font-bold">{name}</h3>
									</div>
								</Card.header>
								<Card.content>
									<Card.description>{description}</Card.description>
								</Card.content>
							</Card>
						);
					})}
				</div>
			</Landing.section>
			<SkillsSection />
			<LearningSection />
		</Landing>
	);
}
