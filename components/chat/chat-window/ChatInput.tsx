"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = message.trim();
    if (!trimmed) return;

    await onSend(trimmed);
    setMessage("");
  }

  return (
    <footer className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-5 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-end"
      >
        <Textarea
          rows={2}
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="min-h-30 resize-none border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
        />

        <Button
          type="submit"
          size="icon"
          className="self-start sm:self-end"
          disabled={disabled || !message.trim()}
        >
          <SendHorizontal size={18} />
        </Button>
      </form>
    </footer>
  );
}
