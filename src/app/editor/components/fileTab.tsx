"use client";

import { FileCode2, FileJson } from "lucide-react";
import { useForgeStore, type ActiveFile } from "../store";

const tabs: { id: ActiveFile; label: string; icon: typeof FileCode2 }[] = [
  { id: "skill", label: "SKILL.md", icon: FileCode2 },
  { id: "metadata", label: "metadata.json", icon: FileJson },
];

export function FileTab() {
  const { activeFile, setActiveFile } = useForgeStore();

  return (
    <div className="flex border-b border-forge-border bg-forge-surface/30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveFile(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 transition-colors ${
            activeFile === tab.id
              ? "border-forge-orange text-forge-text bg-forge-surface/50"
              : "border-transparent text-forge-muted hover:text-forge-text"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
