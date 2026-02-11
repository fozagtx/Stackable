import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@mastra/*", "x402-stacks", "@stacks/transactions"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        buffer: "buffer",
      },
    },
  },
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
