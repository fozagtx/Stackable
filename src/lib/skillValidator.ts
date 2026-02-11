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

  // Check YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
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
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
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
