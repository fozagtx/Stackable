import { Mastra } from "@mastra/core/mastra";
import { ConsoleLogger } from "@mastra/core/logger";

import { skillCreatorAgent } from "./agents";

export const mastra = new Mastra({
  agents: { skillCreatorAgent },
  logger: new ConsoleLogger("Mastra", { level: "info" }),
});
