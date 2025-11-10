"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Brice — Web Savoie</Link>
        <div className="flex items-center gap-3">
          <a href="tel:+33600000000" className="px-3 py-2 rounded-md bg-black text-white text-sm">Appeler</a>
          <Link href="/rdv" className="px-3 py-2 rounded-md border text-sm">Prendre RDV</Link>
        </div>
      </nav>
    </header>
  );
}
