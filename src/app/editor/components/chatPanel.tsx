"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, ChevronDown, ChevronUp, Loader2, User, Bot, RotateCcw } from "lucide-react";
import { useStackableStore } from "../store";
import { skillTemplates } from "@/lib/skill-templates";

export function ChatPanel() {
  const [prompt, setPrompt] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    chatMessages,
    addChatMessage,
    isGenerating,
    generateError,
    skillContent,
    setSkillContent,
    setMetadata,
    setIsGenerating,
    setGenerateError,
    resetAll,
  } = useStackableStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    const userPrompt = prompt.trim();
    setPrompt("");
    addChatMessage({ role: "user", content: userPrompt });

    setIsGenerating(true);
    setGenerateError(null);

    try {
      const res = await fetch("/api/generate-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
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

      addChatMessage({
        role: "assistant",
        content: `Generated skill "${data.metadata?.name || "skill"}" — check the editor to review and edit.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed";
      setGenerateError(message);
      addChatMessage({ role: "assistant", content: `Error: ${message}` });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (templateContent: string, templateName: string) => {
    setSkillContent(templateContent);
    setShowTemplates(false);
    addChatMessage({ role: "user", content: `Use template: ${templateName}` });
    addChatMessage({
      role: "assistant",
      content: `Loaded the "${templateName}" template — you can edit it in the editor panel.`,
    });
  };

  return (
    <div className="flex flex-col h-full border-r border-stackable-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stackable-border bg-stackable-surface/50">
        <div>
          <h2 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-stackable-text">
            Skill Builder
          </h2>
          <p className="text-xs text-stackable-muted mt-0.5">
            Describe what you want to build
          </p>
        </div>
        {(chatMessages.length > 0 || skillContent.trim()) && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-stackable-muted hover:text-stackable-text border border-stackable-border rounded-lg hover:border-stackable-muted transition-colors"
            title="Clear all and start over"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
            <div className="w-12 h-12 rounded-full bg-stackable-accent/10 border border-stackable-accent/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-stackable-accent" />
            </div>
            <div>
              <p className="text-sm text-stackable-text font-medium">What skill do you want to create?</p>
              <p className="text-xs text-stackable-muted mt-1 max-w-[240px]">
                Describe it in natural language or pick a template below.
              </p>
            </div>
          </div>
        )}

        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-stackable-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-stackable-accent" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-[14px] text-sm ${
                msg.role === "user"
                  ? "bg-stackable-accent/10 text-stackable-text border border-stackable-accent/20"
                  : "bg-stackable-surface border border-stackable-border text-stackable-text shadow-cr"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-stackable-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-stackable-accent" />
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-stackable-accent/10 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-stackable-accent" />
            </div>
            <div className="px-3 py-2 rounded-lg bg-stackable-surface border border-stackable-border">
              <Loader2 className="w-4 h-4 text-stackable-accent animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Templates toggle */}
      {showTemplates && (
        <div className="px-4 pb-2 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border-t border-stackable-border pt-3">
          {skillTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.content, template.name)}
              className="p-2.5 text-left rounded-[14px] border border-stackable-border bg-stackable-surface hover:border-stackable-accent/40 transition-colors shadow-cr"
            >
              <span className="block text-xs font-medium text-stackable-text">
                {template.name}
              </span>
              <span className="block text-[10px] text-stackable-muted mt-0.5 line-clamp-2">
                {template.description}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-stackable-border bg-stackable-surface/30">
        {generateError && !chatMessages.length && (
          <p className="mb-2 text-xs text-red-400">{generateError}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center justify-center w-9 h-9 text-stackable-muted border border-stackable-border rounded-full hover:text-stackable-text hover:border-stackable-muted transition-colors shrink-0"
            title="Templates"
          >
            {showTemplates ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Describe your skill..."
            className="flex-1 min-w-0 px-3 py-2 bg-stackable-surface border border-stackable-border rounded-full text-sm text-stackable-text placeholder:text-stackable-muted/50 focus:outline-none focus:border-stackable-accent/50 focus:ring-1 focus:ring-stackable-accent/20"
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center justify-center w-9 h-9 bg-stackable-accent text-white rounded-full hover:bg-stackable-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            title="Generate"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
