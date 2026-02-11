import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai-client";

const SYSTEM_PROMPT = `You are a Claude Code skill generator. You create well-structured Claude Code skills that follow the exact format below.

A Claude Code skill is a markdown file placed in .claude/commands/ that defines a reusable command. The format is:

---
name: skill-id
description: "Brief description of what the skill does"
---
# /skill-id - Skill Title

## Triggers
- When this skill should be activated
- Keywords or contexts that trigger it

## Usage
\`\`\`
/skill-id [arguments]
\`\`\`

## Behavioral Flow
1. Step-by-step execution logic
2. What the skill does in order
3. How it processes inputs and generates outputs

## Examples
\`\`\`
/skill-id example-usage
# Expected output description
\`\`\`

## Boundaries
- What this skill should NOT do
- Limitations and constraints

Rules:
- Always include YAML frontmatter with name and description
- The name field should be kebab-case
- Include all sections: Triggers, Usage, Behavioral Flow, Examples, Boundaries
- Be specific and actionable in behavioral flow steps
- Include realistic examples
- Set clear boundaries to prevent misuse
- Use markdown formatting consistently`;

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

    const openai = getOpenAIClient();

    const userMessage = template
      ? `Based on this template:\n\n${template}\n\nUser request: ${prompt}`
      : prompt;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a Claude Code skill for the following request:\n\n${userMessage}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    });

    const skillContent = completion.choices[0]?.message?.content;

    if (!skillContent) {
      return NextResponse.json(
        { error: "Failed to generate skill content" },
        { status: 500 }
      );
    }

    // Extract metadata from generated content
    const nameMatch = skillContent.match(/name:\s*(.+)/);
    const descMatch = skillContent.match(/description:\s*"?([^"\n]+)"?/);

    const metadata = {
      name: nameMatch?.[1]?.trim() || "generated-skill",
      description: descMatch?.[1]?.trim() || "",
      version: "1.0.0",
    };

    return NextResponse.json({ skillContent, metadata });
  } catch (error) {
    console.error("Skill generation error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
