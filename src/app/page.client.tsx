"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Zap, Package, ArrowRight } from "lucide-react";

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

export function Landing() {
  return (
    <main className="flex flex-col items-center">
      {/* Nav */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 absolute top-0 left-0 right-0 z-10">
        <nav className="bg-stackable-surface/90 backdrop-blur-sm border border-stackable-border rounded-full px-6 shadow-cr">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stackable-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-base font-extrabold font-[family-name:var(--font-heading)] text-stackable-text uppercase tracking-wide">
                Stackable
              </span>
            </Link>
            <Link
              href="/editor"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stackable-accent text-white text-sm font-medium rounded-full hover:bg-stackable-accent/90 transition-all"
            >
              Start Building
              <span className="text-white/80">→</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero with warm gradient bg */}
      <section className="w-full bg-[#F6EDE3]">
        <div className="max-w-5xl mx-auto px-4 pt-28 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text leading-tight mb-6">
              Build Claude Code Skills
            </h1>
            <p className="text-lg text-stackable-muted max-w-xl mx-auto mb-4">
              Create, edit, and package Claude Code skills with AI assistance.
              Powered by Stacks.
            </p>
            <p className="text-sm text-stackable-muted/60 mb-10">
              GPT-4o generation + x402 Stacks payment protocol
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-stackable-accent text-white font-medium rounded-full hover:bg-stackable-accent/90 transition-all"
              >
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/editor"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-stackable-surface text-stackable-text font-medium rounded-full shadow-cr hover:shadow-lg transition-all"
              >
                Explore Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works — prioritized */}
      <section className="w-full max-w-5xl px-4 pt-20 pb-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stackable-text text-white text-xs font-medium mb-6">
            <span className="opacity-60">◎</span>
            How it Works
            <span className="opacity-60">◎</span>
          </span>
          <h2 className="text-4xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text mb-4">
            Build Skills in 3 Simple Steps
          </h2>
          <p className="text-base text-stackable-muted max-w-lg mx-auto">
            From description to download, your ideas turn into Claude Code
            skills with a smooth and transparent process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Describe",
              desc: "Tell AI what skill you want to build",
              icon: "💬",
            },
            {
              step: "2",
              title: "Edit",
              desc: "Refine the generated skill in Monaco Editor",
              icon: "✏️",
            },
            {
              step: "3",
              title: "Download",
              desc: "Pay with STX and get your skill package",
              icon: "📦",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-[20px] bg-stackable-surface shadow-cr overflow-hidden">
              <div className="halftone-orange h-32 flex items-center justify-center">
                <span className="text-4xl">{item.icon}</span>
              </div>
              <div className="p-5 pt-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-stackable-accent text-white text-xs font-bold mb-3">
                  Step {item.step}
                </span>
                <h3 className="text-base font-bold font-[family-name:var(--font-heading)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-stackable-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stackable-text text-white text-xs font-medium mb-6">
            <span className="opacity-60">◎</span>
            Features
            <span className="opacity-60">◎</span>
          </span>
          <h2 className="text-4xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text mb-4">
            Everything You Need to Build
          </h2>
          <p className="text-base text-stackable-muted max-w-lg mx-auto">
            Powerful tools that take you from idea to production-ready Claude Code skill in minutes, not hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="rounded-[20px] bg-stackable-surface shadow-cr hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="halftone-orange h-40 flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-2xl bg-stackable-accent shadow-lg flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="p-5 pt-4 text-center">
                <h3 className="text-base font-bold font-[family-name:var(--font-heading)] mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-stackable-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
