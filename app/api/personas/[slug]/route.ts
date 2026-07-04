import {NextRequest, NextResponse} from 'next/server';
import {getPersonaBySlug} from "@/lib/supabase/queries/personas";
type Params = Promise<{ slug: string}>;
export async function GET(request: NextRequest, context: { params: Params }) {
  const { slug } = await context.params;  
  try {
    const persona = await getPersonaBySlug(slug);
    return NextResponse.json(persona, {status: 200});
  } catch (error) {
    console.error(`Error fetching persona with slug ${slug}:`, error);
    return NextResponse.json({error: `Failed to fetch persona with slug ${slug}`}, {status: 500});
  }
}