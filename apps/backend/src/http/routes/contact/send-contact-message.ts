import Elysia from "elysia";

import { sendContactMessageBody, sendContactMessageResponse } from "@shared/routes/api/contact";

import { env } from "@/env";
import { PayloadTooLargeError } from "@/errors/http/payload-too-large-error";
import { ServiceUnavailableError } from "@/errors/http/service-unavailable-error";
import { TooManyRequestsError } from "@/errors/http/too-many-requests-error";
import { modelPlugin } from "@/http/plugins/model-plugin";
import { sendDiscordWebhook } from "@/lib/discord/send-discord-webhook";
import { SlidingWindowLimiter } from "@/utils/rate-limit";
import { defaultResponseDetails, defaultResponses } from "@/utils/responses";

/** The largest body the form can send: a name, an e-mail and a 2000-character message fit well below it. */
export const MAX_CONTACT_BODY_BYTES = 4096;

export interface SendContactMessageRouteOptions {
	/** Messages one client can send. Defaults to 5 every 10 minutes. */
	limiter?: SlidingWindowLimiter;
	/** Messages the whole site can send, against many clients at once. Defaults to 50 every hour. */
	globalLimiter?: SlidingWindowLimiter;
}

const DELIVERY_FAILED_MESSAGE = "Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.";

/**
 * `POST /contact`: the message of the contact form, sent to a Discord webhook.
 * Public and without a session, so it is guarded by the size limit, the rate limits and a honeypot field.
 *
 * @param options - See {@link SendContactMessageRouteOptions}.
 */
export function sendContactMessageRoute({
	limiter = new SlidingWindowLimiter({ limit: 5, windowMs: 10 * 60_000 }),
	globalLimiter = new SlidingWindowLimiter({ limit: 50, windowMs: 60 * 60_000 }),
}: SendContactMessageRouteOptions = {}) {
	return new Elysia().use(modelPlugin()).post(
		"/contact",
		async ({ body, request, server, status, set }) => {
			const clientKey = getClientKey({ request, server });

			const blocked = [limiter.hit(clientKey), globalLimiter.hit("global")].find((result) => !result.allowed);

			if (blocked && !blocked.allowed) {
				set.headers["retry-after"] = String(blocked.retryAfterSeconds);
				throw new TooManyRequestsError();
			}

			if (Number(request.headers.get("content-length") ?? 0) > MAX_CONTACT_BODY_BYTES) {
				throw new PayloadTooLargeError();
			}

			if (body.website) {
				return status(201, { contact: { status: "sent" as const } });
			}

			try {
				await sendDiscordWebhook({
					url: env.DISCORD_WEBHOOK_URL,
					embed: {
						title: "Nova mensagem do portfólio",
						color: 0x3b82f6,
						timestamp: new Date().toISOString(),
						fields: [
							{ name: "Nome", value: body.name, inline: true },
							{ name: "E-mail", value: body.email, inline: true },
							{ name: "Mensagem", value: body.message },
						],
					},
				});
			} catch (error) {
				throw new ServiceUnavailableError(DELIVERY_FAILED_MESSAGE, { metadata: { cause: String(error) } });
			}

			return status(201, { contact: { status: "sent" as const } });
		},
		{
			body: sendContactMessageBody,
			response: {
				...defaultResponses,
				201: sendContactMessageResponse,
				400: "ErrorModel",
				413: "ErrorModel",
				503: "ErrorModel",
			},
			detail: {
				"x-data-shape": "dto",
				"x-cache-entity": undefined,
				"x-pagination-type": "none",
				operationId: "send-contact-message",
				summary: "Send contact message",
				description: "Sends a message from the public contact form to the owner. Rate limited per client and site-wide; no session needed.",
				tags: ["Contact"],
				responses: {
					...defaultResponseDetails,
					201: { description: "The message was accepted (or dropped by the honeypot, without a signal)." },
					400: { description: "The message is invalid." },
					413: { description: "The request body is too large." },
					503: { description: "Discord did not accept the message." },
				},
			},
		},
	);
}

function getClientKey({
	request,
	server,
}: {
	request: Request;
	server: { requestIP(request: Request): { address: string } | null } | null | undefined;
}) {
	if (env.TRUST_PROXY) {
		const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

		if (forwarded) {
			return forwarded;
		}
	}

	return server?.requestIP(request)?.address ?? "unknown";
}
