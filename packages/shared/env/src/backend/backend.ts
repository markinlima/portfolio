import z from "zod";

import { formatEnvVariables } from "../utils";
import { nodeEnv } from "../utils/node-env";
import { databaseEnvSchema } from "./database";

const schema = z
  .object({
    NODE_ENV: nodeEnv(),
    PORT: z.coerce.number().default(3333),
    RUN_MIGRATIONS: z.boolean().default(false),
    // Secure, cross-site cookies; only when the API and the web app run on HTTPS
    IS_DEPLOYED: z.boolean().default(false),

    BETTER_AUTH_SECRET: z.string().trim().min(32),
    BETTER_AUTH_URL: z.url(),

    CORS_ORIGIN: z
      .string()
      .transform((v) => v.split(",").map((url) => url.trim()))
      .pipe(z.array(z.url()).min(1)),

    SENTRY_DSN: z.url().optional(),

    // The Discord webhook that receives the contact messages. Server only: it is never sent to the browser.
    DISCORD_WEBHOOK_URL: z
      .url()
      .refine(
        (url) => url.startsWith("https://discord.com/api/webhooks/"),
        "DISCORD_WEBHOOK_URL must be a Discord webhook URL.",
      ),
    // True only behind a reverse proxy that sets X-Forwarded-For; the rate limit then trusts its first address.
    TRUST_PROXY: z.boolean().default(false),
    SENTRY_RELEASE: z.string().optional(),
  })
  .and(databaseEnvSchema);

const formattedSchema = z.preprocess(formatEnvVariables, schema);
export const backendEnvSchema = formattedSchema;
