import { create } from "zustand";
import { validateSkillContent, type ValidationResult } from "@/lib/skillValidator";

export type PaymentState =
  | "idle"
  | "connecting"
  | "signing"
  | "verifying"
  | "confirmed"
  | "error";

export type ActiveFile = "skill" | "metadata";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface StackableState {
  // Chat
  chatMessages: ChatMessage[];

  // Editor
  skillContent: string;
  metadata: { name: string; description: string; version: string };
  activeFile: ActiveFile;
  isCreating: boolean;
  createError: string | null;

  // Validation
  validation: ValidationResult;

  // Payment
  paymentState: PaymentState;
  paymentError: string | null;
  skillId: string | null;
  walletAddress: string | null;

  // Actions
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  setSkillContent: (content: string) => void;
  setMetadata: (metadata: { name: string; description: string; version: string }) => void;
  setActiveFile: (file: ActiveFile) => void;
  setIsCreating: (creating: boolean) => void;
  setCreateError: (error: string | null) => void;
  setPaymentState: (state: PaymentState) => void;
  setPaymentError: (error: string | null) => void;
  setSkillId: (id: string | null) => void;
  setWalletAddress: (address: string | null) => void;
  resetPayment: () => void;
  resetAll: () => void;
}

export const useStackableStore = create<StackableState>((set) => ({
  chatMessages: [],
  skillContent: "",
  metadata: { name: "", description: "", version: "1.0.0" },
  activeFile: "skill",
  isCreating: false,
  createError: null,
  validation: { valid: true, errors: [], warnings: [] },
  paymentState: "idle",
  paymentError: null,
  skillId: null,
  walletAddress: null,

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        { ...message, id: crypto.randomUUID(), timestamp: Date.now() },
      ],
    })),

  setSkillContent: (content) =>
    set({
      skillContent: content,
      validation: validateSkillContent(content),
    }),

  setMetadata: (metadata) => set({ metadata }),
  setActiveFile: (file) => set({ activeFile: file }),
  setIsCreating: (creating) => set({ isCreating: creating }),
  setCreateError: (error) => set({ createError: error }),
  setPaymentState: (state) => set({ paymentState: state }),
  setPaymentError: (error) => set({ paymentError: error }),
  setSkillId: (id) => set({ skillId: id }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  resetPayment: () =>
    set({ paymentState: "idle", paymentError: null }),
  resetAll: () => {
    try { localStorage.removeItem("stackable-draft"); } catch {}
    set({
      chatMessages: [],
      skillContent: "",
      metadata: { name: "", description: "", version: "1.0.0" },
      activeFile: "skill",
      isCreating: false,
      createError: null,
      validation: { valid: true, errors: [], warnings: [] },
      paymentState: "idle",
      paymentError: null,
      skillId: null,
      walletAddress: null,
    });
  },
}));
