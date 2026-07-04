"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const mentors = [
  { initials: "HC", name: "Hitesh Choudhary" },
  { initials: "PG", name: "Piyush Garg" },
];

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-blue-600/20 via-zinc-900 to-cyan-600/10 p-12 text-center md:p-16">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

        <div className="relative">
          {/* Mentor avatar stack */}
          <div className="mb-6 flex items-center justify-center">
            <div className="flex -space-x-3">
              {mentors.map((mentor) => (
                <div
                  key={mentor.initials}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-200 ring-4 ring-zinc-950"
                  title={mentor.name}
                >
                  {mentor.initials}
                </div>
              ))}
            </div>
            <div className="ml-3 flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Online now
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-zinc-50 md:text-5xl">
            Hitesh sir and Piyush sir
            <br />
            are ready to chat
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-zinc-400">
            No scheduling, no waiting. Ask your doubts and get answers in
            their style, right now.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group bg-blue-600 px-8 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start chatting now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link
              href="#personas"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
            >
              Or pick a mentor first →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}