import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Moteurs Essence d'Exception | Tableau comparatif 2024",
  description:
    "Découvrez les meilleurs moteurs essence de voitures récentes (moins de trois ans) : performances, consommation, fiabilité et innovations techniques.",
  metadataBase: new URL("https://agentic-dad8af6e.vercel.app"),
  openGraph: {
    title: "Top moteurs essence modernes",
    description:
      "Classement exclusif des meilleurs moteurs essence lancés depuis 2021. Comparez performances, consommation, technologies et modèles équipés.",
    url: "https://agentic-dad8af6e.vercel.app",
    siteName: "Moteurs Essence d'Exception",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Comparatif moteurs essence 2024"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Top moteurs essence modernes",
    description:
      "Classement des meilleurs moteurs essence de moins de trois ans avec données techniques, consommation et modèles vedettes.",
    site: "@agentic_auto"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
