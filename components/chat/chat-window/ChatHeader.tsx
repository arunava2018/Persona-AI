import Image from "next/image";
import { Persona } from "@/types/persona";

interface Props {
  persona: Persona;
}

export default function ChatHeader({ persona }: Props) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 sm:px-8 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Image
          src={persona.image}
          alt={persona.name}
          width={50}
          height={50}
          className="rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {persona.name}
          </h2>

          <p className="mt-1 text-sm leading-6 text-zinc-400 sm:text-base">
            {persona.tagline}
          </p>
        </div>
      </div>
    </header>
  );
}