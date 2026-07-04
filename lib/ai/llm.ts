import Groq from "groq-sdk";
import dotenv from "dotenv";
import { LLMMessage, LLMResponse } from "./types";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

const MODEL = "llama-3.3-70b-versatile";

export async function generateResponse(
    messages: LLMMessage[]
): Promise<LLMResponse> {
    try {
        const response = await groq.chat.completions.create({
            model: MODEL,
            messages: messages.map((message) => ({
                role: message.role,
                content: message.content,
            })),
            temperature: 0.7,
            top_p: 0.95,
            max_completion_tokens: 2024,
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
        console.error("Groq Error:", error);
        throw new Error("Failed to generate AI response.");
    }
}