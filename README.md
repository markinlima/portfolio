# portfolio

Personal portfolio of Marcos Lima Barbosa: projects, timeline, skills and a contact form. Built on the `create-template-app` monorepo (Bun + Turborepo).

## Structure

```
apps/
  web/         # React SPA (Vite + TanStack Router), served by a Nitro (Bun) server
  backend/     # REST API (Elysia): POST /contact sends the form to a Discord webhook
packages/
  web/         # UI, form, toast, SEO, theme and other libs for the web app
  backend/     # Drizzle schema and client (not used by the contact form yet)
  shared/      # routes (API contracts, shared with the web app), env, utils, config
```

## Development

```bash
bun install
bun run --cwd apps/web build:prepare   # generates the route tree and the API client
bun run --cwd apps/web dev              # the site
bun run --cwd apps/backend dev          # the API (needs apps/backend/.env, see .env.example)
```

Copy `apps/backend/.env.example` to `apps/backend/.env` and set `DISCORD_WEBHOOK_URL`. Never commit that file.

## Checks

- `bun run lint`: type-check and Biome across the workspaces.
- `bun run --cwd apps/web test:unit` and `bun run --cwd apps/backend test:unit`: unit tests.
- `bun run --cwd apps/backend test:e2e`: needs the Postgres of `docker-compose.yml`.

## Contact form

The browser sends `POST /contact` to the API. The API validates the message with the shared Zod schema, limits the clients (5 messages every 10 minutes each, 50 per hour in total), drops messages that fill the hidden honeypot field, and posts an embed to the Discord webhook with mentions disabled. The webhook URL stays on the server.

## Deploy

The pipelines are in `.github/workflows` and read `projects.json`. The Dokploy and Phase identifiers there are still `REPLACE_ME` placeholders to fill in before the first deploy.
