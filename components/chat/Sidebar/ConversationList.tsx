import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationItem from "./ConversationItem";

interface Props {
  chats: {
    id: string;
    title: string;
  }[];
  activeConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
}

export default function ConversationList({
  chats,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}: Props) {
  if (chats.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
        No chat history yet. Start a new conversation to see it here.
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-2">
        {chats.map((chat) => (
          <ConversationItem
            key={chat.id}
            title={chat.title}
            active={chat.id === activeConversationId}
            onClick={() => onSelectConversation(chat.id)}
            onDelete={() => onDeleteConversation(chat.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}