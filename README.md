# Stackable

Next.js + Mastra AI recipe assistant powered by Amazon Bedrock (Claude 3.5 Sonnet).

## Setup

```bash
cp .env.example .env.development
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for required variables:

- `REGION` - AWS region
- `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `SESSION_TOKEN` - AWS credentials
- `PUBLICK_KEY`, `SECRET_KEY`, `BASE_URL` - Langfuse telemetry (optional)

## Scripts

```bash
bun run dev       # dev server with Turbopack
bun run build     # production build
bun run lint      # ESLint
```
