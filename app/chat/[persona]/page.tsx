import { notFound } from "next/navigation";

import Sidebar from "@/components/chat/Sidebar/Sidebar";
import ChatWindow from "@/components/chat/chat-window/ChatWindow";

import { getPersona } from "@/lib/mock/persona";

interface Props {
  params: Promise<{
    persona: string;
  }>;
}

export default async function ChatPage({
  params,
}: Props) {
  const { persona } = await params;

  const selectedPersona = getPersona(persona);

  if (!selectedPersona) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-white md:flex-row">
      <Sidebar
        selectedPersona={selectedPersona.id}
      />

      <ChatWindow persona={selectedPersona} />
    </main>
  );
}