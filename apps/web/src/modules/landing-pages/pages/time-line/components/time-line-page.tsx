import { cn } from "tailwind-variants";

import { Landing } from "@web/ui/landing";

import { PageDescription } from "@/modules/landing-pages/components/page-description";
import { PageTitle } from "@/modules/landing-pages/components/page-title";
import { pageLayoutClassName, pageSectionClassName } from "@/modules/landing-pages/constants/page-layout";
import { EventCard } from "@/modules/landing-pages/pages/time-line/components/event-card";
import { EventIcon } from "@/modules/landing-pages/pages/time-line/components/event-icon";
import { sortedEventsByDate } from "@/modules/landing-pages/pages/time-line/constants/timeline";

/** The timeline of the education, the work and the achievements. */
export function TimeLinePage() {
	return (
		<Landing className={pageLayoutClassName}>
			<div>
				<PageTitle size="lg" showDecoration>
					Linha do tempo
				</PageTitle>
				<PageDescription>
					Explore os marcos significativos da minha jornada, desde a educação até as conquistas profissionais, e veja como cada experiência
					moldou minha trajetória.
				</PageDescription>
			</div>

			<Landing.section className={cn(pageSectionClassName, "px-0 md:px-0")}>
				<div className="bg-border absolute top-0 bottom-0 left-8 w-0.5 max-lg:left-1/2 max-lg:-translate-x-1/2" />

				<div className="space-y-8">
					{sortedEventsByDate.map((event) => {
						return (
							<div key={event.id} className="relative flex items-center gap-6 max-lg:flex-col-reverse">
								<EventIcon event={event} />
								<EventCard event={event} />
							</div>
						);
					})}
				</div>
				<div className="relative mt-8 flex items-center justify-center">
					<div className="from-border absolute left-8 h-8 w-0.5 bg-linear-to-b to-transparent max-lg:hidden" />
					<div className="text-muted-foreground flex items-center gap-2 text-sm lg:ml-8">
						<div className="bg-muted-foreground/50 size-2 rounded-full" />
						<span>Início da jornada</span>
					</div>
				</div>
			</Landing.section>
		</Landing>
	);
}
