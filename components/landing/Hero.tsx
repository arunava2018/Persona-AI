"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute left-1/3 top-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent)",
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center md:py-36">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-600/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          AI Powered Mentor Experience
        </span>

        {/* Headline */}
        <h1 className="mt-8 text-5xl font-bold leading-[1.1] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
          Learn from
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            AI Personas
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Experience conversations inspired by your favorite tech mentors.
          Switch between different teaching styles, ask questions, and learn
          programming through AI-powered discussions.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
          <Link href="/chat/hitesh" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500">
            Start Chatting
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
        </div>

        {/* Social proof / stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-zinc-200">12k+</span>
            developers learning
          </div>
          <div className="hidden h-4 w-px bg-zinc-800 sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-zinc-200">8</span>
            unique mentor personas
          </div>
          <div className="hidden h-4 w-px bg-zinc-800 sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-zinc-200">4.9/5</span>
            average rating
          </div>
        </div>
      </div>
    </section>
  );
}