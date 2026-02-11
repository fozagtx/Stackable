import { NextRequest, NextResponse } from "next/server";
import { getPaymentRequirements, verifyAndSettlePayment } from "@/lib/x402";
import { generateSkillZip, type SkillPackageData } from "@/lib/zip-generator";
import { skillStore } from "@/lib/skill-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ skillId: string }> }
) {
  const { skillId } = await params;

  // Store skill data for later download
  const body = (await request.json()) as SkillPackageData;
  skillStore.set(skillId, body);

  return NextResponse.json({ stored: true, skillId });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ skillId: string }> }
) {
  const { skillId } = await params;

  const skillData = skillStore.get(skillId);
  if (!skillData) {
    return NextResponse.json(
      { error: "Skill not found or expired" },
      { status: 404 }
    );
  }

  const resourceUrl = `${request.nextUrl.origin}/api/download/${skillId}`;

  // Check for payment signature
  const paymentSignature = request.headers.get("payment-signature");

  if (!paymentSignature) {
    // Return 402 Payment Required
    const paymentRequired = getPaymentRequirements(resourceUrl);
    return NextResponse.json(paymentRequired, {
      status: 402,
      headers: {
        "payment-required": JSON.stringify(paymentRequired),
      },
    });
  }

  // Verify and settle payment
  try {
    const result = await verifyAndSettlePayment(paymentSignature, resourceUrl);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Payment verification failed",
          reason: result.errorReason,
        },
        { status: 402 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 402 }
    );
  }

  // Payment verified — generate ZIP
  try {
    const zipBuffer = await generateSkillZip(skillData);
    const fileName = `${skillData.metadata.name || "skill"}.zip`;

    // Clean up stored skill
    skillStore.delete(skillId);

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("ZIP generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate skill package" },
      { status: 500 }
    );
  }
}
