import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { LLMMessage } from "./types";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const MODEL = "gemini-3.5-flash";

export async function generateResponse(
  messages: LLMMessage[]
): Promise<string> {
  try {
    // Extract system prompt
    const systemPrompt =
      messages.find((m) => m.role === "system")?.content ?? "";

    // Convert remaining messages
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

    const response = await ai.models.generateContent({
      model: MODEL,

      contents,

      config: {
        systemInstruction: systemPrompt,

        temperature: 0.7,

        topP: 0.95,

        maxOutputTokens: 1024,
      },
    });

    return response.text ?? "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);

    throw new Error("Failed to generate AI response.");
  }
}