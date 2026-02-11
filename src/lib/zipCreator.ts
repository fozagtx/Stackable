import JSZip from "jszip";
import { extractMetadataFromContent } from "./skillValidator";

export interface SkillPackageData {
  skillContent: string;
  metadata: {
    name: string;
    description: string;
    version: string;
  };
}

export async function createSkillZip(
  data: SkillPackageData
): Promise<Buffer> {
  const zip = new JSZip();
  const { skillContent, metadata } = data;

  // SKILL.md - main skill content
  zip.file("SKILL.md", skillContent);

  // metadata.json
  const extracted = extractMetadataFromContent(skillContent);
  const fullMetadata = {
    name: metadata.name || extracted.name,
    description: metadata.description || extracted.description,
    version: metadata.version || "1.0.0",
    createdAt: new Date().toISOString(),
    format: "claude-code-skill",
    compatibility: "claude-code@1.0+",
  };
  zip.file("metadata.json", JSON.stringify(fullMetadata, null, 2));

  // README.md - auto-created usage guide
  const readme = createReadme(fullMetadata);
  zip.file("README.md", readme);

  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  return buffer;
}

function createReadme(metadata: {
  name: string;
  description: string;
  version: string;
}): string {
  return `# ${metadata.name}

${metadata.description}

## Installation

Copy \`SKILL.md\` to your Claude Code commands directory:

\`\`\`bash
mkdir -p ~/.claude/commands
cp SKILL.md ~/.claude/commands/${metadata.name}.md
\`\`\`

## Usage

Once installed, invoke the skill in Claude Code:

\`\`\`
/${metadata.name}
\`\`\`

## Version

${metadata.version}

---

Created by Stackable
`;
}
