"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Sparkles, PenLine, Package, ArrowRight, ChevronDown, MessageSquare, Bot, Coins, Download } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const features = [
  {
    icon: Sparkles,
    title: "Agent That Writes For You",
    description:
      "Just describe what you need. Our agent turns your idea into a polished, ready-to-use Claude skill.",
  },
  {
    icon: PenLine,
    title: "Tweak It Your Way",
    description:
      "Review the output, make quick edits, and see validation in real time. No setup, no complexity.",
  },
  {
    icon: Package,
    title: "Download & Install",
    description:
      "One click to get a packaged skill you can drop straight into Claude. Pay with STX, done.",
  },
];

export function Landing() {
  return (
    <main className="flex flex-col items-center">
      {/* Nav */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 absolute top-0 left-0 right-0 z-10">
        <nav className="bg-stackable-surface/90 backdrop-blur-sm border border-stackable-border rounded-lg px-6 shadow-cr">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Stackable"
                width={40}
                height={40}
              />
              <span className="text-sm font-black font-[family-name:var(--font-heading)] text-stackable-text uppercase tracking-tight leading-none">
                Stackable
              </span>
            </Link>
            <Link
              href="/editor"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stackable-text text-white text-sm font-medium rounded-full hover:bg-stackable-text/90 transition-all"
            >
              Start Building
              <span className="text-white/80">&rarr;</span>
            </Link>
          </div>
        </nav>
      </div>


      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-[#F6EDE3] to-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text leading-tight mb-6">
                Build Claude Skills
              </h1>
              <p className="text-lg text-stackable-muted max-w-md mb-4">
                Describe what you want, let the agent create it, then download a
                ready-to-use skill package. That simple.
              </p>
              <div className="flex items-center gap-2 mb-10">
                <Image
                  src="/stacks.webp"
                  alt="Stacks"
                  width={20}
                  height={20}
                  className="inline-block"
                />
                <p className="text-sm text-stackable-muted/60">
                  Stacks &middot; Pay with STX &middot; x402
                </p>
              </div>
              <div className="flex items-center gap-4">
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

            {/* Right — animated flow card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-md w-full"
            >
              <div className="card-glossy shadow-cr p-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: MessageSquare,
                      label: "Prompt",
                      detail: "\"Create a code review skill...\"",
                      color: "bg-blue-500",
                    },
                    {
                      icon: Bot,
                      label: "Agent Builds",
                      detail: "Agent creates your skill",
                      color: "bg-stackable-accent",
                    },
                    {
                      icon: Coins,
                      label: "Pay with STX",
                      detail: "Micropayment via Stacks",
                      color: "bg-purple-500",
                      stacks: true,
                    },
                    {
                      icon: Download,
                      label: "Download",
                      detail: "Ready-to-install package",
                      color: "bg-emerald-500",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.25 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center shrink-0`}
                          animate={{
                            scale: [1, 1.08, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        >
                          <step.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-stackable-text">
                              {step.label}
                            </p>
                            {step.stacks && (
                              <Image
                                src="/stacks.webp"
                                alt="Stacks"
                                width={16}
                                height={16}
                              />
                            )}
                          </div>
                          <p className="text-xs text-stackable-muted truncate">
                            {step.detail}
                          </p>
                        </div>
                        {i < 3 && (
                          <motion.div
                            className="text-stackable-accent/40"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.25,
                            }}
                          >
                            <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
                          </motion.div>
                        )}
                      </div>
                      {i < 3 && (
                        <motion.div
                          className="ml-5 w-px h-3 bg-stackable-border my-1"
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.25,
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-5xl px-4 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stackable-text text-white text-xs font-medium mb-6">
            <span className="opacity-60">&diams;</span>
            How it Works
            <span className="opacity-60">&diams;</span>
          </span>
          <h2 className="text-4xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text mb-4">
            Three Steps. Zero Friction.
          </h2>
          <p className="text-base text-stackable-muted max-w-lg mx-auto">
            Go from idea to installed Claude skill in under a minute.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Describe",
              desc: "Tell us what your skill should do — in plain English",
              icon: "💬",
            },
            {
              step: "2",
              title: "Review",
              desc: "Read the output, tweak anything you like",
              icon: "✏️",
            },
            {
              step: "3",
              title: "Download",
              desc: "Pay with STX and get your ready-to-install package",
              icon: "📦",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="card-glossy shadow-cr"
            >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stackable-text text-white text-xs font-medium mb-6">
            <span className="opacity-60">&diams;</span>
            Features
            <span className="opacity-60">&diams;</span>
          </span>
          <h2 className="text-4xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text mb-4">
            Everything You Need
          </h2>
          <p className="text-base text-stackable-muted max-w-lg mx-auto">
            From idea to production-ready skill in minutes, not hours.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="card-glossy shadow-cr hover:shadow-lg transition-shadow"
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

      {/* FAQs */}
      <FaqSection />

      {/* Footer */}
      <footer className="w-full bg-white">
        {/* Top section */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            {/* Left — logo, description, CTA */}
            <div className="md:max-w-xs">
              <div className="flex items-center gap-2.5 mb-5">
                <Image
                  src="/logo.png"
                  alt="Stackable"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-black font-[family-name:var(--font-heading)] text-stackable-text uppercase tracking-tight leading-none">
                  Stackable
                </span>
              </div>
              <div className="w-16 h-px bg-stackable-border mb-5" />
              <p className="text-sm text-stackable-muted leading-relaxed mb-6">
                Build, edit, and sell Claude Code skills
                powered by agent creation and Stacks
                micropayments.
              </p>
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stackable-text text-white text-sm font-medium rounded-full hover:bg-stackable-text/90 transition-all"
              >
                Start Building
                <span className="text-white/70">&nearr;</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Large watermark + gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-stackable-accent/80 via-stackable-accent/20 to-transparent" />
          <div className="relative flex items-end justify-center pt-8 pb-2 select-none pointer-events-none">
            <span className="text-[clamp(4rem,12vw,10rem)] font-black font-[family-name:var(--font-heading)] uppercase tracking-tight leading-none text-white/20">
              Stackable
            </span>
          </div>
          <div className="relative border-t border-white/20 px-6 lg:px-8 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <p className="text-xs text-white/70">
                Stackable &copy; {new Date().getFullYear()}
              </p>
              <p className="text-xs text-white/70">
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const faqs = [
  {
    question: "How does Stackable work?",
    answer:
      "Describe the skill you want in plain English, our agent creates a complete Claude Code skill, then you review, edit, and download it as a ready-to-install package.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Not at all. The agent handles the technical side. You just describe what you want the skill to do and refine the output to your liking.",
  },
  {
    question: "What is a Claude Code skill?",
    answer:
      "A skill is a reusable command for Claude Code — Anthropic's CLI assistant. Skills let you teach Claude new workflows, saving you time on repetitive tasks.",
  },
  {
    question: "How do payments work?",
    answer:
      "Stackable uses the x402 protocol on Stacks. You pay a small amount of STX to download your packaged skill. No accounts, no subscriptions.",
  },
  {
    question: "Can I edit the skill after creation?",
    answer:
      "Yes. The built-in editor lets you tweak every line before downloading. You have full control over the final output.",
  },
  {
    question: "How do I install a downloaded skill?",
    answer:
      "Unzip the package and copy the SKILL.md file into your ~/.claude/commands/ directory. That's it — Claude Code picks it up automatically.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stackable-border/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-[#F0F0F0] hover:bg-[#EAEAEA] transition-colors text-left"
      >
        <span className="text-sm font-medium text-stackable-text">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stackable-accent shrink-0 ml-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-white">
              <p className="text-sm text-stackable-muted leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stackable-text text-white text-xs font-medium mb-6">
          <span className="opacity-60">&diams;</span>
          FAQs
          <span className="opacity-60">&diams;</span>
        </span>
        <h2 className="text-4xl font-extrabold font-[family-name:var(--font-heading)] text-stackable-text mb-4">
          Your Questions, Answered
        </h2>
        <p className="text-base text-stackable-muted max-w-lg mx-auto">
          Everything you need to know to understand how Stackable works, all
          in one place.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-stackable-accent/30 overflow-hidden"
      >
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </motion.div>
    </section>
  );
}
