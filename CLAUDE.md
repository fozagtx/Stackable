# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js + Mastra AI agent application that generates cooking recipes using Amazon Bedrock (Claude 3.5 Sonnet). Observability through Langfuse.

## Commands

```bash
cp .env.example .env.development   # first-time setup
bun install                         # install dependencies
bun run dev                         # dev server with Turbopack (localhost:3000)
bun run build                       # production build (standalone output)
bun run lint                        # ESLint
```

## Architecture

### Request Flow
1. `page.tsx` (Server Component) renders `CookingForm` client component
2. `page.client.tsx` uses `useActionState` to call server action on form submit
3. `actions.ts` ("use server") gets `CookingAgent` from Mastra, calls `agent.generate()`
4. Mastra agent uses Bedrock client to call Claude 3.5 Sonnet on Amazon Bedrock
5. Response flows back through server action to client

### Key Directories
- `src/mastra/agents/` - Mastra agent definitions. Register new agents in `src/mastra/index.ts`
- `src/mastra/tools/` - Mastra tools (e.g., weather tool using Open-Meteo API)
- `src/lib/` - Shared utilities (Bedrock client with dev/prod credential switching)
- `src/app/` - Next.js App Router pages and server actions

### Bedrock Client (`src/lib/bedrock-client.ts`)
- Production: uses `fromNodeProviderChain()` (ECS task role)
- Development: uses explicit credentials from env vars

### Telemetry (`src/instrumentation.ts`)
Next.js instrumentation hook exports OpenTelemetry traces to Langfuse via `LangfuseExporter`.

## Environment Variables
- `REGION` - AWS region (default: ap-northeast-1)
- `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `SESSION_TOKEN` - AWS credentials (dev only)
- `PUBLICK_KEY`, `SECRET_KEY`, `BASE_URL` - Langfuse configuration

## Conventions
- Use `bun` as the package manager
- Use camelCase for component naming
- Use TanStack Query instead of excessive useEffect for data fetching
- Client components use `.client.tsx` suffix (e.g., `page.client.tsx`)
- Server actions in `actions.ts` with "use server" directive
- Path alias: `@/*` maps to `./src/*`
- Tailwind CSS v4 with PostCSS plugin
- Default region: `ap-northeast-1`
