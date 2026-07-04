export interface PersonaData {
  name: string;
  version: string;
  system_prompt: string;
  runtime_guidelines: string[];
  persona: Record<string, unknown>;
  merge_summary?: Record<string, unknown>;
}

export interface FewShot {
  title: string;
  language: string;
  difficulty: string;
  traits: string[];
  user: string;
  assistant: string;
}

export interface FewShotCollection {
  few_shots: FewShot[];
}

export interface PersonaAssets {
  persona: PersonaData;
  fewshots: FewShotCollection;
}