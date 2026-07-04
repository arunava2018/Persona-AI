import fs from "fs";
import path from "path";

import { PersonaAssets } from "./types";

const cache = new Map<string, PersonaAssets>();

export function loadPersonaAssets(persona: string): PersonaAssets {
  // Return cached assets if already loaded
  const cached = cache.get(persona);
  if (cached) {
    return cached;
  }

  const basePath = path.join(
    process.cwd(),
    "lib",
    "ai",
    "personas",
    persona
  );

  const personaPath = path.join(basePath, `${persona}.persona.json`);
  const fewshotsPath = path.join(basePath, `${persona}.fewshots.json`);

  const personaData = JSON.parse(
    fs.readFileSync(personaPath, "utf8")
  );

  const fewshotsData = JSON.parse(
    fs.readFileSync(fewshotsPath, "utf8")
  );

  const assets: PersonaAssets = {
    persona: personaData,
    fewshots: fewshotsData,
  };

  cache.set(persona, assets);

  return assets;
}