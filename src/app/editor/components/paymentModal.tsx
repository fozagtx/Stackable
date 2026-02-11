"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wallet,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileArchive,
  FileCode2,
  FileJson,
  FileText,
} from "lucide-react";
import { useStackableStore } from "../store";

const LOCALSTORAGE_KEY = "stackable-draft";

export function PaymentModal() {
  const {
    metadata,
    skillId,
    paymentState,
    paymentError,
    walletAddress,
    setPaymentState,
    setPaymentError,
    setWalletAddress,
    resetPayment,
    setSkillContent,
  } = useStackableStore();

  const [selectedAsset] = useState("STX");

  const handleClose = () => {
    resetPayment();
  };

  const connectWallet = useCallback(async () => {
    setPaymentState("connecting");

    try {
      const { connect } = await import("@stacks/connect");
      const result = await connect({
        forceWalletSelect: true,
        persistWalletSelect: true,
      });

      const stxAddress = result.addresses.find(
        (a: { symbol?: string; address: string }) =>
          a.symbol === "STX" || a.address.startsWith("S")
      );

      if (stxAddress) {
        setWalletAddress(stxAddress.address);
        setPaymentState("signing");
      } else {
        throw new Error("No STX address found");
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Wallet connection failed"
      );
      setPaymentState("error");
    }
  }, [setPaymentState, setPaymentError, setWalletAddress]);

  // Auto-connect on mount
  useEffect(() => {
    if (paymentState === "connecting") {
      connectWallet();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSign = async () => {
    if (!skillId || !walletAddress) return;

    setPaymentState("signing");

    try {
      // First, get the payment requirements from the server
      const requirementsRes = await fetch(`/api/download/${skillId}`);

      if (requirementsRes.status !== 402) {
        throw new Error("Unexpected response from server");
      }

      const paymentRequired = await requirementsRes.json();
      const requirements = paymentRequired.accepts?.[0];

      if (!requirements) {
        throw new Error("No payment requirements received");
      }

      // Use @stacks/connect to sign an STX transfer
      const { openSTXTransfer } = await import("@stacks/connect");

      await new Promise<void>((resolve, reject) => {
        openSTXTransfer({
          recipient: requirements.payTo,
          amount: BigInt(requirements.amount),
          network: requirements.network.includes("2147483648")
            ? "testnet"
            : "mainnet",
          onFinish: async (data) => {
            try {
              setPaymentState("verifying");

              // Create payment payload
              const paymentPayload = {
                signedTransaction: data.txRaw,
                paymentRequirements: requirements,
              };

              const paymentSignature = btoa(
                JSON.stringify(paymentPayload)
              );

              // Download with payment signature
              const downloadRes = await fetch(`/api/download/${skillId}`, {
                headers: {
                  "payment-signature": paymentSignature,
                },
              });

              if (!downloadRes.ok) {
                throw new Error("Download failed after payment");
              }

              // Trigger browser download
              const blob = await downloadRes.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${metadata.name || "skill"}.zip`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);

              // Clear localStorage draft after successful download
              try {
                localStorage.removeItem(LOCALSTORAGE_KEY);
              } catch {
                // ignore
              }

              setPaymentState("confirmed");
              resolve();
            } catch (error) {
              reject(error);
            }
          },
          onCancel: () => {
            reject(new Error("Transaction cancelled by user"));
          },
        });
      });
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Payment failed"
      );
      setPaymentState("error");
    }
  };

  const handleDismissAfterSuccess = () => {
    setSkillContent("");
    resetPayment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentState}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-stackable-surface border border-stackable-border rounded-[20px] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-stackable-border">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
              {paymentState === "confirmed" ? "Download Complete" : "Download Package"}
            </h2>
            <button
              onClick={handleClose}
              className="p-1 text-stackable-muted hover:text-stackable-text transition-colors rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Package contents preview */}
            {paymentState !== "confirmed" && (
              <div className="mb-6">
                <p className="text-xs text-stackable-muted mb-3 uppercase tracking-wider">
                  Package Contents
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-stackable-text/80">
                    <FileCode2 className="w-4 h-4 text-stackable-accent-soft" />
                    SKILL.md
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stackable-text/80">
                    <FileJson className="w-4 h-4 text-stackable-accent" />
                    metadata.json
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stackable-text/80">
                    <FileText className="w-4 h-4 text-stackable-muted" />
                    README.md
                  </div>
                </div>
              </div>
            )}

            {/* Price */}
            {paymentState !== "confirmed" && (
              <div className="mb-6 p-4 rounded-[14px] bg-stackable-charcoal border border-stackable-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stackable-muted">Price</span>
                  <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] text-stackable-accent">
                    2 {selectedAsset}
                  </span>
                </div>
                <p className="text-xs text-stackable-muted/60 mt-1">
                  Paid via x402 protocol on Stacks blockchain
                </p>
              </div>
            )}

            {/* State-specific content */}
            {paymentState === "connecting" && (
              <div className="flex flex-col items-center gap-3 py-4">
                <Loader2 className="w-8 h-8 text-stackable-accent animate-spin" />
                <p className="text-sm text-stackable-muted">
                  Connecting to wallet...
                </p>
              </div>
            )}

            {paymentState === "signing" && (
              <div className="space-y-4">
                {walletAddress && (
                  <div className="flex items-center gap-2 p-3 rounded-[14px] bg-stackable-charcoal border border-stackable-border">
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-stackable-muted font-mono truncate">
                      {walletAddress}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleSign}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stackable-accent text-white font-semibold rounded-full hover:bg-stackable-accent/90 transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  Sign & Pay 2 {selectedAsset}
                </button>
              </div>
            )}

            {paymentState === "verifying" && (
              <div className="flex flex-col items-center gap-3 py-4">
                <Loader2 className="w-8 h-8 text-stackable-accent animate-spin" />
                <p className="text-sm text-stackable-muted">
                  Verifying payment & generating package...
                </p>
              </div>
            )}

            {paymentState === "confirmed" && (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                </motion.div>
                <div className="text-center">
                  <p className="font-semibold text-stackable-text">
                    Download Complete!
                  </p>
                  <p className="text-sm text-stackable-muted mt-1">
                    Your skill package has been downloaded.
                  </p>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-[14px] bg-emerald-50 border border-emerald-200">
                  <FileArchive className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-700">
                    {metadata.name || "skill"}.zip
                  </span>
                </div>
                <button
                  onClick={handleDismissAfterSuccess}
                  className="mt-2 px-6 py-2 text-sm text-stackable-muted hover:text-stackable-text border border-stackable-border rounded-full transition-colors"
                >
                  Start New Skill
                </button>
              </div>
            )}

            {paymentState === "error" && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 p-3 rounded-[14px] bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-red-700">
                    {paymentError || "An error occurred"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setPaymentState("connecting");
                    connectWallet();
                  }}
                  className="w-full px-4 py-2.5 bg-stackable-surface border border-stackable-border text-stackable-text text-sm font-medium rounded-full hover:border-stackable-muted transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
