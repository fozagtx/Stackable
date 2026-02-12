import { NextRequest, NextResponse } from "next/server";
import { mastra } from "@/mastra";
import { sanitizeSkillContent } from "@/lib/skillValidator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, template } = body as {
      prompt: string;
      template?: string;
    };

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const agent = mastra.getAgent("skillCreatorAgent");

    const userMessage = template
      ? `Based on this template:\n\n${template}\n\nUser request: ${prompt}`
      : prompt;

    const result = await agent.generate(
      `Create a Claude Code skill for the following request:\n\n${userMessage}`
    );

    const rawContent = result.text;

    if (!rawContent) {
      return NextResponse.json(
        { error: "Failed to create skill content" },
        { status: 500 }
      );
    }

    const skillContent = sanitizeSkillContent(rawContent);

    const nameMatch = skillContent.match(/name:\s*(.+)/);
    const descMatch = skillContent.match(/description:\s*"?([^"\n]+)"?/);

    const metadata = {
      name: nameMatch?.[1]?.trim() || "created-skill",
      description: descMatch?.[1]?.trim() || "",
      version: "1.0.0",
    };

    return NextResponse.json({ skillContent, metadata });
  } catch (error) {
    console.error("Skill creation error:", error);
    return NextResponse.json(
      { error: "Skill creation failed. Check server logs for details." },
      { status: 500 }
    );
  }
}
