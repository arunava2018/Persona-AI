import { supabase } from "@/lib/supabase/client";
import { getPersonaBySlug } from "./personas";

export async function createConversation(persona: string) {
  const personaRow = await getPersonaBySlug(persona);

  if (!personaRow?.id) {
    throw new Error(`Persona not found for slug: ${persona}`);
  }

  const randomTitle = `New Chat ${Math.floor(Math.random() * 1000)}`;
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      persona_id: personaRow.id,
      title: randomTitle,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getConversationsByPersona(persona: string) {
  const personaRow = await getPersonaBySlug(persona);

  if (!personaRow?.id) {
    throw new Error(`Persona not found for slug: ${persona}`);
  }

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("persona_id", personaRow.id)
    .order("last_message_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function getConversation(
  conversationId: string
) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .single();

  if (error) throw error;

  return data;
}

export async function updateConversationTitle(
  conversationId: string,
  title: string
) {
  const { data, error } = await supabase
    .from("conversations")
    .update({
      title,
    })
    .eq("id", conversationId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function touchConversation(
  conversationId: string
) {
  const { error } = await supabase
    .from("conversations")
    .update({
      last_message_at: new Date().toISOString(),
    })
    .eq("id", conversationId);

  if (error) throw error;
}

export async function deleteConversation(
  conversationId: string
) {
  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", conversationId);

  if (error) throw error;
}