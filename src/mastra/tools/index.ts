import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const createSkillTool = createTool({
  id: "create-skill",
  description:
    "Create a Claude Code skill from created markdown content. Extracts metadata (name, description) from the frontmatter and returns the structured skill.",
  inputSchema: z.object({
    content: z
      .string()
      .describe("The full markdown content of the created skill"),
  }),
  outputSchema: z.object({
    skillContent: z.string(),
    metadata: z.object({
      name: z.string(),
      description: z.string(),
      version: z.string(),
    }),
  }),
  execute: async ({ content }) => {

    const nameMatch = content.match(/name:\s*(.+)/);
    const descMatch = content.match(/description:\s*"?([^"\n]+)"?/);

    return {
      skillContent: content,
      metadata: {
        name: nameMatch?.[1]?.trim() || "created-skill",
        description: descMatch?.[1]?.trim() || "",
        version: "1.0.0",
      },
    };
  },
});
