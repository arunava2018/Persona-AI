"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PersonaId } from "@/types/persona";

interface NewChatButtonProps {
  persona: PersonaId;
}

export default function NewChatButton({ persona }: NewChatButtonProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  async function handleNewChat() {
    setIsCreating(true);

    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ persona }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to create conversation");
      }

      const data = await response.json();
      const conversationId = data?.id;

      if (!conversationId) {
        throw new Error("Conversation ID missing from response");
      }

      router.push(`/chat/${persona}/${conversationId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <Button
      className="w-full justify-start gap-2"
      disabled={isCreating}
      onClick={handleNewChat}
    >
      <Plus size={18} />
      New Chat
    </Button>
  );
}
