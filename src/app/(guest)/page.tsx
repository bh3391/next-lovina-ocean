import AboutHome from "@/components/section/about-home";
import Hero from "@/components/section/hero";
import Package from "@/components/section/packages";
import PickupSection from "@/components/section/pick-up";
import TestimonialSlider from "@/components/section/testimonial-slider";


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Lovina Ocean Dolphin Tour",
    "image": "https://lovinaoceandolphintour.com/logo.png",
    "@id": "https://lovinaoceandolphintour.com",
    "url": "https://lovinaoceandolphintour.com",
    "telephone": "+6283115300070",
    "priceRange": "$$",
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
      "longitude": 115.02136461349536,
       
    }
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
      
      <Package/>
      <PickupSection />
      <AboutHome />
      
      
    </main>
    </>
  );
}



