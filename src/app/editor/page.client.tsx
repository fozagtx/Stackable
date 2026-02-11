"use client";

import { useEffect, useCallback } from "react";
import { useForgeStore } from "./store";
import { Sidebar } from "./components/sidebar";
import { PromptInput } from "./components/promptInput";
import { FileTab } from "./components/fileTab";
import { SkillEditor } from "./components/skillEditor";
import { ValidationPanel } from "./components/validationPanel";
import { DownloadButton } from "./components/downloadButton";
import { PaymentModal } from "./components/paymentModal";

const LOCALSTORAGE_KEY = "stacksskills-draft";
const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function EditorPage() {
  const { skillContent, metadata, setSkillContent, setMetadata, paymentState } =
    useForgeStore();

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALSTORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.skillContent) setSkillContent(parsed.skillContent);
        if (parsed.metadata) setMetadata(parsed.metadata);
      }
    } catch {
      // ignore parse errors
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save to localStorage
  const save = useCallback(() => {
    if (!skillContent) return;
    try {
      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({ skillContent, metadata })
      );
    } catch {
      // ignore storage errors
    }
  }, [skillContent, metadata]);

  useEffect(() => {
    const interval = setInterval(save, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [save]);

  // Save on beforeunload
  useEffect(() => {
    const handler = () => save();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [save]);

  const showPaymentModal = paymentState !== "idle" && paymentState !== "error";

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PromptInput />
        <FileTab />
        <div className="flex-1 flex min-h-0">
          <div className="flex-1 min-w-0">
            <SkillEditor />
          </div>
          <div className="w-72 border-l border-forge-border flex flex-col">
            <ValidationPanel />
            <div className="p-4 border-t border-forge-border">
              <DownloadButton />
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && <PaymentModal />}
    </div>
  );
}
