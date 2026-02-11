"use client";

import { FileCode2, FileJson } from "lucide-react";
import { useStackableStore, type ActiveFile } from "../store";

const tabs: { id: ActiveFile; label: string; icon: typeof FileCode2 }[] = [
  { id: "skill", label: "SKILL.md", icon: FileCode2 },
  { id: "metadata", label: "metadata.json", icon: FileJson },
];

export function FileTab() {
  const { activeFile, setActiveFile } = useStackableStore();

  return (
    <div className="flex border-b border-stackable-border bg-stackable-surface/30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveFile(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 transition-colors ${
            activeFile === tab.id
              ? "border-stackable-accent text-stackable-text bg-stackable-surface/50"
              : "border-transparent text-stackable-muted hover:text-stackable-text"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
