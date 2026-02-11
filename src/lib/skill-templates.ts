export interface SkillTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

export const skillTemplates: SkillTemplate[] = [
  {
    id: "blank",
    name: "Blank Skill",
    description: "Start from scratch with a minimal skill structure",
    content: `---
name: my-skill
description: "A custom Claude Code skill"
---
# /my-skill - My Custom Skill

## Triggers
- Describe when this skill should be activated

## Usage
\`\`\`
/my-skill [arguments]
\`\`\`

## Behavioral Flow
1. Step one of the skill execution
2. Step two of the skill execution
3. Step three of the skill execution

## Examples
\`\`\`
/my-skill example-usage
\`\`\`

## Boundaries
- What this skill should NOT do
`,
  },
  {
    id: "document-processor",
    name: "Document Processor",
    description: "A skill that analyzes and transforms documents",
    content: `---
name: doc-processor
description: "Analyze and transform documents with structured output"
---
# /doc-processor - Document Processor

## Triggers
- Document analysis requests
- File transformation needs
- Content extraction tasks

## Usage
\`\`\`
/doc-processor @file.md --format summary
/doc-processor @file.pdf --extract key-points
\`\`\`

## Behavioral Flow
1. Read and parse the input document
2. Identify document structure (headings, sections, lists)
3. Apply the requested transformation
4. Output structured result with clear formatting
5. Provide metadata (word count, sections found, key entities)

## Examples
\`\`\`
/doc-processor @report.md --format executive-summary
# Output: Concise summary with key findings and recommendations

/doc-processor @spec.pdf --extract requirements
# Output: Numbered list of extracted requirements
\`\`\`

## Boundaries
- Do not modify the original document
- Do not hallucinate content not present in the source
- Preserve attribution and citations
`,
  },
  {
    id: "api-integration",
    name: "API Integration",
    description: "A skill for interacting with external APIs",
    content: `---
name: api-helper
description: "Generate and test API integration code"
---
# /api-helper - API Integration Helper

## Triggers
- API integration requests
- REST/GraphQL endpoint creation
- API client code generation

## Usage
\`\`\`
/api-helper generate --api stripe --action create-payment
/api-helper test --endpoint /api/users --method POST
\`\`\`

## Behavioral Flow
1. Identify the target API and desired operation
2. Check for existing API client patterns in the codebase
3. Generate type-safe integration code following project conventions
4. Include error handling and retry logic
5. Add request/response type definitions
6. Generate corresponding tests

## Examples
\`\`\`
/api-helper generate --api github --action list-repos
# Output: Type-safe GitHub API client with authentication

/api-helper test --endpoint /api/auth/login --method POST --body '{"email":"test@example.com"}'
# Output: Test file with happy path and error scenarios
\`\`\`

## Boundaries
- Never hardcode API keys or secrets
- Always use environment variables for configuration
- Follow existing project HTTP client patterns
`,
  },
  {
    id: "data-analyzer",
    name: "Data Analyzer",
    description: "A skill for analyzing data patterns and generating insights",
    content: `---
name: data-analyze
description: "Analyze data structures and generate insights"
---
# /data-analyze - Data Analyzer

## Triggers
- Data analysis requests
- Pattern recognition needs
- Database query optimization

## Usage
\`\`\`
/data-analyze @data.json --find patterns
/data-analyze @schema.sql --optimize queries
\`\`\`

## Behavioral Flow
1. Ingest the data source (JSON, CSV, SQL schema)
2. Profile the data structure and identify types
3. Detect patterns, anomalies, and relationships
4. Generate statistical summary or optimization suggestions
5. Present findings in structured markdown with visualizable metrics

## Examples
\`\`\`
/data-analyze @users.json --find patterns
# Output: User behavior patterns, common attributes, outliers

/data-analyze @schema.sql --optimize queries
# Output: Index suggestions, query rewrites, normalization advice
\`\`\`

## Boundaries
- Do not execute destructive database operations
- Report confidence levels for pattern detection
- Flag potential data quality issues
`,
  },
  {
    id: "custom-tool",
    name: "Custom Tool Builder",
    description: "A skill that generates Mastra/Claude tool definitions",
    content: `---
name: build-tool
description: "Generate custom tool definitions for Claude Code or Mastra"
---
# /build-tool - Custom Tool Builder

## Triggers
- Tool creation requests
- MCP server tool definitions
- Mastra tool generation

## Usage
\`\`\`
/build-tool mastra --name weather --api open-meteo
/build-tool claude --name file-search --description "Search files by content"
\`\`\`

## Behavioral Flow
1. Determine target platform (Mastra tool, Claude MCP tool, or standalone)
2. Define tool schema with input/output types
3. Implement the tool execution logic
4. Add input validation and error handling
5. Generate usage documentation and examples
6. Register tool in the appropriate index file

## Examples
\`\`\`
/build-tool mastra --name stock-price --api alpha-vantage
# Output: Complete Mastra tool with API integration, types, and registration

/build-tool claude --name code-review --description "Automated code review"
# Output: Claude skill definition with triggers, behavioral flow, and examples
\`\`\`

## Boundaries
- Follow existing tool patterns in the codebase
- Include proper TypeScript types for all inputs/outputs
- Never store credentials in tool definitions
`,
  },
];

export function getTemplateById(id: string): SkillTemplate | undefined {
  return skillTemplates.find((t) => t.id === id);
}
