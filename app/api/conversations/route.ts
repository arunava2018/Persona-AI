import { NextRequest, NextResponse } from "next/server";
import {
  createConversation,
  getConversationsByPersona,
  deleteConversation
} from "@/lib/supabase/queries/conversations";
import { deleteMessages} from "@/lib/supabase/queries/messages";

export async function POST(request: NextRequest) {
  try {
    const { persona } = await request.json();

    if (!persona) {
      return NextResponse.json({ error: "persona is required" }, { status: 400 });
    }

    const conversation = await createConversation(persona);
    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const persona = body?.persona ?? request.nextUrl.searchParams.get("persona");

    if (!persona) {
      return NextResponse.json({ error: "persona is required" }, { status: 400 });
    }

    const conversations = await getConversationsByPersona(persona);
    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}


//Delete a conversation
export async function DELETE(request: NextRequest) {
  try {
    const { conversationId } = await request.json();
    if (!conversationId) {
      return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
    }
    //First delete the message of the conversation
    const deletedMessages = await deleteMessages(conversationId);
    // console.log(deletedMessages, "deletedMessages");
    //Then delete the conversation
    const deletedConversation = await deleteConversation(conversationId);
    return NextResponse.json({message : "Conversation deleted successfully"}, { status: 200 });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
