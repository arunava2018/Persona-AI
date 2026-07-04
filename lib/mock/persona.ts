import hiteshImg from "@/assets/hc.jpg";
import piyushImg from "@/assets/pg.jpg";
import { Persona } from "@/types/persona";

export const personas: Persona[] = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    tagline: "Learn by Building",
    image: hiteshImg,
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    tagline: "Think Production First",
    image: piyushImg,
  },
];

export const getPersona = (id: string) => {
  return personas.find((p) => p.id === id);
};