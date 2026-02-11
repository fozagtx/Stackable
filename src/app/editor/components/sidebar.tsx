"use client";

import {
  Code2,
  Settings,
  Package,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { icon: Code2, label: "Editor", active: true },
  { icon: Settings, label: "Config" },
  { icon: Package, label: "Package" },
  { icon: CreditCard, label: "Payment" },
  { icon: HelpCircle, label: "Help" },
];

export function Sidebar() {
  return (
    <aside className="w-14 border-r border-stackable-border bg-stackable-surface/50 flex flex-col items-center py-3 gap-1">
      {navItems.map((item) => (
        <button
          key={item.label}
          title={item.label}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            item.active
              ? "bg-stackable-accent/10 text-stackable-accent"
              : "text-stackable-muted hover:text-stackable-text hover:bg-stackable-surface"
          }`}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </aside>
  );
}
