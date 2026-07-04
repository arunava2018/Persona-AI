import { supabase } from "../client";

export async function getPersonas() {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function getPersonaBySlug(slug: string) {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function getPersonaById(id: string) {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;

  return data;
}