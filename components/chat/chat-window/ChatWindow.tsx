"use client";

import { useLayoutEffect, useRef, useState } from "react";

import ChatHeader from "@/components/chat/chat-window/ChatHeader";
import EmptyState from "@/components/chat/chat-window/EmptyState";
import ChatInput from "@/components/chat/chat-window/ChatInput";
import { Skeleton } from "@/components/ui/skeleton";
import { Persona } from "@/types/persona";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  persona: Persona;
  conversationId?: string;
}

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) return time;

  const dateStr = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return `${dateStr} · ${time}`;
}

function TypingBubble({ persona }: { persona: Persona }) {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-end gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">
          {persona.name?.[0] ?? "A"}
        </div>
        <div className="flex items-center gap-1 rounded-3xl rounded-bl-md border border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
        </div>
      </div>
    </div>
  );
}

function MessageSkeletonRow({ align }: { align: "left" | "right" }) {
  const isRight = align === "right";
  return (
    <div className={`flex w-full ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end gap-2 ${isRight ? "flex-row-reverse" : ""}`}>
        {!isRight && <Skeleton className="h-8 w-8 shrink-0 rounded-full" />}
        <Skeleton
          className="rounded-3xl"
          style={{
            height: "44px",
            width: `${140 + Math.random() * 100}px`,
            borderBottomRightRadius: isRight ? "6px" : undefined,
            borderBottomLeftRadius: !isRight ? "6px" : undefined,
          }}
        />
      </div>
    </div>
  );
}

function MessagesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <MessageSkeletonRow align="right" />
      <MessageSkeletonRow align="left" />
      <MessageSkeletonRow align="right" />
      <MessageSkeletonRow align="left" />
    </div>
  );
}

export default function ChatWindow({
  persona,
  conversationId,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/conversations/${conversationId}/messages`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to load messages");
        }

        const data: Message[] = await response.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load messages.");
      } finally {
        setIsLoading(false);
      }
    }

    if (conversationId) {
      fetchMessages();
    } else {
      setMessages([]);
      setError(null);
    }
  }, [conversationId]);

  // Reliable auto-scroll: wait for layout to settle, then jump the
  // scroll container itself rather than trusting scrollIntoView.
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const frame = requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });

    return () => cancelAnimationFrame(frame);
  }, [messages, isSending, isLoading]);

  async function handleSend(message: string) {
    if (!conversationId) return;

    setIsSending(true);
    setError(null);

    // Optimistically append the user's message so the UI feels responsive
    const userTemp: Message = {
      id: `tmp-user-${Date.now()}`,
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    };

    setMessages((current) => [...current, userTemp]);

    try {
      const response = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "user", content: message }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // If the API returns an assistant LLM response (mock), append it
      if (data && data.llmResponse) {
        const assistantMsg: Message = {
          ...data.llmResponse,
          role: data.llmResponse.role === "user" ? "user" : "assistant",
          created_at: data.llmResponse.created_at ?? new Date().toISOString(),
        };
        setMessages((current) => [...current, assistantMsg]);
      } else if (data && data.id) {
        // If API returned a single created message object, append it
        const createdMessage: Message = {
          ...data,
          role: data.role === "user" ? "user" : "assistant",
        };
        setMessages((current) => [...current, createdMessage]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
      // On error, remove the optimistic message we added
      setMessages((current) => current.filter((m) => m.id !== userTemp.id));
    } finally {
      setIsSending(false);
    }
  }

  const shouldShowChat = Boolean(conversationId);

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-zinc-950">
      <ChatHeader persona={persona} />

      <main
        ref={scrollContainerRef}
        className="flex flex-1 flex-col overflow-y-auto px-6 py-6"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4">
          {!shouldShowChat ? (
            <EmptyState persona={persona} newChat={false} />
          ) : isLoading ? (
            <MessagesSkeleton />
          ) : error ? (
            <div className="m-auto rounded-2xl border border-red-600 bg-red-950/20 px-6 py-4 text-center text-sm text-red-300">
              {error}
            </div>
          ) : messages.length === 0 ? (
            <EmptyState persona={persona} newChat={true} />
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex w-full flex-col gap-1 ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`flex w-full items-end gap-2 ${
                        isUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      {!isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">
                          {persona.name?.[0] ?? "A"}
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md border border-zinc-800 bg-zinc-900 text-zinc-100"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                    <span
                      className={`px-1 text-[11px] text-zinc-500 ${
                        isUser ? "mr-1" : "ml-10"
                      }`}
                    >
                      {formatTimestamp(message.created_at)}
                    </span>
                  </div>
                );
              })}

              {isSending && <TypingBubble persona={persona} />}
            </div>
          )}
        </div>
      </main>

      <ChatInput onSend={handleSend} disabled={!shouldShowChat || isSending} />
    </section>
  );
}