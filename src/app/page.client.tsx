"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, Code2, Zap, Package, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description:
      "Describe your skill in natural language and let GPT-4o generate a complete, valid Claude Code skill.",
  },
  {
    icon: Code2,
    title: "Monaco Editor",
    description:
      "Edit your skill with full syntax highlighting, autocomplete, and real-time validation in a professional IDE.",
  },
  {
    icon: Package,
    title: "One-Click Package",
    description:
      "Download a ready-to-install ZIP package with SKILL.md, metadata, and a README — just drop it into .claude/commands/.",
  },
];

const templates = [
  { name: "Document Processor", emoji: "📄" },
  { name: "API Integration", emoji: "🔌" },
  { name: "Data Analyzer", emoji: "📊" },
  { name: "Custom Tool Builder", emoji: "🔧" },
];

export function Landing() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-5xl px-4 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Hammer className="w-10 h-10 text-forge-orange" />
            <h1 className="text-5xl font-bold font-[family-name:var(--font-jetbrains)] bg-gradient-to-r from-forge-orange to-forge-purple bg-clip-text text-transparent">
              StacksSkills
            </h1>
          </div>
          <p className="text-xl text-forge-muted max-w-2xl mx-auto mb-4">
            Build Claude Code skills with AI. Edit in Monaco. Download as a
            package.
          </p>
          <p className="text-sm text-forge-muted/60 mb-10">
            Powered by GPT-4o generation + x402 Stacks payment protocol
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-8 py-3 bg-forge-orange text-forge-charcoal font-semibold rounded-lg hover:bg-forge-orange/90 transition-all shadow-lg shadow-forge-orange/20"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="p-6 rounded-xl border border-forge-border bg-forge-surface/50 hover:border-forge-orange/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-forge-purple mb-4" />
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-jetbrains)]">
                {feature.title}
              </h3>
              <p className="text-sm text-forge-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-jetbrains)] text-center mb-8">
          Start from a Template
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <Link
              key={template.name}
              href="/editor"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-forge-border bg-forge-surface/30 hover:border-forge-purple/50 hover:bg-forge-surface/60 transition-all text-center"
            >
              <span className="text-3xl">{template.emoji}</span>
              <span className="text-sm font-medium">{template.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-jetbrains)] text-center mb-10">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {[
            {
              step: "1",
              title: "Describe",
              desc: "Tell AI what skill you want to build",
            },
            {
              step: "2",
              title: "Edit",
              desc: "Refine the generated skill in Monaco Editor",
            },
            {
              step: "3",
              title: "Download",
              desc: "Pay with STX and get your skill package",
            },
          ].map((item, i) => (
            <div key={item.step} className="flex-1 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-forge-orange/10 border border-forge-orange/30 flex items-center justify-center text-forge-orange font-bold font-[family-name:var(--font-jetbrains)]">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-forge-muted">{item.desc}</p>
              {i < 2 && (
                <ArrowRight className="w-5 h-5 text-forge-muted/30 mx-auto mt-4 hidden md:block rotate-0" />
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
