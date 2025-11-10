import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="py-12">
        <section className="text-center space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold">
            Plus d’appels & RDV en Savoie<br />avec un site vitrine simple.
          </h1>
          <p className="text-gray-600">
            Focus Chambéry – Albertville – Saint-Pierre-d’Albigny. Livraison en 7 jours.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="tel:+33600000000" className="px-4 py-2 rounded-md bg-black text-white">Appeler</a>
            <Link href="/rdv" className="px-4 py-2 rounded-md border">Prendre RDV</Link>
          </div>
        </section>

        <section className="mt-16 grid sm:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Services</h2>
            <p className="text-sm text-gray-600">Site 1 page, vitrine 4–6 pages, refonte, SEO local, prise de RDV…</p>
            <Link className="underline text-sm" href="/services">Voir les détails</Link>
          </div>
          <div className="p-6 rounded-2xl border bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Tarifs transparents</h2>
            <p className="text-sm text-gray-600">Starter dès 450 €, vitrine 900 € (TVA non applicable, art. 293B).</p>
            <Link className="underline text-sm" href="/tarifs">Voir les tarifs</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
