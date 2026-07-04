import { Persona } from "@/types/persona";
import { Sparkles } from "lucide-react";

interface Props {
  persona: Persona;
  newChat : boolean;
}

export default function EmptyState({ persona, newChat }: Props) {
  const greeting = persona.id === "hitesh" ? "Hanji 👋" : "Hey 👋";
  const subtitle =
    persona.id === "hitesh"
      ? "Aaj kya seekhna hai?"
      : "What are we building today?";

  return (
    <div className="flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-0">
      
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {greeting}
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-zinc-400 sm:text-xl">
        {subtitle}
      </p>

      {!newChat && (
        <div className="mt-10 flex items-center gap-x-3 text-sm text-zinc-500">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <span>Click "New Chat" in the sidebar to get started</span>
        </div>
      )}
    </div>
  );
}