import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Landing } from "@/components/ui/landing";
import { EventCard } from "@/modules/portifolio/pages/time-line/components/event-card";
import { featuredExperiences } from "@/modules/portifolio/pages/time-line/constants/timeline";

/** Home section with the experiences marked as `featured`, linking to the full timeline. */
export function FeaturedExperiencesSection() {
	if (featuredExperiences.length === 0) return null;

	return (
		<Landing.Section className="space-y-6">
			<Landing.Title>Experiências em destaque</Landing.Title>
			<div className="grid gap-4">
				{featuredExperiences.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>
			<Link to="/time-line">
				<Button variant="outline">Ver mais</Button>
			</Link>
		</Landing.Section>
	);
}
