import { NextRequest, NextResponse } from "next/server";
import { getConversationsByPersona } from "@/lib/supabase/queries/conversations";

export async function POST(request: NextRequest) {
  try {
    const { persona } = await request.json();

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
