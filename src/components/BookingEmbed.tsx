// components/BookingEmbed.tsx
"use client";
import Cal from "@calcom/embed-react";

export default function BookingEmbed() {
  const url = process.env.NEXT_PUBLIC_CAL_URL; // ex: https://cal.com/brice/15min
  if (!url) return <p className="text-gray-600">Lien de réservation à venir.</p>;

  // Cal.com attend un "slug" type "brice/15min", pas l’URL complète
  const calLink = url.replace(/^https?:\/\/(www\.)?cal\.com\//, "");

  return <Cal calLink={calLink} style={{ height: "800px", width: "100%" }} />;
}
