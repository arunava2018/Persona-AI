import type { StaticImageData } from "next/image";

export type PersonaId = "hitesh" | "piyush";

export interface Persona {
  id: PersonaId;
  name: string;
  tagline: string;
  image: string | Blob;
}