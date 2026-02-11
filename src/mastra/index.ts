import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { skillCreatorAgent } from "./agents";

export const mastra = new Mastra({
  agents: { skillCreatorAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
