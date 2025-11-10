import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Brice Laurent — Web Savoie",
  description: "Demandez un devis rapide ou un rendez-vous.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="py-12">
        <h1 className="text-2xl font-bold mb-2">Contact</h1>
        <p className="text-gray-600 mb-8">Réponse sous 24–48h ouvrées.</p>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
