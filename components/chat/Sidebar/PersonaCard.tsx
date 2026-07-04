"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Persona } from "@/types/persona";

interface Props {
  persona: Persona;
  active: boolean;
  onClick: () => void;
}

export default function PersonaCard({
  persona,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-3 transition-all",

        active
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900"
      )}
    >
      <Image
        src={persona.image}
        alt={persona.name}
        width={48}
        height={48}
        className="rounded-full"
      />

      <div className="text-left">
        <h3 className="font-semibold">{persona.name}</h3>

        <p className="text-sm text-zinc-400">
          {persona.tagline}
        </p>
      </div>
    </button>
  );
}