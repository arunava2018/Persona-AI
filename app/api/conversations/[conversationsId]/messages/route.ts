import {NextRequest, NextResponse} from 'next/server';
import {getMessages, createMessage} from '@/lib/supabase/queries/messages';
import { getConversation } from '@/lib/supabase/queries/conversations';
import { getPersonaById } from '@/lib/supabase/queries/personas';
import {
    loadPersonaAssets,
    buildMessages,
    generateResponse,
} from "@/lib/ai";
type Params = {
  conversationsId: string;
};

// Create a new message for a given conversation
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { conversationsId } = await params;
    
    const { role, content } = await request.json();
    const conversation  = await getConversation(conversationsId);
    console.log('Conversation:', conversation);
    const personId = conversation?.persona_id;

    const persona = await getPersonaById(personId);
    // console.log('Received POST request with params:', { conversationsId, role, content });
    if (!conversationsId || !role || !content) {
      return NextResponse.json({ error: 'conversationsId, role, and content are required' }, { status: 400 });
    }
    const message = await createMessage(conversationsId, role, content);
    //As of now mock the LLM response and add it to the messages table
    // const llmResponse = await createMessage(conversationsId, 'assistant', `This is a mock response to: "${content}"`);
    const personaAssets = await loadPersonaAssets(persona?.slug || "");
    const messages = await getMessages(conversationsId);
    const llmMessages = buildMessages({
      assets: personaAssets,
      history: messages.map((message: { role: "user" | "assistant"; content: string }) => ({
        role: message.role,
        content: message.content,
      })),
    });
    const llmResponse = await generateResponse(llmMessages);
    await createMessage(conversationsId, 'assistant', llmResponse.content);
    return NextResponse.json({message : "Message created successfully", llmResponse: llmResponse}, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Get all messages for a given conversation
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { conversationsId } = await params;
    if (!conversationsId) {
      return NextResponse.json({ error: 'conversationsId is required' }, { status: 400 });
    }
    const messages = await getMessages(conversationsId);
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
        