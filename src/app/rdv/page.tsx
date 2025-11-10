// app/rdv/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingEmbed from "@/components/BookingEmbed";

export default function Page(){
  return (
    <>
      <Navbar />
      <main className="py-12">
        <h1 className="text-2xl font-bold mb-6">Prendre un rendez-vous</h1>
        <BookingEmbed />
      </main>
      <Footer />
    </>
  );
}
