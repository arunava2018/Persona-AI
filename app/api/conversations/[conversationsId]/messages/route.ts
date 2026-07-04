import {NextRequest, NextResponse} from 'next/server';
import {getMessages, createMessage} from '@/lib/supabase/queries/messages';

type Params = {
  conversationsId: string;
};

// Create a new message for a given conversation
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { conversationsId } = await params;
    const { role, content } = await request.json();
    // console.log('Received POST request with params:', { conversationsId, role, content });
    if (!conversationsId || !role || !content) {
      return NextResponse.json({ error: 'conversationsId, role, and content are required' }, { status: 400 });
    }
    const message = await createMessage(conversationsId, role, content);
    //As of now mock the LLM response and add it to the messages table
    const llmResponse = await createMessage(conversationsId, 'assistant', `This is a mock response to: "${content}"`);
    return NextResponse.json({message : "Message created successfully", llmResponse: llmResponse}, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
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
        