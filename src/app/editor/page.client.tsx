"use client";

import { useEffect, useCallback } from "react";
import { useStackableStore } from "./store";
import { Sidebar } from "./components/sidebar";
import { ChatPanel } from "./components/chatPanel";
import { FileTab } from "./components/fileTab";
import { SkillEditor } from "./components/skillEditor";
import { ValidationPanel } from "./components/validationPanel";
import { DownloadButton } from "./components/downloadButton";
import { PaymentModal } from "./components/paymentModal";
import { Code2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCALSTORAGE_KEY = "stackable-draft";
const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function EditorPage() {
  const { skillContent, metadata, setSkillContent, setMetadata, paymentState } =
    useStackableStore();

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

  const { isGenerating } = useStackableStore();
  const showPaymentModal = paymentState !== "idle" && paymentState !== "error";
  const hasContent = skillContent.trim().length > 0;

  return (
    <div className="flex h-screen bg-stackable-charcoal">
      <Sidebar />

      {/* Chat panel — left side, always visible */}
      <div className="w-80 shrink-0">
        <ChatPanel />
      </div>

      {/* Editor panel — right side, always visible */}
      <div className="flex-1 flex flex-col min-w-0">
        <FileTab />
        <div className="flex-1 flex min-h-0">
          <div className="flex-1 min-w-0 relative">
            <AnimatePresence mode="wait">
              {hasContent ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <SkillEditor />
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-4"
                >
                  <div className="relative">
                    <motion.div
                      className="w-16 h-16 rounded-2xl border-2 border-stackable-accent/20 flex items-center justify-center"
                      animate={{ borderColor: ["rgba(255,98,7,0.2)", "rgba(255,98,7,0.5)", "rgba(255,98,7,0.2)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Loader2 className="w-7 h-7 text-stackable-accent animate-spin" />
                    </motion.div>
                    <motion.div
                      className="absolute -inset-3 rounded-3xl border border-stackable-accent/10"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stackable-text">Building your skill...</p>
                    <motion.p
                      className="text-xs text-stackable-muted mt-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      AI is generating the code
                    </motion.p>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-stackable-accent"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-3"
                >
                  <Code2 className="w-10 h-10 text-stackable-muted/30" />
                  <p className="text-sm text-stackable-muted/60">
                    Generate a skill or pick a template to start editing
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-64 border-l border-stackable-border flex flex-col">
            <ValidationPanel />
            <div className="p-4 border-t border-stackable-border">
              <DownloadButton />
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && <PaymentModal />}
    </div>
  );
}
