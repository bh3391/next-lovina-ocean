import PackagesSection from "@/components/section/packages";
import Hero from "@/components/section/hero"; // Asumsi Anda punya hero section
import PickupSection from "@/components/section/pick-up";
import Map from "@/components/section/map";



export default function PackagesPage() {
  return (
    <main>
      <Hero />
      <PackagesSection />
      <PickupSection />
      <Map />
      {/* Section lainnya... */}
    </main>
  );
}