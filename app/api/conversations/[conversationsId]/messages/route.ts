import { NextRequest, NextResponse } from "next/server";

import { getMessages, createMessage } from "@/lib/supabase/queries/messages";
import { getConversation } from "@/lib/supabase/queries/conversations";
import { getPersonaById } from "@/lib/supabase/queries/personas";

import {
  loadPersonaAssets,
  buildMessages,
  generateResponse,
} from "@/lib/ai";

interface RouteContext {
  params: Promise<{
    conversationsId: string;
  }>;
}

// Create a new message for a given conversation
export async function POST(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { conversationsId } = await params;

    const { role, content } = await request.json();

    if (!conversationsId || !role || !content) {
      return NextResponse.json(
        {
          error: "conversationsId, role, and content are required",
        },
        { status: 400 }
      );
    }

    const conversation = await getConversation(conversationsId);

    if (!conversation) {
      return NextResponse.json(
        {
          error: "Conversation not found",
        },
        { status: 404 }
      );
    }

    const persona = await getPersonaById(conversation.persona_id);

    if (!persona) {
      return NextResponse.json(
        {
          error: "Persona not found",
        },
        { status: 404 }
      );
    }

    // Save user message
    await createMessage(conversationsId, role, content);

    // Fetch updated chat history
    const messages = await getMessages(conversationsId);

    const personaAssets = await loadPersonaAssets(persona.slug);

    const llmMessages = buildMessages({
      assets: personaAssets,
      history: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const llmResponse = await generateResponse(llmMessages);

    // Save assistant response
    await createMessage(
      conversationsId,
      "assistant",
      llmResponse.content
    );

    return NextResponse.json(
      {
        message: "Message created successfully",
        llmResponse,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating message:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// Get all messages for a given conversation
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { conversationsId } = await params;

    if (!conversationsId) {
      return NextResponse.json(
        {
          error: "conversationsId is required",
        },
        {
          status: 400,
        }
      );
    }

    const conversation = await getConversation(conversationsId);

    if (!conversation) {
      return NextResponse.json(
        {
          error: "Conversation not found",
        },
        {
          status: 404,
        }
      );
    }

    const messages = await getMessages(conversationsId);

    return NextResponse.json(messages, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch messages",
      },
      {
        status: 500,
      }
    );
  }
}