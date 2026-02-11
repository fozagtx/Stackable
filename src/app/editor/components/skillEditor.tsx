"use client";

import dynamic from "next/dynamic";
import { useForgeStore } from "../store";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function SkillEditor() {
  const { skillContent, metadata, activeFile, setSkillContent, setMetadata } =
    useForgeStore();

  const isMetadataView = activeFile === "metadata";
  const metadataJson = JSON.stringify(metadata, null, 2);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    if (isMetadataView) {
      try {
        const parsed = JSON.parse(value);
        setMetadata({
          name: parsed.name || "",
          description: parsed.description || "",
          version: parsed.version || "1.0.0",
        });
      } catch {
        // invalid JSON while typing — ignore
      }
    } else {
      setSkillContent(value);
    }
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={isMetadataView ? "json" : "markdown"}
        value={isMetadataView ? metadataJson : skillContent}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "var(--font-jetbrains), JetBrains Mono, monospace",
          minimap: { enabled: false },
          lineNumbers: "on",
          wordWrap: "on",
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          renderWhitespace: "selection",
          tabSize: 2,
          bracketPairColorization: { enabled: true },
          automaticLayout: true,
        }}
      />
    </div>
  );
}
