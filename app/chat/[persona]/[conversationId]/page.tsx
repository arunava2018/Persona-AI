import { notFound } from "next/navigation";

import Sidebar from "@/components/chat/Sidebar/Sidebar";
import ChatWindow from "@/components/chat/chat-window/ChatWindow";

import { getPersona } from "@/lib/mock/persona";
import { getConversation } from "@/lib/supabase/queries/conversations";

interface Props {
  params: Promise<{
    persona: string;
    conversationId: string;
  }>;
}

export default async function ConversationPage({ params }: Props) {
  const { persona, conversationId } = await params;
  const selectedPersona = getPersona(persona);

  if (!selectedPersona) {
    notFound();
  }

  const selectedConversation = await getConversation(conversationId);

  if (!selectedConversation) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-white md:flex-row">
      <Sidebar
        selectedPersona={selectedPersona.id}
        selectedConversationId={selectedConversation.id}
      />

      <ChatWindow
        persona={selectedPersona}
        conversationId={selectedConversation.id}
      />
    </main>
  );
}
