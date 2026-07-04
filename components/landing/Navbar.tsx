"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-50">
            Persona <span className="text-blue-500">AI</span>
          </span>
        </Link>

        {/* CTA */}
        <div className="flex items-center gap-3">
          
          <Button className="bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}