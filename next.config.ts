import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@mastra/*", "x402-stacks", "@stacks/transactions"],
  env: {
    REGION: process.env.REGION,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SESSION_TOKEN: process.env.SESSION_TOKEN,
    PUBLICK_KEY: process.env.PUBLICK_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    BASE_URL: process.env.BASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STACKABLE_WALLET_ADDRESS: process.env.STACKABLE_WALLET_ADDRESS,
    X402_FACILITATOR_URL: process.env.X402_FACILITATOR_URL,
    X402_NETWORK: process.env.X402_NETWORK,
    SKILL_PRICE_STX: process.env.SKILL_PRICE_STX,
  },
  output: "standalone",
};

export default nextConfig;
