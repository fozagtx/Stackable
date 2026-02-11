import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@mastra/*", "x402-stacks", "@stacks/transactions"],
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STACKABLE_WALLET_ADDRESS: process.env.STACKABLE_WALLET_ADDRESS,
    X402_FACILITATOR_URL: process.env.X402_FACILITATOR_URL,
    X402_NETWORK: process.env.X402_NETWORK,
    SKILL_PRICE_STX: process.env.SKILL_PRICE_STX,
  },
  output: "standalone",
};

export default nextConfig;
