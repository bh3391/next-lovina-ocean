import AboutHome from "@/components/section/about-home";
import Hero from "@/components/section/hero";
import Package from "@/components/section/packages";
import PickupSection from "@/components/section/pick-up";
import TestimonialSlider from "@/components/section/testimonial-slider";
import Image from "next/image"; 

export default function Home() {
  return (
    
    <main className="flex-grow">
      <Hero />
      <TestimonialSlider />
      
      <Package/>
      <PickupSection />
      <AboutHome />
      
      
    </main>
  );
}
