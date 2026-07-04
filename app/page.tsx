import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PersonaCards from "@/components/landing/PersonaCards";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <PersonaCards />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}