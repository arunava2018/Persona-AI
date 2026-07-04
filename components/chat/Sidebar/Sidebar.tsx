"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";

import PersonaCard from "./PersonaCard";
import NewChatButton from "./NewChatButton";
import ConversationList from "./ConversationList";

import { personas } from "@/lib/mock/persona";
import { PersonaId } from "@/types/persona";

interface SidebarProps {
  selectedPersona: PersonaId;
  selectedConversationId?: string;
}

export default function Sidebar({
  selectedPersona,
  selectedConversationId,
}: SidebarProps) {
  const router = useRouter();
  const [chats, setChats] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch("/api/conversations/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ persona: selectedPersona }),
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error(error);
        setChats([]);
      }
    }

    fetchChats();
  }, [selectedPersona]);

  async function handleDeleteConversation(conversationId: string) {
    try {
      const response = await fetch("/api/conversations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId : conversationId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete conversation");
      }

      // Remove the deleted conversation from the list
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== conversationId));
      // If the deleted conversation was the active one, navigate to the persona's main page
      if (conversationId === selectedConversationId) {
        router.push(`/chat/${selectedPersona}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className="flex w-full flex-col border-b border-zinc-800 bg-zinc-950 p-5 md:h-screen md:w-80 md:border-b-0 md:border-r md:overflow-y-auto">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-semibold tracking-tight text-white">
            Persona AI
          </span>
        </Link>
      </div>

      <div className="space-y-3">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            active={persona.id === selectedPersona}
            onClick={() => router.push(`/chat/${persona.id}`)}
          />
        ))}
      </div>

      <div className="my-6">
        <NewChatButton persona={selectedPersona} />
      </div>

      <ConversationList
        chats={chats}
        activeConversationId={selectedConversationId}
        onSelectConversation={(conversationId) =>
          router.push(`/chat/${selectedPersona}/${conversationId}`)
        }
        onDeleteConversation={handleDeleteConversation}
      />
    </aside>
  );
}