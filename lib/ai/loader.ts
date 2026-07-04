import fs from "fs";
import path from "path";

export interface PersonaAssets {
  persona: any;
  fewshots: any;
}
const cache = new Map<string, PersonaAssets>();
export function loadPersonaAssets(persona: string): PersonaAssets {
   if (cache.has(persona)) {
    return cache.get(persona)!;
  }
  const basePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "ai",
    "personas",
    persona
  );

  const personaPath = path.join(basePath, `${persona}.persona.json`);
  const fewshotsPath = path.join(basePath, `${persona}.fewshots.json`);

  const personaData = JSON.parse(
    fs.readFileSync(personaPath, "utf-8")
  );

  const fewshotsData = JSON.parse(
    fs.readFileSync(fewshotsPath, "utf-8")
  );
  const assets = {
    persona: personaData,
    fewshots: fewshotsData,
  };

  cache.set(persona, assets);

  return assets;
}