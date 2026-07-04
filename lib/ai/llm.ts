import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { LLMMessage, LLMResponse } from "./types";

dotenv.config();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

const MODEL = "gemini-2.5-flash";

export async function generateResponse(
    messages: LLMMessage[]
): Promise<LLMResponse> {
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
                maxOutputTokens: 2024,
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });

        console.log("Finish Reason:", response.candidates?.[0]?.finishReason);
        console.log("Usage:", response.usageMetadata);
        console.log("Candidate:", JSON.stringify(response.candidates?.[0], null, 2));

        return {
            content: response.text ?? "",
            usage: {
                promptTokens: response.usageMetadata?.promptTokenCount,
                completionTokens: response.usageMetadata?.candidatesTokenCount,
                totalTokens: response.usageMetadata?.totalTokenCount,
            },
        };
    } catch (error) {
        console.error("Gemini Error:", error);

        throw new Error("Failed to generate AI response.");
    }
}