import { describe, expect, test as it } from "bun:test";

import { SlidingWindowLimiter } from "./rate-limit";

describe("SlidingWindowLimiter", () => {
	it("allows up to the limit inside the window", () => {
		const limiter = new SlidingWindowLimiter({ limit: 2, windowMs: 60_000 });

		expect(limiter.hit("client", 0).allowed).toBe(true);
		expect(limiter.hit("client", 1).allowed).toBe(true);
		expect(limiter.hit("client", 2).allowed).toBe(false);
	});

	it("answers how many seconds until the next hit is allowed", () => {
		const limiter = new SlidingWindowLimiter({ limit: 1, windowMs: 60_000 });
		limiter.hit("client", 0);

		expect(limiter.hit("client", 10_000)).toEqual({ allowed: false, retryAfterSeconds: 50 });
	});

	it("frees a slot once its hit leaves the window", () => {
		const limiter = new SlidingWindowLimiter({ limit: 1, windowMs: 1_000 });
		limiter.hit("client", 0);

		expect(limiter.hit("client", 999).allowed).toBe(false);
		expect(limiter.hit("client", 1_000).allowed).toBe(true);
	});

	it("counts each key on its own", () => {
		const limiter = new SlidingWindowLimiter({ limit: 1, windowMs: 60_000 });
		limiter.hit("first", 0);

		expect(limiter.hit("second", 0).allowed).toBe(true);
	});
});
