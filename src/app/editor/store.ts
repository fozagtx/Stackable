import { create } from "zustand";
import { validateSkillContent, type ValidationResult } from "@/lib/skill-validator";

export type PaymentState =
  | "idle"
  | "connecting"
  | "signing"
  | "verifying"
  | "confirmed"
  | "error";

export type ActiveFile = "skill" | "metadata";

interface ForgeState {
  // Editor
  skillContent: string;
  metadata: { name: string; description: string; version: string };
  activeFile: ActiveFile;
  isGenerating: boolean;
  generateError: string | null;

  // Validation
  validation: ValidationResult;

  // Payment
  paymentState: PaymentState;
  paymentError: string | null;
  skillId: string | null;
  walletAddress: string | null;

  // Actions
  setSkillContent: (content: string) => void;
  setMetadata: (metadata: { name: string; description: string; version: string }) => void;
  setActiveFile: (file: ActiveFile) => void;
  setIsGenerating: (generating: boolean) => void;
  setGenerateError: (error: string | null) => void;
  setPaymentState: (state: PaymentState) => void;
  setPaymentError: (error: string | null) => void;
  setSkillId: (id: string | null) => void;
  setWalletAddress: (address: string | null) => void;
  resetPayment: () => void;
}

export const useForgeStore = create<ForgeState>((set) => ({
  skillContent: "",
  metadata: { name: "", description: "", version: "1.0.0" },
  activeFile: "skill",
  isGenerating: false,
  generateError: null,
  validation: { valid: true, errors: [], warnings: [] },
  paymentState: "idle",
  paymentError: null,
  skillId: null,
  walletAddress: null,

  setSkillContent: (content) =>
    set({
      skillContent: content,
      validation: validateSkillContent(content),
    }),

  setMetadata: (metadata) => set({ metadata }),
  setActiveFile: (file) => set({ activeFile: file }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setGenerateError: (error) => set({ generateError: error }),
  setPaymentState: (state) => set({ paymentState: state }),
  setPaymentError: (error) => set({ paymentError: error }),
  setSkillId: (id) => set({ skillId: id }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  resetPayment: () =>
    set({ paymentState: "idle", paymentError: null }),
}));
