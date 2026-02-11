import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StacksSkills - Build Claude Code Skills",
  description:
    "Create, edit, and package Claude Code skills with AI assistance on Stacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} forge-layout min-h-screen bg-forge-charcoal text-forge-text antialiased`}
      >
        <nav className="border-b border-forge-border bg-forge-surface/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold font-[family-name:var(--font-jetbrains)] text-forge-orange">
                  StacksSkills
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/editor"
                  className="text-sm text-forge-muted hover:text-forge-text transition-colors"
                >
                  Editor
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
