import { LLMMessage, PersonaAssets } from "./types";
import { buildSystemPrompt } from "./prompts/system";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

interface BuildPromptParams {
  assets: PersonaAssets;
  history: ConversationMessage[];
}

export function buildMessages({
  assets,
  history,
}: BuildPromptParams): LLMMessage[] {
  const messages: LLMMessage[] = [];

  messages.push({
    role: "system",
    content: buildSystemPrompt(assets.persona),
  });

  const fewShots = assets.fewshots.few_shots.slice(0, 10);

  for (const shot of fewShots) {
    messages.push({
      role: "user",
      content: shot.user,
    });

    messages.push({
      role: "assistant",
      content: shot.assistant,
    });
  }

  messages.push(...history);

  return messages;
}