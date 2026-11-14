export type EventType = "workExperience" | "education" | "achievement";

export interface TimelineEvent {
	id: string;
	title: string;
	description: string;
	date: string;
	type: EventType;
	/** Shown in the home page highlights. @defaultValue false */
	featured?: boolean;
}
