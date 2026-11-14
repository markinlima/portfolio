import { Card } from "@web/ui/card";
import { Image } from "@web/ui/image";
import { Landing } from "@web/ui/landing";

import { PageDescription } from "@/modules/landing-pages/components/page-description";
import { PageTitle } from "@/modules/landing-pages/components/page-title";
import { pageSectionClassName } from "@/modules/landing-pages/constants/page-layout";
import { learningSkills } from "@/modules/landing-pages/pages/about/constants/skills";

/** The technologies I am studying right now. */
export function LearningSection() {
	return (
		<Landing.section className={pageSectionClassName}>
			<div>
				<PageTitle>Aprendendo no momento</PageTitle>
				<PageDescription>
					Essas são as tecnologias que estou estudando atualmente para aprimorar minhas habilidades e expandir meu conhecimento.
				</PageDescription>
			</div>

			<div className="space-y-8">
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap">
					{learningSkills.map(({ icon, name }) => {
						return (
							<Card key={name} className="w-full lg:size-37">
								<Card.content className="flex h-full flex-col items-center justify-center gap-2 text-center">
									<Image alt={name} height={50} width={50} src={`/skills-icons/${icon}.webp`} />
									<h3 className="text-sm font-bold">{name}</h3>
								</Card.content>
							</Card>
						);
					})}
				</div>
			</div>
		</Landing.section>
	);
}
