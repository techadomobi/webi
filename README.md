# Workspace Monorepo

TypeScript pnpm workspace containing a marketing website artifact, a small Express API artifact, and shared libraries for database access, OpenAPI code generation, and typed client schemas.

## What is in this repo

- `artifacts/webnest-media`: Vite + React marketing site for WebNest Media.
- `artifacts/api-server`: Express 5 API server with a health endpoint.
- `artifacts/mockup-sandbox`: separate Vite sandbox for UI/mockup experiments.
- `lib/db`: Drizzle ORM database package for PostgreSQL.
- `lib/api-spec`: OpenAPI source and Orval code generation config.
- `lib/api-zod`: generated/shared Zod API types.
- `lib/api-client-react`: generated/shared React client bindings.
- `scripts`: workspace utility scripts.

## Stack

- Node.js `>=20.19`
- pnpm workspaces
- TypeScript 5
- React 19 + Vite
- Express 5
- PostgreSQL + Drizzle ORM
- Zod + Orval

## Project structure

```text
.
|- artifacts/
|  |- api-server/
|  |- mockup-sandbox/
|  `- webnest-media/
|- lib/
|  |- api-client-react/
|  |- api-spec/
|  |- api-zod/
|  `- db/
`- scripts/
```

## Prerequisites

1. Install Node.js `20.19` or newer.
2. Install `pnpm`.
3. For database work or the API server, set `DATABASE_URL` to a PostgreSQL connection string.

## Install

```bash
pnpm install
```

The root `preinstall` script enforces pnpm usage and removes `package-lock.json` / `yarn.lock` files if they exist.

## Common commands

From the repository root:

```bash
pnpm run typecheck
pnpm run build
```

Run individual packages with filters:

```bash
pnpm --filter @workspace/webnest-media run dev
pnpm --filter @workspace/webnest-media run build

pnpm --filter @workspace/mockup-sandbox run dev

pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run start

pnpm --filter @workspace/api-spec run codegen
pnpm --filter @workspace/db run push
```

## Package notes

### `artifacts/webnest-media`

- Main frontend application.
- Uses React, Vite, Wouter, Framer Motion, Tailwind, and TanStack Query.
- Routes currently include home, services, service detail, about, contact, blogs, and blog detail pages.
- Build script also generates `public/sitemap.xml`.

### `artifacts/api-server`

- Express app mounted under `/api`.
- Current route set includes `GET /api/healthz`.
- Depends on `@workspace/api-zod` and `@workspace/db`.
- `DATABASE_URL` must be set before runtime because the shared DB package validates it on import.

### `artifacts/mockup-sandbox`

- Isolated Vite app for experimenting with UI/components without touching the main site.

### `lib/api-spec`

- Source OpenAPI document lives at `lib/api-spec/openapi.yaml`.
- `pnpm --filter @workspace/api-spec run codegen` regenerates the client/types packages.

### `lib/db`

- Shared Drizzle/PostgreSQL package.
- Schema exports live under `lib/db/src/schema`.
- Use `push` only against a development database unless you know exactly what schema changes will be applied.

## Development flow

1. Install dependencies with `pnpm install`.
2. Start the frontend you want to work on with `pnpm --filter @workspace/webnest-media run dev` or `pnpm --filter @workspace/mockup-sandbox run dev`.
3. If you need the API, set `DATABASE_URL`, then build/start `@workspace/api-server`.
4. If the API contract changes, update `lib/api-spec/openapi.yaml` and rerun codegen.

## Notes

- Workspace package locations are defined in `pnpm-workspace.yaml`.
- The workspace uses a minimum npm package release age policy as a supply-chain safety control.
- Deployment-related config exists in `vercel.json`.
