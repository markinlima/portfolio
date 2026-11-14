import { useState } from "react";

import { Button } from "@web/ui/button";
import { Card } from "@web/ui/card";
import { Image } from "@web/ui/image";
import { Landing } from "@web/ui/landing";

import { PageTitle } from "@/modules/landing-pages/components/page-title";
import { pageSectionClassName } from "@/modules/landing-pages/constants/page-layout";
import { type Categories, categories, categoriesInfo } from "@/modules/landing-pages/pages/about/constants/categories";
import { learnedSkills } from "@/modules/landing-pages/pages/about/constants/skills";

/** The skills I already use, filtered by category. */
export function SkillsSection() {
	const [currentCategory, setCurrentCategory] = useState<Categories>("all");
	const filteredSkills =
		currentCategory === "all" ? learnedSkills : learnedSkills.filter((skill) => skill.category.includes(currentCategory));

	return (
		<Landing.section className={pageSectionClassName}>
			<PageTitle>Minhas Habilidades</PageTitle>

			<div className="space-y-8">
				<div className="flex w-fit max-w-full gap-2 overflow-x-auto rounded-md border p-2">
					{categories.map((category) => {
						const isActive = category === currentCategory;
						const displayName = categoriesInfo[category].displayName;

						return (
							<Button variant={isActive ? "primary" : "ghost"} key={category} onClick={() => setCurrentCategory(category)}>
								{displayName}
							</Button>
						);
					})}
				</div>

				<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:min-h-115 md:grid-cols-4 lg:flex lg:flex-wrap">
					{filteredSkills.map(({ icon, name }) => {
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
