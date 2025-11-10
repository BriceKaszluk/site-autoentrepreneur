import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Sites vitrines Savoie | Brice",
  description: "Sites vitrines rapides pour artisans & TPE en Savoie.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { type: "website", title: "Sites vitrines Savoie", siteName: "Brice Web" }
};

export const viewport: Viewport = { themeColor: "#111827" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* Crisp (ajoute ton CRISP_WEBSITE_ID en .env puis dé-commente)
        <script dangerouslySetInnerHTML={{__html:`
          window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.CRISP_WEBSITE_ID||""}";
          (function(){d=document;s=d.createElement("script");
          s.src="https://client.crisp.chat/l.js";s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);})();
        `}} /> */}
        <div className="mx-auto max-w-6xl px-4">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
