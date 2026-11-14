export interface SlidingWindowLimiterOptions {
	/** Hits allowed for one key inside the window. */
	limit: number;
	/** Length of the window, in milliseconds. */
	windowMs: number;
}

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

/**
 * Counts the hits of each key (an IP, for example) in a sliding window, in memory: a single process only.
 * A key nobody hits again keeps its small list of timestamps; that is fine for a single instance.
 */
export class SlidingWindowLimiter {
	private readonly hits = new Map<string, number[]>();

	constructor(private readonly options: SlidingWindowLimiterOptions) {}

	/**
	 * Registers a hit of `key` at `now`, unless the key already used its `limit` inside the window.
	 *
	 * @param key - Who is hitting, e.g. an IP address.
	 * @param now - The time of the hit, in milliseconds. Defaults to `Date.now()`.
	 * @returns Whether the hit is allowed, and when to retry when it isn't.
	 */
	hit(key: string, now = Date.now()): RateLimitResult {
		const windowStart = now - this.options.windowMs;
		const recent = (this.hits.get(key) ?? []).filter((time) => time > windowStart);

		if (recent.length >= this.options.limit) {
			this.hits.set(key, recent);
			const retryAt = recent[0] + this.options.windowMs;

			return { allowed: false, retryAfterSeconds: Math.ceil((retryAt - now) / 1000) };
		}

		recent.push(now);
		this.hits.set(key, recent);

		return { allowed: true };
	}
}
