"use client";

import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useStackableStore } from "../store";

export function ValidationPanel() {
  const { validation, skillContent } = useStackableStore();

  if (!skillContent) {
    return (
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-stackable-muted mb-3 font-[family-name:var(--font-heading)]">
          Validation
        </h3>
        <p className="text-xs text-stackable-muted/60">
          Start editing or generate a skill to see validation results.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-auto">
      <h3 className="text-sm font-semibold text-stackable-muted mb-3 font-[family-name:var(--font-heading)]">
        Validation
      </h3>

      {validation.valid && validation.warnings.length === 0 && (
        <div className="flex items-center gap-2 text-emerald-600 mb-3">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs">All checks passed</span>
        </div>
      )}

      {validation.valid && validation.warnings.length > 0 && (
        <div className="flex items-center gap-2 text-stackable-accent mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs text-emerald-600">Valid</span>
          <span className="text-xs text-stackable-muted">
            with {validation.warnings.length} warning
            {validation.warnings.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {!validation.valid && (
        <div className="flex items-center gap-2 text-red-500 mb-3">
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
            className="flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-200"
          >
            <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
            <span className="text-xs text-red-700">{err.message}</span>
          </div>
        ))}

        {validation.warnings.map((warn, i) => (
          <div
            key={`warn-${i}`}
            className="flex items-start gap-2 p-2 rounded bg-stackable-accent/10 border border-stackable-accent/20"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-stackable-accent mt-0.5 shrink-0" />
            <span className="text-xs text-stackable-accent/80">{warn.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
