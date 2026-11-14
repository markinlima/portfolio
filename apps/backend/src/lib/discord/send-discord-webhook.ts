export interface DiscordEmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

export interface DiscordEmbed {
	title: string;
	color?: number;
	fields: DiscordEmbedField[];
	timestamp?: string;
}

export interface SendDiscordWebhookOptions {
	/** The webhook URL: it is a secret, never log it. */
	url: string;
	embed: DiscordEmbed;
	/**
	 * How long to wait for Discord, in milliseconds.
	 * @defaultValue 5000
	 */
	timeoutMs?: number;
}

/** Thrown when Discord doesn't accept the message (a non-2xx answer, a timeout or a network failure). */
export class DiscordWebhookError extends Error {}

/**
 * Posts an embed to a Discord webhook. Mentions are disabled, so the text of a visitor can't ping `@everyone` or a role.
 *
 * @param options - See {@link SendDiscordWebhookOptions}.
 * @throws {DiscordWebhookError} When Discord doesn't answer with a 2xx status.
 */
export async function sendDiscordWebhook({ url, embed, timeoutMs = 5000 }: SendDiscordWebhookOptions) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ allowed_mentions: { parse: [] }, embeds: [embed] }),
			signal: AbortSignal.timeout(timeoutMs),
		});

		if (!response.ok) {
			throw new DiscordWebhookError(`Discord answered ${response.status}.`);
		}
	} catch (error) {
		if (error instanceof DiscordWebhookError) {
			throw error;
		}

		throw new DiscordWebhookError("Could not reach Discord.", { cause: error });
	}
}
