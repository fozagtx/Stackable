# Stackable

A marketplace for creating, previewing, and selling Claude Code skills. Write skills in a Monaco editor, generate with AI, and distribute via Stacks micropayments.

## Setup

```bash
cp .env.example .env.development
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for required variables:

- `OPENAI_API_KEY` — OpenAI API key for skill generation
- `STACKABLE_WALLET_ADDRESS` — Stacks wallet for receiving payments
- `X402_FACILITATOR_URL` — x402 facilitator endpoint
- `X402_NETWORK` — Stacks network identifier
- `SKILL_PRICE_STX` — Price in micro-STX

## Scripts

```bash
bun run dev       # dev server with Turbopack
bun run build     # production build
bun run lint      # ESLint
```
