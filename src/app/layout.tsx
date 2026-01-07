import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Font Sans untuk teks umum
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// Font Serif untuk judul agar terlihat premium
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata = {
  title: "Lovina Ocean | Dolphin & North Bali Tour",
  description: "Experience the magic of Lovina with our professional dolphin tours and sunrise expeditions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-slate-900`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}