import OpenAI from "openai";
import dotenv from "dotenv";
import { LLMMessage, LLMResponse } from "./types";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://your-domain.com", // optional
    "X-Title": "Persona AI", // optional
  },
});

const MODEL = "poolside/laguna-xs-2.1:free";

export async function generateResponse(
  messages: LLMMessage[]
): Promise<LLMResponse> {
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 2024,
    });

    return {
      content: response.choices[0]?.message?.content ?? "",
      usage: {
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
        totalTokens: response.usage?.total_tokens,
      },
    };
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw new Error("Failed to generate AI response.");
  }
}