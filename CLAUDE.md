# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stackable — a Next.js marketplace for creating, previewing, and selling Claude Code skills (.md files). Users write skills in a Monaco editor, generate them with OpenAI GPT-4o, and download via x402 Stacks micropayments.

## Commands

```bash
cp .env.example .env.development   # first-time setup
bun install                         # install dependencies
bun run dev                         # dev server with Turbopack (localhost:3000)
bun run build                       # production build (standalone output)
bun run lint                        # ESLint
```

## Architecture

### Key Routes
- `/` — Landing page
- `/editor` — Monaco-based skill editor with live preview

### API Routes
- `/api/createSkill` — Mastra skillCreatorAgent (OpenAI GPT-4o) skill creation
- `/api/download/[skillId]` — x402-gated ZIP download (Stacks micropayment)

### Key Directories
- `src/app/` — Next.js App Router pages and API routes
- `src/app/editor/` — Editor page, Zustand store (`store.ts`), components
- `src/lib/` — Shared utilities (skill store, skill templates)
- `src/mastra/` — Mastra agent orchestration (agents, tools)

### State Management
- Zustand store at `src/app/editor/store.ts` — `useStackableStore`

### Payments
- x402-stacks v2.0.1 for Stacks micropayments
- @stacks/connect v8 for wallet connection
- In-memory skill store with 1hr TTL at `src/lib/skill-store.ts`

## Environment Variables
- `OPENAI_API_KEY` — OpenAI API key for skill generation
- `STACKABLE_WALLET_ADDRESS` — Stacks wallet address for receiving payments
- `X402_FACILITATOR_URL` — x402 facilitator endpoint
- `X402_NETWORK` — Stacks network identifier
- `SKILL_PRICE_STX` — Price in micro-STX

## Conventions
- Use `bun` as the package manager
- Use camelCase for component naming
- Use TanStack Query instead of excessive useEffect for data fetching
- Client components use `.client.tsx` suffix (e.g., `page.client.tsx`)
- Server actions in `actions.ts` with "use server" directive
- Path alias: `@/*` maps to `./src/*`
- Tailwind CSS v4 with PostCSS plugin
- Dynamic import Monaco to avoid SSR: `dynamic(() => import("@monaco-editor/react"), { ssr: false })`
