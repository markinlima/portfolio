import { cn } from "tailwind-variants";

import { eventTypes } from "@/modules/landing-pages/pages/time-line/constants/event-type-info";
import type { TimelineEvent } from "@/modules/landing-pages/pages/time-line/types/timeline-event";

type EventIconProps = {
	event: TimelineEvent;
};

/** The round icon of a timeline event, colored by its type. */
export function EventIcon({ event }: EventIconProps) {
	const eventInfo = eventTypes[event.type] || eventTypes.default;
	return (
		<div className={cn("relative z-10 flex size-16 items-center justify-center rounded-full border-4 shadow-lg", eventInfo.color)}>
			<eventInfo.icon className="size-6 text-white" />
		</div>
	);
}
