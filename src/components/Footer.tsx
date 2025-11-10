import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex flex-wrap gap-4 justify-between">
        <p>© {new Date().getFullYear()} Brice — Saint-Pierre-d’Albigny</p>
        <nav className="flex gap-4">
          <Link href="/mentions">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </nav>
      </div>
    </footer>
  );
}
