import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Merci ! | Brice Laurent — Web Savoie",
  description: "Votre message a bien été envoyé.",
};

export default function MerciPage() {
  return (
    <>
      <Navbar />
      <main className="py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Merci pour votre message 🙏</h1>
        <p className="text-gray-600 mb-8">
          Je vous répondrai dans les prochaines 24–48 h ouvrées.
        </p>
        <Link href="/" className="px-4 py-2 rounded-md bg-black text-white">
          Retour à l’accueil
        </Link>
      </main>
      <Footer />
    </>
  );
}
