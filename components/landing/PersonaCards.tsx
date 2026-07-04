"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FaGlobe, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import hiteshImg from "@/assets/hc.jpg";
import piyushImg from "@/assets/pg.jpg";

const mentors = [
  {
    id: "hitesh",
    initials: "HC",
    name: "Hitesh Choudhary",
    image: hiteshImg,
    description:
      "Retired corporate professional turned full-time YouTuber. Ex-founder of LCO, former CTO at iNeuron and Sr. Director at PW. Runs two channels with 1.8M+ subscribers and 2,500+ videos.",
    skills: [
      "Hindi Friendly",
      "Beginner Friendly",
      "Project Based",
      "Motivational",
    ],
    accent: "blue",
    links: {
      website: "https://hiteshchoudhary.com",
      twitter: "https://x.com/Hiteshdotcom",
      linkedin: "https://in.linkedin.com/in/hiteshchoudhary",
      youtube: "https://www.youtube.com/@HiteshCodeLab",
    },
  },
  {
    id: "piyush",
    initials: "PG",
    name: "Piyush Garg",
    image: piyushImg,
    description:
      "Software engineer, content creator, and educator. Founder of Teachyst, a white-labeled LMS helping educators monetize their content globally.",
    skills: ["Backend", "System Design", "Architecture", "Scalable Systems"],
    accent: "cyan",
    links: {
      website: "https://www.piyushgarg.dev",
      twitter: "https://x.com/piyushgarg_dev",
      linkedin: "https://linkedin.com/in/piyushgarg195",
      youtube: "https://youtube.com/@piyushgargdev",
    },
  },
];

const accentStyles = {
  blue: {
    ring: "ring-blue-500/40 group-hover:ring-blue-400",
    glow: "group-hover:shadow-blue-500/20",
    border: "hover:border-blue-500/60",
    badge: "group-hover:border-blue-500/40 group-hover:bg-blue-500/10 group-hover:text-blue-300",
    button:
      "bg-blue-600 shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-500/30",
    icon: "hover:text-blue-400",
  },
  cyan: {
    ring: "ring-cyan-500/40 group-hover:ring-cyan-400",
    glow: "group-hover:shadow-cyan-500/20",
    border: "hover:border-cyan-500/60",
    badge: "group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 group-hover:text-cyan-300",
    button:
      "bg-cyan-600 shadow-cyan-600/20 hover:bg-cyan-500 hover:shadow-cyan-500/30",
    icon: "hover:text-cyan-400",
  },
};

export default function PersonaCards() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="text-center">
        <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
          Your mentors
        </span>
        <p className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Meet our mentors
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Learn from expert mentors who combine real-world experience with
          thoughtful guidance.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {mentors.map((mentor) => {
          const accent = accentStyles[mentor.accent as keyof typeof accentStyles];
          return (
            <Card
              key={mentor.name}
              className={`group relative overflow-hidden border-zinc-800 bg-zinc-900/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${accent.border} ${accent.glow}`}
            >
              {/* subtle top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardContent className="space-y-6 p-8">
                <div className="flex items-start justify-between">
                  <div
                    className={`overflow-hidden rounded-full ring-2 ring-zinc-700 transition-all duration-300 ${accent.ring}`}
                  >
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      className="h-20 w-20 object-cover"
                    />
                  </div>

                  {/* Social links */}
                  <div className="flex gap-1">
                    {[
                      { href: mentor.links.website, icon: FaGlobe, label: "website" },
                      { href: mentor.links.twitter, icon: FaXTwitter, label: "on X" },
                      { href: mentor.links.linkedin, icon: FaLinkedin, label: "on LinkedIn" },
                      { href: mentor.links.youtube, icon: FaYoutube, label: "on YouTube" },
                    ].map(({ href, icon: Icon, label }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 ${accent.icon}`}
                        aria-label={`${mentor.name} ${label}`}
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    {mentor.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                    {mentor.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border border-zinc-800 bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors duration-300 ${accent.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/chat/${mentor.id}`}
                  className={`group/btn flex w-full items-center justify-center rounded-lg py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ${accent.button}`}
                >
                  Start Conversation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}