import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrashIcon } from "lucide-react";

interface Props {
  title: string;
  active?: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function ConversationItem({
  title,
  active,
  onClick,
  onDelete,
}: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
        active
          ? "bg-zinc-800/80 text-white"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
      )}
    >
      {/* Active indicator */}
      <span
        className={cn(
          "absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-cyan-400 transition-opacity",
          active ? "opacity-100" : "opacity-0"
        )}
      />

      <MessageSquare
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          active ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-400"
        )}
      />

      <span className="min-w-0 flex-1 truncate font-medium">{title}</span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Delete conversation"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="h-6 w-6 shrink-0 text-zinc-500 opacity-0 hover:bg-zinc-700 hover:text-red-400 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <TrashIcon className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}