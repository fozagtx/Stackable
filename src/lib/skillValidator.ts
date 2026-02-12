export interface ValidationResult {
  valid: boolean;
  errors: ValidationMessage[];
  warnings: ValidationMessage[];
}

export interface ValidationMessage {
  type: "error" | "warning";
  message: string;
  line?: number;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const REQUIRED_SECTIONS = ["Triggers", "Usage"];

/**
 * Sanitize LLM-generated skill content so it passes frontmatter validation.
 * Handles common GPT-4o output quirks:
 *  - code fence wrappers (```markdown ... ```)
 *  - \r\n line endings
 *  - leading whitespace / blank lines before ---
 *  - trailing whitespace
 */
export function sanitizeSkillContent(raw: string): string {
  let content = raw;

  // Normalize line endings
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Strip code fence wrappers (```markdown or ``` at start/end)
  content = content.replace(/^```(?:markdown|md)?\s*\n/, "");
  content = content.replace(/\n```\s*$/, "");

  // Remove any leading blank lines / whitespace before the frontmatter
  content = content.replace(/^\s*\n*(---)/,"$1");

  // Trim trailing whitespace
  content = content.trimEnd();

  // If there's still no frontmatter but the content has name:/description: lines
  // near the top, wrap them in --- delimiters
  if (!content.startsWith("---")) {
    const lines = content.split("\n");
    const yamlEnd = lines.findIndex(
      (l, i) => i > 0 && !l.match(/^\s*(name|description|version|author|tags):\s/)
    );
    if (yamlEnd > 0) {
      const yamlLines = lines.slice(0, yamlEnd);
      const rest = lines.slice(yamlEnd);
      content = "---\n" + yamlLines.join("\n") + "\n---\n" + rest.join("\n");
    }
  }

  return content;
}

export function validateSkillContent(content: string): ValidationResult {
  const errors: ValidationMessage[] = [];
  const warnings: ValidationMessage[] = [];

  if (!content.trim()) {
    errors.push({ type: "error", message: "Skill content is empty" });
    return { valid: false, errors, warnings };
  }

  const sizeBytes = new TextEncoder().encode(content).length;
  if (sizeBytes > MAX_SIZE_BYTES) {
    errors.push({
      type: "error",
      message: `Content exceeds 5MB limit (${(sizeBytes / 1024 / 1024).toFixed(1)}MB)`,
    });
  }

  // Check YAML frontmatter (tolerant of trailing spaces on --- lines)
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!frontmatterMatch) {
    errors.push({
      type: "error",
      message: "Missing YAML frontmatter (---\\n...\\n---)",
      line: 1,
    });
  } else {
    const frontmatter = frontmatterMatch[1];
    if (!frontmatter.includes("name:")) {
      errors.push({
        type: "error",
        message: 'Frontmatter missing required "name" field',
        line: 2,
      });
    }
    if (!frontmatter.includes("description:")) {
      warnings.push({
        type: "warning",
        message: 'Frontmatter missing recommended "description" field',
        line: 2,
      });
    }
  }

  // Check required sections
  for (const section of REQUIRED_SECTIONS) {
    const pattern = new RegExp(`^##\\s+${section}`, "m");
    if (!pattern.test(content)) {
      errors.push({
        type: "error",
        message: `Missing required section: ## ${section}`,
      });
    }
  }

  // Check for H1 heading (skill title)
  if (!content.match(/^#\s+[^#]/m)) {
    warnings.push({
      type: "warning",
      message: "Missing top-level heading (# Title)",
    });
  }

  // Check recommended sections
  const recommendedSections = ["Examples", "Boundaries", "Behavioral Flow"];
  for (const section of recommendedSections) {
    const pattern = new RegExp(`^##\\s+${section}`, "m");
    if (!pattern.test(content)) {
      warnings.push({
        type: "warning",
        message: `Missing recommended section: ## ${section}`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function extractMetadataFromContent(content: string): {
  name: string;
  description: string;
} {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!frontmatterMatch) {
    return { name: "untitled-skill", description: "" };
  }

  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  const descMatch = frontmatter.match(/description:\s*"?([^"]+)"?/);

  return {
    name: nameMatch?.[1]?.trim() || "untitled-skill",
    description: descMatch?.[1]?.trim() || "",
  };
}
