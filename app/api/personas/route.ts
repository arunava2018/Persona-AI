import { NextResponse } from "next/server";
import { getPersonas } from "@/lib/supabase/queries/personas";

export async function GET() {
  try {
    const personas = await getPersonas();
    return NextResponse.json(personas, { status: 200 });
  } catch (error) {
    console.error("Error fetching personas:", error);
    return NextResponse.json({ error: "Failed to fetch personas" }, { status: 500 });
  }
}

