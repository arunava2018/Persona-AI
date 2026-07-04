export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 text-center text-zinc-500">
      © {new Date().getFullYear()} Mentor AI • Built with Next.js,
      Supabase & OpenAI
    </footer>
  );
}