import type { SkillPackageData } from "./zipCreator";

interface StoredSkill {
  data: SkillPackageData;
  createdAt: number;
}

const TTL_MS = 60 * 60 * 1000; // 1 hour
const store = new Map<string, StoredSkill>();

function cleanup() {
  const now = Date.now();
  for (const [key, value] of store) {
    if (now - value.createdAt > TTL_MS) {
      store.delete(key);
    }
  }
}

// Periodic cleanup every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanup, 10 * 60 * 1000);
}

export const skillStore = {
  set(id: string, data: SkillPackageData) {
    cleanup();
    store.set(id, { data, createdAt: Date.now() });
  },

  get(id: string): SkillPackageData | undefined {
    const entry = store.get(id);
    if (!entry) return undefined;
    if (Date.now() - entry.createdAt > TTL_MS) {
      store.delete(id);
      return undefined;
    }
    return entry.data;
  },

  delete(id: string) {
    store.delete(id);
  },
};
