import { PersonaId } from "@/types/persona";

export const conversations: Record<
  PersonaId,
  {
    id: string;
    title: string;
  }[]
> = {
  hitesh: [
    {
      id: "1",
      title: "Learning React",
    },
    {
      id: "2",
      title: "NodeJS Roadmap",
    },
    {
      id: "3",
      title: "Career Advice",
    },
  ],

  piyush: [
    {
      id: "4",
      title: "Redis",
    },
    {
      id: "5",
      title: "Docker",
    },
    {
      id: "6",
      title: "Kafka",
    },
  ],
};