import { afterEach, beforeEach, describe, expect, test as it, mock, spyOn } from "bun:test";

import Elysia from "elysia";

import { env } from "@/env";
import { errorHandler } from "@/utils/error-handler";
import { SlidingWindowLimiter } from "@/utils/rate-limit";

import { sendContactMessageRoute } from "./send-contact-message";

const validBody = {
	name: "Maria",
	email: "maria@exemplo.com",
	message: "Olá, gostaria de conversar sobre um projeto.",
};

/** Bun's `fetch` also has `preconnect`; the stub only needs the call. */
function fetchStub(handler: () => Promise<Response>) {
	return Object.assign(handler, { preconnect: () => {} });
}

function buildApp({ limit = 5 }: { limit?: number } = {}) {
	return new Elysia()
		.onError(errorHandler())
		.use(sendContactMessageRoute({ limiter: new SlidingWindowLimiter({ limit, windowMs: 600_000 }) }));
}

function postContact(app: ReturnType<typeof buildApp>, body: unknown, headers: Record<string, string> = {}) {
	return app.handle(
		new Request("http://localhost/contact", {
			method: "POST",
			headers: { "content-type": "application/json", ...headers },
			body: JSON.stringify(body),
		}),
	);
}

describe("POST /contact", () => {
	let fetchSpy: ReturnType<typeof spyOn<typeof globalThis, "fetch">>;

	beforeEach(() => {
		fetchSpy = spyOn(globalThis, "fetch").mockImplementation(fetchStub(async () => new Response(null, { status: 204 })));
	});

	afterEach(() => {
		mock.restore();
	});

	it("sends the message to the Discord webhook and answers 201", async () => {
		const response = await postContact(buildApp(), validBody);

		expect(response.status).toBe(201);
		expect(fetchSpy).toHaveBeenCalledTimes(1);

		const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
		const payload = JSON.parse(String(init.body));

		expect(url).toBe(env.DISCORD_WEBHOOK_URL);
		expect(init.method).toBe("POST");
		expect(payload.allowed_mentions).toEqual({ parse: [] });
		expect(payload.embeds[0].fields).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: "Nome", value: "Maria" }),
				expect.objectContaining({ name: "E-mail", value: "maria@exemplo.com" }),
			]),
		);
	});

	it("rejects an invalid e-mail with 400 and does not call Discord", async () => {
		const response = await postContact(buildApp(), { ...validBody, email: "nao-e-email" });

		expect(response.status).toBe(400);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("rejects a request body larger than the limit with 413", async () => {
		const response = await postContact(buildApp(), validBody, { "content-length": "10000" });

		expect(response.status).toBe(413);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("answers 201 without sending when the honeypot field is filled", async () => {
		const response = await postContact(buildApp(), { ...validBody, website: "https://spam.example" });

		expect(response.status).toBe(201);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("limits the messages of one client and answers 429 with Retry-After", async () => {
		const app = buildApp({ limit: 2 });

		expect((await postContact(app, validBody)).status).toBe(201);
		expect((await postContact(app, validBody)).status).toBe(201);

		const blocked = await postContact(app, validBody);

		expect(blocked.status).toBe(429);
		expect(Number(blocked.headers.get("retry-after"))).toBeGreaterThan(0);
		expect(fetchSpy).toHaveBeenCalledTimes(2);
	});

	it("answers 503 with a user-facing message when Discord fails", async () => {
		fetchSpy.mockImplementation(fetchStub(async () => new Response("boom", { status: 500 })));

		const response = await postContact(buildApp(), validBody);

		expect(response.status).toBe(503);
		expect(await response.json()).toMatchObject({
			message: "Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.",
		});
	});
});
