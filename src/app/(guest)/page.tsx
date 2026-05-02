import PeacefulSection from "@/components/guest/peacefull";
import AboutHome from "@/components/section/about-home";
import Hero from "@/components/section/hero";
import Package from "@/components/section/packages";
import PickupSection from "@/components/section/pick-up";
import TestimonialSlider from "@/components/section/testimonial-slider";
import Map from "@/components/section/map";
import GalleryPreview from "@/components/guest/gallery-preview";


export default function Home() {
  
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Lovina Ocean Dolphin Tour",
  "image": "https://lovinaoceandolphintour.com/og-image.jpg", // Gunakan foto tour terbaik
  "@id": "https://lovinaoceandolphintour.com",
  "url": "https://lovinaoceandolphintour.com",
  "telephone": "+6283115300070",
  "priceRange": "RP", // Simbol rentang harga
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lovina Beach",
    "addressLocality": "Buleleng",
    "addressRegion": "Bali",
    "postalCode": "81151",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -8.16385774864859,
    "longitude": 115.02136461349536
  },
  // --- TAMBAHAN UNTUK RATING BINTANG ---
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9", // Nilai rata-rata rating Anda
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "751" // Total jumlah ulasan asli
  },
  // --- TAMBAHAN INFORMASI OPERASIONAL ---
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "05:30", // Jam mulai tour sunrise biasanya pagi sekali
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com//lovina_paket_dolphin_tour",
    "https://www.facebook.com/lovinaoceandolphintour",
    "https://www.tripadvisor.co.id/Attraction_Review-g1600236-d21074151-Reviews-Lovina_Ocean_Tours-Anturan_Lovina_Beach_Buleleng_District_Buleleng_Regency_Bali.html" // Sangat disarankan link ke TripAdvisor
  ]
};
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow">
      <Hero />
      <TestimonialSlider />
      <PeacefulSection />
      
      
      <Package/>
      <GalleryPreview />
      
      <PickupSection />
      <Map />
      <AboutHome />
      
      
      
    </main>
    </>
  );
}



