"use client";

import { Brain, MessageCircle, History, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Realistic personas",
    desc: "Experience conversations inspired by real-world teaching styles.",
  },
  {
    icon: MessageCircle,
    title: "Natural chat",
    desc: "Fluid AI conversations with contextual understanding.",
  },
  {
    icon: History,
    title: "Persistent history",
    desc: "Continue previous conversations anytime.",
  },
  {
    icon: Sparkles,
    title: "Instant responses",
    desc: "Powered by modern LLMs for fast and helpful answers.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="text-sm font-medium uppercase tracking-wider text-blue-400">
          Why Persona AI
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50">
          Everything you need to learn faster
        </h2>
        <p className="mt-4 text-zinc-400">
          Built to feel like a real mentorship, not just another chatbot.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-zinc-900/80"
          >
            {/* Subtle glow on hover */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/0 blur-2xl transition-colors duration-300 group-hover:bg-blue-500/10" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 transition-colors duration-300 group-hover:bg-blue-500/20">
              <feature.icon className="h-6 w-6 text-blue-400" />
            </div>

            <h3 className="relative mt-5 text-lg font-semibold text-zinc-50">
              {feature.title}
            </h3>
            <p className="relative mt-2.5 text-[15px] leading-relaxed text-zinc-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}