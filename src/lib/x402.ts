import { createVerifier } from "x402-stacks";

const FACILITATOR_URL =
  process.env.X402_FACILITATOR_URL || "https://facilitator.stacksx402.com";
const WALLET_ADDRESS = process.env.STACKABLE_WALLET_ADDRESS || "";
const NETWORK = (process.env.X402_NETWORK || "stacks:2147483648") as `stacks:${string}`;
const SKILL_PRICE = process.env.SKILL_PRICE_STX || "2000000"; // 2 STX in microSTX

export function getPaymentRequirements(resourceUrl: string) {
  return {
    x402Version: 2 as const,
    resource: {
      url: resourceUrl,
      description: "Claude Code skill package download",
      mimeType: "application/zip",
    },
    accepts: [
      {
        scheme: "exact",
        network: NETWORK,
        amount: SKILL_PRICE,
        asset: "STX",
        payTo: WALLET_ADDRESS,
        maxTimeoutSeconds: 300,
      },
    ],
  };
}

export async function verifyAndSettlePayment(
  paymentSignature: string,
  resourceUrl: string
) {
  const verifier = createVerifier(FACILITATOR_URL);

  const paymentPayload = JSON.parse(
    Buffer.from(paymentSignature, "base64").toString("utf-8")
  );

  const requirements = getPaymentRequirements(resourceUrl);
  const paymentRequirements = requirements.accepts[0];

  const result = await verifier.verifyAndSettle(paymentPayload, {
    paymentRequirements,
  });

  return result;
}

export function getPaymentConfig() {
  return {
    walletAddress: WALLET_ADDRESS,
    network: NETWORK,
    amount: SKILL_PRICE,
    asset: "STX" as const,
    facilitatorUrl: FACILITATOR_URL,
  };
}
