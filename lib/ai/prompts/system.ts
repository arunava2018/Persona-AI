import { PersonaData } from "../types";

export function buildSystemPrompt(persona: PersonaData): string {
  const sections: string[] = [];

  // console.log("Perspna Data:", persona);
  // Main Persona Prompt
  sections.push(persona.system_prompt.trim());


  // Runtime Guidelines
  if (
    persona.runtime_guidelines &&
    persona.runtime_guidelines.length > 0
  ) {
    sections.push("\n------------------------------");
    sections.push("Runtime Guidelines:");
    sections.push("------------------------------");

    persona.runtime_guidelines.forEach((guideline) => {
      sections.push(`- ${guideline}`);
    });
  }

  return sections.join("\n");
}