import PackagesSection from "@/components/section/packages";
import Hero from "@/components/section/hero"; // Asumsi Anda punya hero section
import PickupSection from "@/components/section/pick-up";



export default function PackagesPage() {
  return (
    <main>
      <Hero />
      <PackagesSection />
      <PickupSection />
      {/* Section lainnya... */}
    </main>
  );
}