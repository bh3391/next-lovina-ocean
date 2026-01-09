import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/shared/navbar"; 
import Footer from "@/components/shared/footer";
import WhatsAppButton from "@/components/shared/whatsapp-button"; 
import FaqSection from "@/components/section/faq";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Ini sangat penting untuk LCP!
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' 
      ? 'https://lovinaoceandolphintour.com' // Alamat domain asli Anda
      : 'http://localhost:3000'
  ),
  title: "Lovina Ocean Dolphin Tour | Best Sunrise Dolphin Watching & Snorkeling Experience Bali",
  description: "Experience the magic of Lovina with our professional dolphin watching tours. Enjoy sunrise cruises, snorkeling at coral reefs, and traditional fishing. Book your Bali adventure today!",
  keywords: ["Lovina Dolphin Tour", "Bali Dolphin Watching", "Ethical Dolphin Tour Bali", "Lovina Sunrise Tour", "Bali Snorkeling Trip", "Lovina Beach Activities", "Family-Friendly Tours Bali", "Sustainable Tourism Bali"],
  openGraph: {
    title: "Lovina Ocean Dolphin Tour | Best Sunrise & Dolphin Watching Experience Bali",
    description: "Book your private sunrise dolphin tour in Lovina, Bali. Best prices, professional guides, and unforgettable snorkeling experiences.",
    url: "https://lovinaoceandolphintour.com", // Ganti dengan domain Vercel Anda
    siteName: "Lovina Ocean Dolphin Tour",
    images: [
      {
        url: "/og-image.jpg", // Pastikan file ini ada di folder /public
        width: 1200,
        height: 630,
        alt: "Lovina Ocean Dolphin Tour Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovina Ocean Dolphin Tour",
    description: "The most ethical and authentic dolphin tour in North Bali.",
    images: ["/og-image.jpg"],
  },

  // Ikon Browser
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Jika Anda sudah punya filenya
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
          {/* Loading Bar - Akan muncul setiap berpindah halaman */}
          <NextTopLoader 
            color="#2563eb" // Blue-600
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2563eb,0 0 5px #2563eb"
            zIndex={1600}
            showAtBottom={false}
          />

          <Navbar />
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          <FaqSection />
          <Footer />
          <WhatsAppButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
