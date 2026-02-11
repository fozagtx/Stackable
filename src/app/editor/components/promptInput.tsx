"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useForgeStore } from "../store";
import { skillTemplates } from "@/lib/skill-templates";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const {
    isGenerating,
    generateError,
    setSkillContent,
    setMetadata,
    setIsGenerating,
    setGenerateError,
  } = useForgeStore();

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerateError(null);

    try {
      const res = await fetch("/api/generate-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setSkillContent(data.skillContent);
      if (data.metadata) {
        setMetadata({
          name: data.metadata.name,
          description: data.metadata.description,
          version: data.metadata.version || "1.0.0",
        });
      }
    } catch (error) {
      setGenerateError(
        error instanceof Error ? error.message : "Generation failed"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (templateContent: string) => {
    setSkillContent(templateContent);
    setShowTemplates(false);
  };

  return (
    <div className="border-b border-forge-border bg-forge-surface/30 p-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Describe the skill you want to build..."
            className="w-full px-4 py-2 bg-forge-charcoal border border-forge-border rounded-lg text-sm text-forge-text placeholder:text-forge-muted/50 focus:outline-none focus:border-forge-orange/50 focus:ring-1 focus:ring-forge-orange/20"
            disabled={isGenerating}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-forge-purple text-white text-sm font-medium rounded-lg hover:bg-forge-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          {isGenerating ? "Generating..." : "Generate"}
        </button>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center gap-1 px-3 py-2 text-sm text-forge-muted border border-forge-border rounded-lg hover:text-forge-text hover:border-forge-muted transition-colors"
        >
          Templates
          {showTemplates ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {generateError && (
        <p className="mt-2 text-sm text-red-400">{generateError}</p>
      )}

      {showTemplates && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
          {skillTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.content)}
              className="p-3 text-left rounded-lg border border-forge-border bg-forge-charcoal hover:border-forge-purple/50 transition-colors"
            >
              <span className="block text-sm font-medium text-forge-text">
                {template.name}
              </span>
              <span className="block text-xs text-forge-muted mt-1 line-clamp-2">
                {template.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
