"use client";

import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useForgeStore } from "../store";

export function ValidationPanel() {
  const { validation, skillContent } = useForgeStore();

  if (!skillContent) {
    return (
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-forge-muted mb-3 font-[family-name:var(--font-jetbrains)]">
          Validation
        </h3>
        <p className="text-xs text-forge-muted/60">
          Start editing or generate a skill to see validation results.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-auto">
      <h3 className="text-sm font-semibold text-forge-muted mb-3 font-[family-name:var(--font-jetbrains)]">
        Validation
      </h3>

      {validation.valid && validation.warnings.length === 0 && (
        <div className="flex items-center gap-2 text-emerald-400 mb-3">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs">All checks passed</span>
        </div>
      )}

      {validation.valid && validation.warnings.length > 0 && (
        <div className="flex items-center gap-2 text-forge-orange mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400">Valid</span>
          <span className="text-xs text-forge-muted">
            with {validation.warnings.length} warning
            {validation.warnings.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {!validation.valid && (
        <div className="flex items-center gap-2 text-red-400 mb-3">
          <XCircle className="w-4 h-4" />
          <span className="text-xs">
            {validation.errors.length} error
            {validation.errors.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="space-y-2">
        {validation.errors.map((err, i) => (
          <div
            key={`err-${i}`}
            className="flex items-start gap-2 p-2 rounded bg-red-400/10 border border-red-400/20"
          >
            <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
            <span className="text-xs text-red-300">{err.message}</span>
          </div>
        ))}

        {validation.warnings.map((warn, i) => (
          <div
            key={`warn-${i}`}
            className="flex items-start gap-2 p-2 rounded bg-forge-orange/10 border border-forge-orange/20"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-forge-orange mt-0.5 shrink-0" />
            <span className="text-xs text-forge-orange/80">{warn.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
