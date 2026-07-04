import { Persona } from "@/types/persona";

export const personas: Persona[] = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    tagline: "Learn by Building",
    image: "/personas/hitesh.jpg",
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    tagline: "Think Production First",
    image: "/personas/piyush.jpg",
  },
];

export const conversations = {
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
      title: "Backend Development",
    },
  ],

  piyush: [
    {
      id: "4",
      title: "Redis Caching",
    },
    {
      id: "5",
      title: "Docker Basics",
    },
    {
      id: "6",
      title: "Scaling APIs",
    },
  ],
};