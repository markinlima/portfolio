import z from "zod/v4";
import { clientEnvSchema } from "@/lib/env/client";

const envSchema = clientEnvSchema.extend({
	DISCORD_TOKEN: z.string(),
	DISCORD_CONTACT_CHANNEL_ID: z.string(),
	SENTRY_AUTH_TOKEN: z.string(),
});

export const serverEnv = envSchema.parse(process.env);
