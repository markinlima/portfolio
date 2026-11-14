// src/types/umami.d.ts

export {}; // Garante que o arquivo seja tratado como um módulo

declare global {
	interface UmamiPayload {
		hostname?: string;
		language?: string;
		referrer?: string;
		screen?: string;
		title?: string;
		url?: string;
		website?: string;
		name?: string;
		data?: Record<string, unknown>;
		timestamp?: number;
	}

	interface Window {
		umami: {
			/**
			 * Tracks the current page view with default properties.
			 */
			track(): void;

			/**
			 * Tracks a custom event.
			 * @param eventName Name of the event (e.g. 'signup-button').
			 */
			track(eventName: string): void;

			/**
			 * Tracks a custom event with dynamic data.
			 * @param eventName Name of the event.
			 * @param data Event data (JSON object).
			 */
			track(eventName: string, data: Record<string, unknown>): void;

			/**
			 * Tracks a custom payload.
			 * @param payload Custom payload object.
			 */
			track(payload: UmamiPayload): void;

			/**
			 * Tracks a page view or event while including existing properties.
			 * @param callback Function that takes existing properties and returns the new payload.
			 */
			track(callback: (props: UmamiPayload) => UmamiPayload): void;

			/**
			 * Assigns a unique ID to the current session.
			 * @param uniqueId Unique identifier for the user.
			 */
			identify(uniqueId: string): void;

			/**
			 * Saves data about the current session with a unique ID.
			 * @param uniqueId Unique identifier for the user.
			 * @param data Session data (JSON object).
			 */
			identify(uniqueId: string, data: Record<string, unknown>): void;

			/**
			 * Saves data about the current session without a unique ID.
			 * @param data Session data (JSON object).
			 */
			identify(data: Record<string, unknown>): void;
		};
	}
}
