"use client";

import { Download, Loader2 } from "lucide-react";
import { useStackableStore } from "../store";

export function DownloadButton() {
  const {
    skillContent,
    metadata,
    validation,
    paymentState,
    setPaymentState,
    setSkillId,
  } = useStackableStore();

  const canDownload = skillContent.trim() && validation.valid;

  const handleDownload = async () => {
    if (!canDownload) return;

    // Generate a skill ID and store the skill on the server
    const skillId = crypto.randomUUID();
    setSkillId(skillId);

    try {
      // Store the skill data on the server first
      const storeRes = await fetch(`/api/download/${skillId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillContent, metadata }),
      });

      if (!storeRes.ok) {
        throw new Error("Failed to prepare skill for download");
      }

      // Initiate payment flow
      setPaymentState("connecting");
    } catch (error) {
      console.error("Download preparation error:", error);
      setPaymentState("error");
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!canDownload || paymentState === "connecting"}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stackable-accent text-white font-semibold text-sm rounded-full hover:bg-stackable-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-stackable-accent/20"
    >
      {paymentState === "connecting" ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      Download Package
    </button>
  );
}
